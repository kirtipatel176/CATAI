import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { colleges } = await request.json();
    
    // Simulate database operation to save shortlist
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ success: true, message: 'Shortlist saved successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
