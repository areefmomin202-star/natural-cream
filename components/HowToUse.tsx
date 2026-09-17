import { Moon, Sparkles, Droplets, CheckCircle2, ShieldAlert } from 'lucide-react';
import { HOW_TO_USE_STEPS, useProduct } from '../data/productData';

export function HowToUse() {
  const { product } = useProduct();
  const steps = product.usageSteps && product.usageSteps.length > 0 ? product.usageSteps : HOW_TO_USE_STEPS;

  return (
    <section className="py-12 bg-white border-y border-stone-200">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Moon className="w-3.5 h-3.5 text-indigo-600" />
            <span>Night-Time Restorative Ritual</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-950 tracking-tight font-sans-clean">
            Official Usage Instructions
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-serif-luxury italic text-base">
            As printed on the {product.name} jar label:
          </p>
          <div className="mt-3 inline-block bg-amber-50/80 border border-amber-300/80 rounded-xl px-4 py-2.5 text-stone-900 font-medium text-xs md:text-sm shadow-xs">
            “Use: {product.usageNotice}”
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {steps.map((step) => (
            <div
              key={step.step}
              className="bg-stone-50 rounded-2xl p-5 border border-stone-200/90 relative flex flex-col hover:border-stone-400 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-black text-stone-300 font-sans-clean">
                  {step.step}
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Important Usage Note */}
        <div className="mt-8 bg-stone-900 text-stone-100 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
            <Moon className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs md:text-sm text-stone-300">
            <h4 className="font-bold text-white text-sm md:text-base mb-0.5">
              {product.nightCareNoteTitle || 'Why use strictly before sleep?'}
            </h4>
            <p className="leading-relaxed">
              {product.nightCareNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
