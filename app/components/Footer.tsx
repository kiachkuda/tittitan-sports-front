

export default function Footer() {
    return (
       
<footer className="mt-24 bg-ink text-white">
  <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
    <div>
      <div className="flex items-center gap-2">
        <img src="/titan-logo.jpg" className="h-10 w-10 rounded-lg"/>
        <div className="display text-lg">TITAN<span className="text-titan">SPORTS</span></div>
      </div>
      <p className="mt-4 text-sm text-white/60 max-w-xs">Match-grade jerseys and gear for players who wear the game.</p>
      <div className="mt-4 flex gap-2">
        <a href="#" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-titan hover:border-titan transition">IG</a>
        <a href="#" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-titan hover:border-titan transition">TT</a>
        <a href="#" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-titan hover:border-titan transition">X</a>
        <a href="#" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-titan hover:border-titan transition">YT</a>
      </div>
    </div>
    <div>
      <div className="text-xs tracking-widest text-white/40 mb-4">SHOP</div>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-titan">Jerseys</a></li>
        <li><a href="#" className="hover:text-titan">Boots</a></li>
        <li><a href="#" className="hover:text-titan">Accessories</a></li>
        <li><a href="#" className="hover:text-titan">Custom Kits</a></li>
      </ul>
    </div>
    <div>
      <div className="text-xs tracking-widest text-white/40 mb-4">HELP</div>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-titan">Shipping</a></li>
        <li><a href="#" className="hover:text-titan">Returns</a></li>
        <li><a href="#" className="hover:text-titan">Size guide</a></li>
        <li><a href="#" className="hover:text-titan">Contact</a></li>
      </ul>
    </div>
    <div>
      <div className="text-xs tracking-widest text-white/40 mb-4">COMPANY</div>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-titan">About</a></li>
        <li><a href="#" className="hover:text-titan">Stores</a></li>
        <li><a href="#" className="hover:text-titan">Careers</a></li>
        <li><a href="#" className="hover:text-titan">Press</a></li>
      </ul>
    </div>
  </div>
  <div className="border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap gap-4 justify-between text-xs text-white/40">
      <div>© 2026 TitanSports. Your Sports Shop.</div>
      <div className="flex gap-6"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div>
    </div>
  </div>
</footer>
    )
}