import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Target, Edit, Trash2, Search } from "lucide-react";

export default function AdminCutoffsPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Cutoffs & Criteria</h1>
          <p className="text-muted-foreground text-sm">Manage CAT percentile cutoffs and composite score criteria.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="h-4 w-4" />
          Add Cutoff
        </Button>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search colleges for cutoffs..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {[
              { college: "IIM Ahmedabad", cat: "99.5+", year: "2024", catWeight: "65%", acadWeight: "30%" },
              { college: "IIM Bangalore", cat: "99.0+", year: "2024", catWeight: "55%", acadWeight: "40%" },
              { college: "IIM Calcutta", cat: "99.7+", year: "2024", catWeight: "56%", acadWeight: "40%" },
            ].map((cutoff, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/30 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{cutoff.college} <span className="text-xs text-muted-foreground ml-2">({cutoff.year})</span></p>
                    <div className="flex gap-4 mt-1">
                      <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">CAT:</span> {cutoff.cat}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">CAT Wt:</span> {cutoff.catWeight}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Acad Wt:</span> {cutoff.acadWeight}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
