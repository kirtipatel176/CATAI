import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { MobileNavBar } from "@/components/layout/MobileNavBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-orb-mesh">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main id="main-scroll-container" className="flex-1 overflow-y-auto">
          <div className="h-full px-6 py-6 max-w-7xl mx-auto pb-safe-nav md:pb-6">
            {children}
          </div>
        </main>
      </div>
      <MobileNavBar />
    </div>
  );
}
