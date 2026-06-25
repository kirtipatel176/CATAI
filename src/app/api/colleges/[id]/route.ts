import { NextRequest, NextResponse } from 'next/server';
import { mockColleges } from '../route';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = mockColleges.find(c => c.id === id);
  
  if (!college) {
    return NextResponse.json({ message: 'College not found' }, { status: 404 });
  }

  return NextResponse.json(college);
}
