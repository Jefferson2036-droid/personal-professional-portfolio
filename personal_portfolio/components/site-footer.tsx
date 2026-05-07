import Link from "next/link";

type SiteFooterProps = {
  mode?: "standard" | "presentation";
};

export function SiteFooter({ mode: _mode = "standard" }: SiteFooterProps) {
  return (
    <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[999] bg-white border-4 border-black p-6 shadow-[10px_10px_0px_0px_black] flex items-center gap-10 font-mono font-bold uppercase tracking-widest">
      {/* Identity Info */}
      <div className="flex flex-col gap-1 text-sm">
        <div className="text-base">JEFFERSON RODAS</div>
        <div className="text-xs">908-342-9797</div>
      </div>
      
      {/* Vertical Divider */}
      <div className="w-[2px] h-12 bg-black"></div>
      
      {/* Links */}
      <div className="flex gap-4">
        <Link 
          href="https://linkedin.com/in/jefferson-rodas" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs hover:opacity-70 transition-opacity"
        >
          LINKEDIN
        </Link>
        <Link 
          href="https://github.com/Jefferson2036-droid" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs hover:opacity-70 transition-opacity"
        >
          GITHUB
        </Link>
      </div>
    </footer>
  );
}