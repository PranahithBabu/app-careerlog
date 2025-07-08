// Utility for calling Gemini API to convert a description into STAR format
// Uses Vite env variable for API key: import.meta.env.VITE_GEMINI_API_KEY

/**
 * Generate STAR fields from a user description using Gemini API.
 * Uses a robust prompt to refuse non-work-related inputs.
 * @param {string} description - The user's log description
 * @returns {Promise<{situation: string, task: string, action: string, result: string}>}
 */
export async function generateSTARFromDescription(description) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not set');

  const prompt = `You are an AI assistant helping users prepare STAR behavioral interview responses for professional and work-related activities only.\n\nInput:\n${description}\n\nInstructions:\n\nFirst, check if the input describes a work-related task, achievement, issue solved, or learning. This includes activities like coding, debugging, deploying, designing, leading meetings, resolving incidents, learning a new tool, collaborating with team, etc.\n\nIf the input is purely personal, unrelated to work, or general life updates, respond only with:\n\n{\n\"situation\": \"Not work-related\",\n\"task\": \"Not work-related\",\n\"action\": \"Not work-related\",\n\"result\": \"Not work-related\"\n}\n\nIf it is work-related, generate a STAR formatted response with clear Situation, Task, Action, and Result in concise bullet point style.\n\nOutput JSON format:\n\n{\n\"situation\": \"...\",\n\"task\": \"...\",\n\"action\": \"...\",\n\"result\": \"...\"\n}\n\nEnsure: Only provide this structured JSON response without any additional commentary.`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    // Parse the model's response for the JSON STAR object
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Try to extract JSON from the response
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('Could not parse STAR response');
  } catch (err) {
    console.error('Gemini API error:', err);
    throw new Error('Failed to generate STAR story. Please try again.');
  }
} 