import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Supported file types
const SUPPORTED_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'doc',
  'text/plain': 'txt',
  'application/rtf': 'rtf',
  'text/rtf': 'rtf',
};

// Maximum file size (15MB)
const MAX_FILE_SIZE = 15 * 1024 * 1024;

// Language mapping
const LANGUAGE_MAP = {
  'en': 'English',
  'fa': 'Persian (Farsi)',
  'ar': 'Arabic'
};

interface TranslationRequest {
  file: File;
  targetLanguage: 'en' | 'fa' | 'ar';
}

interface TranslationResponse {
  translation: string;
  legalNotes: string[];
  originalText: string;
  fileName: string;
  targetLanguage: string;
}

// Extract text from different file types
async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const fileType = file.type;
  
  console.log('Extracting text from file:', file.name, 'Type:', fileType, 'Size:', file.size);
  
  try {
    switch (SUPPORTED_TYPES[fileType as keyof typeof SUPPORTED_TYPES]) {
      case 'pdf':
        console.log('Processing PDF file...');
        try {
          // Use require for better compatibility with Next.js
          const pdfParse = require('pdf-parse');
          const pdfData = await pdfParse(Buffer.from(buffer));
          console.log('PDF text extracted, length:', pdfData.text.length);
          return pdfData.text;
        } catch (parseError) {
          console.error('Error parsing PDF:', parseError);
          throw new Error('Failed to parse PDF file. Please try with a different PDF or convert to text format.');
        }
        
      case 'docx':
        console.log('Processing DOCX file...');
        try {
          // Use require for better compatibility with Next.js
          const mammoth = require('mammoth');
          const docxResult = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
          console.log('DOCX text extracted, length:', docxResult.value.length);
          return docxResult.value;
        } catch (parseError) {
          console.error('Error parsing DOCX:', parseError);
          throw new Error('Failed to parse DOCX file. Please try with a different DOCX or convert to text format.');
        }
        
      case 'txt':
      case 'rtf':
        console.log('Processing text file...');
        const text = new TextDecoder().decode(buffer);
        console.log('Text extracted, length:', text.length);
        return text;
        
      default:
        console.log('Unsupported file type:', fileType);
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    throw new Error(`Failed to extract text from file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Generate translation and legal notes using OpenAI
async function generateTranslationAndNotes(
  text: string, 
  targetLanguage: 'en' | 'fa' | 'ar'
): Promise<{ translation: string; legalNotes: string[] }> {
  const languageName = LANGUAGE_MAP[targetLanguage];
  
  // Language-specific instructions for legal notes
  const languageInstructions = {
    'en': 'Write all legal notes in English',
    'fa': 'Write all legal notes in Persian (Farsi)',
    'ar': 'Write all legal notes in Arabic'
  };
  
  const prompt = `
You are a professional legal translator and legal advisor. Please analyze the following legal document and provide:

1. A professional translation to ${languageName} that maintains legal accuracy and terminology
2. Important legal notes and insights that would be valuable for lawyers - ${languageInstructions[targetLanguage]}

Document text:
${text}

Please respond in JSON format with the following structure:
{
  "translation": "The complete translated text in ${languageName}",
  "legalNotes": [
    "Important legal point 1 in ${languageName}",
    "Important legal point 2 in ${languageName}",
    "Important legal point 3 in ${languageName}"
  ]
}

Focus on:
- Legal terminology accuracy
- Contract clauses and obligations
- Potential legal risks or issues
- Important deadlines or time-sensitive matters
- Jurisdictional considerations
- Compliance requirements
- Rights and responsibilities of parties

IMPORTANT: All legal notes must be written in ${languageName}. Do not mix languages.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional legal translator and legal advisor with expertise in multiple languages and legal systems."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    const parsedResponse = JSON.parse(response);
    
    return {
      translation: parsedResponse.translation || 'Translation not available',
      legalNotes: Array.isArray(parsedResponse.legalNotes) ? parsedResponse.legalNotes : []
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate translation and legal notes');
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Translation API called');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const targetLanguage = formData.get('targetLanguage') as 'en' | 'fa' | 'ar';

    console.log('File received:', file?.name, file?.type, file?.size);
    console.log('Target language:', targetLanguage);

    // Validate inputs
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!targetLanguage || !['en', 'fa', 'ar'].includes(targetLanguage)) {
      return NextResponse.json(
        { error: 'Invalid target language' },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 15MB limit' },
        { status: 400 }
      );
    }

    // Check file type
    if (!SUPPORTED_TYPES[file.type as keyof typeof SUPPORTED_TYPES]) {
      return NextResponse.json(
        { error: 'Unsupported file type. Supported types: PDF, DOC, DOCX, TXT, RTF' },
        { status: 400 }
      );
    }

    // Extract text from file
    const originalText = await extractTextFromFile(file);
    
    if (!originalText || originalText.trim().length === 0) {
      return NextResponse.json(
        { error: 'No text content found in the file' },
        { status: 400 }
      );
    }

    // Generate translation and legal notes
    const { translation, legalNotes } = await generateTranslationAndNotes(originalText, targetLanguage);

    const response: TranslationResponse = {
      translation,
      legalNotes,
      originalText,
      fileName: file.name,
      targetLanguage: LANGUAGE_MAP[targetLanguage]
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Translation API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
