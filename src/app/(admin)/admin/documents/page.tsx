import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Trash2, Search } from "lucide-react";

export default function AdminDocumentsPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Document Management</h1>
          <p className="text-muted-foreground text-sm">Upload PDFs and manage the Knowledge Base for CATGPT.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {[
              { name: "CAT 2023 Official Paper.pdf", size: "2.4 MB", date: "Oct 24, 2024" },
              { name: "IIM Ahmedabad Selection Criteria 2024.pdf", size: "1.1 MB", date: "Oct 22, 2024" },
              { name: "Quantitative Aptitude Formulas Masterlist.pdf", size: "3.5 MB", date: "Oct 20, 2024" },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.size} • Uploaded {doc.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
