import { useState } from 'react';
import { Copy, Check, Share2, X, Instagram, MessageCircle, Link2, ExternalLink } from 'lucide-react';
import { useProduct } from '../data/productData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  if (!isOpen) return null;

  const { product } = useProduct();
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} - ${product.subtitle} (₹${product.price} Special Offer)`,
          text: `Get ${product.discountPercent}% OFF ${product.name} night skincare for just ₹${product.price} (MRP ₹${product.mrp}). Direct WhatsApp order!`,
          url: currentUrl
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const shareToWhatsApp = () => {
    const text = `Hey! Check out ${product.name} - ${product.subtitle}! It's on a ${product.discountPercent}% OFF discount for ₹${product.price} (MRP ₹${product.mrp}): ${currentUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Top */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">Share / Instagram Bio Link</h3>
          </div>
          <button
            onClick={onClose}
            id="share-modal-close-btn"
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-stone-600">
            Use this official store link directly in your <strong className="text-stone-900">Instagram Bio</strong>, WhatsApp status, or stories.
          </p>

          {/* Copyable Link Input */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-100 border border-stone-300">
            <Link2 className="w-4 h-4 text-stone-500 ml-1 shrink-0" />
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-xs text-stone-800 font-mono flex-1 outline-none truncate"
            />
            <button
              onClick={handleCopy}
              id="share-modal-copy-btn"
              className="flex items-center gap-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={shareToWhatsApp}
              id="share-modal-whatsapp-btn"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share to WhatsApp</span>
            </button>

            <button
              onClick={handleNativeShare}
              id="share-modal-native-btn"
              className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>More Options</span>
            </button>
          </div>

          {/* Instagram Bio Guide */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 rounded-2xl p-3.5 border border-pink-200/70 text-xs text-stone-800">
            <div className="flex items-center gap-1.5 font-bold text-pink-900 mb-1">
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>How to add to Instagram Bio:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600 pl-1">
              <li>Tap <strong className="text-stone-800">Copy Link</strong> above</li>
              <li>Open Instagram & go to your profile</li>
              <li>Tap <strong className="text-stone-800">Edit Profile &gt; Links &gt; Add External Link</strong></li>
              <li>Paste URL & title it: <strong className="text-stone-800">Order Natural Cream ₹399</strong></li>
            </ol>
          </div>

          {/* Direct Profile Link */}
          <div className="pt-1 text-center">
            <a
              href="https://www.instagram.com/naturalcream1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-700 hover:text-pink-800 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>Follow @naturalcream1 on Instagram</span>
              <ExternalLink className="w-3 h-3 text-pink-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
