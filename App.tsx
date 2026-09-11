import { useState } from 'react';
import { Header } from './components/Header';
import { ProductGallery } from './components/ProductGallery';
import { PremiumOrderSection } from './components/PremiumOrderSection';
import { HowToUse } from './components/HowToUse';
import { Benefits } from './components/Benefits';
import { FaqSection } from './components/FaqSection';
import { StickyBottomBar } from './components/StickyBottomBar';
import { ShareModal } from './components/ShareModal';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { PackOption } from './types';
import { PACK_OPTIONS, getOrderWhatsAppUrl } from './data/productData';
import { MessageCircle, Sparkles, Share2 } from 'lucide-react';

export default function App() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<PackOption>(PACK_OPTIONS[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const totalAmount = selectedPack.price * quantity;
  const bottomWhatsappUrl = getOrderWhatsAppUrl(selectedPack.name, quantity, totalAmount);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-stone-900 selection:bg-amber-200 selection:text-stone-900">
      {/* Top Header */}
      <Header onOpenShare={() => setIsShareModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-0">
        {/* Product Showcase Section */}
        <section className="max-w-6xl mx-auto px-4 pt-4 pb-10 md:pt-8 md:pb-14">
          {/* Breadcrumb & Live Stock Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
            <div className="flex items-center gap-1.5 text-stone-500">
              <span>Home</span>
              <span>/</span>
              <span>Skincare</span>
              <span>/</span>
              <span className="text-stone-900 font-semibold">Natural Cream</span>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>High Demand: 18 customers viewing right now</span>
            </div>
          </div>

          {/* 2-Column Responsive Grid: Image Gallery + Professional Order Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Gallery (First Image as Main, Second Image as Back/Instructions) */}
            <div className="lg:col-span-6 w-full">
              <ProductGallery />
            </div>

            {/* Professional Premium Order Section */}
            <div className="lg:col-span-6 w-full">
              <PremiumOrderSection
                selectedPack={selectedPack}
                onSelectPack={setSelectedPack}
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </div>
          </div>
        </section>

        {/* Quick Trust Bar */}
        <section className="bg-stone-900 text-stone-200 py-6 border-y border-stone-800">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-black text-amber-300 font-sans-clean">
                ₹399
              </span>
              <span className="text-xs text-stone-300 mt-0.5">Special Selling Price</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-black text-rose-400 font-sans-clean">
                60% OFF
              </span>
              <span className="text-xs text-stone-300 mt-0.5">Flat ₹600 Savings</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-black text-emerald-400 font-sans-clean">
                100% Original
              </span>
              <span className="text-xs text-stone-300 mt-0.5">Direct Brand Dispatch</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-black text-white font-sans-clean">
                WhatsApp
              </span>
              <span className="text-xs text-stone-300 mt-0.5">Direct 1-Tap Ordering</span>
            </div>
          </div>
        </section>

        {/* Official Directions of Use (based on packaging back label) */}
        <HowToUse />

        {/* Formula Benefits */}
        <Benefits />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Bottom Conversion CTA Strip */}
        <section className="py-12 bg-gradient-to-br from-emerald-900 via-stone-900 to-stone-950 text-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Wake Up to Gorgeous Skin</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-sans-clean tracking-tight">
              Ready to Order Natural Cream?
            </h2>
            <p className="text-xs md:text-sm text-stone-300 mt-2">
              Grab your jar at the exclusive price of <strong className="text-amber-300">₹399</strong> (MRP ₹999 - Save ₹600). Direct doorstep delivery with secure online payment.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={bottomWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="bottom-strip-order-whatsapp-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 rounded-2xl font-bold text-base shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Order on WhatsApp • ₹{totalAmount.toLocaleString('en-IN')}</span>
              </a>

              <button
                onClick={() => setIsShareModalOpen(true)}
                id="bottom-strip-share-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 py-3.5 px-5 rounded-2xl font-semibold text-sm border border-stone-700 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Instagram Bio Link</span>
              </button>
            </div>
          </div>
        </section>

        {/* Instagram Follow Section */}
        <InstagramSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Order Bar for Mobile Devices */}
      <StickyBottomBar selectedPack={selectedPack} quantity={quantity} />

      {/* Share / Instagram Bio Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}

