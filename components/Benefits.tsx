import { Sparkles, HeartHandshake, ShieldCheck, Feather, Award, Leaf, Zap } from 'lucide-react';
import { PRODUCT_BENEFITS, useProduct } from '../data/productData';

export function Benefits() {
  const { product } = useProduct();
  const benefits = product.benefits && product.benefits.length > 0 ? product.benefits : PRODUCT_BENEFITS;

  return (
    <section className="py-12 bg-[#fcfbf9]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
            Proven Night Nutrition
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-950 tracking-tight font-sans-clean mt-3">
            Why Thousands Choose {product.name}
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-serif-luxury italic text-base">
            Crafted to reveal youthful, supple, and radiant skin with every morning awakening.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0 font-bold">
                0{i + 1}
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Standards Banner */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-3.5 border border-stone-200 text-center flex flex-col items-center gap-1.5">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-stone-900">100% Genuine</span>
            <span className="text-[11px] text-stone-500">Official Brand Jar</span>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-stone-200 text-center flex flex-col items-center gap-1.5">
            <Feather className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-bold text-stone-900">Lightweight</span>
            <span className="text-[11px] text-stone-500">Non-Greasy Touch</span>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-stone-200 text-center flex flex-col items-center gap-1.5">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-stone-900">Safe Ingredients</span>
            <span className="text-[11px] text-stone-500">No Harsh Bleaches</span>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-stone-200 text-center flex flex-col items-center gap-1.5">
            <HeartHandshake className="w-5 h-5 text-rose-600" />
            <span className="text-xs font-bold text-stone-900">All Skin Types</span>
            <span className="text-[11px] text-stone-500">Dermatologist Safe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
