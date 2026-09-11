import React from 'react';
import { 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Check, 
  Lock, 
  Sparkles, 
  Minus, 
  Plus, 
  ArrowRight 
} from 'lucide-react';
import { PackOption } from '../types';
import { PACK_OPTIONS, getOrderWhatsAppUrl } from '../data/productData';

interface PremiumOrderSectionProps {
  selectedPack: PackOption;
  onSelectPack: (pack: PackOption) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export function PremiumOrderSection({
  selectedPack,
  onSelectPack,
  quantity,
  onQuantityChange,
}: PremiumOrderSectionProps) {
  // Dynamic calculations
  const totalAmount = selectedPack.price * quantity;
  const totalMrp = selectedPack.mrp * quantity;
  const totalSavings = totalMrp - totalAmount;

  // Exact requested WhatsApp pre-filled order URL
  const whatsappOrderUrl = getOrderWhatsAppUrl(selectedPack.name, quantity, totalAmount);

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <section 
      id="order-section" 
      className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-5 md:p-7 relative scroll-mt-24 transition-all"
    >
      {/* Top Header & Authentic Brand Tag */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-100">
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-semibold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Special Promotional Pricing
        </span>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          100% Original
        </span>
      </div>

      {/* Brand & Heading */}
      <div className="mt-4">
        <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
          Original Jar Packaging
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-stone-950 font-sans-clean mt-0.5 tracking-tight">
          NATURAL CREAM
        </h1>
        <p className="text-sm md:text-base font-serif-luxury italic text-stone-700 mt-1">
          “Wake up to Gorgeous Skin”
        </p>
      </div>

      {/* ========================================================
          1. PRICE & OFFER
          ======================================================== */}
      <div className="mt-5 bg-gradient-to-br from-amber-50/70 via-stone-50 to-emerald-50/50 rounded-2xl p-4 md:p-5 border border-amber-200/70 shadow-xs">
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-semibold text-stone-700">₹</span>
            <span className="text-4xl md:text-5xl font-black text-stone-950 tracking-tight font-sans-clean">
              {totalAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base text-stone-400 line-through font-medium">
                MRP ₹{totalMrp.toLocaleString('en-IN')}
              </span>
              <span className="bg-rose-600 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                60% OFF
              </span>
            </div>
            <span className="text-xs md:text-sm font-bold text-emerald-700 mt-0.5">
              Save ₹{totalSavings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-700 gap-2">
          <span className="flex items-center gap-1.5 font-medium text-stone-800">
            <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
            Inclusive of all taxes
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
            <Truck className="w-4 h-4 text-emerald-700" />
            FREE Doorstep Shipping across India
          </span>
        </div>
      </div>

      {/* ========================================================
          2. CRITICAL USAGE INSTRUCTIONS
          ======================================================== */}
      <div className="mt-4 bg-amber-50/90 border border-amber-300/80 rounded-2xl p-3.5 md:p-4 text-amber-950">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
          <span>🌙</span>
          <span>CRITICAL USAGE INSTRUCTIONS</span>
        </div>
        <p className="text-xs md:text-sm text-amber-900/90 italic mt-1.5 leading-relaxed font-serif-luxury font-medium">
          “To be used before going to sleep only, wash and dry the skin properly then apply.”
        </p>
      </div>

      {/* ========================================================
          3. CHOOSE PACK SIZE
          ======================================================== */}
      <div className="mt-6">
        <label className="block text-xs md:text-sm font-bold text-stone-900 uppercase tracking-wider mb-2.5">
          Choose Pack Size:
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PACK_OPTIONS.map((pack) => {
            const isSelected = selectedPack.id === pack.id;
            return (
              <button
                type="button"
                key={pack.id}
                onClick={() => onSelectPack(pack)}
                id={`pack-select-${pack.id}`}
                className={`relative flex flex-col justify-between p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60 text-stone-900'
                }`}
              >
                {/* Header: Pack Name & Selection Indicator */}
                <div className="flex items-center justify-between gap-1 w-full">
                  <span className={`text-sm font-bold tracking-tight ${
                    isSelected ? 'text-emerald-950' : 'text-stone-900'
                  }`}>
                    {pack.name}
                  </span>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-stone-300 bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Badge / Tag */}
                <div className="mt-1.5 mb-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full inline-block ${
                    pack.popular
                      ? isSelected 
                        ? 'bg-emerald-600 text-white shadow-xs' 
                        : 'bg-emerald-100 text-emerald-800'
                      : isSelected
                        ? 'bg-emerald-200/80 text-emerald-900 font-bold'
                        : 'bg-stone-100 text-stone-600'
                  }`}>
                    {pack.badge}
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-auto pt-1 border-t border-stone-200/60 flex items-baseline justify-between w-full">
                  <span className={`text-base font-extrabold ${
                    isSelected ? 'text-emerald-900' : 'text-stone-950'
                  }`}>
                    ₹{pack.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-400 line-through">
                    ₹{pack.mrp.toLocaleString('en-IN')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          4. QUANTITY SELECTOR
          ======================================================== */}
      <div className="mt-5 flex items-center justify-between gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
        <div>
          <span className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
            Select Quantity
          </span>
          <span className="text-[11px] text-stone-500">
            Min. 1 pack • Multiplies pack savings
          </span>
        </div>

        <div className="inline-flex items-center rounded-xl border border-stone-300 bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            id="qty-decrease-btn"
            aria-label="Decrease quantity"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-base"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span 
            id="qty-display"
            className="w-10 text-center font-extrabold text-stone-950 text-base select-none"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            id="qty-increase-btn"
            aria-label="Increase quantity"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 active:scale-95 transition-all cursor-pointer font-bold text-base"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          5. DYNAMIC TOTAL
          ======================================================== */}
      <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex items-center justify-between gap-2">
        <div>
          <span className="block text-xs text-stone-600 font-semibold">
            Total Payable Amount:
          </span>
          <span className="text-xs text-stone-500">
            {quantity === 1 
              ? `${selectedPack.name}` 
              : `${quantity} × ${selectedPack.name} (${quantity * selectedPack.quantity} Jars total)`}
          </span>
        </div>

        <div className="text-right">
          <span className="text-xl md:text-2xl font-black text-stone-950 font-sans-clean tracking-tight">
            ₹{totalAmount.toLocaleString('en-IN')}
          </span>
          <span className="block text-[11px] font-semibold text-emerald-700">
            for {quantity === 1 ? selectedPack.name : `${quantity} × ${selectedPack.name}`}
          </span>
        </div>
      </div>

      {/* ========================================================
          6. ONLINE PAYMENT ONLY
          ======================================================== */}
      <div className="mt-4 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-900 text-white text-xs">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold tracking-wide">
            🔒 Online Payment Only
          </span>
        </div>
        <span className="text-[11px] text-stone-300">
          Google Pay • PhonePe • Paytm • UPI
        </span>
      </div>

      {/* ========================================================
          7. WHATSAPP ORDER BUTTON
          ======================================================== */}
      <div className="mt-5">
        <a
          href={whatsappOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="order-whatsapp-main-btn"
          className="group relative w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa52] text-white py-4 px-6 rounded-2xl font-bold text-lg md:text-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <div className="bg-white/20 p-1.5 rounded-full group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          </div>

          <span className="tracking-wide">
            Order on WhatsApp • ₹{totalAmount.toLocaleString('en-IN')}
          </span>

          <ArrowRight className="w-5 h-5 ml-auto text-emerald-100 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* ========================================================
          8. TRUST FEATURES
          ======================================================== */}
      <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-stone-700 text-xs font-semibold">
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-stone-50 border border-stone-200/60">
          <span className="text-base mb-0.5">🚚</span>
          <span className="text-[11px]">Free Delivery</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-stone-50 border border-stone-200/60">
          <span className="text-base mb-0.5">🔒</span>
          <span className="text-[11px]">Online Payment Only</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-stone-50 border border-stone-200/60">
          <span className="text-base mb-0.5">✓</span>
          <span className="text-[11px]">Instant Reply</span>
        </div>
      </div>
    </section>
  );
}
