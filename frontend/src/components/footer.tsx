import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl tracking-tight text-primary">
                MBAOS
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The premier AI-powered MBA preparation platform for ambitious CAT aspirants. Prepare smarter, not harder.
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-4">Product</h3>
            <ul className="flex flex-col space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">CATGPT</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Profile Evaluator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Resources</h3>
            <ul className="flex flex-col space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Study Material</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Company</h3>
            <ul className="flex flex-col space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MBAOS Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
