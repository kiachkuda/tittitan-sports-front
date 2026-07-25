export default function ProductDetail() {
    return (
        <section className="max-w-7xl mx-auto px-6 mt-28">
  <div className="bg-ink text-white rounded-[2rem] p-10 md:p-16 relative overflow-hidden">
    <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-titan blur-3xl opacity-40"></div>
    <div className="relative grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="display text-4xl md:text-5xl">Get drops before<br/><span className="text-titan">everyone else.</span></h2>
        <p className="mt-3 text-white/60 max-w-md">Early access to limited kits, boot restocks, and 10% off your first order. No spam. Ever.</p>
      </div>
      <form className="flex flex-col sm:flex-row gap-2">
        <input className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-sm placeholder:text-white/40 focus:outline-none focus:border-titan" placeholder="you@team.com"/>
        <button className="btn-primary px-6 py-4">Join the squad →</button>
      </form>
    </div>
  </div>
</section>
    )
}