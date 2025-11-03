import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

// Media assets (royalty-free URLs)
const VIDEO_BG = 'https://videos.pexels.com/video-files/8331812/8331812-hd_1080_2048_25fps.mp4';
const IMG = {
  jacket: 'https://images.pexels.com/photos/887898/pexels-photo-887898.jpeg',
  tee: 'https://images.pexels.com/photos/2899839/pexels-photo-2899839.jpeg',
  denim: 'https://images.pexels.com/photos/27204305/pexels-photo-27204305.jpeg',
  sneakers: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
  skirt: 'https://images.pexels.com/photos/4458519/pexels-photo-4458519.jpeg',
  loafers: 'https://images.pexels.com/photos/26861953/pexels-photo-26861953.jpeg',
  cityGroup: 'https://images.pexels.com/photos/18398399/pexels-photo-18398399.jpeg',
  studio: 'https://images.pexels.com/photos/7205899/pexels-photo-7205899.jpeg',
  future: 'https://images.pexels.com/photos/8721198/pexels-photo-8721198.jpeg',
  dress: 'https://images.pexels.com/photos/19198600/pexels-photo-19198600.png',
  trench: 'https://images.pexels.com/photos/13148612/pexels-photo-13148612.jpeg',
  heels: 'https://images.pexels.com/photos/27204266/pexels-photo-27204266.jpeg',
  handbag: 'https://images.pexels.com/photos/26954376/pexels-photo-26954376.jpeg',
  slides: 'https://images.pexels.com/photos/27204297/pexels-photo-27204297.jpeg',
  // Traditional assets
  saree: 'https://images.pexels.com/photos/34291076/pexels-photo-34291076.jpeg',
  lehenga: 'https://images.pexels.com/photos/28144264/pexels-photo-28144264.jpeg',
  womanTraditional: 'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg',
  kurta: 'https://images.pexels.com/photos/8818626/pexels-photo-8818626.jpeg',
  sherwani: 'https://images.pexels.com/photos/19673004/pexels-photo-19673004.jpeg',
  nehru: 'https://images.pexels.com/photos/12944556/pexels-photo-12944556.jpeg',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
};

