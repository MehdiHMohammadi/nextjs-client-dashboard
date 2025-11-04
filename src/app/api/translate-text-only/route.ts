import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Language mapping
const LANGUAGE_MAP = {
  'en': 'English',
  'fa': 'Persian (Farsi)',
  'ar': 'Arabic'
};

interface TranslationResponse {
  translation: string;
  legalNotes: string[];
  originalText: string;
  fileName: string;
  targetLanguage: string;
}

// Generate translation and legal notes using OpenAI
async function generateTranslationAndNotes(
  text: string, 
  targetLanguage: 'en' | 'fa' | 'ar'
): Promise<{ translation: string; legalNotes: string[] }> {
  const languageName = LANGUAGE_MAP[targetLanguage];
  
  const prompt = `
You are a professional legal translator and legal advisor. Please analyze the following legal document and provide:

1. A professional translation to ${languageName} that maintains legal accuracy and terminology
2. Important legal notes and insights that would be valuable for lawyers

Document text:
${text}

Please respond in JSON format with the following structure:
{
  "translation": "The complete translated text in ${languageName}",
  "legalNotes": [
    "Important legal point 1",
    "Important legal point 2",
    "Important legal point 3"
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
    console.log('Text-only translation API called');
    
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

    // Only support text files for now
    if (file.type !== 'text/plain') {
      return NextResponse.json(
        { error: 'Only text files (.txt) are supported in this test version' },
        { status: 400 }
      );
    }

    // Extract text from file
    const buffer = await file.arrayBuffer();
    const originalText = new TextDecoder().decode(buffer);
    
    console.log('Text extracted, length:', originalText.length);
    
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
