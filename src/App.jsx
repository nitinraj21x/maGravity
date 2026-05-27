import React, { useState, useEffect } from 'react';
import './App.css';

// ==========================================================================
// Collections & Pieces Data
// ==========================================================================
const COLLECTIONS = [
  {
    id: 'bridal',
    title: 'Bridal Heirlooms',
    image: '/bridal_heirloom.png',
    story: 'The Bridal Heirlooms collection is crafted for the sacred walk of marriage, blending traditional weight with fine contemporary detail. Inspired by the heavy bridal chokers and mango malas of South India\'s regal histories, these pieces are hand-hammered in 22k gold, set with deep red rubies and flat-cut diamonds. They are not made for a single day, but as the foundational treasure of a family\'s next generation.',
    items: [
      { name: 'Swarna Manga Mala', detail: '22k Gold Mango Motifs set with Cabochon Kemp Rubies' },
      { name: 'Mylapore Heritage Choker', detail: 'Traditional Red-Kemp Kundan Setting on Crimson Velvet Backing' },
      { name: 'Aira Bridal Vanki', detail: 'Hand-carved Peacock motif armlet with dangling south sea pearls' },
      { name: 'Guttapusalu Pearl Choker', detail: 'Tightly woven rice pearls surrounding kemp and diamond floral cluster' }
    ]
  },
  {
    id: 'temple',
    title: 'Temple-Inspired Pieces',
    image: '/temple_inspired.png',
    story: 'Evoking the divine architecture and sculpture of South India, the Temple-Inspired collection replicates the stone carvings of Mylapore\'s Kapaleeshwarar temple. Crafted by master goldsmiths who specialize in traditional nakshi repoussé work, each piece features depictions of peacocks, lotuses, and celestial guardians. Antique gold patinas are blended with rich kemp stones to create pieces that feel like ancient treasures.',
    items: [
      { name: 'Kapalee Peacock Pendant', detail: 'Repoussé 22k Gold medallion featuring kemp stones and emerald' },
      { name: 'Lotus Blossom Jhumkas', detail: 'Dangling step earrings with intricate lotus flower goldwork' },
      { name: 'Swarnam Kasu Mala', detail: 'Antique gold coins with relief stamps of Goddess Lakshmi' },
      { name: 'Vrishabha Temple Kada', detail: 'Heavy hinged gold bangle featuring carved bull terminals and ruby stones' }
    ]
  },
  {
    id: 'classics',
    title: 'Everyday Classics',
    image: '/everyday_classic.png',
    story: 'Everyday Classics are designed to bring the warmth of heirloom gold into the routines of daily life. These are lightweight versions of traditional motifs, styled with clean lines for the modern woman who carries her heritage wherever she goes. Subtly elegant, these pieces are simple yet deeply rich in history.',
    items: [
      { name: 'Miniature Kemp Studs', detail: 'Dainty gold studs set with circular ruby kemp stones' },
      { name: 'Sandalwood Hammered Band', detail: '22k Gold ring band with hand-carved sandalwood bark texture' },
      { name: 'Mylapore Bead Pendant', detail: 'Sleek gold chain with single hand-molded gold bead' },
      { name: 'Slim Nakshi Bangles', detail: 'Thin, stackable gold bangles with delicate floral engravings' }
    ]
  },
  {
    id: 'commissions',
    title: 'Custom Commissions',
    image: '/custom_commission.png',
    story: 'Custom Commissions is our bespoke service dedicated to creating personal monuments of memory. Whether melting down inherited gold to forge new shapes, resetting family stones, or sketching a completely original design that captures your personal legacy, we work closely with you through every detail. The resulting jewelry is a true continuation of your story.',
    items: [
      { name: 'The Shankari Redesign', detail: 'Ancestral diamond and ruby collar redesigned into a modern choker' },
      { name: 'Swamy Emblem Signet', detail: 'Heavy 22k gold signet ring featuring custom family crest engraving' },
      { name: 'Vidya Memory Locket', detail: 'Hand-engraved folding locket crafted in solid gold' },
      { name: 'The Swarnam Cuff', detail: 'Gold cuff made by incorporating client\'s heirloom gold wire work' }
    ]
  },
  {
    id: 'revivals',
    title: 'Heritage Revivals',
    image: '/heritage_revival.png',
    story: 'Heritage Revivals is a research-led endeavor dedicated to resurrecting lost or forgotten jewelry-making techniques of South India. From the delicate weaving of thousands of tiny seed pearls in Guttapusalu necklaces to the specific sand-casting methods of ancient royal workshops, this collection preserves our intangible cultural heritage through physical beauty.',
    items: [
      { name: 'Royal Guttapusalu Necklace', detail: 'Recreation of 19th-century design with dense hand-strung pearl clusters' },
      { name: 'Vintage Vanki Armlet', detail: 'Traditional V-shaped armband recreated from old sketches' },
      { name: 'Antique Ottiyanam Belt', detail: 'Gold waist chain with traditional animal and deity filigree' },
      { name: 'Leo Kaappu Bangle', detail: 'Thick twisted gold wire bangle finished with hand-etched lion terminals' }
    ]
  }
];

