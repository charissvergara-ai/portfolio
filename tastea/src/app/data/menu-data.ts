import { MenuItem } from '../models/menu.model';

export const MENU_ITEMS: MenuItem[] = [
  // === TEAS ===
  {
    id: 'tea-matcha-latte',
    name: 'Classic Matcha Latte',
    description: 'Ceremonial-grade matcha whisked to perfection with steamed milk. Smooth, earthy, and naturally energizing.',
    price: 5.75,
    category: 'tea',
    subcategory: 'green',
    image: '🍵',
    featured: true,
    tags: ['popular']
  },
  {
    id: 'tea-jasmine-dragon',
    name: 'Jasmine Dragon Pearl',
    description: 'Hand-rolled green tea pearls that unfurl in hot water, releasing a delicate jasmine fragrance.',
    price: 4.50,
    category: 'tea',
    subcategory: 'green',
    image: '🍵',
    featured: false,
    tags: []
  },
  {
    id: 'tea-sencha',
    name: 'Sencha Supreme',
    description: 'Premium Japanese green tea with a bright, grassy flavor and refreshing finish.',
    price: 4.25,
    category: 'tea',
    subcategory: 'green',
    image: '🍵',
    featured: false,
    tags: []
  },
  {
    id: 'tea-english-breakfast',
    name: 'English Breakfast',
    description: 'A robust and full-bodied black tea blend, perfect with a splash of milk and honey.',
    price: 3.75,
    category: 'tea',
    subcategory: 'black',
    image: '☕',
    featured: false,
    tags: []
  },
  {
    id: 'tea-earl-grey-lavender',
    name: 'Earl Grey Lavender',
    description: 'Classic bergamot-infused black tea enhanced with French lavender buds for a floral twist.',
    price: 4.50,
    category: 'tea',
    subcategory: 'black',
    image: '☕',
    featured: true,
    tags: ['popular']
  },
  {
    id: 'tea-golden-yunnan',
    name: 'Golden Yunnan',
    description: 'A smooth Chinese black tea with malty sweetness and hints of cocoa and honey.',
    price: 4.25,
    category: 'tea',
    subcategory: 'black',
    image: '☕',
    featured: false,
    tags: []
  },
  {
    id: 'tea-chamomile-honey',
    name: 'Chamomile Honey',
    description: 'Soothing Egyptian chamomile blossoms steeped with a touch of raw honey. Perfect for winding down.',
    price: 4.00,
    category: 'tea',
    subcategory: 'herbal',
    image: '🌼',
    featured: false,
    tags: ['caffeine-free']
  },
  {
    id: 'tea-peppermint-bliss',
    name: 'Peppermint Bliss',
    description: 'Crisp and invigorating peppermint leaves that refresh the palate and calm the mind.',
    price: 3.75,
    category: 'tea',
    subcategory: 'herbal',
    image: '🌿',
    featured: false,
    tags: ['caffeine-free']
  },
  {
    id: 'tea-hibiscus-berry',
    name: 'Hibiscus Berry',
    description: 'A vibrant ruby-red herbal infusion of hibiscus, mixed berries, and rosehip. Tart and fruity.',
    price: 4.25,
    category: 'tea',
    subcategory: 'herbal',
    image: '🌺',
    featured: false,
    tags: ['caffeine-free', 'seasonal']
  },
  {
    id: 'tea-iron-goddess',
    name: 'Iron Goddess (Tie Guan Yin)',
    description: 'A prized Chinese oolong with a complex orchid aroma and creamy, lingering finish.',
    price: 5.00,
    category: 'tea',
    subcategory: 'oolong',
    image: '🍵',
    featured: false,
    tags: []
  },
  {
    id: 'tea-silver-needle',
    name: 'Silver Needle',
    description: 'The finest white tea made from tender buds only. Delicate, sweet, and subtly floral.',
    price: 5.50,
    category: 'tea',
    subcategory: 'white',
    image: '🤍',
    featured: false,
    tags: []
  },
  {
    id: 'tea-spiced-chai',
    name: 'Spiced Chai Latte',
    description: 'Bold Assam tea simmered with cardamom, cinnamon, ginger, and cloves, finished with frothy milk.',
    price: 5.25,
    category: 'tea',
    subcategory: 'chai',
    image: '☕',
    featured: true,
    tags: ['popular']
  },

  // === COFFEES ===
  {
    id: 'coffee-pour-over',
    name: 'House Blend Pour-Over',
    description: 'Single-origin beans carefully brewed pour-over style for a clean, nuanced cup.',
    price: 4.00,
    category: 'coffee',
    subcategory: 'hot',
    image: '☕',
    featured: false,
    tags: []
  },
  {
    id: 'coffee-vanilla-oat',
    name: 'Vanilla Oat Latte',
    description: 'Creamy oat milk paired with house-made vanilla syrup and a double shot of espresso.',
    price: 5.50,
    category: 'coffee',
    subcategory: 'hot',
    image: '☕',
    featured: true,
    tags: ['vegan']
  },
  {
    id: 'coffee-honey-cappuccino',
    name: 'Honey Cinnamon Cappuccino',
    description: 'Velvety cappuccino with a drizzle of wildflower honey and a dusting of Ceylon cinnamon.',
    price: 5.25,
    category: 'coffee',
    subcategory: 'hot',
    image: '☕',
    featured: false,
    tags: []
  },
  {
    id: 'coffee-cold-brew',
    name: 'Cold Brew Black',
    description: 'Steeped for 18 hours, our cold brew is bold, smooth, and naturally sweet with low acidity.',
    price: 4.50,
    category: 'coffee',
    subcategory: 'iced',
    image: '🧊',
    featured: false,
    tags: []
  },
  {
    id: 'coffee-lavender-mocha',
    name: 'Iced Lavender Mocha',
    description: 'A dreamy combination of espresso, dark chocolate, and lavender syrup served over ice.',
    price: 5.75,
    category: 'coffee',
    subcategory: 'iced',
    image: '🧊',
    featured: false,
    tags: ['seasonal']
  },
  {
    id: 'coffee-matcha-fusion',
    name: 'Matcha Espresso Fusion',
    description: 'The best of both worlds — ceremonial matcha meets espresso in a creamy blended drink.',
    price: 6.25,
    category: 'coffee',
    subcategory: 'blended',
    image: '🍵',
    featured: true,
    tags: ['popular']
  },

  // === PASTRIES ===
  {
    id: 'pastry-butter-scone',
    name: 'Classic Butter Scone',
    description: 'Flaky, golden-crusted scone baked fresh daily. Pairs perfectly with clotted cream and jam.',
    price: 3.50,
    category: 'pastry',
    subcategory: 'scone',
    image: '🧁',
    featured: false,
    tags: []
  },
  {
    id: 'pastry-lemon-scone',
    name: 'Lemon Poppy Seed Scone',
    description: 'Bright and zesty scone studded with poppy seeds and topped with a lemon glaze.',
    price: 3.75,
    category: 'pastry',
    subcategory: 'scone',
    image: '🍋',
    featured: false,
    tags: []
  },
  {
    id: 'pastry-matcha-cheesecake',
    name: 'Matcha Cheesecake Slice',
    description: 'Creamy Japanese-style cheesecake swirled with premium matcha on a buttery biscuit base.',
    price: 6.50,
    category: 'pastry',
    subcategory: 'cake',
    image: '🍰',
    featured: true,
    tags: ['popular']
  },
  {
    id: 'pastry-honey-almond-cake',
    name: 'Honey Almond Cake',
    description: 'A moist, tender cake layered with honey buttercream and toasted almond slivers.',
    price: 5.75,
    category: 'pastry',
    subcategory: 'cake',
    image: '🍰',
    featured: false,
    tags: []
  },
  {
    id: 'pastry-earl-grey-shortbread',
    name: 'Earl Grey Shortbread Cookies',
    description: 'Buttery shortbread infused with Earl Grey tea leaves. Crisp, fragrant, and addictive.',
    price: 3.25,
    category: 'pastry',
    subcategory: 'cookie',
    image: '🍪',
    featured: false,
    tags: []
  },
  {
    id: 'pastry-chocolate-croissant',
    name: 'Chocolate Croissant',
    description: 'Layers of buttery, flaky pastry wrapped around rich dark chocolate batons. Baked golden.',
    price: 4.50,
    category: 'pastry',
    subcategory: 'pastry',
    image: '🥐',
    featured: false,
    tags: []
  }
];