const PRODUCTS = [
  { id: 'p1', name: 'Aurora Bomber', price: 129, category: 'Jackets', images: [IMG.jacket, IMG.cityGroup], colors: ['Black', 'Navy', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], description: 'Premium bomber jacket with soft textures and modern cuts. Perfect for layering and street style.' },
  { id: 'p2', name: 'Verve Tee', price: 38, category: 'Tops', images: [IMG.tee, IMG.studio], colors: ['White', 'Black', 'Navy'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Classic crew neck tee made from comfortable cotton blend. Effortless everyday essential.' },
  { id: 'p3', name: 'Flux Denim', price: 92, category: 'Denim', images: [IMG.denim, IMG.cityGroup], colors: ['Black', 'Navy', 'Gray'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], description: 'Sleek denim with a perfect fit. Versatile and durable for any occasion.' },
  { id: 'p4', name: 'Nimbus Hoodie', price: 79, category: 'Tops', images: [IMG.studio, IMG.future], colors: ['Gray', 'Black', 'Olive'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Cozy hoodie with premium fabric. Great for layering and comfort.' },
  { id: 'p5', name: 'Prism Skirt', price: 68, category: 'Skirts', images: [IMG.skirt, IMG.studio], colors: ['Black', 'Navy', 'Burgundy'], sizes: ['XS', 'S', 'M', 'L'], description: 'Modern skirt with elegant drape. Perfect for any season.' },
  { id: 'p6', name: 'Drift Sneakers', price: 149, category: 'Shoes', images: [IMG.sneakers, IMG.loafers], colors: ['White', 'Black', 'Gray'], sizes: ['6', '7', '8', '9', '10', '11', '12'], description: 'Comfortable and stylish sneakers for everyday wear.' },
  { id: 'p7', name: 'Vertex Jacket', price: 159, category: 'Jackets', images: [IMG.cityGroup, IMG.jacket], colors: ['Black', 'Navy'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], description: 'Premium jacket with urban aesthetic. Bold statement piece.' },
  { id: 'p8', name: 'Mono Tee', price: 32, category: 'Tops', images: [IMG.tee, IMG.studio], colors: ['White', 'Black', 'Gray'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Minimalist tee for any wardrobe. Simple, clean, and timeless.' },
  { id: 'p9', name: 'Edge Denim', price: 99, category: 'Denim', images: [IMG.denim, IMG.cityGroup], colors: ['Black', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], description: 'Stylish denim with sharp cuts. Make a bold fashion statement.' },
  { id: 'p10', name: 'Halo Hoodie', price: 85, category: 'Tops', images: [IMG.future, IMG.studio], colors: ['Black', 'Gray', 'Olive'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Lightweight hoodie for layering. Perfect balance of comfort and style.' },
  { id: 'p11', name: 'Orbit Skirt', price: 74, category: 'Skirts', images: [IMG.skirt, IMG.cityGroup], colors: ['Black', 'Navy', 'Gray'], sizes: ['XS', 'S', 'M', 'L'], description: 'Versatile skirt with modern design. Great for casual or formal wear.' },
  { id: 'p12', name: 'Pulse Sneakers', price: 139, category: 'Shoes', images: [IMG.sneakers, IMG.loafers], colors: ['White', 'Black'], sizes: ['6', '7', '8', '9', '10', '11', '12'], description: 'Performance sneakers with style. Built for all-day comfort.' },
  { id: 'w1', name: 'Luna Dress', price: 119, category: 'Tops', gender: 'Women', images: [IMG.dress, IMG.studio], colors: ['Black', 'Navy', 'Burgundy'], sizes: ['XS', 'S', 'M', 'L'], description: 'Elegant dress for any occasion. Flattering fit and premium fabric.' },
  { id: 'w2', name: 'Iris Blouse', price: 54, category: 'Tops', gender: 'Women', images: [IMG.studio, IMG.dress], colors: ['White', 'Black', 'Navy'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Sophisticated blouse with delicate details. Perfect for layering.' },
  { id: 'w3', name: 'Sable Trench', price: 189, category: 'Jackets', gender: 'Women', images: [IMG.trench, IMG.cityGroup], colors: ['Black', 'Navy', 'Gray'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Timeless trench coat. A wardrobe staple for every season.' },
  { id: 'w4', name: 'Eclipse Heels', price: 99, category: 'Shoes', gender: 'Women', images: [IMG.heels, IMG.slides], colors: ['Black', 'Burgundy'], sizes: ['5', '6', '7', '8', '9', '10'], description: 'Stylish heels with comfort. Perfect for any event.' },
  { id: 'w5', name: 'Grove Handbag', price: 129, category: 'Accessories', gender: 'Women', images: [IMG.handbag, IMG.studio], colors: ['Black', 'Burgundy', 'Navy'], sizes: ['One Size'], description: 'Premium handbag with elegant design. Complete any outfit.' },
  { id: 'w6', name: 'Halo Slides', price: 79, category: 'Shoes', gender: 'Women', images: [IMG.slides, IMG.heels], colors: ['Black', 'White', 'Gray'], sizes: ['5', '6', '7', '8', '9', '10'], description: 'Comfortable slides for everyday wear. Casual elegance.' },
  { id: 'tw1', name: 'Aanya Saree', price: 149, category: 'Traditional', gender: 'Women', images: [IMG.saree, IMG.womanTraditional], colors: ['Burgundy', 'Navy', 'Olive'], sizes: ['Free Size'], description: 'Traditional saree with beautiful draping. Perfect for celebrations.' },
  { id: 'tw2', name: 'Meera Lehenga', price: 219, category: 'Traditional', gender: 'Women', images: [IMG.lehenga, IMG.womanTraditional], colors: ['Burgundy', 'Navy'], sizes: ['Free Size'], description: 'Exquisite lehenga for special occasions. Stunning and elegant.' },
  { id: 'tw3', name: 'Noor Anarkali', price: 179, category: 'Traditional', gender: 'Women', images: [IMG.womanTraditional, IMG.saree], colors: ['Navy', 'Burgundy', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], description: 'Graceful Anarkali suit. Perfect for festivals and gatherings.' },
  { id: 'tm1', name: 'Arjun Kurta Set', price: 129, category: 'Traditional', gender: 'Men', images: [IMG.kurta, IMG.nehru], colors: ['Navy', 'Olive', 'Burgundy'], sizes: ['M', 'L', 'XL', 'XXL'], description: 'Traditional kurta set with modern appeal. Great for any occasion.' },
  { id: 'tm2', name: 'Kohinoor Sherwani', price: 259, category: 'Traditional', gender: 'Men', images: [IMG.sherwani, IMG.kurta], colors: ['Burgundy', 'Navy'], sizes: ['M', 'L', 'XL'], description: 'Regal sherwani for special occasions. Premium craftsmanship.' },
  { id: 'tm3', name: 'Nehru Jacket Set', price: 149, category: 'Traditional', gender: 'Men', images: [IMG.nehru, IMG.kurta], colors: ['Black', 'Navy', 'Olive'], sizes: ['M', 'L', 'XL', 'XXL'], description: 'Elegant Nehru jacket set. Perfect for formal events.' },
];

function useIntersectionReveal(selector = '.reveal', options = { threshold: 0.12 }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current || document;
    const nodes = Array.from(root.querySelectorAll(selector));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
    }, options);
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [selector, options]);
  return ref;
}

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} }, [key, state]);
  return [state, setState];
}

function AnimatedText({ text, by = 'char', className = '' }) {
  const items = useMemo(() => (by === 'word' ? text.split(' ') : Array.from(text)), [text, by]);
  return (
    <span className={`ta ${className}`}>
      {items.map((t, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.05}s`, marginRight: by === 'word' ? 6 : undefined }}>{t}</span>
      ))}
    </span>
  );
}

function Navbar({ onAccount, onNavigate, cartCount, onCartClick }) {
  return (
    <div className="navbar-wrap">
      <div className="navbar">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}><AnimatedText text="Eclat Threads" className="text-gradient-anim" /></div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => onNavigate('featured')}>Featured</button>
          <button className="nav-link" onClick={() => onNavigate('women')}>Women</button>
          <button className="nav-link" onClick={() => onNavigate('traditional')}>Traditional</button>
          <button className="btn secondary" onClick={onAccount}>Account</button>
          <button className="btn secondary" style={{ position: 'relative' }} onClick={onCartClick} title="Open shopping cart">
            🛒 {cartCount > 0 && <span style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)', color: 'var(--primary-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

function Hero({ onShop, onNavigate }) {
  const words = useMemo(() => 'Wear Your Story.'.split(' '), []);
  return (
    <section className="hero container">
      <div className="hero-eyebrow">Eclat Threads</div>
      <h1 className="hero-title" aria-label="Wear Your Story.">
        <span className="cascade">
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" style={{ marginRight: w.endsWith('.') ? 0 : 8 }}>{w}</span>
          ))}
        </span>
      </h1>
      <p className="hero-sub"><AnimatedText text="Clothing as self‑expression — crafted to move with you. Subtle textures, bold lines, effortless comfort." by="word" /></p>
      <div className="hero-cta">
        <button className="btn" onClick={onShop}>Shop Featured</button>
        <button className="btn secondary" onClick={()=>onNavigate('women')}>Women</button>
        <button className="btn secondary" onClick={()=>onNavigate('traditional')}>Traditional</button>
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd, onView }) {
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const onClickAdd = () => { onAdd(product); setAdded(true); setTimeout(() => setAdded(false), 2000); };
  return (
    <article className="product-card reveal">
      <div className="media" onClick={() => onView(product)}>
        <div className="crossfade">
          {product.images.map((src, i) => (
            <img key={i} src={src} alt={product.name} className={i === active ? 'is-active' : ''} />
          ))}
        </div>
      </div>
      <div className="content" onClick={() => onView(product)} style={{ cursor: 'pointer' }}>
        <div className="title"><AnimatedText text={product.name} /></div>
        <div className="price">₹{product.price.toFixed(2)} · {product.category}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          {product.images.map((src, i) => (
            <button key={i} aria-label={`View image ${i + 1}`} onClick={(e) => { e.stopPropagation(); setActive(i); }} className="secondary" style={{ width: 28, height: 28, borderRadius: 6, overflow: 'hidden', padding: 0, border: i === active ? '2px solid var(--accent)' : '1px solid #2a2f40', background: '#0e1220', cursor: 'pointer' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
      <div className="actions">
        <button className="btn" onClick={onClickAdd} aria-live="polite">{added ? 'Added!' : 'Add to Cart'}</button>
      </div>
    </article>
  );
}

function Cart({ open, onClose, items }) {
  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`cart-panel ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Shopping cart">
        <div className="cart-header">
          <span>Cart ({items.length})</span>
          <button className="btn secondary" onClick={onClose}>Close</button>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (<div className="cart-empty">Your cart is empty.</div>) : (
            items.map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #1f2537' }}>
                <img src={p.images[0]} alt="" width={44} height={44} style={{ borderRadius: 8, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}><AnimatedText text={p.name} /></div>
                  <div style={{ color: 'var(--muted)', fontSize: 14 }}>₹{p.price.toFixed(2)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}

function Toast({ product }) {
  return (
    <div className={`toast ${product ? 'show' : ''}`}>
      <div className="toast-content">
        <img src={product?.images[0]} alt={product?.name} className="toast-image" />
        <div className="toast-text">
          <div className="toast-title">Added to Cart! ✓</div>
          <div className="toast-item">{product?.name}</div>
          <div className="toast-price">₹{product?.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, open, onClose, onAdd }) {
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Black');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [reviews, setReviews] = useLocalStorage(`reviews-${product?.id}`, []);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', text: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const onClickAdd = () => { onAdd(product); setAdded(true); setTimeout(() => setAdded(false), 2000); };

  const submitReview = (e) => {
    e.preventDefault();
    if (!newReview.title.trim() || !newReview.text.trim()) return;
    const review = { ...newReview, date: new Date().toLocaleDateString(), id: Date.now() };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, title: '', text: '' });
    setShowReviewForm(false);
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

  if (!product) return null;

  return (
    <>
      <div className={`product-modal-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <section className={`product-modal ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label={`View ${product.name}`}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-content-enhanced">
          <div className="modal-image-section">
            <div className="crossfade-large">
              {product.images.map((src, i) => (
                <img key={i} src={src} alt={product.name} className={i === active ? 'is-active' : ''} />
              ))}
            </div>
            <div className="image-thumbnails-large">
              {product.images.map((src, i) => (
                <button key={i} aria-label={`View image ${i + 1}`} onClick={() => setActive(i)} style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', padding: 0, border: i === active ? '3px solid var(--primary)' : '1px solid #2a2f40', background: '#0e1220', cursor: 'pointer', transition: 'all .2s ease' }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          <div className="modal-details-section">
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}><AnimatedText text={product.name} /></h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)' }}>₹{product.price.toFixed(2)}</div>
                {reviews.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)' }}>
                    <span style={{ fontSize: 14 }}>⭐ {avgRating}</span>
                    <span style={{ fontSize: 12 }}>({reviews.length})</span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                <span style={{ padding: '6px 12px', background: 'rgba(110,231,183,0.1)', borderRadius: 8, border: '1px solid #2a2f40', color: 'var(--primary)', fontSize: 12, fontWeight: 600 }}>{product.category}</span>
                {product.gender && <span style={{ padding: '6px 12px', background: '#191f32', borderRadius: 8, border: '1px solid #2a2f40', fontSize: 12 }}>{product.gender}</span>}
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                {product.description}
              </p>

              <div className="selection-group">
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Color</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                  {product.colors && product.colors.map((color) => (
                    <button key={color} onClick={() => setSelectedColor(color)} style={{ padding: '10px 14px', borderRadius: 10, border: selectedColor === color ? '2px solid var(--primary)' : '1px solid #2a2f40', background: '#0e1220', color: 'var(--ink)', cursor: 'pointer', fontWeight: 600, transition: 'all .2s ease', transform: selectedColor === color ? 'scale(1.05)' : 'scale(1)' }}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="selection-group">
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Size</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                  {product.sizes && product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} style={{ padding: '10px 14px', borderRadius: 10, border: selectedSize === size ? '2px solid var(--primary)' : '1px solid #2a2f40', background: '#0e1220', color: 'var(--ink)', cursor: 'pointer', fontWeight: 600, transition: 'all .2s ease', transform: selectedSize === size ? 'scale(1.05)' : 'scale(1)' }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="btn" onClick={onClickAdd} aria-live="polite" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
              </button>
            </div>

            <div style={{ borderTop: '1px solid #1f2537', paddingTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Customer Reviews</h3>
                <button className="btn secondary" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => setShowReviewForm(!showReviewForm)}>
                  {showReviewForm ? 'Cancel' : '✍️ Write Review'}
                </button>
              </div>

              {showReviewForm && (
                <form onSubmit={submitReview} style={{ display: 'grid', gap: 12, marginBottom: 20, padding: 16, background: '#0e1220', borderRadius: 12, border: '1px solid #1f2537' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Rating</label>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setNewReview({...newReview, rating: star})} style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', opacity: star <= newReview.rating ? 1 : 0.4 }}>
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Review Title</label>
                    <input type="text" required placeholder="e.g., Great quality and fit!" value={newReview.title} onChange={(e) => setNewReview({...newReview, title: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #2a2f40', background: '#161a22', color: 'var(--ink)', fontSize: 14 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Your Feedback</label>
                    <textarea required placeholder="Share your experience with this product..." value={newReview.text} onChange={(e) => setNewReview({...newReview, text: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #2a2f40', background: '#161a22', color: 'var(--ink)', fontSize: 14, minHeight: 80, fontFamily: 'inherit', resize: 'vertical' }} />
                  </div>
                  <button className="btn" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Post Review</button>
                </form>
              )}

              {reviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)', fontSize: 14 }}>No reviews yet. Be the first to share your thoughts!</div>
              ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                  {reviews.map((review) => (
                    <div key={review.id} style={{ padding: 14, background: '#0e1220', borderRadius: 12, border: '1px solid #1f2537' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>{[...Array(review.rating)].map((_, i) => '⭐').join('')}</span>
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{review.date}</span>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4, fontSize: 14 }}>{review.title}</div>
                      <p style={{ color: 'var(--muted)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AccountDashboard({ open, onClose, user, setUser }) {
  const [tab, setTab] = useState(user ? 'profile' : 'signin');
  useEffect(() => { setTab(user ? 'profile' : 'signin'); }, [user]);
  const [profile, setProfile] = useState(user || { name: '', email: '' });
  const [addresses, setAddresses] = useLocalStorage('addresses', []);
  const [newsletter, setNewsletter] = useLocalStorage('newsletter', true);
  const orders = useMemo(() => {
    const sample = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[5]];
    return [
      { id: 'o1', date: '2024-12-02', total: 268, items: [sample[0], sample[1]] },
      { id: 'o2', date: '2025-01-18', total: 149, items: [sample[2]] },
    ];
  }, []);

  const signIn = (e) => { e.preventDefault(); if (!profile.name || !profile.email) return; setUser(profile); };
  const saveProfile = (e) => { e.preventDefault(); setUser(profile); };
  const signOut = () => { setUser(null); };

  return (
    <>
      <div className={`account-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <section className={`account-modal ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Account">
        <header className="account-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img className="avatar" src={IMG.avatar} alt="Avatar" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--ink)' }}><AnimatedText text={user ? user.name : 'Guest Account'} /></div>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 3 }}>{user ? user.email : 'Sign in to unlock features'}</div>
            </div>
          </div>
          <button className="btn secondary" onClick={onClose}>✕ Close</button>
        </header>
        <div className="account-body">
          <nav className="account-tabs">
            {!user && <button className={`tab-btn ${tab==='signin'?'active':''}`} onClick={() => setTab('signin')}>🔐 Sign In</button>}
            {user && <button className={`tab-btn ${tab==='profile'?'active':''}`} onClick={() => setTab('profile')}>👤 Profile</button>}
            {user && <button className={`tab-btn ${tab==='orders'?'active':''}`} onClick={() => setTab('orders')}>📦 Orders</button>}
            {user && <button className={`tab-btn ${tab==='addresses'?'active':''}`} onClick={() => setTab('addresses')}>📍 Addresses</button>}
            <button className={`tab-btn ${tab==='settings'?'active':''}`} onClick={() => setTab('settings')}>⚙️ Settings</button>
            {user && <button className="tab-btn" onClick={signOut} style={{ marginTop: 'auto' }}>🚪 Logout</button>}
          </nav>
          <main className="account-content">
            {tab === 'signin' && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', color: 'var(--ink)' }}>Welcome Back</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>Create or sign into your account to track orders and manage preferences.</p>
                </div>
                <form onSubmit={signIn} style={{ display: 'grid', gap: 14 }}>
                  <div className="field"><label>Full Name</label><input placeholder="Enter your name" value={profile.name} onChange={(e)=>setProfile(p=>({...p, name:e.target.value}))} required /></div>
                  <div className="field"><label>Email Address</label><input type="email" placeholder="you@example.com" value={profile.email} onChange={(e)=>setProfile(p=>({...p, email:e.target.value}))} required /></div>
                  <button className="btn" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>Sign In Now</button>
                </form>
              </div>
            )}
            {tab === 'profile' && user && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', color: 'var(--ink)' }}>Profile Information</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>Update your personal details and account information.</p>
                </div>
                <form onSubmit={saveProfile} style={{ display: 'grid', gap: 14 }}>
                  <div className="field"><label>Full Name</label><input value={profile.name} onChange={(e)=>setProfile(p=>({...p, name:e.target.value}))} /></div>
                  <div className="field"><label>Email Address</label><input type="email" value={profile.email} onChange={(e)=>setProfile(p=>({...p, email:e.target.value}))} /></div>
                  <button className="btn" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>Save Changes</button>
                </form>
              </div>
            )}
            {tab === 'orders' && user && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', color: 'var(--ink)' }}>Order History</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>Track your past purchases and order details.</p>
                </div>
                <div className="list">
                  {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--muted)' }}>No orders yet. Start shopping!</div>
                  ) : (
                    orders.map(o => (
                      <div key={o.id} className="list-item" style={{ padding: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 1 }}>
                          <img src={o.items[0].images[0]} alt="" width={64} height={64} style={{ borderRadius: 12, objectFit: 'cover', border: '1px solid #2a2f40' }} />
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}><AnimatedText text={`Order #${o.id.slice(-2).toUpperCase()}`} /></div>
                            <div style={{ color: 'var(--muted)', fontSize: 13 }}>Placed on {o.date}</div>
                            <div style={{ color: 'var(--muted)', fontSize: 13 }}>{o.items.length} item(s)</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 16 }}>₹{o.total.toFixed(2)}</div>
                          <button className="btn secondary" style={{ fontSize: 12, padding: '6px 10px', marginTop: 6 }}>View</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            {tab === 'addresses' && user && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', color: 'var(--ink)' }}>Saved Addresses</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>Manage your shipping and billing addresses.</p>
                </div>
                <div className="list">
                  {addresses.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)', borderRadius: 12, border: '1px dashed #2a2f40' }}>No addresses yet. Add one below!</div>
                  ) : (
                    addresses.map((a, idx) => (
                      <div key={idx} className="list-item address-item">
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}><AnimatedText text={a.name} /></div>
                          <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>{a.street}<br />{a.city} {a.zip}, {a.country}</div>
                        </div>
                        <button className="btn secondary" style={{ fontSize: 12, padding: '6px 10px', whiteSpace: 'nowrap' }} onClick={()=>setAddresses(addresses.filter((_,i)=>i!==idx))}>Remove</button>
                      </div>
                    ))
                  )}
                </div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #1f2537' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>Add New Address</h4>
                  <AddressForm onAdd={(addr)=>setAddresses([...addresses, addr])} />
                </div>
              </div>
            )}
            {tab === 'settings' && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', color: 'var(--ink)' }}>Preferences</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>Manage your notification and communication settings.</p>
                </div>
                <div style={{ display: 'grid', gap: 12 }}>
                  <label className="list-item" style={{ cursor: 'pointer', justifyContent: 'space-between', alignItems: 'center', paddingRight: 16 }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}><AnimatedText text="Email Notifications" /></div>
                      <div style={{ color: 'var(--muted)', fontSize: 13 }}>Receive updates about new drops and exclusive offers</div>
                    </div>
                    <input type="checkbox" checked={!!newsletter} onChange={(e)=>setNewsletter(!!e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer', accentColor: 'var(--primary)' }} />
                  </label>
                  <div className="list-item" style={{ opacity: 0.6, pointerEvents: 'none' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}><AnimatedText text="SMS Notifications" /></div>
                      <div style={{ color: 'var(--muted)', fontSize: 13 }}>Text message updates (Coming soon)</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #1f2537' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Account</h4>
                  <button className="btn secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setUser(null)}>🚪 Sign Out</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>
    </>
  );
}

function AddressForm({ onAdd }) {
  const [form, setForm] = useState({ name:'', street:'', city:'', zip:'', country:'' });
  const submit = (e) => { e.preventDefault(); if (!form.name || !form.street) return; onAdd(form); setForm({ name:'', street:'', city:'', zip:'', country:'' }); };
  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
      <div className="field"><label>Address Label</label><input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="e.g., Home, Office" required /></div>
      <div className="field"><label>Street Address</label><input value={form.street} onChange={(e)=>setForm({...form,street:e.target.value})} placeholder="Street and building number" required /></div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div className="field"><label>City</label><input value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} placeholder="City" /></div>
        <div className="field"><label>PIN Code</label><input value={form.zip} onChange={(e)=>setForm({...form,zip:e.target.value})} placeholder="ZIP/PIN" /></div>
      </div>
      <div className="field"><label>Country</label><input value={form.country} onChange={(e)=>setForm({...form,country:e.target.value})} placeholder="Country" /></div>
      <button className="btn" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>+ Add Address</button>
    </form>
  );
}

function Toolbar({ categories, active, setActive, sort, setSort }) {
  return (
    <div className="toolbar">
      <div className="chips">
        <button className={`chip ${active === 'All' ? 'active' : ''}`} onClick={() => { setActive('All'); window.scrollTo({ top: document.querySelector('.section') ? document.querySelector('.section').offsetTop - 100 : 0, behavior: 'smooth' }); }}>All</button>
        {categories.map((c) => (
          <button key={c} className={`chip ${active === c ? 'active' : ''}`} onClick={() => { setActive(c); window.scrollTo({ top: document.querySelector('.section') ? document.querySelector('.section').offsetTop - 100 : 0, behavior: 'smooth' }); }}>{c}</button>
        ))}
      </div>
      <label>
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popular">Sort: Popular</option>
          <option value="price-asc">Sort: Price (Low→High)</option>
          <option value="price-desc">Sort: Price (High→Low)</option>
          <option value="name">Sort: Name</option>
        </select>
      </label>
    </div>
  );
}

export default function App() {
  const rootRef = useIntersectionReveal('.reveal');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [visible, setVisible] = useState(8);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useLocalStorage('user', null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedProduct, setAddedProduct] = useState(null);

  const scrollToId = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  useEffect(() => { if (!query) { setIsSearching(false); return; } setIsSearching(true); const t = setTimeout(() => setIsSearching(false), 500); return () => clearTimeout(t); }, [query]);

  const onAdd = (product) => {
    setItems((prev) => [...prev, product]);
    setAddedProduct(product);
    setTimeout(() => setAddedProduct(null), 3000);
  };

  const categories = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.category))), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter(p => (category === 'All' || p.category === category) && (!q || p.name.toLowerCase().includes(q)));
    if (sort === 'price-asc') list = [...list].sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a,b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [query, category, sort]);

  const womenBase = useMemo(() => PRODUCTS.filter(p => p.gender === 'Women' && p.category !== 'Traditional'), []);
  const womenShown = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = womenBase;
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
    return list.slice(0, 6);
  }, [womenBase, query]);

  const tradWomen = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter(p => p.gender === 'Women' && p.category === 'Traditional');
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
    return list;
  }, [query]);

  const tradMen = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter(p => p.gender === 'Men' && p.category === 'Traditional');
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
    return list;
  }, [query]);

  const featured = filtered.slice(0, Math.min(4, filtered.length));
  const newArrivals = filtered.slice(2, Math.min(visible, filtered.length));

  return (
    <div ref={rootRef} className="page-content">
      <div className="bg-video" aria-hidden><video src={VIDEO_BG} autoPlay muted loop playsInline poster={IMG.cityGroup} /></div>

      <Navbar onAccount={() => setAccountOpen(true)} onNavigate={scrollToId} cartCount={items.length} onCartClick={() => setCartOpen(true)} />

      <div className="container">
        <Hero onShop={() => scrollToId('featured')} onNavigate={scrollToId} />

        <div className="search-wrap">
          <input aria-label="Search products" className={`search-input ${isSearching ? 'loading' : ''}`} placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') e.preventDefault(); }} />
          {query && <button className="search-clear" onClick={() => { setQuery(''); setCategory('All'); }} aria-label="Clear search">✕</button>}
        </div>

        <Toolbar categories={categories} active={category} setActive={setCategory} sort={sort} setSort={setSort} />

        <section id="featured" className="section">
          <h2 className="reveal"><AnimatedText text="Featured Products" className="text-gradient-anim" /></h2>
          <div className="grid reveal">{featured.map((p) => (<ProductCard key={p.id} product={p} onAdd={onAdd} onView={setSelectedProduct} />))}</div>
        </section>

        <section id="women" className="section">
          <h2 className="reveal"><AnimatedText text="Women" className="text-gradient-anim" /></h2>
          <div className="grid reveal">{womenShown.map((p) => (<ProductCard key={p.id} product={p} onAdd={onAdd} onView={setSelectedProduct} />))}</div>
        </section>

        <section id="traditional" className="section">
          <h2 className="reveal"><AnimatedText text="Traditional" className="text-gradient-anim" /></h2>
          <h3 className="reveal"><AnimatedText text="Women" /></h3>
          <div className="grid reveal" style={{ marginBottom: 16 }}>{tradWomen.map((p) => (<ProductCard key={p.id} product={p} onAdd={onAdd} onView={setSelectedProduct} />))}</div>
          <h3 className="reveal"><AnimatedText text="Men" /></h3>
          <div className="grid reveal">{tradMen.map((p) => (<ProductCard key={p.id} product={p} onAdd={onAdd} onView={setSelectedProduct} />))}</div>
        </section>

        <section className="section">
          <h2 className="reveal"><AnimatedText text="Collections" className="text-gradient-anim" /></h2>
          <div className="collections reveal">
            <button type="button" className="collection-card" style={{ backgroundImage: `url(${IMG.cityGroup})` }} onClick={() => setCategory('Jackets')}>
              <div><div className="title"><AnimatedText text="Streetwear" /></div><div className="price" style={{ marginTop: 4 }}>Urban cuts · Layered textures</div></div>
            </button>
            <button type="button" className="collection-card" style={{ backgroundImage: `url(${IMG.studio})` }} onClick={() => setCategory('Tops')}>
              <div><div className="title"><AnimatedText text="Studio Minimal" /></div><div className="price" style={{ marginTop: 4 }}>Clean silhouettes · Soft palettes</div></div>
            </button>
          </div>
        </section>

        <section id="new" className="section">
          <h2 className="reveal"><AnimatedText text="New Arrivals" className="text-gradient-anim" /></h2>
          <div className="grid reveal">{newArrivals.map((p) => (<ProductCard key={p.id} product={p} onAdd={onAdd} onView={setSelectedProduct} />))}</div>
          {visible < filtered.length && (<div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}><button className="btn secondary" onClick={() => setVisible(v => v + 6)}>Load more</button></div>)}
        </section>

        <section className="section">
          <h2 className="reveal"><AnimatedText text="Lookbook" className="text-gradient-anim" /></h2>
          <div className="lookbook reveal">{[IMG.cityGroup, IMG.studio, IMG.future, IMG.jacket, IMG.denim].map((src, i) => (<div className="card" key={i}><img src={src} alt="Lookbook" /></div>))}</div>
        </section>

        <section className="section">
          <div className="newsletter reveal">
            <div style={{ fontWeight: 800, fontSize: 18 }}><AnimatedText text="Get 10% off your first order" /></div>
            <div className="price">Join the list. New drops, early access, no spam.</div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
              <input type="email" required placeholder="you@example.com" />
              <button className="btn" type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </div>

      <Toast product={addedProduct} />
      <ProductModal product={selectedProduct} open={!!selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={onAdd} />
      <AccountDashboard open={accountOpen} onClose={()=>setAccountOpen(false)} user={user} setUser={setUser} />
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} items={items} />
    </div>
  );
}
