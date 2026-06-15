import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isAdmin={true} />
        <main className="flex-1 overflow-y-auto">
          <div className="h-full px-6 py-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
