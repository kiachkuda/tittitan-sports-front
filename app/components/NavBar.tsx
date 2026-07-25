export default function Nav() {
    return (
        <header className="sticky top-0 z-50 bg-smoke/85 backdrop-blur border-b border-ink/10">
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-8">
    <a href="#" className="flex items-center gap-2 shrink-0">
      <img src="/titan-logo.jpg" alt="TitanSports" className="h-11 w-11 rounded-lg object-cover"/>
      <div className="leading-none">
        <div className="display text-lg">TITAN<span className="text-titan">SPORTS</span></div>
        <div className="text-[10px] tracking-[.25em] text-ink/60 mt-1">YOUR SPORTS SHOP</div>
      </div>
    </a>
    <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
      <a href="#" className="px-4 py-2 rounded-full hover:bg-ink hover:text-white transition">Jerseys</a>
      <a href="#" className="px-4 py-2 rounded-full hover:bg-ink hover:text-white transition">National Teams</a>
      <a href="#" className="px-4 py-2 rounded-full hover:bg-ink hover:text-white transition">Clubs</a>
      <a href="#" className="px-4 py-2 rounded-full hover:bg-ink hover:text-white transition">Boots</a>
      <a href="#" className="px-4 py-2 rounded-full hover:bg-ink hover:text-white transition">Accessories</a>
      <a href="#" className="px-4 py-2 rounded-full bg-titan text-white">Sale</a>
    </nav>
    <div className="ml-auto flex items-center gap-2">
      <button className="hidden md:flex items-center gap-2 bg-white border border-ink/15 rounded-full px-4 py-2 text-sm text-ink/60 w-56 hover:border-ink transition">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        Search kits, players…
      </button>
      <button className="w-10 h-10 grid place-items-center rounded-full hover:bg-ink hover:text-white transition">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <button className="relative flex items-center gap-2 bg-ink text-white rounded-full pl-3 pr-4 py-2 text-sm font-semibold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        Bag · 2
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-titan border-2 border-smoke"></span>
      </button>
    </div>
  </div>
</header>
    )
}