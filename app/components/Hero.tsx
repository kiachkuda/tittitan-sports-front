
export default function Hero() {
    return (
        <section className="relative bg-ink text-white overflow-hidden under-hero">
  <div className="absolute inset-0 noise opacity-40"></div>
  <div className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full bg-titan blur-3xl opacity-30"></div>
  <div className="max-w-7xl mx-auto px-6 pt-16 pb-32 grid lg:grid-cols-12 gap-10 items-center relative">
    <div className="lg:col-span-7">
      <div className="inline-flex items-center gap-2 chip border-titan text-titan mb-6">
        <span className="w-2 h-2 rounded-full bg-titan animate-pulse"></span>
        DROP 04 · SEASON 26/27
      </div>
      <h1 className="display text-6xl md:text-8xl leading-[.85]">
        WEAR THE<br/>
        <span className="text-titan">GAME.</span><br/>
        NOT JUST<br/>
        A SHIRT.
      </h1>
      <p className="mt-6 text-white/70 max-w-md text-lg">
        Match-grade jerseys, boots, and gear built for the culture. Curated for the players who don't just watch.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#grid" className="btn-primary px-7 py-4 inline-flex items-center gap-2">
          Shop the drop
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        <a href="#" className="px-7 py-4 rounded-full border border-white/25 font-semibold hover:bg-white hover:text-ink transition">Customise your kit →</a>
      </div>
      <div className="mt-12 flex items-center gap-8 text-sm text-white/50">
        <div><div className="display text-3xl text-white">120+</div>clubs & nations</div>
        <div className="w-px h-10 bg-white/15"></div>
        <div><div className="display text-3xl text-white">48h</div>name & number print</div>
        <div className="w-px h-10 bg-white/15"></div>
        <div><div className="display text-3xl text-white">4.9★</div>from 12k players</div>
      </div>
    </div>

    
    <div className="lg:col-span-5 relative">
      <div className="absolute -top-6 -left-6 chip bg-titan text-white border-titan z-10">NEW · CANADA HOME 26/27</div>
      <div className="relative bg-gradient-to-br from-titan to-titan-dark rounded-[2rem] p-8 shadow-2xl">
        <img src="https://images.unsplash.com/photo-1580087433295-ab2600c1030e?w=800&auto=format&fit=crop" alt="Featured jersey" className="w-full h-96 object-cover rounded-2xl"/>
        <div className="absolute bottom-8 left-8 right-8 bg-white rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-ink/60 font-semibold">DAVIES · #19</div>
            <div className="display text-lg">Canada Home Jersey</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-ink/60 line-through">CHF 95</div>
            <div className="display text-xl text-titan">CHF 85</div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white text-ink grid place-items-center display text-xs text-center rotate-12 shadow-xl">
        FREE<br/>PRINT<br/>THIS WEEK
      </div>
    </div>
  </div>
</section>
    )
}
