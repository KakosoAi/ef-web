import { NextRequest, NextResponse } from 'next/server';
import { siteChatReply } from '../../../../../src/shared/services/ai-site-chat';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    const message = (body?.message ?? '').trim();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const reply = await siteChatReply(message);
    return NextResponse.json({ success: true, reply });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to generate chat reply',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

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
