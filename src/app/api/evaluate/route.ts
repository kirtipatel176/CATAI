import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Simple mock logic for evaluation
    const { examType, percentile } = data;
    const p = parseFloat(percentile) || 0;
    
    const mockCollege = {
      id: 'iima',
      name: 'IIM Ahmedabad',
      logo: '',
      city: 'Ahmedabad',
      state: 'Gujarat',
      tier: 'Tier 1' as const,
      examsAccepted: ['CAT'],
      cutoffMin: 99.5,
      cutoffMax: 100,
      totalFees: 3150000,
      intake: 400,
      avgPlacement: 3280000,
      accreditation: ['EQUIS']
    };

    const targetCollege = { ...mockCollege, id: 'spjimr', name: 'SPJIMR Mumbai', cutoffMin: 95 };
    const safeCollege = { ...mockCollege, id: 'tapmi', name: 'TAPMI Manipal', cutoffMin: 85 };

    const result = {
      dream: [
        {
          college: mockCollege,
          matchScore: p > 99.5 ? 95 : 70,
          gaps: p < 99.5 ? ['Percentile is below cutoff'] : [],
          callChance: p > 99.5 ? 'High' : 'Low'
        }
      ],
      target: [
        {
          college: targetCollege,
          matchScore: p > 95 ? 90 : 80,
          gaps: [],
          callChance: p > 95 ? 'High' : 'Medium'
        }
      ],
      safe: [
        {
          college: safeCollege,
          matchScore: 98,
          gaps: [],
          callChance: 'High'
        }
      ]
    };

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
