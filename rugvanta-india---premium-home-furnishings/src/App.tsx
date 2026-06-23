import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
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
  ArrowRight,
  Sparkles
} from 'lucide-react';

// --- Constants ---
const BRAND_PHONE = "+918796372006";
const BRAND_EMAIL = "pramveer@rugvantaindia.com";
const OWNER_NAME = "Mahesh Sultania";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

const CATEGORIES: Category[] = [
  { 
    id: 'Carpets', 
    name: 'Carpets', 
    description: 'Exquisite hand-knotted and tufted statements for grand spaces.',
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Rugs', 
    name: 'Rugs', 
    description: 'Artisanal area and runner rugs hand-woven with natural fibers.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Entrance Accents', 
    name: 'Entrance Accents', 
    description: 'Sophisticated doorway thresholds crafted for exceptional first impressions.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Bath Accents', 
    name: 'Bath Accents', 
    description: 'Plush underfoot comfort designed for private spa-like sanctuaries.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Kitchen Accents', 
    name: 'Kitchen Accents', 
    description: 'Ergonomic cushioning and premium runners for the culinary workspace.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Cushion Covers', 
    name: 'Cushion Covers', 
    description: 'Luxurious textures and embroidered details that elevate any seat.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Curtain Fabrics', 
    name: 'Curtain Fabrics', 
    description: 'Bespoke blackout, velvet, and sheer drapes to frame natural light.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Sofa Furnishings', 
    name: 'Sofa Furnishings', 
    description: 'Premium throws, runners, and coordinated accents for lounge styling.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Sofa Covers', 
    name: 'Sofa Covers', 
    description: 'Fitted stretch and heavy velvet coverings designed to protect and renew.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Bed Sheets', 
    name: 'Bed Sheets', 
    description: 'High-thread-count cotton and satin bedding for ultimate sleep luxury.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Pillow Covers', 
    name: 'Pillow Covers', 
    description: 'Mulberry silk and premium piped pillow casings for restful luxury.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Table Runners', 
    name: 'Table Runners', 
    description: 'European linen and woven styling lines to complete your dining landscape.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Dining Accents', 
    name: 'Dining Accents', 
    description: 'Fine heat-resistant placemats and protectors for elegant dining tables.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Wall Art', 
    name: 'Wall Art', 
    description: 'Hand-stretched textured abstract canvases and gallery-framed prints.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Wallpapers', 
    name: 'Wallpapers', 
    description: 'Luxury non-woven metallic and textured wallcoverings for signature walls.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 'Poufs', 
    name: 'Poufs', 
    description: 'Densely hand-braided and leather footrests serving as luxury lounge accents.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800' 
  }
];

