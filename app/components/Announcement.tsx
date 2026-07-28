const announcements = [
  "🚚 Free shipping on orders over KSh 10,000",
  "⚽ New 2026/27 Jerseys Available",
  "👕 Free Name & Number Printing",
  "✅ 100% Authentic Sportswear",
];

export default function Announcement() {
  return (
    <div className="bg-black text-white">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="flex w-max animate-marquee items-center gap-8 py-2 text-xs font-medium uppercase tracking-widest">
          {[...announcements, ...announcements].map((text, index) => (
            <div key={index} className="flex items-center gap-8">
              <span>{text}</span>
              <span className="text-red-600">●</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}