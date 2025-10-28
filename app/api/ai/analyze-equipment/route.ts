import { NextRequest, NextResponse } from 'next/server';
import {
  analyzeEquipmentDescription,
  mapExtractedInfoToFormData,
} from '@/shared/services/ai-equipment-analyzer';

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { description } = body;

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    // Analyze the equipment description
    const extractedInfo = await analyzeEquipmentDescription(description.trim());

    // Map to form data structure
    const formData = mapExtractedInfoToFormData(extractedInfo);

    return NextResponse.json({
      success: true,
      extractedInfo,
      formData,
    });
  } catch (error) {
    // console.error('Error in AI equipment analysis:', error);

    return NextResponse.json(
      {
        error: 'Failed to analyze equipment description',
        details: error instanceof Error ? error.message : 'Unknown error',
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
