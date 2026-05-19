import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  X, 
  MessageCircle, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail,
  Award,
  Palette,
  Truck,
  Users,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Constants ---
const BRAND_PHONE = "+918796372006";
const BRAND_EMAIL = "rugvantaindia@gmail.com";

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Midnight Silk Bath Mat",
    category: "Bath Mats",
    price: 899,
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-absorbent micro-fiber with a luxurious deep-pile texture."
  },
  {
    id: '2',
    name: "Vintage Filigree Door Mat",
    category: "Door Mats",
    price: 549,
    image: "https://images.unsplash.com/photo-1579633880628-9723ec01592c?auto=format&fit=crop&q=80&w=800",
    description: "Durable coir fiber featuring classic ornamental gold-inspired patterns."
  },
  {
    id: '3',
    name: "Sand Waves Area Rug",
    category: "Carpets",
    price: 4999,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800",
    description: "Premium hand-tufted carpet with modern wave patterns for elegant living spaces."
  },
  {
    id: '4',
    name: "Navy Heritage Carpet",
    category: "Carpets",
    price: 3499,
    image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?auto=format&fit=crop&q=80&w=800",
    description: "Durable and stylish Navy Blue carpet that anchors any room with stability."
  },
  {
    id: '5',
    name: "Cream Cloud Comfort Mat",
    category: "Bath Mats",
    price: 749,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    description: "Soft off-white texture that feels like stepping on a cloud."
  }
];

// --- Components ---

