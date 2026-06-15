import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Building2, Target } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">Platform overview and statistics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-success mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Documents in KB</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground mt-1">24 added this week</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Colleges Tracked</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-1">Across 4 tiers</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cutoffs Updated</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-warning mt-1">Pending 2024 updates</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-border/50 col-span-1">
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-sm">User {i}</p>
                      <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{i} hr ago</span>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 col-span-1">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success"></div>
                    <span className="font-medium text-sm">CATGPT API</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Operational (24ms)</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success"></div>
                    <span className="font-medium text-sm">Profile Evaluator Model</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Operational (120ms)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success"></div>
                    <span className="font-medium text-sm">Study Planner Generator</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Operational (80ms)</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
