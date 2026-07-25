export default function ProductDetail() {
    return (
    
<section id="product" className="max-w-7xl mx-auto px-6 mt-28">
  <div className="text-xs tracking-[.25em] text-titan font-bold mb-2">/ QUICK VIEW</div>
  <h2 className="display text-4xl mb-8">On the shelf right now.</h2>
  <div className="bg-white rounded-[2rem] p-6 md:p-10 grid lg:grid-cols-2 gap-10">
    
    <div className="flex gap-4">
      <div className="flex flex-col gap-3 w-20 shrink-0">
        <div className="aspect-square rounded-xl overflow-hidden border-2 border-titan"><img src="https://images.unsplash.com/photo-1580087433295-ab2600c1030e?w=200&auto=format&fit=crop" className="w-full h-full object-cover"/></div>
        <div className="aspect-square rounded-xl overflow-hidden border border-ink/10"><img src="https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=200&auto=format&fit=crop" className="w-full h-full object-cover"/></div>
        <div className="aspect-square rounded-xl overflow-hidden border border-ink/10"><img src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=200&auto=format&fit=crop" className="w-full h-full object-cover"/></div>
      </div>
      <div className="flex-1 bg-smoke rounded-2xl relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1580087433295-ab2600c1030e?w=900&auto=format&fit=crop" className="w-full h-full object-cover"/>
        <div className="absolute top-4 left-4 chip bg-titan text-white border-titan">NEW DROP</div>
        <button className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white shadow grid place-items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>
        </button>
      </div>
    </div>

    <div>
      <div className="text-xs tracking-widest text-ink/50 font-bold">TITAN · JERSEYS · 26/27</div>
      <h3 className="display text-4xl md:text-5xl leading-none mt-3">Alphonso Davies<br/>Canada Home Jersey</h3>
      <div className="mt-4 flex items-center gap-4">
        <span className="display text-3xl text-titan">CHF 85.00</span>
        <span className="text-ink/50 line-through">CHF 95.00</span>
        <span className="chip bg-lime-100 border-lime-600 text-lime-800 text-[10px]">✓ IN STOCK</span>
      </div>
      <p className="mt-4 text-ink/70 text-sm max-w-md">Lightweight match-fabric with DryTouch weave. Officially licensed. Includes optional 48h name & number printing.</p>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold">Size</span>
          <a href="#" className="text-xs underline text-ink/60">📏 Size Charts</a>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="size-pill">S</div>
          <div className="size-pill active">M</div>
          <div className="size-pill">L</div>
          <div className="size-pill">XL</div>
          <div className="size-pill opacity-40 line-through">2XL</div>
        </div>
      </div>

      <div className="mt-6">
        <span className="text-sm font-bold">Print your name (optional)</span>
        <div className="mt-2 flex gap-2">
          <input className="flex-1 border border-ink/15 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-titan" placeholder="e.g. DAVIES"/>
          <input className="w-20 border border-ink/15 rounded-full px-4 py-3 text-sm text-center focus:outline-none focus:border-titan" placeholder="19"/>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <div className="flex items-center border border-ink/15 rounded-full">
          <button className="w-11 h-11 grid place-items-center">−</button>
          <span className="w-8 text-center font-bold">1</span>
          <button className="w-11 h-11 grid place-items-center">+</button>
        </div>
        <button className="flex-1 btn-primary py-4 flex items-center justify-between px-6">
          <span>Add to cart</span>
          <span>CHF 85.00</span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 text-[11px] font-semibold text-ink/70">
        <div className="flex items-center gap-2 bg-smoke rounded-xl p-3"><span className="text-titan text-base">↺</span>30-day returns</div>
        <div className="flex items-center gap-2 bg-smoke rounded-xl p-3"><span className="text-titan text-base">✈</span>Ships in 48h</div>
        <div className="flex items-center gap-2 bg-smoke rounded-xl p-3"><span className="text-titan text-base">✓</span>100% authentic</div>
      </div>
    </div>
  </div>
</section>
    )
}