import { MessageCircle } from 'lucide-react';
import { PackOption } from '../types';
import { getOrderWhatsAppUrl } from '../data/productData';

interface StickyBottomBarProps {
  selectedPack: PackOption;
  quantity: number;
}

export function StickyBottomBar({ selectedPack, quantity }: StickyBottomBarProps) {
  const totalAmount = selectedPack.price * quantity;
  const totalMrp = selectedPack.mrp * quantity;
  const totalSavings = totalMrp - totalAmount;
  const whatsappUrl = getOrderWhatsAppUrl(selectedPack.name, quantity, totalAmount);

  return (
    <aside 
      aria-label="Mobile order sticky bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl p-2.5 sm:p-3 md:hidden"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left Side: Pricing & Savings Display */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-stone-950 font-sans-clean leading-none">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-stone-400 line-through">
              MRP ₹{totalMrp.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="mt-0.5">
            <span className="text-[11px] font-bold text-emerald-700 leading-tight block truncate">
              Save ₹{totalSavings.toLocaleString('en-IN')} (60% OFF)
            </span>
          </div>
        </div>

        {/* Right Side: WhatsApp Order Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-sticky-whatsapp-btn"
          className="flex-1 max-w-[200px] flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa52] text-white py-2.5 px-3 rounded-xl font-bold text-sm shadow-md shadow-emerald-600/30 transition-all cursor-pointer select-none"
        >
          <div className="relative shrink-0">
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping"></span>
          </div>
          <span className="whitespace-nowrap">Order on WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
