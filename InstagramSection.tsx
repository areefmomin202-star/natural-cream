import { Instagram, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export function InstagramSection() {
  const instagramUrl = 'https://www.instagram.com/naturalcream1/';

  return (
    <section 
      id="instagram-section"
      className="py-12 md:py-16 bg-gradient-to-b from-[#fcfbf9] via-stone-100/70 to-[#fcfbf9] border-t border-stone-200/80"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 md:p-10 relative overflow-hidden text-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-100/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="relative z-10 max-w-xl mx-auto">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Connect on Social Media</span>
            </div>

            {/* Main Prompt Line */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-sans-clean tracking-tight flex items-center justify-center gap-2 flex-wrap">
              <span>📸</span>
              <span>Follow us on Instagram</span>
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Stay updated with daily skincare tips, authentic before & after stories, and exclusive community announcements.
            </p>

            {/* Clickable Username Card */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="instagram-handle-btn"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:via-pink-500 hover:to-amber-500 text-white font-bold text-base sm:text-lg px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg hover:shadow-pink-600/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="bg-white/20 p-1.5 rounded-xl group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <span className="tracking-wide">@naturalcream1</span>
                <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Direct Link text as well */}
            <div className="mt-3">
              <span className="text-xs text-stone-500">
                Official Handle:{' '}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-pink-700 hover:text-pink-800 underline underline-offset-4 decoration-pink-300 hover:decoration-pink-500 transition-colors"
                >
                  @naturalcream1
                </a>
              </span>
            </div>

            {/* Community Highlights */}
            <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-3 gap-2 text-stone-600 text-[11px] sm:text-xs">
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-stone-800">Skincare Tips</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-stone-800">Real Results</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-stone-800">Direct Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
