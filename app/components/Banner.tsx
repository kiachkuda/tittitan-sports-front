
export default function Banner() {
    return (

        <section className="max-w-7xl mx-auto px-6 mt-16">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-titan text-ink">
                <div className="absolute inset-0 grid-lines opacity-20"></div>
                <div className="grid md:grid-cols-2 gap-8 p-10 md:p-14 items-center relative">
                    <div>
                        <div className="chip bg-ink text-titan border-ink inline-block">🔥 LIMITED · DROPS FRIDAY 6PM</div>
                        <h2 className="display text-5xl md:text-7xl leading-[.9] mt-5">
                            BUILD YOUR<br />OWN KIT.
                        </h2>
                        <p className="mt-4 max-w-md font-medium">
                            Pick the fabric. Drop your name. Own the number. Design a one-of-one shirt in under 60 seconds — shipped in 48h.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button className="bg-ink text-white font-bold px-6 py-3 rounded-full hover:bg-white hover:text-ink transition">Start designing →</button>
                            <button className="border-2 border-ink font-bold px-6 py-3 rounded-full hover:bg-ink hover:text-white transition">Watch on TikTok</button>
                        </div>
                    </div>
                    <div className="relative h-80 md:h-96">
                        <div className="absolute top-0 left-8 w-48 h-64 bg-white rounded-2xl overflow-hidden shadow-2xl -rotate-6">
                            <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-6 right-4 w-52 h-72 bg-white rounded-2xl overflow-hidden shadow-2xl rotate-6">
                            <img src="https://images.unsplash.com/photo-1526232636376-6f6b0bc1caa5?w=500&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-ink text-white rounded-2xl px-5 py-3 text-sm font-bold shadow-xl">
                            <span className="text-titan">◆</span> 12,483 kits built this month
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}