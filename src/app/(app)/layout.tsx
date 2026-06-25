import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden selection:bg-primary/30 selection:text-primary">
      <AnimatedBackground />
      <div className="relative z-50">
        <TopNav />
      </div>
      <div className="flex flex-1 overflow-hidden z-10 relative">
        <Sidebar isAdmin={false} />
        <main id="main-scroll-container" className="flex-1 overflow-y-auto">
          <div className="h-full px-4 md:px-8 py-4 md:py-6 max-w-[1400px] mx-auto pb-8 md:pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