const PRODUCTS: Product[] = [
  // --- Carpets ---
  {
    id: 'c1',
    name: 'Hand Tufted Carpet',
    category: 'Carpets',
    description: 'Expertly hand-crafted using premium wool and silk fibers, creating luxurious pile heights and exceptional durability.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c2',
    name: 'Shaggy Carpet',
    category: 'Carpets',
    description: 'Deep-pile luxury underfoot, perfect for creating a cozy, warm, and inviting ambiance in bedrooms and lounges.',
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c3',
    name: 'Printed Carpet',
    category: 'Carpets',
    description: 'Intricately detailed patterns rendered in vibrant colors using state-of-the-art precision printing techniques.',
    image: 'https://images.unsplash.com/photo-1579633880628-9723ec01592c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c4',
    name: 'Persian Style Carpet',
    category: 'Carpets',
    description: 'Timeless traditional motifs and intricate central medallions inspired by historical heritage and classic luxury.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c5',
    name: 'Modern Designer Carpet',
    category: 'Carpets',
    description: 'Contemporary geometric lines, abstract brushstrokes, and neutral tones designed for modern architectural spaces.',
    image: 'https://images.unsplash.com/photo-1543248939-ff40856f65d4?auto=format&fit=crop&q=80&w=800'
  },
  // --- Rugs ---
  {
    id: 'r1',
    name: 'Area Rug',
    category: 'Rugs',
    description: 'Sophisticated grounding pieces that frame your furniture layout and elevate the aesthetic of any living space.',
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'r2',
    name: 'Runner Rug',
    category: 'Rugs',
    description: 'Elongated, elegant floor coverings designed to add texture, warmth, and style to corridors, foyers, and narrow spaces.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'r3',
    name: 'Cotton Rug',
    category: 'Rugs',
    description: 'Lightweight, breathable, and easily washable coverings hand-woven from high-grade natural cotton fibers.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'r4',
    name: 'Jute Rug',
    category: 'Rugs',
    description: 'Eco-friendly, tightly braided natural golden jute fibers offering a rustic yet refined organic texture.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'r5',
    name: 'Handmade Rug',
    category: 'Rugs',
    description: 'Bespoke artisanal creations utilizing traditional weaving methods, making each piece uniquely yours.',
    image: 'https://images.unsplash.com/photo-1543248939-ff40856f65d4?auto=format&fit=crop&q=80&w=800'
  },
  // --- Entrance Accents ---
  {
    id: 'e1',
    name: 'Premium Coir Accent',
    category: 'Entrance Accents',
    description: 'Highly durable natural coconut coir fibers designed to capture dust and debris while welcoming guests with elegance.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e2',
    name: 'Heavy-Duty Entrance Accent',
    category: 'Entrance Accents',
    description: 'Reinforced industrial-strength construction built to withstand heavy foot traffic while maintaining a pristine look.',
    image: 'https://images.unsplash.com/photo-1579633880628-9723ec01592c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e3',
    name: 'All-Weather Entrance Accent',
    category: 'Entrance Accents',
    description: 'Resilient materials that resist fading, moisture, and mildew, ensuring long-lasting outdoor and indoor beauty.',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e4',
    name: 'Designer Entrance Accent',
    category: 'Entrance Accents',
    description: 'Artistic typography, minimalist borders, and contemporary motifs that make a sophisticated first impression.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e5',
    name: 'Secure-Grip Entrance Accent',
    category: 'Entrance Accents',
    description: 'Featuring a high-quality non-slip rubberized backing that anchors the entryway piece firmly in place.',
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800'
  },
  // --- Bath Accents ---
  {
    id: 'b1',
    name: 'Plush Microfiber Bath Accent',
    category: 'Bath Accents',
    description: 'Ultra-absorbent high-pile microfiber yarns that dry rapidly and offer an exceptionally soft, spa-like feel.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    name: 'Ergonomic Memory Foam Bath Accent',
    category: 'Bath Accents',
    description: 'Cushioned memory foam core that contours to your feet, relieving pressure and elevating daily bath rituals.',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    name: 'Organic Cotton Bath Accent',
    category: 'Bath Accents',
    description: 'Woven from 100% long-staple organic cotton, offering natural breathability, soft loops, and eco-friendly comfort.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b4',
    name: 'Slip-Resistant Bath Accent',
    category: 'Bath Accents',
    description: 'Engineered with a durable TPR non-slip backing to ensure stability and safety on wet bathroom tiles.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b5',
    name: 'Luxury Chenille Bath Accent',
    category: 'Bath Accents',
    description: 'Silky, thick chenille tufts that absorb moisture effortlessly while adding a textured elegance to bathroom decor.',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800'
  },
  // --- Kitchen Accents ---
  {
    id: 'k1',
    name: 'Ergonomic Kitchen Cushioning',
    category: 'Kitchen Accents',
    description: 'Specially engineered support foam that cushions foot pressure during extended periods of standing at counters.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'k2',
    name: 'Premium Kitchen Runner',
    category: 'Kitchen Accents',
    description: 'Elegant low-profile runners that shield floors from spills while providing a refined linear aesthetic.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'k3',
    name: 'Easy-Care Kitchen Runner',
    category: 'Kitchen Accents',
    description: 'Water-resistant, stain-repellent, and machine-washable fabrics designed to handle kitchen spills with ease.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'k4',
    name: 'Artistic Kitchen Runner',
    category: 'Kitchen Accents',
    description: 'Intricately patterned and colorfully detailed runners that bring a warm, inviting charm to the culinary space.',
    image: 'https://images.unsplash.com/photo-1579633880628-9723ec01592c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'k5',
    name: 'Durable Kitchen Runner',
    category: 'Kitchen Accents',
    description: 'Heavy-duty non-slip backing paired with wear-resistant fibers designed for high-activity cooking areas.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
  },
  // --- Cushion Covers ---
  {
    id: 'cu1',
    name: 'Velvet Cushion Cover',
    category: 'Cushion Covers',
    description: 'Sumptuous, heavy-weight velvet that catches the light beautifully, bringing instant luxury to sofas and beds.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cu2',
    name: 'Cotton Cushion Cover',
    category: 'Cushion Covers',
    description: 'Crisp, breathable natural cotton covers styled with clean lines for a fresh, casual, and elegant home feel.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cu3',
    name: 'Embroidered Cushion Cover',
    category: 'Cushion Covers',
    description: 'Artisanal crewelwork and intricate hand-embellished threads that create stunning tactile surface patterns.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cu4',
    name: 'Printed Cushion Cover',
    category: 'Cushion Covers',
    description: 'High-definition digital prints featuring contemporary botanicals, abstractions, and artistic graphics.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cu5',
    name: 'Designer Cushion Cover',
    category: 'Cushion Covers',
    description: 'Exclusive designer-label patterns blending rich fabrics, piping details, and custom textures.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800'
  },
  // --- Curtain Fabrics ---
  {
    id: 'cur1',
    name: 'Blackout Curtains',
    category: 'Curtain Fabrics',
    description: 'Thick, multi-layered thermal linings that block external light completely while providing insulation.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cur2',
    name: 'Sheer Curtains',
    category: 'Curtain Fabrics',
    description: 'Lightweight, airy fabrics that gently diffuse sunlight while maintaining privacy and a breezy interior vibe.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cur3',
    name: 'Eyelet Curtains',
    category: 'Curtain Fabrics',
    description: 'Featuring clean metal eyelet rings for smooth gliding on rods and a modern, tailored wave drape look.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cur4',
    name: 'Velvet Curtains',
    category: 'Curtain Fabrics',
    description: 'Dramatic, heavy velvet drapes that pool elegantly on the floor, providing acoustic comfort and grand style.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cur5',
    name: 'Printed Curtains',
    category: 'Curtain Fabrics',
    description: 'A range of artistic prints, from classic damasks to modern leaf motifs, designed to frame your windows beautifully.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  },
  // --- Sofa Furnishings ---
  {
    id: 'sf1',
    name: 'Premium Sofa Cover',
    category: 'Sofa Furnishings',
    description: 'Luxurious heavy-knit protection fabrics that preserve your sofa while adding an upscale texture.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sf2',
    name: 'Custom Fitted Sofa Cover',
    category: 'Sofa Furnishings',
    description: 'Tailored-to-measure sofa slips crafted from stretchable, durable jacquard fabric for a seamless fit.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sf3',
    name: 'Luxury Fabric Sofa Throw',
    category: 'Sofa Furnishings',
    description: 'Exquisitely soft woven throws featuring tasseled edges, perfect for layering comfort onto any sofa.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sf4',
    name: 'Designer Cushion & Sofa Set',
    category: 'Sofa Furnishings',
    description: 'Curated sets matching luxury throw covers with coordinated runners for a harmonized living room style.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
  },
  // --- Sofa Covers ---
  {
    id: 'sc1',
    name: 'Velvet Sofa Cover',
    category: 'Sofa Covers',
    description: 'Rich, soft velvet covers that wrap your couch in comfort and defend it from daily wear and tear.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sc2',
    name: 'Linen Sofa Cover',
    category: 'Sofa Covers',
    description: 'Breathable, structured linen slips that bring a relaxed luxury feel to modern living spaces.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sc3',
    name: 'Durable Leatherette Cover',
    category: 'Sofa Covers',
    description: 'Wipe-clean faux leather shields that protect high-wear areas of your furniture with a sleek surface.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
  },
  // --- Bed Sheets ---
  {
    id: 'bs1',
    name: 'Luxury Satin Bed Sheet',
    category: 'Bed Sheets',
    description: 'High-thread-count silky satin weave offering an incredibly smooth surface for cool, premium sleep.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bs2',
    name: 'Premium Percale Cotton Bed Sheet',
    category: 'Bed Sheets',
    description: 'Crisp, matte-finish long-staple cotton sheets that get softer with every single wash.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bs3',
    name: 'Designer Jacquard Bed Sheet',
    category: 'Bed Sheets',
    description: 'Featuring subtly woven self-patterns and rich decorative borders for an elevated master suite aesthetic.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
  },
  // --- Pillow Covers ---
  {
    id: 'pc1',
    name: 'Premium Pillow Covers',
    category: 'Pillow Covers',
    description: 'Soft cotton and satin-trimmed covers designed to support rest while matching your bed sheet collections.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pc2',
    name: 'Silk Pillow Covers',
    category: 'Pillow Covers',
    description: 'Frictionless, hypoallergenic 100% mulberry silk that promotes healthy skin and hair during sleep.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800'
  },
  // --- Table Runners ---
  {
    id: 'tr1',
    name: 'Elegant Linen Table Runner',
    category: 'Table Runners',
    description: 'Woven from premium European flax linen, featuring classic hemstitches to frame dining decor.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=800'
  },
  // --- Dining Accents ---
  {
    id: 'da1',
    name: 'Fine Dining Placemats',
    category: 'Dining Accents',
    description: 'Heat-resistant, easy-to-clean woven placemats that add texture and style to your tablescapes.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'da2',
    name: 'Premium Table Mats',
    category: 'Dining Accents',
    description: 'Stylish protective barriers for fine dining surfaces, crafted to resist stains and warm plates.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
  },
  // --- Wall Art ---
  {
    id: 'wa1',
    name: 'Modern Canvas Wall Art',
    category: 'Wall Art',
    description: 'Hand-stretched textured abstract paintings on solid wood frames, bringing contemporary colors to your walls.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'wa2',
    name: 'Classic Framed Wall Art',
    category: 'Wall Art',
    description: 'Giclée prints on museum-grade acid-free paper, enclosed in sleek premium wooden frames.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
  },
  // --- Wallpapers ---
  {
    id: 'wp1',
    name: 'Luxury Textured Wallpaper',
    category: 'Wallpapers',
    description: 'Thick, non-woven wallpaper rolls featuring subtle fiber textures and shimmering metallic accents.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'wp2',
    name: 'Modern Designer Wallpaper',
    category: 'Wallpapers',
    description: 'Bespoke large-scale murals and contemporary geometric wallpapers designed for feature walls.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800'
  },
  // --- Poufs ---
  {
    id: 'pf1',
    name: 'Premium Leather Poufs',
    category: 'Poufs',
    description: 'Hand-stitched genuine leather poufs that serve as elegant footrests, extra seating, or accent side tables.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pf2',
    name: 'Knitted Cotton Poufs',
    category: 'Poufs',
    description: 'Densely stuffed braided cotton cords forming a sturdy, textured round pouf for a casual luxury look.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800'
  }
];

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
            delay: i * 0.08,
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

const Navbar = ({ onEnquireClick }: { onEnquireClick: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-navy/10 px-6 py-4 flex justify-between items-center transition-all duration-300">
    <div className="flex items-center gap-2">
      <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest text-brand-navy">
        RUGVANTA <span className="gold-text">INDIA</span>
      </h1>
    </div>
    
    <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-widest uppercase">
      <a href="#hero" className="hover:text-brand-gold-dark transition-colors">Home</a>
      <a href="#collections" className="hover:text-brand-gold-dark transition-colors">Collection</a>
      <a href="#about" className="hover:text-brand-gold-dark transition-colors">About</a>
      <a href="#contact" className="hover:text-brand-gold-dark transition-colors">Contact</a>
    </div>

    <button 
      onClick={onEnquireClick}
      className="px-5 py-2 bg-brand-navy text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-gold-dark hover:text-white transition-all shadow-md"
    >
      Enquire Now
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
      transition={{ duration: 0.8, delay: index * 0.08 }}
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
  const [activeCategory, setActiveCategory] = useState<string>('Carpets');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const activeCategoryObj = useMemo(() => {
    return CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
  }, [activeCategory]);

  const handleGeneralEnquiry = () => {
    const message = `Hello Rugvanta India! I am visiting your premium home furnishing website and would like to make an enquiry regarding custom orders and available catalog items.`;
    window.open(`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleProductEnquiry = (product: Product) => {
    const message = `Hello Mahesh Sultania, I am interested in the premium "${product.name}" from the "${product.category}" collection. Please share pricing, availability, and customization details.`;
    window.open(`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-cream overflow-x-hidden pt-20">
      <Navbar onEnquireClick={handleGeneralEnquiry} />

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
            Bespoke Home Furnishings
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
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg md:text-xl font-serif italic text-brand-navy/80 mb-10">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>Exquisite Carpets</motion.span>
            <span className="hidden md:block text-brand-gold-dark">•</span>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>Artisanal Rugs</motion.span>
            <span className="hidden md:block text-brand-gold-dark">•</span>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}>Luxury Accents</motion.span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#collections" 
              className="px-10 py-5 bg-brand-navy text-white font-bold uppercase tracking-widest rounded-full hover:bg-brand-navy/90 transition-all shadow-lg shadow-brand-navy/20"
            >
              Explore Collections
            </motion.a>
            <motion.p 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-brand-navy/60 font-script text-4xl"
            >
              For Every Signature Space
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* --- Features Pillars --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            index={0}
            icon={Award} 
            title="Artisanal Excellence" 
            description="Hand-crafted by master weavers with the finest wool, silk, and organic fibers." 
          />
          <FeatureCard 
            index={1}
            icon={Palette} 
            title="Tailored Design" 
            description="Custom shapes, scales, and tones designed to suit your home architectural plan." 
          />
          <FeatureCard 
            index={2}
            icon={Truck} 
            title="Premium Sourcing" 
            description="Bespoke orders for luxury residences, interior designers, and hospitality projects." 
          />
          <FeatureCard 
            index={3}
            icon={Users} 
            title="Signature Comfort" 
            description="Trusted by luxury decorators to furnish underfoot luxury and ambient warmth." 
          />
        </div>
      </section>

      {/* --- Collections Section --- */}
      <section id="collections" className="py-24 px-6 bg-white min-h-[600px] border-t border-brand-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Explore Our <span className="gold-text">Collections</span>
            </h2>
            <div className="w-24 h-1 gold-gradient-bg mx-auto mb-6" />
            <p className="text-brand-navy/60 max-w-2xl mx-auto">
              Select a design category to browse our exclusive catalog lines. Each category contains signature designs available for bespoke crafting.
            </p>
          </div>

          {/* Categories Grid Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {CATEGORIES.map((cat, i) => {
              const isActive = activeCategory === cat.id;
              return (
                <motion.div
                  key={cat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cursor-pointer overflow-hidden rounded-2xl relative aspect-[4/3] group shadow-sm transition-all duration-300 border ${
                    isActive ? 'border-brand-gold-dark ring-2 ring-brand-gold-light/40' : 'border-brand-navy/5 hover:border-brand-navy/20'
                  }`}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-300 ${
                    isActive ? 'from-brand-navy/90 via-brand-navy/60 to-brand-navy/30' : 'from-brand-navy/80 via-brand-navy/40 to-transparent'
                  }`} />
                  
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-brand-gold-light uppercase mb-1">
                      Collection
                    </span>
                    <h3 className="text-white text-base md:text-xl font-bold font-serif uppercase tracking-wider mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-[10px] md:text-xs line-clamp-2 leading-relaxed hidden sm:block">
                      {cat.description}
                    </p>
                  </div>
                  
                  {isActive && (
                    <div className="absolute top-3 right-3 bg-brand-gold-dark text-white rounded-full p-1.5 shadow-md">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Selected Category Showcase */}
          <div className="bg-brand-cream/40 rounded-[2.5rem] p-8 md:p-12 border border-brand-navy/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-brand-navy/10 pb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-dark">
                  Now Showcasing
                </span>
                <h3 className="text-2xl md:text-4xl font-bold mt-1 uppercase tracking-wide">
                  {activeCategoryObj.name}
                </h3>
              </div>
              <p className="text-brand-navy/60 max-w-xl text-sm md:text-base leading-relaxed">
                {activeCategoryObj.description} All styles below are crafted on demand to fit your specifications. Click on any design to request pricing and details.
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-pointer group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-navy/5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative bg-brand-cream">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-brand-navy/0 transition-colors" />
                      <div className="absolute top-4 left-4 bg-brand-navy/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Coming Soon
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-lg font-serif font-bold text-brand-navy group-hover:text-brand-gold-dark transition-colors mb-2">
                        {product.name}
                      </h4>
                      <p className="text-xs text-brand-navy/60 leading-relaxed font-sans mb-6 flex-1">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-brand-navy/5 text-xs font-bold uppercase tracking-widest text-brand-navy">
                        <span>Enquire details</span>
                        <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-navy/15">
                <p className="font-serif italic text-brand-navy/50 text-lg">
                  This custom showcase is currently being refreshed.
                </p>
                <button 
                  onClick={handleGeneralEnquiry}
                  className="mt-4 px-6 py-2.5 bg-brand-navy text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-gold-dark transition-colors"
                >
                  Contact For Catalog
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- Brand Statement --- */}
      <section id="about" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-gold-light/20 rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-brand-navy text-white rounded-[3rem] p-12 md:p-20 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 gold-gradient-bg opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <SplitText 
              text='"Artistry That Elevates Your Home"' 
              className="text-3xl md:text-5xl font-bold mb-8 italic"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-12"
            >
              At Rugvanta India, led by {OWNER_NAME}, we believe every space is an expression of luxury. From hand-crafted premium carpets to exquisite underfoot accents, our products are meticulously curated to blend natural textures, structural durability, and sophisticated artistry.
            </motion.p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-sm font-bold uppercase tracking-[0.2em]">
              {[
                { text: "Premium Finishing", dir: { x: -30 } },
                { text: "Bespoke Dimensions", dir: { y: 30 } },
                { text: "Custom Colorways", dir: { x: 30 } }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, ...item.dir }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 text-brand-gold-light"
                >
                  <div className="w-8 h-8 border border-brand-gold-light/40 rounded-full flex items-center justify-center text-xs">✓</div>
                  {item.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Footer & Contact --- */}
      <footer id="contact" className="bg-brand-navy text-white pt-24 pb-12 px-6 overflow-hidden border-t border-white/5">
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
                Premier creators and purveyors of bespoke carpets, luxury rugs, and designer home accents.
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
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Collections</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li><a href="#collections" className="hover:text-brand-gold-light transition-colors">Premium Carpets</a></li>
                <li><a href="#collections" className="hover:text-brand-gold-light transition-colors">Artisanal Rugs</a></li>
                <li><a href="#collections" className="hover:text-brand-gold-light transition-colors">Entrance Accents</a></li>
                <li><a href="#collections" className="hover:text-brand-gold-light transition-colors">Custom Orders</a></li>
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
                    <p className="font-bold text-sm mb-1 uppercase tracking-wider">Showroom & Factory</p>
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
                      Director: <span className="text-white">{OWNER_NAME}</span><br />
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
            <p>© 2026 Rugvanta India. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* --- Product Detail & Inquiry Modal --- */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-brand-navy/80 backdrop-blur-md z-[60]" 
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-x-4 bottom-4 top-20 md:top-28 max-w-4xl mx-auto bg-brand-cream z-[70] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Product Visual Representative */}
              <div className="w-full md:w-1/2 relative bg-brand-navy aspect-[4/3] md:aspect-auto">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent md:bg-gradient-to-r md:from-transparent md:to-brand-navy/30" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 left-6 md:hidden w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-brand-navy"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Inquiry Details Panel */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-dark">
                        {selectedProduct.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-navy uppercase tracking-wide mt-1">
                        {selectedProduct.name}
                      </h3>
                    </div>
                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="hidden md:flex p-2 hover:bg-brand-navy/5 rounded-full transition-colors text-brand-navy"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-sm md:text-base text-brand-navy/70 leading-relaxed font-sans mb-8">
                    {selectedProduct.description}
                  </p>

                  <div className="bg-white border border-brand-navy/10 rounded-2xl p-6 mb-8">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-brand-navy mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-gold-dark" />
                      Collection Launching Soon
                    </h4>
                    <p className="text-xs text-brand-navy/60 leading-relaxed">
                      Our interactive digital catalog is currently being prepared. This signature item is available for customized crafting, bespoke dimensions, and fabric selection.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => handleProductEnquiry(selectedProduct)}
                    className="w-full py-4 bg-[#25D366] text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#20ba56] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enquire on WhatsApp
                  </button>

                  <a 
                    href={`mailto:${BRAND_EMAIL}?subject=Inquiry for ${encodeURIComponent(selectedProduct.name)}&body=Hello Mahesh Sultania,%0D%0A%0D%0AI would like to receive pricing and availability information for the following custom piece:%0D%0A-%20Item:%20${encodeURIComponent(selectedProduct.name)}%0D%0A-%20Collection:%20${encodeURIComponent(selectedProduct.category)}%0D%0A%0D%0APlease get back to me with the details.`}
                    className="w-full py-4 border border-brand-navy/20 text-brand-navy font-bold uppercase tracking-widest text-xs rounded-full hover:bg-brand-navy hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email Inquiry
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Global Floating WhatsApp CTA --- */}
      <motion.a 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent("Hello Rugvanta India! I am looking for premium home furnishings and would like to inquire about your collections.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[55] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl animate-float"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
