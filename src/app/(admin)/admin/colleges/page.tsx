import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Building2, Edit, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminCollegesPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Colleges</h1>
          <p className="text-muted-foreground text-sm">Manage MBA colleges, tiers, and details.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="h-4 w-4" />
          Add College
        </Button>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search colleges..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {[
              { name: "IIM Ahmedabad", tier: "Tier 1 Elite", location: "Ahmedabad, Gujarat" },
              { name: "IIM Bangalore", tier: "Tier 1 Elite", location: "Bangalore, Karnataka" },
              { name: "IIM Calcutta", tier: "Tier 1 Elite", location: "Kolkata, West Bengal" },
              { name: "FMS Delhi", tier: "Tier 1 Premier", location: "New Delhi" },
            ].map((college, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{college.name}</p>
                    <p className="text-xs text-muted-foreground">{college.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={college.tier.includes("Elite") ? "border-primary text-primary" : ""}>
                    {college.tier}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
