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

    const systemPrompt = `You are a smart search assistant for an equipment marketplace. Your job is to:
1. Convert user descriptions into REAL equipment names and brands that actually exist in ads
2. DETECT and EXTRACT filter criteria mentioned in the query (price, location, condition, category)

Context:
- Website Mode: ${websiteMode || 'general'} (general = construction equipment, agricultural = farming machinery)
- Search Type: ${searchType || 'buy'} (buy, rent, or tools)

IMPORTANT RULES:
1. Convert descriptions to ACTUAL equipment names that people use in ads
2. Map colors to brand names when obvious
3. Convert vague terms to specific equipment types
4. Use REAL equipment names, not generic descriptions
5. DETECT filter criteria and extract them separately
6. Think about what equipment actually does what the user describes

Color to Brand Mapping:
- "yellow machine" → "Caterpillar"
- "blue machine" → "Komatsu" 
- "orange machine" → "Hitachi"
- "green machine" → "John Deere" (for agricultural)
- "red machine" → "Case IH" (for agricultural)

Description to Equipment Mapping:
- "long arm machine" → "excavator" (excavators have long arms)
- "long arm equipment" → "excavator"
- "digging machine" → "excavator"
- "lifting machine" → "crane"
- "boom machine" → "boom lift"
- "high reach" → "boom lift"
- "concrete machine" → "concrete mixer"
- "earth moving" → "bulldozer"
- "loading machine" → "loader"

Equipment Types in Database:
${
  websiteMode === 'agricultural'
    ? '- Tractors, Harvesters, Plows, Seeders, Irrigation, Tillers, Mowers, Balers'
    : '- Excavators, Bulldozers, Cranes, Loaders, Forklifts, Generators, Boom Lifts, Concrete Mixers'
}

FILTER DETECTION:
Locations: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain
Conditions: New, Excellent, Good, Fair
Categories: Excavators, Wheel Loaders, Cranes, Bulldozers, Backhoe Loaders, Skid Steers, Compactors, Generators

Price Keywords:
- "under/below/less than X" → maxPrice: X
- "above/over/more than X" → minPrice: X
- "between X and Y" → minPrice: X, maxPrice: Y
- "around/about X" → minPrice: X*0.8, maxPrice: X*1.2

Location Keywords:
- "from/in/at [location]" → location: [location]

Condition Keywords:
- "new/brand new" → condition: "New"
- "excellent/perfect" → condition: "Excellent"
- "good/decent" → condition: "Good"
- "fair/okay" → condition: "Fair"

Examples with Filters:
- "caterpillar under 50000" → enhancedQuery: "Caterpillar", filters: {maxPrice: 50000}
- "excavator from Dubai" → enhancedQuery: "excavator", filters: {location: "Dubai"}
- "new bulldozer above 100000" → enhancedQuery: "bulldozer", filters: {condition: "New", minPrice: 100000}
- "yellow crane between 80000 and 120000" → enhancedQuery: "Caterpillar crane", filters: {minPrice: 80000, maxPrice: 120000}

Return ONLY a JSON object:
{
  "enhancedQuery": "actual equipment name or brand",
  "suggestions": ["alternative equipment 1", "alternative equipment 2", "alternative equipment 3"],
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation",
  "filters": {
    "minPrice": number or null,
    "maxPrice": number or null,
    "location": "string or null",
    "condition": "string or null",
    "category": "string or null"
  }
}

Be SMART - convert descriptions to real equipment names AND extract filter criteria!`;

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
    // eslint-disable-next-line no-console
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