// ==========================================================================
// Craftsmanship Process Data
// ==========================================================================
const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Concept & Story',
    subtitle: 'கற்பனை',
    image: '/custom_commission.png',
    desc: 'Every piece begins not with metal, but with memory. We collect family stories, research historical archives, sketch motifs inspired by Mylapore temple arches, and map out the visual weight and balance of the design on parchment.'
  },
  {
    step: 2,
    title: 'Stone Selection',
    subtitle: 'கல் தேர்வு',
    image: '/hero_jewel.png',
    desc: 'We source natural, uncut diamonds (Polki), deep red kemp rubies, and premium cabochon emeralds. Each gemstone is chosen for its unique character, saturation of color, and ability to hold warm light under traditional settings.'
  },
  {
    step: 3,
    title: 'Handcrafting',
    subtitle: 'கைவினை',
    image: '/craft_process.png',
    desc: 'Senior master artisans (Thattars) in our Mylapore workshop hand-carve, hammer, and chase the 22k gold. Ancient techniques like repoussé (nakshi) and filigree are utilized to raise three-dimensional gold motifs from flat sheets.'
  },
  {
    step: 4,
    title: 'Finishing & Detailing',
    subtitle: 'மெருகூட்டல்',
    image: '/temple_inspired.png',
    desc: 'Using natural polishing compounds and antique patinas, we bring out the warm, buttery luster of high-carat gold. Stones are set using the ancient Kundan technique, sealing them in layers of pure, pressed gold foil.'
  },
  {
    step: 5,
    title: 'Passed Into Your Hands',
    subtitle: 'சமர்ப்பித்தல்',
    image: '/bridal_heirloom.png',
    desc: 'The finished heirloom is placed on raw silk inside a wooden presentation box. More than a piece of craft, it is delivered as an unfinished sentence—ready to gather stories and be passed down through generations.'
  }
];

