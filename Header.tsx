import { useState } from 'react';
import { MessageCircle, Share2, ShieldCheck, Sparkles, Instagram } from 'lucide-react';
import { getWhatsAppOrderUrl, WHATSAPP_DISPLAY_NUMBER } from '../data/productData';

interface HeaderProps {
  onOpenShare: () => void;
}

export function Header({ onOpenShare }: HeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleQuickCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      onOpenShare();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white text-xs md:text-sm py-1.5 px-3 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse shrink-0" />
        <span>
          <strong className="font-semibold text-amber-200">SPECIAL OFFER:</strong> ₹600 OFF (60% OFF) • Only <strong className="underline decoration-amber-300 font-bold">₹399</strong> Today!
        </span>
        <span className="hidden sm:inline text-emerald-200 text-xs">| Free Express Shipping</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <a href="#" className="group flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase font-sans-clean text-stone-50 group-hover:text-amber-200 transition-colors">
              NATURAL CREAM
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-serif-luxury italic -mt-0.5">
            Wake up to Gorgeous Skin
          </span>
        </a>

        {/* Right action buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Trust indicator - hidden on tiny screens */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900 border border-stone-800 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Authentic Brand</span>
          </div>

          {/* Instagram direct channel */}
          <a
            href="https://www.instagram.com/naturalcream1/"
            target="_blank"
            rel="noopener noreferrer"
            id="header-instagram-btn"
            className="flex items-center gap-1.5 text-xs text-pink-300 hover:text-white bg-pink-950/40 hover:bg-pink-900/60 border border-pink-500/30 px-2.5 py-1.5 rounded-full transition-all"
            title="Follow us on Instagram @naturalcream1"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline font-medium">@naturalcream1</span>
          </a>

          {/* Share button for Instagram bio */}
          <button
            onClick={onOpenShare}
            id="header-share-button"
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-stone-900/90 hover:bg-stone-800 border border-stone-800 px-3 py-1.5 rounded-full transition-all cursor-pointer"
            title="Share Website Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Quick WhatsApp / Order Section anchor */}
          <a
            href="#order-section"
            id="header-whatsapp-cta"
            className="flex items-center gap-1.5 text-xs md:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full shadow-sm hover:shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Order ₹399</span>
          </a>
        </div>
      </div>
    </header>
  );
}
