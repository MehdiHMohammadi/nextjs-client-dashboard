# Document Translation Feature

## Overview
A comprehensive document translation system that allows users to upload legal documents and translate them to English, Persian (Farsi), or Arabic using ChatGPT API. The system also extracts important legal notes and insights.

## Features

### File Upload
- **Drag & Drop Interface**: Modern drag-and-drop file upload with visual feedback
- **File Size Limit**: Maximum 15MB file size
- **Supported Formats**: PDF, DOC, DOCX, TXT, RTF
- **File Validation**: Real-time validation for file type and size

### Translation Options
- **English (🇺🇸)**: Translate to English
- **Persian/Farsi (🇮🇷)**: Translate to Persian
- **Arabic (🇸🇦)**: Translate to Arabic

### AI-Powered Features
- **Professional Translation**: Uses ChatGPT-4 for accurate legal terminology translation
- **Legal Notes Extraction**: Automatically identifies and extracts important legal points
- **Context-Aware**: Maintains legal document structure and formatting

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Full dark/light theme compatibility
- **Real-time Feedback**: Loading states and error handling
- **Results Display**: Organized sections for translation, legal notes, and original text

### Download Feature
- **Complete Results**: Download translation, legal notes, and original text
- **Formatted Output**: Well-structured text file with all information
- **Timestamped Files**: Automatic file naming with date

## Technical Implementation

### API Route
- **File**: `src/app/api/translate-document/route.ts`
- **Text Extraction**: Supports multiple file formats using specialized libraries
- **OpenAI Integration**: Uses GPT-4 for translation and legal analysis
- **Error Handling**: Comprehensive error handling and validation

### Components
- **DocumentUpload**: `src/components/FileUpload/DocumentUpload.tsx`
  - Drag & drop functionality
  - File validation
  - Progress indicators
  - Error display

### Dependencies
- `openai`: ChatGPT API integration
- `pdf-parse`: PDF text extraction
- `mammoth`: DOCX text extraction
- `file-saver`: Download functionality

## Usage

1. **Upload Document**: Drag and drop or click to select a document
2. **Choose Language**: Select target language (English, Persian, or Arabic)
3. **Translate**: Click "شروع ترجمه" (Start Translation)
4. **Review Results**: View translation, legal notes, and original text
5. **Download**: Save complete results as a text file

## Error Handling

- **File Size**: Clear error message for files exceeding 15MB
- **File Type**: Validation for supported formats only
- **API Errors**: User-friendly error messages for translation failures
- **Network Issues**: Proper handling of connection problems

## Security

- **Server-Side Processing**: All file processing happens on the server
- **API Key Protection**: OpenAI API key stored securely in environment variables
- **File Validation**: Strict validation prevents malicious file uploads

## Future Enhancements

- **Batch Translation**: Multiple file processing
- **Translation History**: Save and manage previous translations
- **Custom Prompts**: User-defined translation instructions
- **Additional Languages**: Support for more target languages
- **Document Comparison**: Side-by-side original and translated view
