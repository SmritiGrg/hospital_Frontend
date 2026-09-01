export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-[80] mix-blend-difference">
      <div className="flex items-center justify-between px-[5vw] py-5">
        <a href="#top" className="mono text-paper">
          CITY HEALTH HOSPITAL
        </a>
        <nav aria-label="Primary" className="hidden gap-8 md:flex">
          {["DEPARTMENTS", "SPECIALISTS", "RATES", "FAQ"].map((l) => (
            <a
              key={l}
              href="#appointments"
              className="mono text-paper/80 transition-colors hover:text-paper"
            >
              {l}
            </a>
          ))}
        </nav>
        <a href="#appointments" className="mono text-paper">
          BOOK →
        </a>
      </div>
    </header>
  );
}
