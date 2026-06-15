import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex w-1/2 bg-premium-gradient text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md font-bold text-lg border border-white/20">
              M
            </div>
            <span className="text-2xl font-bold tracking-tight">MBAOS</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-6">
            Prepare Smarter.<br />Not Harder.
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            AI-powered MBA preparation platform with intelligent study planning, profile evaluation, and CAT guidance.
          </p>
        </div>
        
        <div className="relative z-10 glass-panel-heavy p-6 rounded-2xl max-w-md border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <p className="font-medium">"The Perplexity for MBA Aspirants"</p>
              <p className="text-white/60 text-sm">Join thousands of 99+ percentilers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        {children}
      </div>
    </div>
  );
}
