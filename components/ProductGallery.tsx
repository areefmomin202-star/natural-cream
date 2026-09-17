import { useState } from 'react';
import { Maximize2, ShieldCheck, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';
import { PRODUCT_IMAGES, useProduct } from '../data/productData';

export function ProductGallery() {
  const { product } = useProduct();
  const images = product.images && product.images.length > 0 ? product.images : PRODUCT_IMAGES;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = images[activeIndex] || images[0] || PRODUCT_IMAGES[0];

  return (
    <div className="w-full">
      {/* Main Image Frame */}
      <div className="relative bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-3 md:p-6 flex flex-col items-center">
        {/* Floating promotional badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
            {product.discountPercent}% OFF
          </span>
          <span className="inline-flex items-center gap-1 bg-stone-900/90 backdrop-blur-sm text-stone-100 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-stone-700">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Special Price ₹{product.price}
          </span>
        </div>

        {/* View Zoom trigger */}
        <button
          onClick={() => setIsZoomed(true)}
          id="gallery-zoom-trigger"
          aria-label="Enlarge product image"
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 p-2 rounded-full shadow-md border border-stone-200 transition-all cursor-pointer"
          title="Click to see high-res label details"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Product Image Viewer */}
        <div 
          onClick={() => setIsZoomed(true)}
          className="w-full max-w-md aspect-square relative flex items-center justify-center cursor-zoom-in group select-none"
        >
          <img
            src={`${import.meta.env.BASE_URL}${activeImage.src.replace(/^\/+/, '')}`}
            alt={activeImage.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            loading="eager"
          />
        </div>

        {/* Image Perspective Label */}
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{activeImage.title}: <strong className="font-bold text-stone-950">{activeImage.subtitle}</strong></span>
          </div>
        </div>

        {/* Hint for mobile visitors */}
        <p className="text-[11px] text-stone-400 mt-1 text-center">
          Tap image to zoom or switch between front and back packaging below
        </p>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        {images.map((img, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              id={`thumbnail-selector-${img.id || idx}`}
              className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-50/70 border-stone-900 ring-2 ring-stone-900 shadow-sm'
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}${img.src.replace(/^\/+/, '')}`}
                  alt={img.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-stone-900 truncate">
                    {img.title || (idx === 0 ? product.name : 'Directions of Use')}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-1">
                  {img.subtitle || (idx === 0 ? product.subtitle : 'Use before going to sleep only')}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Packaging authenticity note */}
      <div className="mt-3 bg-stone-100/80 rounded-xl p-3 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          <strong className="text-stone-900 font-semibold">100% Original Jar Packaging:</strong> Glossy black container with iconic silver glitter lid, exactly as photographed. Verified genuine batch.
        </p>
      </div>

      {/* Lightbox / Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl p-4 shadow-2xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-2 border-b border-stone-200">
              <div>
                <h4 className="text-sm font-bold text-stone-900">{activeImage.title}</h4>
                <p className="text-xs text-stone-500">{activeImage.subtitle}</p>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                id="gallery-modal-close"
                className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1 rounded-full font-medium cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="w-full max-h-[70vh] flex items-center justify-center p-2">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* Switch inside zoom modal */}
            <div className="flex gap-2 mt-2">
              {PRODUCT_IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }}
                  id={`zoom-modal-tab-${img.id}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {img.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