const SplitText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap items-center justify-center ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-navy/10 px-6 py-4 flex justify-between items-center transition-all duration-300">
    <div className="flex items-center gap-2">
      <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest text-brand-navy">
        RUGVANTA <span className="gold-text">INDIA</span>
      </h1>
    </div>
    
    <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-widest uppercase">
      <a href="#hero" className="hover:text-brand-gold-dark transition-colors">Home</a>
      <a href="#products" className="hover:text-brand-gold-dark transition-colors">Collection</a>
      <a href="#about" className="hover:text-brand-gold-dark transition-colors">About</a>
      <a href="#contact" className="hover:text-brand-gold-dark transition-colors">Contact</a>
    </div>

    <button 
      onClick={onOpenCart}
      className="relative p-2 hover:bg-brand-navy/5 rounded-full transition-colors"
      id="cart-trigger"
    >
      <ShoppingBag className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-navy text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
          {cartCount}
        </span>
      )}
    </button>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => {
  const directions = [
    { x: -50, y: 0 },
    { x: 50, y: 0 },
    { x: 0, y: -50 },
    { x: 0, y: 50 }
  ];
  const dir = directions[index % 4];

  return (
    <motion.div 
      initial={{ opacity: 0, ...dir }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 bg-white border border-brand-navy/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-14 h-14 rounded-full bg-brand-cream flex items-center justify-center mb-4 border border-brand-gold-light">
        <Icon className="w-7 h-7 text-brand-navy" />
      </div>
      <h3 className="font-serif text-lg font-bold mb-2 uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-brand-navy/60 leading-relaxed font-sans">{description}</p>
    </motion.div>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Bath Mats', 'Door Mats', 'Carpets'];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const message = `Hello Rugvanta India! I want to place an order:%0A%0A` + 
      cart.map(item => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('%0A') +
      `%0A%0A*Total: ₹${totalPrice}*%0A%0APlease confirm availability.`;
    
    window.open(`https://wa.me/${BRAND_PHONE}?text=${message}`, '_blank');
  };

  const productEntranceDirections = [
    { x: -100, y: 0 },
    { x: 100, y: 0 },
    { x: 0, y: -100 },
    { x: 0, y: 100 },
    { x: -50, y: -50 },
    { x: 50, y: 50 }
  ];

  return (
    <div className="min-h-screen bg-brand-cream overflow-x-hidden pt-20">
      <Navbar cartCount={totalItems} onOpenCart={() => setIsCartOpen(true)} />

      {/* --- Hero Section --- */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #0A1C3A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl z-10"
        >
          <div className="flex justify-center mb-6">
            <div className="w-24 h-[1px] bg-brand-gold-dark mt-4" />
            <Award className="w-8 h-8 mx-4 text-brand-gold-dark animate-float" />
            <div className="w-24 h-[1px] bg-brand-gold-dark mt-4" />
          </div>
          
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-navy/60 mb-4 font-sans">
            Premium Quality
          </h2>
          
          <div className="text-5xl md:text-8xl font-black mb-6 leading-tight flex flex-wrap items-center justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              className="mr-[0.25em] inline-block text-brand-navy"
            >
              RUGVANTA
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="inline-block gold-text"
            >
              INDIA
            </motion.span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-serif italic text-brand-navy/80 mb-10">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>Bath Mats</motion.span>
            <span className="hidden md:block">•</span>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}>Door Mats</motion.span>
            <span className="hidden md:block">•</span>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9 }}>Carpets</motion.span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#products" 
              className="px-10 py-5 bg-brand-navy text-white font-bold uppercase tracking-widest rounded-full hover:bg-brand-navy/90 transition-all shadow-lg shadow-brand-navy/20"
            >
              Explore Collection
            </motion.a>
            <motion.p 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-brand-navy/60 font-script text-4xl"
            >
              For Every Space
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* --- Features Pillars --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            index={0}
            icon={Award} 
            title="Premium Quality" 
            description="Hand-crafted with the finest fibers for unmatched durability and luxury feel." 
          />
          <FeatureCard 
            index={1}
            icon={Palette} 
            title="Modern Designs" 
            description="Curated aesthetics that blend traditional craftsmanship with contemporary trends." 
          />
          <FeatureCard 
            index={2}
            icon={Truck} 
            title="Wholesale & Retail" 
            description="Supplying bulk orders for industries and single units for refined homes." 
          />
          <FeatureCard 
            index={3}
            icon={Users} 
            title="Customer Choice" 
            description="Highly rated and trusted brand providing comfort to thousands of homes." 
          />
        </div>
      </section>

      {/* --- Products Grid --- */}
      <section id="products" className="py-24 px-6 bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Our <span className="gold-text">Collection</span>
              </motion.h2>
              <div className="w-20 h-1 gold-gradient-bg mb-6" />
              <p className="text-brand-navy/60 max-w-md">Browse our exclusive range of high-performance floor coverings.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/20' 
                    : 'bg-brand-cream text-brand-navy hover:bg-brand-navy/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Category-Specific Grid with 3D Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const dir = productEntranceDirections[i % productEntranceDirections.length];
              return (
                <motion.div 
                  key={`${activeCategory}-${i}`}
                  initial={{ opacity: 0, ...dir }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  whileHover={{ 
                    y: -15,
                    rotateX: 5,
                    rotateY: -5,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
                  className="group relative flex flex-col perspective-1000"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-cream border border-brand-navy/10 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform-gpu preserve-3d flex flex-col items-center justify-center p-8 text-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/[0.02] to-transparent pointer-events-none" />
                    
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                    >
                      <ShoppingBag className="w-16 h-16 mb-6 text-brand-gold-dark opacity-30" />
                    </motion.div>
                    
                    <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-navy/40 mb-2">
                      {activeCategory === 'All' ? 'Premium Item' : activeCategory}
                    </h4>
                    <p className="text-brand-navy/60 font-serif italic text-lg mb-6">
                      Coming soon. Contact owner for the current deals.
                    </p>
                    
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={`https://wa.me/${BRAND_PHONE}`}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-brand-navy/5 text-brand-navy hover:bg-brand-gold-dark hover:text-white transition-all transform-gpu"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.a>
                  </div>
                  
                  <div className="pt-6 px-2 opacity-40">
                    <div className="h-4 w-3/4 bg-brand-navy/10 rounded-full mb-3" />
                    <div className="h-4 w-1/4 bg-brand-navy/10 rounded-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Brand Statement --- */}
      <section id="about" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-gold-light/20 rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-brand-navy text-white rounded-[3rem] p-12 md:p-20 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 gold-gradient-bg opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <SplitText 
              text='"Style That Completes Your Home"' 
              className="text-3xl md:text-5xl font-bold mb-8 italic"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed mb-12"
            >
              At Rugvanta India, we believe every space deserves a touch of elegance. From high-absorbency bath mats to grand living room carpets, our products are crafted to blend durability with sophisticated artistry.
            </motion.p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-sm font-bold uppercase tracking-[0.2em]">
              {[
                { text: "Premium Finishing", dir: { x: -30 } },
                { text: "Custom Solutions", dir: { y: 30 } },
                { text: "Local Logistics", dir: { x: 30 } }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, ...item.dir }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 border border-brand-gold-light rounded-full flex items-center justify-center">✔</div>
                  {item.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Footer & Contact --- */}
      <footer id="contact" className="bg-brand-navy text-white pt-24 pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-serif font-black mb-6">
                <span className="text-white">RUGVANTA</span> <span className="gold-text">INDIA</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed font-sans mb-8">
                Leading manufacturers and suppliers of high-quality bath mats, door mats, and interior carpets.
              </p>
              <div className="flex items-center gap-4">
                <motion.a whileHover={{ y: -5 }} href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold-dark hover:border-brand-gold-dark transition-all">
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold-dark hover:border-brand-gold-dark transition-all">
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href={`https://wa.me/${BRAND_PHONE}`} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold-dark hover:border-brand-gold-dark transition-all">
                  <MessageCircle className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Collection</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li><a href="#products" className="hover:text-brand-gold-light transition-colors">Coming Soon: Bath Mats</a></li>
                <li><a href="#products" className="hover:text-brand-gold-light transition-colors">Coming Soon: Door Mats</a></li>
                <li><a href="#products" className="hover:text-brand-gold-light transition-colors">Coming Soon: Carpets</a></li>
                <li><a href="#products" className="hover:text-brand-gold-light transition-colors">Custom Orders</a></li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Reach Us</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-brand-gold-dark shrink-0" />
                  <div>
                    <p className="font-bold text-sm mb-1 uppercase tracking-wider">Our Location</p>
                    <p className="text-white/50 text-xs leading-relaxed font-sans">
                      Vasika No 928/1, Village - DUNGARWAS(194),<br />
                      DHARUHERA REWARI - 123106 (HARYANA)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-brand-gold-dark shrink-0" />
                  <div>
                    <p className="font-bold text-sm mb-1 uppercase tracking-wider">Contact Details</p>
                    <p className="text-white/50 text-xs font-sans">
                      Mob: <span className="text-white">{BRAND_PHONE}</span><br />
                      Email: <span className="text-white">{BRAND_EMAIL}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-widest font-bold text-white/30"
          >
            <p>© 2024 Rugvanta India. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* --- Cart Sidebar --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[60]" 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-brand-navy/10 flex justify-between items-center bg-white">
                <h3 className="text-2xl font-serif font-black uppercase">Your <span className="gold-text">Cart</span></h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-brand-cream rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20 px-10">
                  <ShoppingBag className="w-16 h-16 mb-6" />
                  <p className="font-bold uppercase tracking-widest text-sm mb-4">Collection Launching Soon</p>
                  <p className="text-xs leading-relaxed">
                    Our digital catalog is being updated with the latest inventory. 
                    Contact us directly to explore current stock.
                  </p>
                  <a 
                    href={`https://wa.me/${BRAND_PHONE}`}
                    className="mt-8 px-6 py-3 border border-brand-navy rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Global Floating CTA --- */}
      <motion.a 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        href={`https://wa.me/${BRAND_PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[55] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl animate-float md:hidden"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
