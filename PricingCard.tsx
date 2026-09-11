import { useState } from 'react';
import { 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Sparkles, 
  Check, 
  Zap, 
  CreditCard,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { PACK_OPTIONS, getWhatsAppOrderUrl, WHATSAPP_DISPLAY_NUMBER } from '../data/productData';
import { PackOption } from '../types';

interface PricingCardProps {
  onOpenOrderModal: (pack: PackOption) => void;
}

export function PricingCard({ onOpenOrderModal }: PricingCardProps) {
  const [selectedPack, setSelectedPack] = useState<PackOption>(PACK_OPTIONS[0]);

  // Construct WhatsApp URL with exact message requested
  const getPackWhatsAppUrl = (pack: PackOption) => {
    if (pack.quantity === 1) {
      return getWhatsAppOrderUrl('Hello Natural Cream, I want to order Natural Cream for ₹399. Please share the order details.');
    }
    return getWhatsAppOrderUrl(`Hello Natural Cream, I want to order ${pack.name} for ₹${pack.price} (Save ₹${pack.savings}). Please share the order details.`);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-5 md:p-7 relative">
      {/* Top Tag & Rating */}
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

      {/* Price Showcase Block */}
      <div className="mt-5 bg-gradient-to-br from-amber-50/70 via-stone-50 to-emerald-50/50 rounded-2xl p-4 border border-amber-200/70">
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-semibold text-stone-700">₹</span>
            <span className="text-4xl md:text-5xl font-black text-stone-950 tracking-tight">
              {selectedPack.price}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-400 line-through">
                MRP ₹{selectedPack.mrp}
              </span>
              <span className="bg-rose-600 text-white font-bold text-xs px-2 py-0.5 rounded-full shadow-xs">
                {selectedPack.discountPercent}% OFF
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-700">
              You Save ₹{selectedPack.savings} Today
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
            Inclusive of all taxes
          </span>
          <span className="flex items-center gap-1 font-medium text-emerald-800">
            <Truck className="w-3.5 h-3.5" />
            Free Delivery Across India
          </span>
        </div>
      </div>

      {/* Pack Selection Options */}
      <div className="mt-5">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
          Select Quantity / Savings Pack:
        </label>
        <div className="grid grid-cols-1 gap-2.5">
          {PACK_OPTIONS.map((pack) => {
            const isSelected = selectedPack.id === pack.id;
            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(pack)}
                id={`pack-option-${pack.id}`}
                className={`relative flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-stone-950 bg-stone-900 text-white shadow-md ring-1 ring-stone-950'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 text-stone-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-500 text-white'
                        : 'border-stone-300 bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold tracking-tight">
                        {pack.name}
                      </span>
                      {pack.popular && (
                        <span className="bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      )}
                      {pack.badge && !pack.popular && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-stone-700 text-amber-200'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {pack.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs ${
                        isSelected ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {pack.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold">₹{pack.price}</div>
                  <div
                    className={`text-[11px] line-through ${
                      isSelected ? 'text-stone-400' : 'text-stone-400'
                    }`}
                  >
                    MRP ₹{pack.mrp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prominent Green "Order on WhatsApp" Button */}
      <div className="mt-6 flex flex-col gap-2.5">
        <a
          href={getPackWhatsAppUrl(selectedPack)}
          target="_blank"
          rel="noopener noreferrer"
          id="pricing-order-whatsapp-btn"
          className="group relative w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa52] text-white py-4 px-6 rounded-2xl font-bold text-lg md:text-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {/* Animated WhatsApp icon */}
          <div className="bg-white/20 p-1.5 rounded-full group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="tracking-wide">Order on WhatsApp</span>
            <span className="text-xs font-normal text-emerald-50">
              Instant Confirmation • {selectedPack.name} at ₹{selectedPack.price}
            </span>
          </div>
          <ArrowRight className="w-5 h-5 ml-auto text-emerald-100 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Secondary: Fill address first option */}
        <button
          onClick={() => onOpenOrderModal(selectedPack)}
          id="pricing-add-address-btn"
          className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:border-stone-400 hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Need to add delivery address details first?</span>
          <span className="text-emerald-700 font-bold underline">Fill Details</span>
        </button>
      </div>

      {/* Urgency & Security Info */}
      <div className="mt-5 p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-stone-700">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Festive Flash Deal:</strong> Price valid for today's orders only.
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Official WhatsApp Number:</strong> {WHATSAPP_DISPLAY_NUMBER}
          </span>
        </div>
      </div>

      {/* Trust Badges Grid */}
      <div className="mt-5 grid grid-cols-3 gap-2 text-center pt-4 border-t border-stone-100">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Truck className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold text-stone-800">Fast Shipping</span>
          <span className="text-[10px] text-stone-500">Pan-India 3-5 days</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
            <CreditCard className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold text-stone-800">COD / UPI</span>
          <span className="text-[10px] text-stone-500">Pay on delivery or UPI</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold text-stone-800">100% Original</span>
          <span className="text-[10px] text-stone-500">Genuine sealed jar</span>
        </div>
      </div>
    </div>
  );
}
