import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  let query = '';

  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { query: requestQuery, searchType, websiteMode } = body;
    query = requestQuery;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const systemPrompt = `You are an expert equipment search assistant for a Middle Eastern equipment marketplace. Your job is to enhance user search queries to make them more effective and specific.

Context:
- Website Mode: ${websiteMode || 'general'} (general = construction/industrial equipment, agricultural = farming machinery)
- Search Type: ${searchType || 'buy'} (buy, rent, or tools)
- Region: Middle East (UAE, Saudi Arabia, Qatar, Kuwait)

Common Equipment Categories:
${
  websiteMode === 'agricultural'
    ? '- Tractors, Harvesters, Plows, Seeders, Irrigation Equipment, Tillers, Mowers, Balers, Sprayers, Cultivators'
    : '- Excavators, Bulldozers, Cranes, Loaders, Forklifts, Generators, Compressors, Boom Lifts, Concrete Pumps, Graders'
}

Brand Mapping Examples:
- "yellow machine" → "Caterpillar" (CAT machines are typically yellow)
- "blue machine" → "Komatsu" (Komatsu machines are typically blue)
- "orange machine" → "Hitachi" (Hitachi machines are typically orange)
- "red machine" → "Case IH" or "Massey Ferguson" (for agricultural)
- "green machine" → "John Deere" (especially for agricultural)

Your task:
1. Analyze the user's query and understand their intent
2. Convert vague descriptions into specific equipment terms
3. Add relevant brand names when color or characteristics are mentioned
4. Include relevant specifications or features when appropriate
5. Keep the enhanced query concise but more searchable

Examples:
- "yellow machine" → "Caterpillar excavator"
- "big digger" → "large excavator"
- "lifting machine" → "crane mobile crane"
- "farm tractor green" → "John Deere tractor"
- "concrete mixer truck" → "concrete mixer truck ready mix"

Return ONLY a JSON object with this structure:
{
  "enhancedQuery": "improved search terms",
  "suggestions": ["alternative search term 1", "alternative search term 2", "alternative search term 3"],
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation of changes made"
}

Keep enhanced queries practical and searchable. Don't over-complicate simple queries.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano-2025-04-14',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Enhance this search query: "${query.trim()}"` },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const enhancedResult = JSON.parse(content);

    return NextResponse.json({
      success: true,
      original: query.trim(),
      ...enhancedResult,
    });
  } catch (error) {
    console.error('Error enhancing search query:', error);

    // Return a fallback response
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to enhance search query',
        details: error instanceof Error ? error.message : 'Unknown error',
        original: query?.trim() || '',
        enhancedQuery: query?.trim() || '',
        suggestions: [],
        confidence: 0.0,
        reasoning: 'AI enhancement failed, using original query',
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
