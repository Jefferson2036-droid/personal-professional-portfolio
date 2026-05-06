import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white text-black border-t-4 border-black z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap justify-between items-center font-mono text-[10px] sm:text-xs uppercase tracking-tighter">
        <div className="font-bold">JEFFERSON RODAS</div>
        <div>908-342-9797</div>
        <Link href="https://linkedin.com/in/jefferson-rodas" target="_blank" className="hover:underline">
          LINKEDIN.COM/IN/JEFFERSON-RODAS
        </Link>
        <Link href="https://github.com/Jefferson2036-droid" target="_blank" className="hover:underline">
          GITHUB.COM/JEFFERSON2036-DROID
        </Link>
      </div>
    </footer>
  )
}