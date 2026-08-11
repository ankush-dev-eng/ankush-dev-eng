import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI client
// Set your API key in environment variable: $env:GEMINI_API_KEY="your-key-here"
const apiKey = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const ai = new GoogleGenAI({ apiKey });

async function runDemo() {
  if (!process.env.GEMINI_API_KEY) {
    console.log('---------------------------------------------------------');
    console.log('🔑 Google AI Studio Setup Helper');
    console.log('1. Go to https://aistudio.google.com and sign in with Google');
    console.log('2. Click "Get API key" and create a new key');
    console.log('3. Run in PowerShell:');
    console.log('   $env:GEMINI_API_KEY="your_api_key_here"');
    console.log('   node gemini_demo.js');
    console.log('---------------------------------------------------------');
    return;
  }

  try {
    console.log('🤖 Querying Gemini 1.5 Flash model...');
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: 'Hello! Provide a 2-sentence inspiration quote for a developer building AI tools.',
    });

    console.log('\nResponse from Gemini:');
    console.log(response.text);
  } catch (err) {
    console.error('Error querying Gemini API:', err.message);
  }
}

runDemo();
