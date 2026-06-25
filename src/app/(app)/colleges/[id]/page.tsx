import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { CollegeDetailClient } from '@/components/colleges/detail/CollegeDetailClient';
import { College, CutoffEntry, Programme } from '@/types/college';

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Dynamically get host to support running on different ports (e.g. 3001)
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
  
  let res;
  try {
    res = await fetch(`${baseUrl}/api/colleges/${resolvedParams.id}`, { cache: 'force-cache' });
  } catch (error) {
    console.error('Error fetching college details:', error);
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops! Something went wrong.</h2>
          <p className="text-gray-600 dark:text-gray-400">Failed to load college details. Ensure the API server is running.</p>
        </div>
      </div>
    );
  }

  if (!res.ok) {
    if (res.status === 404) notFound();
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">Failed to fetch college. Server returned {res.status}.</p>
        </div>
      </div>
    );
  }

  const data = await res.json();
  
  // Default programmes if API doesn't return them
  const mockProgrammes: Programme[] = [
    {
      name: 'MBA (Core)',
      duration: '2 Years',
      fees: data.totalFees,
      intake: data.intake,
      avgSalary: data.avgPlacement,
      topRecruiters: ['McKinsey', 'BCG', 'Bain', 'Goldman Sachs', 'HUL']
    }
  ];

  return (
    <div className="min-h-screen w-full pt-4">
      <CollegeDetailClient 
        college={data} 
        cutoffs={data.cutoffs || []} 
        programmes={data.programmes || mockProgrammes} 
      />
    </div>
  );
}
