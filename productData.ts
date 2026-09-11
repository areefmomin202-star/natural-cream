import { ProductImage, PackOption, FaqItem } from '../types';

export const WHATSAPP_NUMBER = '917892658110';
export const WHATSAPP_DISPLAY_NUMBER = '+91 7892658110';
export const DEFAULT_WHATSAPP_MESSAGE = 'Hello Natural Cream, I want to order Natural Cream for ₹399. Please share the order details.';

export const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 'front',
    title: 'NATURAL CREAM',
    subtitle: 'Wake up to Gorgeous Skin',
    src: '/img_jar_front.jpg',
    badge: 'Front Label',
    alt: 'NATURAL CREAM - Wake up to Gorgeous Skin (glossy black jar with silver glitter lid)'
  },
  {
    id: 'back',
    title: 'Directions of Use',
    subtitle: 'To be used before going to sleep only, wash and dry the skin properly then apply',
    src: '/img_jar_instructions.jpg',
    badge: 'Back Label',
    alt: 'NATURAL CREAM back label: Use: To be used before going to sleep only, wash and dry the skin properly then apply'
  }
];

export const PACK_OPTIONS: PackOption[] = [
  {
    id: 'pack-1',
    name: '1 Jar',
    subtitle: 'Standard 30-Day Night Regimen',
    quantity: 1,
    mrp: 999,
    price: 399,
    discountPercent: 60,
    savings: 600,
    popular: false,
    badge: 'Offer Price'
  },
  {
    id: 'pack-2',
    name: '2 Jars',
    subtitle: '60-Day Transformation Pack',
    quantity: 2,
    mrp: 1998,
    price: 798,
    discountPercent: 60,
    savings: 1200,
    popular: true,
    badge: 'Most Popular'
  },
  {
    id: 'pack-3',
    name: '3 Jars',
    subtitle: 'Complete 90-Day Skin Care Course',
    quantity: 3,
    mrp: 2997,
    price: 1197,
    discountPercent: 60,
    savings: 1800,
    popular: false,
    badge: 'Best Value'
  }
];

export function buildOrderWhatsAppMessage(packName: string, quantity: number, totalAmount: number): string {
  return `Hi 👋 Natural Cream Team,

I would like to place an order.

Product: Natural Cream
Pack: ${packName}
Quantity: ${quantity}
Total Amount: ₹${totalAmount}

Please confirm my order.`;
}

export function getOrderWhatsAppUrl(packName: string, quantity: number, totalAmount: number): string {
  const message = buildOrderWhatsAppMessage(packName, quantity, totalAmount);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PRODUCT_BENEFITS = [
  {
    id: 'glow',
    title: 'Overnight Radiance',
    description: 'Designed specifically for nocturnal cellular rejuvenation so you wake up to deeply replenished, luminous skin.'
  },
  {
    id: 'hydration',
    title: 'Intense Moisture Lock',
    description: 'Binds moisture to the deepest epidermal layers without leaving a greasy or heavy residue on your pillow.'
  },
  {
    id: 'barrier',
    title: 'Skin Barrier Repair',
    description: 'Strengthens fragile skin barriers exposed to daytime pollution, UV fatigue, and climate stress.'
  },
  {
    id: 'texture',
    title: 'Silky Smooth Texture',
    description: 'Gently softens roughness, fine lines, and uneven dry patches for an exceptionally soft touch.'
  }
];

export const HOW_TO_USE_STEPS = [
  {
    step: '01',
    title: 'Wash & Dry Skin',
    description: 'Wash face thoroughly with clean water or a gentle cleanser to remove daily dirt and oils, then gently pat completely dry.'
  },
  {
    step: '02',
    title: 'Apply Before Sleep Only',
    description: 'As printed on our official label, use strictly before going to bed. Take a small, pea-sized amount onto clean fingertips.'
  },
  {
    step: '03',
    title: 'Gentle Upward Massage',
    description: 'Dot across your cheeks, forehead, chin, and neck. Smooth gently in upward circular motions until absorbed.'
  },
  {
    step: '04',
    title: 'Wake up to Gorgeous Skin',
    description: 'Allow the restorative formulation to nourish your skin throughout the night. Rinse lightly with water in the morning.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I place an order on WhatsApp?',
    answer: 'Simply tap any "Order on WhatsApp" button on this page. It will automatically open WhatsApp with our verified number (+91 7892658110) and a pre-filled message. Our team will promptly confirm your delivery address and dispatch your order.'
  },
  {
    question: 'Why is there a special price of ₹399 instead of ₹999 MRP?',
    answer: 'We are offering a direct-to-consumer promotional discount of ₹600 OFF (60% OFF) for visitors coming through our official social media and Instagram link. No middleman margins, straight to your doorstep.'
  },
  {
    question: 'What are the official usage directions?',
    answer: 'As stated on the back label: "To be used before going to sleep only, wash and dry the skin properly then apply." A small pea-sized amount is sufficient for the entire face and neck.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We accept secure prepaid online payments via Google Pay, PhonePe, Paytm, Net Banking, and UPI directly confirmed via WhatsApp. Cash on Delivery is not available.'
  },
  {
    question: 'How many days will delivery take?',
    answer: 'Orders are dispatched within 24 hours via express courier partners. Typical delivery time is 3 to 5 business days anywhere in India.'
  },
  {
    question: 'Is this suitable for all skin types?',
    answer: 'Yes, Natural Cream is formulated to be gentle, nourishing, and balanced for oily, dry, normal, and combination skin types.'
  }
];

export function getWhatsAppOrderUrl(customText?: string): string {
  const text = customText || DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
