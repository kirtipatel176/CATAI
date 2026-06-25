import { NextRequest, NextResponse } from 'next/server';

export const mockColleges = [
  {
    id: 'iima',
    name: 'IIM Ahmedabad - Indian Institute of Management',
    description: 'Premier management institute in India, known for its rigorous curriculum and case-based pedagogy. Offers top-notch faculty, excellent placements, and a strong alumni network.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/IIM_Ahmedabad_Logo.svg/1200px-IIM_Ahmedabad_Logo.svg.png',
    city: 'Ahmedabad',
    state: 'Gujarat',
    tier: 'Tier 1',
    examsAccepted: ['CAT'],
    cutoffMin: 99.5,
    cutoffMax: 100,
    totalFees: 3150000,
    intake: 400,
    avgPlacement: 3280000,
    accreditation: ['EQUIS', 'AMBA', 'AACSB'],
    cutoffs: [
      { year: 2024, category: 'General', percentile: 99.6, gd: false, pi: true },
      { year: 2024, category: 'NC-OBC', percentile: 95.0, gd: false, pi: true },
      { year: 2023, category: 'General', percentile: 99.5, gd: false, pi: true },
    ]
  },
  {
    id: 'iimb',
    name: 'IIM Bangalore - Indian Institute of Management',
    description: 'Leading business school located in India\'s Silicon Valley, emphasizing innovation, research, and entrepreneurship. Renowned for its diverse cohort and global partnerships.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Indian_Institute_of_Management_Bangalore_Logo.svg/1200px-Indian_Institute_of_Management_Bangalore_Logo.svg.png',
    city: 'Bangalore',
    state: 'Karnataka',
    tier: 'Tier 1',
    examsAccepted: ['CAT', 'GMAT'],
    cutoffMin: 99.0,
    cutoffMax: 100,
    totalFees: 2450000,
    intake: 480,
    avgPlacement: 3531000,
    accreditation: ['EQUIS', 'AMBA'],
    cutoffs: [
      { year: 2024, category: 'General', percentile: 99.0, gd: false, pi: true },
    ]
  },
  {
    id: 'spjimr',
    name: 'SPJIMR Mumbai',
    description: 'Top-ranked private B-school in Mumbai, fostering value-based leadership and social sensitivity. Famous for its innovative admission process focusing on profile over just test scores.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/SP_Jain_Institute_of_Management_and_Research_logo.svg/1200px-SP_Jain_Institute_of_Management_and_Research_logo.svg.png',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: 'Tier 1',
    examsAccepted: ['CAT', 'GMAT'],
    cutoffMin: 85.0,
    cutoffMax: 99.0,
    totalFees: 2040000,
    intake: 240,
    avgPlacement: 3200000,
    accreditation: ['AACSB', 'AMBA'],
    cutoffs: []
  },
  {
    id: 'xlri',
    name: 'XLRI Jamshedpur',
    description: 'The oldest B-school in India, celebrated for its exceptional Human Resources Management and Business Management programs. Highly respected for shaping ethical business leaders.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/XLRI_Jamshedpur_Logo.svg/1200px-XLRI_Jamshedpur_Logo.svg.png',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    tier: 'Tier 1',
    examsAccepted: ['XAT'],
    cutoffMin: 96.0,
    cutoffMax: 99.9,
    totalFees: 2500000,
    intake: 360,
    avgPlacement: 3270000,
    accreditation: ['AACSB', 'AMBA'],
    cutoffs: [
      { year: 2024, category: 'BM', percentile: 96.0, gd: true, pi: true },
      { year: 2024, category: 'HRM', percentile: 95.0, gd: true, pi: true },
    ]
  },
  {
    id: 'mdig',
    name: 'MDI Gurgaon',
    description: 'Prominent business school located in the corporate hub of Gurgaon. Offers a strong corporate interface, global exposure, and excellent academic rigor.',
    logo: '',
    city: 'Gurgaon',
    state: 'Haryana',
    tier: 'Tier 1',
    examsAccepted: ['CAT'],
    cutoffMin: 94.0,
    cutoffMax: 98.0,
    totalFees: 2416800,
    intake: 420,
    avgPlacement: 2767000,
    accreditation: ['AMBA', 'AACSB', 'SAQS'],
    cutoffs: []
  },
  {
    id: 'tapmi',
    name: 'TAPMI Manipal',
    description: 'Leading B-school in Karnataka, known for its rigorous academic curriculum and focus on developing analytical and problem-solving skills.',
    logo: '',
    city: 'Manipal',
    state: 'Karnataka',
    tier: 'Tier 2',
    examsAccepted: ['CAT', 'XAT', 'GMAT', 'NMAT'],
    cutoffMin: 85.0,
    cutoffMax: 90.0,
    totalFees: 1650000,
    intake: 420,
    avgPlacement: 1460000,
    accreditation: ['AACSB', 'AMBA'],
    cutoffs: []
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search')?.toLowerCase();
  const exam = searchParams.get('exam');
  const tier = searchParams.get('tier');
  const state = searchParams.get('state');
  const maxFees = searchParams.get('maxFees');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 6;

  let filtered = [...mockColleges];

  if (search) {
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(search) || 
      c.city.toLowerCase().includes(search)
    );
  }

  if (exam) {
    filtered = filtered.filter(c => c.examsAccepted.includes(exam));
  }

  if (tier) {
    filtered = filtered.filter(c => c.tier === tier);
  }

  if (state) {
    filtered = filtered.filter(c => c.state === state);
  }

  if (maxFees) {
    filtered = filtered.filter(c => c.totalFees <= parseInt(maxFees));
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json({
    colleges: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
}