// ==========================================================================
// Editorial Journal Data
// ==========================================================================
const JOURNAL_POSTS = [
  {
    id: 'post-1',
    title: 'The Story of Heirloom Jewelry',
    tag: 'Heritage Lore',
    date: 'May 24, 2026',
    excerpt: 'In South India, jewelry was never mere ornamentation; it was an investment of trust, a store of family memory, and a talisman. We trace the history of passing gold down generations.',
    image: '/bridal_heirloom.png',
    body: (
      <>
        <p>Heirloom jewelry is a physical manifestation of time. In South Indian culture, jewelry was never created to be discarded or styled for a single season. It represented the family's honor, its security, and its memory. A piece of gold is melted, reformed, and worn, yet it carries the soul of the hands that held it first.</p>
        <blockquote>“Some things are not made—they are continued. The gold around your neck carries the heartbeat of the grandmother you never met.”</blockquote>
        <p>At Murthy Ateliers, we honor this continuity. When clients bring us ancestral pieces, we do not view them as raw materials. We study the old carvings, note the wear of the metal where it rested against skin, and design the new piece to carry that history forward. A marriage of historical weight and contemporary elegance ensures the piece will be worn, loved, and passed on for another hundred years.</p>
      </>
    )
  },
  {
    id: 'post-2',
    title: 'Mylapore & Our Craft Heritage',
    tag: 'Atelier Notes',
    date: 'April 15, 2026',
    excerpt: 'Mylapore is not just a neighborhood; it is a living archive of art. We explore the connection between this sacred geography and the integrity of traditional goldsmithing.',
    image: '/founder_story.png',
    body: (
      <>
        <p>Mylapore is a historic neighborhood in Chennai, famous for its grand Kapaleeshwarar Temple, bronze sculptors, and traditional silk weavers. But hidden in its narrow streets are the workshops of the traditional goldsmiths (Thattars) who have built Mylapore's reputation for trust and mastery over generations.</p>
        <p>It was here that D.K. Murthy spent his lifetime building Swamy Jewelers. The trust of families was not built overnight; it was forged through the integrity of gold and the beauty of the craft. Murthy Ateliers is a continuation of that heritage, operating from the heart of Mylapore with the same devotion to the ancient craft.</p>
        <blockquote>“To create in Mylapore is to hear the bells of the temple and the tapping of the goldsmith's hammer in the same breath.”</blockquote>
        <p>Every piece we craft carries this sacred geography. The peacock motifs, the lotus designs, and the temple arches that adorn our jewelry are directly inspired by the stone carvings and cultural life that surround our atelier.</p>
      </>
    )
  },
  {
    id: 'post-3',
    title: 'Preserving and Caring for Antique Gold',
    tag: 'Care Guide',
    date: 'March 08, 2026',
    excerpt: 'High-carat traditional gold and kemp stones require gentle care to preserve their warm, soft luster. Read our comprehensive care guide from our senior craftsmen.',
    image: '/everyday_classic.png',
    body: (
      <>
        <p>High-carat gold (22k) is a soft metal, susceptible to scratches if stored improperly. Similarly, traditional South Indian kemp stones are set with thin gold foils (Kundan technique) which must be kept free from moisture to prevent darkening.</p>
        <p>Our senior craftsmen recommend the following rituals to preserve your Murthy Ateliers pieces:</p>
        <ul>
          <li><strong>Storage:</strong> Always store each piece separately in a dry, velvet-lined box or a soft cotton pouch. Avoid mixing different gemstones together to prevent friction.</li>
          <li><strong>Moisture:</strong> Never expose kemp jewelry or gold foil jewelry to water. Keep them away from perfumes, oils, and cosmetics. Apply your cosmetics and fragrance first, and let them dry completely before putting on your jewelry.</li>
          <li><strong>Cleaning:</strong> Clean your jewelry after wearing by wiping it gently with a dry, soft chamois or cotton cloth. Do not use chemical cleaners, soap, or water on foil-set kemp stones.</li>
        </ul>
        <p>By treating your jewelry with intention and care, you ensure it retains its warm patina and hand-finished character for the next generation.</p>
      </>
    )
  }
];

// ==========================================================================
// FAQ Data
// ==========================================================================
const FAQ_ITEMS = [
  {
    question: 'Do you offer custom-made jewelry?',
    answer: 'Yes. Custom commissions are at the heart of what we do. We work closely with clients to design unique legacy pieces that reflect personal stories, using high-quality 22k gold and curated precious stones.'
  },
  {
    question: 'Can heirloom jewelry be redesigned?',
    answer: 'Absolutely. We specialize in redesigning ancestral jewelry. We can melt down inherited gold and reset family gemstones to create contemporary designs while carefully documenting and preserving the history and sentiment of the original piece.'
  },
  {
    question: 'How long does a bespoke piece take?',
    answer: 'A bespoke commission typically takes between 6 to 10 weeks, depending on the complexity of the design and the stone sourcing process. We prioritize meticulous craftsmanship over speed, ensuring each piece is made to last.'
  },
  {
    question: 'Do you work by appointment only?',
    answer: 'Yes, our Mylapore atelier operates by appointment to ensure we give each client our undivided attention. We host consultations in person or via private video calls for clients located worldwide.'
  },
  {
    question: 'How should heirloom jewelry be cared for?',
    answer: 'Heirloom gold and foil-set kemp stones must be protected from moisture, cosmetics, and friction. We recommend wiping them with a dry soft cloth after use and storing them separately in our velvet-lined boxes. Water and chemical cleanings should be avoided.'
  },
  {
    question: 'Can pieces be made in different finishes or stones?',
    answer: 'Yes. Every design shown in our collections can be tailored to your preference. We can adjust the gold finish (matte, antique patina, or bright gold) and source specific gemstones like rubies, emeralds, pearls, or diamonds.'
  }
];

