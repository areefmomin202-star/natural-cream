import { MessageCircle, ShieldCheck, Sparkles, Instagram, ExternalLink } from 'lucide-react';
import { getWhatsAppOrderUrl, WHATSAPP_DISPLAY_NUMBER } from '../data/productData';

export function Footer() {
  const instagramUrl = 'https://www.instagram.com/naturalcream1/';

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-24 md:pb-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="text-xl font-black tracking-[0.2em] text-white uppercase font-sans-clean">
              NATURAL CREAM
            </div>
            <p className="text-xs font-serif-luxury italic text-stone-400">
              "Wake up to Gorgeous Skin"
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Premium overnight restorative night cream engineered for intense nourishment and cellular hydration.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Original Sealed Packaging</span>
            </div>
          </div>

          {/* Pricing & Offer */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Limited Promotional Offer
            </h4>
            <div className="bg-stone-900/90 rounded-xl p-3.5 border border-stone-800">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">₹399</span>
                <span className="text-xs text-stone-500 line-through">MRP ₹999</span>
                <span className="text-xs font-bold text-rose-400">60% OFF</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Save ₹600 on your order. Free doorstep shipping across India.
              </p>
            </div>
          </div>

          {/* Instagram Channel */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span>📸</span>
              <span>Follow us on Instagram</span>
            </h4>
            <p className="text-xs text-stone-400">
              Daily skincare regimens, customer results, and exclusive offers:
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-instagram-btn"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:via-pink-500 hover:to-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>@naturalcream1</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80" />
            </a>
          </div>

          {/* WhatsApp Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Official WhatsApp Desk
            </h4>
            <p className="text-xs text-stone-400">
              Direct inquiries, address verification, and parcel tracking:
            </p>
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Chat on {WHATSAPP_DISPLAY_NUMBER}</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Natural Cream Skincare. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-stone-400 hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@naturalcream1</span>
            </a>
            <span>•</span>
            <div className="flex items-center gap-1 text-[11px]">
              <span>Crafted for Gorgeous, Radiant Skin</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
