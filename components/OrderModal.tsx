import { useState, FormEvent } from 'react';
import { MessageCircle, X, Check, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { PackOption } from '../types';
import { getDynamicOrderWhatsAppUrl, useProduct } from '../data/productData';

interface OrderModalProps {
  pack: PackOption | null;
  onClose: () => void;
}

export function OrderModal({ pack, onClose }: OrderModalProps) {
  if (!pack) return null;

  const { product } = useProduct();
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'cod' | 'upi'>('cod');

  const packMrp = product.mrp * (pack.quantity || 1);
  const packDiscount = packMrp > 0
    ? Math.round(((packMrp - pack.price) / packMrp) * 100)
    : pack.discountPercent;

  const handleSendToWhatsApp = (e: FormEvent) => {
    e.preventDefault();

    let message = '';
    if (!customerName && !city && !address) {
      // Default message format
      message = `Hello ${product.name}, I want to order ${pack.name} for ₹${pack.price}. Please share the order details.`;
    } else {
      message = `Hello ${product.name}, I want to order ${pack.name} for ₹${pack.price}.\n\n` +
        `Customer Details:\n` +
        `• Name: ${customerName || 'Customer'}\n` +
        (city ? `• City / State: ${city}\n` : '') +
        (address ? `• Delivery Address: ${address}\n` : '') +
        `• Preferred Payment: ${paymentPreference === 'cod' ? 'Cash on Delivery (COD)' : 'UPI / Online'}\n\n` +
        `Please share order confirmation and delivery details.`;
    }

    const url = getDynamicOrderWhatsAppUrl(
      product.whatsappNumber,
      product.name,
      pack.name,
      1,
      pack.price
    );
    window.open(url, '_blank');
    onClose();
  };

  const handleInstantWhatsApp = () => {
    const url = getDynamicOrderWhatsAppUrl(
      product.whatsappNumber,
      product.name,
      pack.name,
      1,
      pack.price
    );
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            </div>
            <div>
              <h3 className="text-base font-bold">Fast WhatsApp Order</h3>
              <p className="text-xs text-stone-300">Official Line: {product.whatsappDisplayNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="order-modal-close-btn"
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Pack Summary */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
              {pack.badge || 'Selected Pack'}
            </span>
            <div className="text-sm font-extrabold text-stone-900 mt-1">
              {product.name} - {pack.name}
            </div>
            <div className="text-xs text-stone-500">
              MRP <del>₹{packMrp}</del> • {packDiscount}% OFF
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-stone-950">₹{pack.price}</div>
            <span className="text-[11px] text-emerald-700 font-bold">Free Shipping</span>
          </div>
        </div>

        {/* Option 1: Instant 1-Click WhatsApp */}
        <div className="p-5">
          <button
            type="button"
            onClick={handleInstantWhatsApp}
            id="order-modal-instant-whatsapp-btn"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa52] text-white py-3.5 px-4 rounded-xl font-bold text-base shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span>Open WhatsApp Directly (1-Tap)</span>
          </button>
          <p className="text-[11px] text-stone-500 text-center mt-1.5">
            Opens WhatsApp with pre-filled message: "Hello Natural Cream, I want to order..."
          </p>

          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-stone-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-stone-400 uppercase tracking-widest font-semibold shrink-0">
              OR Pre-fill Delivery Info
            </span>
          </div>

          {/* Form to pre-fill */}
          <form onSubmit={handleSendToWhatsApp} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Full Name (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full text-xs md:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                City / Town & Pincode (Optional)
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai 400001"
                className="w-full text-xs md:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Complete Delivery Address (Optional)
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="Flat / House No., Landmark..."
                className="w-full text-xs md:text-sm px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Payment Method:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentPreference('cod')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    paymentPreference === 'cod'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  💵 Cash on Delivery (COD)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentPreference('upi')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    paymentPreference === 'upi'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  ⚡ UPI / GPay / PhonePe
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="order-modal-submit-with-details-btn"
              className="w-full mt-2 flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Send Details to WhatsApp (+91 7892658110)</span>
            </button>
          </form>
        </div>

        {/* Security badge */}
        <div className="bg-stone-50 px-5 py-3 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-center gap-1.5 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Your information is sent securely only to our official WhatsApp chat.</span>
        </div>
      </div>
    </div>
  );
}
