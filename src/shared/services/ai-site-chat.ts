import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful assistant for an equipment rental and sales website. You can only answer questions about:
- Browsing and searching for equipment ads
- Buying or renting equipment
- Posting equipment ads
- User accounts and profiles
- Available locations and categories
- Search filters and pricing
- Contacting sellers or dealers
- Website policies and features

Keep responses very brief (1-2 sentences max). If asked about topics outside the website's scope, politely decline and ask for a website-related question instead.`;

export async function siteChatReply(message: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return "I'm here to help with equipment rental and sales questions! However, I'm currently experiencing connection issues. Please try again later or contact support for assistance.";
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano-2025-04-14',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return (
      completion.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again."
    );
  } catch (error) {
    return "I'm experiencing technical difficulties. Please try again later or contact support.";
  }
}
