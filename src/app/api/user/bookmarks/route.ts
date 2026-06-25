import { NextRequest, NextResponse } from 'next/server';

// Temporary in-memory store for mocked backend (resets on restart)
let userBookmarks: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { collegeId } = await request.json();
    
    if (userBookmarks.includes(collegeId)) {
      userBookmarks = userBookmarks.filter(id => id !== collegeId);
    } else {
      userBookmarks.push(collegeId);
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({ bookmarks: userBookmarks });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ bookmarks: userBookmarks });
}
