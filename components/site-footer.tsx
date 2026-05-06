import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="sticky bottom-0 border-t-4 border-black bg-white">
      <div className="flex flex-wrap justify-between items-center px-6 py-4 uppercase tracking-tighter font-mono text-xs">
        {/* Identity */}
        <div className="font-bold">JEFFERSON RODAS</div>

        {/* Contact */}
        <div>908-342-9797</div>

        {/* LinkedIn */}
        <Link href="https://linkedin.com/in/jefferson-rodas" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
          linkedin.com/in/jefferson-rodas
        </Link>

        {/* GitHub */}
        <Link href="https://github.com/Jefferson2036-droid" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
          github.com/Jefferson2036-droid
        </Link>
      </div>
    </footer>
  );
}
