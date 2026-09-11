import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS, getWhatsAppOrderUrl, WHATSAPP_DISPLAY_NUMBER } from '../data/productData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-stone-50 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 bg-white border border-stone-200 px-3 py-1 rounded-full mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-950 tracking-tight font-sans-clean">
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Everything you need to know about ordering Natural Cream
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  id={`faq-toggle-${idx}`}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left font-bold text-sm md:text-base text-stone-900 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{item.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-stone-200 text-stone-900' : 'text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 md:px-5 pb-5 pt-1 text-xs md:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live WhatsApp Help Banner */}
        <div className="mt-8 bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950">
                Have a different question or need skin consultation?
              </h4>
              <p className="text-xs text-emerald-800">
                Chat directly with our support team on WhatsApp at {WHATSAPP_DISPLAY_NUMBER}
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppOrderUrl('Hello Natural Cream team, I have a question before placing my order.')}
            target="_blank"
            rel="noopener noreferrer"
            id="faq-whatsapp-support-btn"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