// ==========================================================================
// Testimonials / Stories Data
// ==========================================================================
const TESTIMONIALS = [
  {
    quote: "My daughter wore my wedding bangles redesigned by Murthy Ateliers. Seeing our ancestral gold transformed into a contemporary piece, while retaining the soul of my mother's jewelry, was deeply emotional.",
    author: "Devi K.",
    location: "Mylapore, Chennai"
  },
  {
    quote: "We wanted a piece that reminded us of home after moving abroad. The temple pendant Murthy Ateliers made for us feels like a small temple arch we can carry near our hearts.",
    author: "Anand S.",
    location: "New York, USA"
  },
  {
    quote: "Vidya and her team did not just make a necklace; they listened to our family history, studied old portraits of my grandmother, and crafted a story. It is now my most treasured possession.",
    author: "Priya R.",
    location: "Bangalore, India"
  }
];

export default function App() {
  // Navigation states
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive component states
  const [activeCollection, setActiveCollection] = useState(null);
  const [activeJournal, setActiveJournal] = useState(null);
  const [activeProcessStep, setActiveProcessStep] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Booking & Inquiry states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Consultation',
    date: '',
    notes: ''
  });

  // Handle scroll to shrink header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle testimonial autoplay slider
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Open booking modal with prefilled details
  const openBookingModal = (serviceType = 'Consultation', notesPrefill = '') => {
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      service: serviceType,
      date: '',
      notes: notesPrefill
    });
    setBookingSuccess(false);
    setIsBookingOpen(true);
    setMobileMenuOpen(false);
  };

  // Close booking modal
  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingSuccess(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate simple required fields
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert('Please fill out all required fields.');
      return;
    }
    // Simulate API call and transition to success
    setBookingSuccess(true);
  };

  // Smooth scroll helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      {/* ==========================================================================
         Header & Navigation
         ========================================================================== */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="logo-main">Murthy Ateliers</span>
            <span className="logo-sub">Heirloom Jewels</span>
          </a>

          <nav className="nav-desktop">
            <a href="#story" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('story'); }}>The Story</a>
            <a href="#philosophy" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); }}>Philosophy</a>
            <a href="#collections" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('collections'); }}>Collections</a>
            <a href="#process" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>The Process</a>
            <a href="#journal" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('journal'); }}>Journal</a>
            <a href="#faq" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
            <button className="btn btn-primary nav-cta" onClick={() => openBookingModal('Consultation', 'I would like to book a general consultation at the Mylapore Atelier.')}>
              Book Consultation
            </button>
          </nav>

          <button className="nav-toggle-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Navigation Menu">
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#story" className="nav-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('story'); }}>The Story</a>
        <a href="#philosophy" className="nav-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); }}>Philosophy</a>
        <a href="#collections" className="nav-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('collections'); }}>Collections</a>
        <a href="#process" className="nav-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>The Process</a>
        <a href="#journal" className="nav-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('journal'); }}>Journal</a>
        <a href="#faq" className="nav-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
        <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => openBookingModal('Consultation', 'I would like to book a general consultation at the Mylapore Atelier.')}>
          Book Consultation
        </button>
      </nav>

      {/* ==========================================================================
         Hero Section
         ========================================================================== */}
      <section className="hero-sec">
        <div className="hero-bg" style={{ backgroundImage: `url('/hero_jewel.png')` }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-pretitle">Murthy Ateliers by 9th</span>
          <h1 className="hero-title">Heirloom Jewels for <span>Generations to Come</span></h1>
          <p className="hero-sub">
            Crafted with memory, intention, and timeless artistry — Murthy Ateliers creates jewels meant to be worn, loved, and passed on.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => scrollToSection('collections')}>Explore Collections</button>
            <button className="btn btn-secondary hero-btn-alt" onClick={() => openBookingModal('Consultation', 'I would like to book a private heirloom consultation.')}>Book a Consultation</button>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         Founder Story Section
         ========================================================================== */}
      <section id="story" className="section container">
        <div className="founder-grid">
          <div className="founder-image-wrapper">
            <div className="founder-img-frame">
              <img src="/founder_story.png" alt="Archival sketch of Mylapore jewelry workshop" className="founder-img" />
            </div>
          </div>
          <div className="founder-note">
            <span className="section-subtitle">A Legacy Continued</span>
            <h2 className="tamil-greeting">வாழ்க வளமுடன்</h2>
            <span className="tamil-sub">May you live and flourish</span>
            
            <div className="founder-body">
              <p>
                This piece carries a name — <strong>Shanthi Shankar</strong>, jeweller’s daughter, a woman of warmth and grace who was still becoming when we lost her.
              </p>
              <p>
                She was the daughter of <strong>D.K. Murthy</strong>, who spent a lifetime building something real in the heart of Mylapore — the trust of families, the integrity of craft, beauty made to outlast the hands that made it.
              </p>
              <p>
                Murthy Ateliers is her unfinished sentence, continued. We carry that goodwill forward into every piece, with gratitude for everything they built and love for where it is going.
              </p>
              <p>
                We are so glad this found its way to you. Wear it with intention. Keep it long. Pass it on.
              </p>
            </div>

            <div className="founder-signature">
              <div>
                <div className="sig-name">Vidya Shankaran</div>
                <div className="sig-title">Founder, Murthy Ateliers</div>
              </div>
              <div className="sig-script">Vidya</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         Brand Philosophy Section
         ========================================================================== */ }
      <section id="philosophy" className="section" style={{ backgroundColor: 'rgba(145, 157, 123, 0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle">Brand Philosophy</span>
            <h2 className="section-title">Made to Outlive <span>Trends</span></h2>
            <div className="divider-gold"></div>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <span className="philosophy-num">i</span>
              <h3 className="philosophy-card-title">Craftsmanship</h3>
              <p>
                Handcrafted with absolute attention to detail, preserving traditional South Indian artistry while embracing contemporary elegance.
              </p>
            </div>
            <div className="philosophy-card">
              <span className="philosophy-num">ii</span>
              <h3 className="philosophy-card-title">Meaning</h3>
              <p>
                Every jewel carries emotion, memory, and personal significance. It is designed to be a physical storage of your stories, far beyond simple ornamentation.
              </p>
            </div>
            <div className="philosophy-card">
              <span className="philosophy-num">iii</span>
              <h3 className="philosophy-card-title">Heirloom Value</h3>
              <p>
                Designed not for fleeting seasons or fast trends, but to endure physically and aesthetically across generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         Signature Collections Section
         ========================================================================== */}
      <section id="collections" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-subtitle">Signature Collections</span>
          <h2 className="section-title">Curated <span>Heritage</span></h2>
          <div className="divider-gold"></div>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.8 }} className="founder-body">
            Explore our collections, each telling a distinct story of culture, craftsmanship, and legacy. Tap on a collection to read its story and request details.
          </p>
        </div>

        <div className="collections-grid">
          {COLLECTIONS.map((col) => (
            <div key={col.id} className="collection-card animate-fade-in" onClick={() => setActiveCollection(col)}>
              <img src={col.image} alt={col.title} className="collection-card-img" />
              <div className="collection-card-overlay">
                <h3 className="collection-card-title">{col.title}</h3>
                <span className="collection-card-cta">
                  Explore Lore 
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Immersive Gallery Modal Overlay */}
      {activeCollection && (
        <div className="gallery-overlay">
          <button className="gallery-close-btn" onClick={() => setActiveCollection(null)} aria-label="Close Gallery">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>

          <div className="gallery-header">
            <span className="section-subtitle">Murthy Ateliers Archive</span>
            <h2 className="gallery-title">{activeCollection.title}</h2>
            <p className="gallery-description">{activeCollection.story}</p>
          </div>

          <div className="container">
            <div className="gallery-masonry">
              {activeCollection.items.map((item, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={activeCollection.image} alt={item.name} className="gallery-item-img" />
                  <div className="gallery-item-caption">
                    <h4 className="gallery-item-title">{item.name}</h4>
                    <span className="gallery-item-detail">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="gallery-footer">
              <p className="gallery-footer-text">
                Interested in discovering the design detail, weight, and customization options for pieces in this collection?
              </p>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  const prefillNote = `I am interested in requesting details for the "${activeCollection.title}" collection.`;
                  openBookingModal('Inquiry', prefillNote);
                }}
              >
                Request Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
         Craftsmanship Process Section
         ========================================================================== */}
      <section id="process" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">Craftsmanship Process</span>
          <h2 className="section-title">The Making of <span>an Heirloom</span></h2>
          <div className="divider-gold"></div>
        </div>

        <div className="process-container">
          <div className="process-line"></div>
          <div className="process-timeline">
            {PROCESS_STEPS.map((step) => (
              <div 
                key={step.step} 
                className={`process-step ${activeProcessStep === step.step ? 'active' : ''}`}
                onClick={() => setActiveProcessStep(step.step)}
              >
                <div className="process-node">
                  {step.step}
                </div>
                <h4 className="process-step-title">{step.title}</h4>
                <span className="process-step-sub">{step.subtitle}</span>
              </div>
            ))}
          </div>

          {/* Detailed step content display card */}
          {PROCESS_STEPS.map((step) => {
            if (step.step !== activeProcessStep) return null;
            return (
              <div key={step.step} className="process-details-card">
                <div>
                  <img src={step.image} alt={step.title} className="process-details-img" />
                </div>
                <div className="process-details-content">
                  <span className="process-details-num">{step.step.toString().padStart(2, '0')}</span>
                  <h3 className="process-details-title">{step.title} <span>{step.subtitle}</span></h3>
                  <p className="process-details-desc founder-body">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================================================
         Bespoke / Custom Jewelry Section
         ========================================================================== */}
      <section className="section bespoke-sec">
        <div className="container">
          <div className="bespoke-content">
            <span className="section-subtitle" style={{ color: 'var(--color-gold)' }}>Bespoke Creations</span>
            <h2 className="bespoke-title">Create <span>Something Personal</span></h2>
            <p className="bespoke-desc">
              Whether reimagining inherited jewels or creating a new legacy piece, we work closely with clients to design jewelry rooted in sentiment and individuality.
            </p>
            <div className="bespoke-ctas">
              <button className="btn btn-white" onClick={() => openBookingModal('Bespoke Consultation', 'I would like to discuss a custom legacy piece commission.')}>
                Begin Your Consultation
              </button>
              <button className="btn btn-white-border" onClick={() => openBookingModal('Share Story', 'I would like to share our family jewelry story and discuss redesign ideas.')}>
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         Editorial / Journal Section
         ========================================================================== */}
      <section id="journal" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-subtitle">Notes From the Atelier</span>
          <h2 className="section-title">The Journal</h2>
          <div className="divider-gold"></div>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.8 }} className="founder-body">
            A storytelling-led editorial space featuring reflections on heritage, craftsmanship, culture, and preservation.
          </p>
        </div>

        <div className="journal-grid">
          {JOURNAL_POSTS.map((post) => (
            <div key={post.id} className="journal-card">
              <img src={post.image} alt={post.title} className="journal-card-img" />
              <div className="journal-card-content">
                <span className="journal-card-tag">{post.tag}</span>
                <h3 className="journal-card-title">{post.title}</h3>
                <p className="journal-card-excerpt">{post.excerpt}</p>
                <button className="btn-text" style={{ alignSelf: 'flex-start' }} onClick={() => setActiveJournal(post)}>
                  Read Narrative
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Article Sliding Drawer */}
      <div className={`journal-drawer ${activeJournal ? 'open' : ''}`}>
        {activeJournal && (
          <>
            <button className="journal-drawer-close" onClick={() => setActiveJournal(null)}>
              <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Back to Journal
            </button>

            <div className="journal-drawer-header">
              <span className="journal-card-tag" style={{ fontSize: '0.85rem' }}>{activeJournal.tag}</span>
              <h2 className="journal-drawer-title">{activeJournal.title}</h2>
              <div className="journal-drawer-meta">
                <span>Published: {activeJournal.date}</span>
                <span>By: Murthy Ateliers</span>
              </div>
            </div>

            <img src={activeJournal.image} alt={activeJournal.title} className="journal-drawer-img" />

            <div className="journal-drawer-body">
              {activeJournal.body}
            </div>
          </>
        )}
      </div>

      {/* ==========================================================================
         Testimonials / Legacy Stories Section
         ========================================================================== */}
      <section className="section" style={{ backgroundColor: 'rgba(145, 157, 123, 0.05)', borderTop: '1px solid rgba(211, 175, 55, 0.15)', borderBottom: '1px solid rgba(211, 175, 55, 0.15)' }}>
        <div className="container">
          <div className="testimonials-container">
            <span className="section-subtitle">Stories That Stay</span>
            <div className="testimonial-slide">
              <p className="testimonial-quote">
                {TESTIMONIALS[testimonialIndex].quote}
              </p>
              <div className="testimonial-author">
                {TESTIMONIALS[testimonialIndex].author}
              </div>
              <div className="testimonial-location">
                {TESTIMONIALS[testimonialIndex].location}
              </div>
            </div>

            <div className="testimonials-dots">
              {TESTIMONIALS.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`testimonial-dot ${idx === testimonialIndex ? 'active' : ''}`}
                  onClick={() => setTestimonialIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         FAQ Section
         ========================================================================== */}
      <section id="faq" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">Frequently Asked Questions</span>
          <h2 className="section-title">Trust & <span>Clarity</span></h2>
          <div className="divider-gold"></div>
        </div>

        <div className="faq-container">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
              <button className="faq-header" onClick={() => toggleFaq(idx)}>
                <h3 className="faq-question">{item.question}</h3>
                <div className="faq-icon-wrapper">
                  <svg className="faq-icon" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </div>
              </button>
              <div className="faq-body">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
         Final Emotional Section
         ========================================================================== */}
      <section className="emotional-sec">
        <div className="emotional-bg" style={{ backgroundImage: `url('/hero_jewel.png')` }}></div>
        <div className="emotional-overlay"></div>
        <div className="emotional-content">
          <p className="emotional-text">
            “Some things are too meaningful to be trend-driven. Jewelry should hold memory. It should gather stories. It should stay.”
          </p>
          <span className="emotional-brand">Murthy Ateliers</span>
        </div>
      </section>

      {/* ==========================================================================
         Footer Section
         ========================================================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-logo-main">Murthy Ateliers</span>
              <span className="footer-logo-sub">Heirloom Jewels</span>
              <p className="footer-desc" style={{ marginTop: '1rem' }}>
                A contemporary heirloom jewelry house rooted in the legacy of Swamy Jewelers, Mylapore, Chennai. Crafting jewelry designed not only to adorn, but to endure.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); openBookingModal('Bespoke Consultation', 'I would like to inquire about bespoke custom orders.'); }}>Custom Orders</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openBookingModal('Redesign Consultation', 'I would like to inquire about redesigning family heirloom jewelry.'); }}>Heirloom Redesign</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openBookingModal('Consultation', 'I would like to book a private viewing.'); }}>Atelier Viewing</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveJournal(JOURNAL_POSTS[2]); }}>Care Guide</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Explore</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('story'); }}>Our Story</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('collections'); }}>Collections</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>The Process</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('journal'); }}>Atelier Journal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Contact & Location</h4>
              <ul className="footer-contact">
                <li><strong>Location:</strong> Mylapore, Chennai, Tamil Nadu, India (By Appointment Only)</li>
                <li><strong>Email:</strong> contact@murthyateliers.com</li>
                <li><strong>WhatsApp / Call:</strong> +91 94440 12345</li>
              </ul>
              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.452 5.53 0 10.028-4.498 10.03-10.03.001-2.68-1.04-5.197-2.93-7.09C16.616 1.593 14.1 1.55 11.42 1.55c-5.532 0-10.03 4.498-10.032 10.03-.001 1.884.5 3.722 1.45 5.32l-.993 3.633 3.712-.975zm13.11-8.156c-.3-.15-1.775-.875-2.05-1.012-.275-.137-.475-.205-.675.093-.2.3-.775 1.012-.95 1.21-.175.2-.35.225-.65.075-.3-.15-1.263-.465-2.407-1.485-.89-.792-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.492-.51-.675-.52-.175-.007-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.112 4.525.715.31 1.273.495 1.71.635.717.227 1.37.195 1.885.118.574-.085 1.775-.725 2.025-1.425.25-.7.25-1.3 1.175-1.425-.075-.125-.175-.205-.475-.355z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} Murthy Ateliers. All Rights Reserved.
            </div>
            <div className="footer-bottom-line">
              Murthy Ateliers — Heirloom Jewels Crafted to Endure
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================================================
         Luxury Booking & Inquiry Modal
         ========================================================================== */}
      {isBookingOpen && (
        <div className="modal-backdrop" onClick={closeBookingModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeBookingModal} aria-label="Close Booking Dialog">
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>

            <div className="modal-body">
              {!bookingSuccess ? (
                <>
                  <div className="modal-header">
                    <span className="section-subtitle">Private Consultation</span>
                    <h3 className="modal-title">Begin Your <span>Legacy</span></h3>
                    <p className="modal-sub">
                      Please share your details. Vidya or our senior design team will reach out directly to arrange an appointment.
                    </p>
                  </div>

                  <form className="modal-form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-name">Your Full Name *</label>
                      <input 
                        type="text" 
                        id="booking-name" 
                        name="name" 
                        required 
                        className="form-input" 
                        placeholder="e.g. Shanthi Shankar" 
                        value={bookingForm.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-email">Email Address *</label>
                        <input 
                          type="email" 
                          id="booking-email" 
                          name="email" 
                          required 
                          className="form-input" 
                          placeholder="e.g. shanthi@mylapore.com" 
                          value={bookingForm.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-phone">Phone / WhatsApp *</label>
                        <input 
                          type="tel" 
                          id="booking-phone" 
                          name="phone" 
                          required 
                          className="form-input" 
                          placeholder="e.g. +91 98400 12345" 
                          value={bookingForm.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-service">Service / Collection Interest</label>
                        <select 
                          id="booking-service" 
                          name="service" 
                          className="form-input"
                          value={bookingForm.service}
                          onChange={handleInputChange}
                        >
                          <option value="Consultation">Atelier Consultation</option>
                          <option value="Bespoke Design">Bespoke Legacies (Custom)</option>
                          <option value="Heirloom Redesign">Heirloom Redesign</option>
                          <option value="Inquiry">Collection Inquiry</option>
                          <option value="Share Story">Share Story</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-date">Preferred Date</label>
                        <input 
                          type="date" 
                          id="booking-date" 
                          name="date" 
                          className="form-input" 
                          value={bookingForm.date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-notes">Narrative & Preferences</label>
                      <textarea 
                        id="booking-notes" 
                        name="notes" 
                        className="form-input" 
                        placeholder="Please share any design ideas, ancestral gold details, or specific pieces you would like to discuss..."
                        value={bookingForm.notes}
                        onChange={handleInputChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                      Request Appointment
                    </button>
                  </form>
                </>
              ) : (
                <div className="modal-success-state">
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <h3 className="success-title">வாழ்க வளமுடன்</h3>
                  <p className="success-desc">
                    Thank you for sharing your story, <strong>{bookingForm.name}</strong>. We have received your request for a {bookingForm.service === 'Consultation' ? 'private consultation' : bookingForm.service.toLowerCase()}. 
                  </p>
                  <p className="success-desc" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Vidya or our senior atelier curator will review your details and contact you via WhatsApp/Email within 24 hours to coordinate dates.
                  </p>
                  <button className="btn btn-secondary" onClick={closeBookingModal}>
                    Return to Atelier
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
