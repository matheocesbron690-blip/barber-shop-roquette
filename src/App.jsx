import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  { name: 'Coupe Homme', price: '25€', duration: '30 min', desc: 'Coupe classique avec finitions soignées au rasoir', icon: '✂️' },
  { name: 'Taille de Barbe', price: '20€', duration: '25 min', desc: 'Modelage et entretien précis de la barbe', icon: '🪒' },
  { name: 'Rasage Traditionnel', price: '30€', duration: '40 min', desc: 'Rasage au coupe-chou, serviette chaude & baume après-rasage', icon: '💈' },
  { name: 'Formule Complète', price: '40€', duration: '60 min', desc: 'Coupe + Barbe : le combo parfait pour un look impeccable', icon: '⭐', featured: true },
  { name: 'Coupe Enfant', price: '18€', duration: '25 min', desc: 'Pour les moins de 12 ans, douceur et patience garanties', icon: '👦' },
  { name: 'Coupe + Shampoing', price: '32€', duration: '45 min', desc: 'Coupe avec soin shampoing et séchage inclus', icon: '🌿' },
]

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&h=500&fit=crop&q=80', alt: 'Coupe homme précise' },
  { src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=700&h=1000&fit=crop&q=80', alt: 'Intérieur du salon' },
  { src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=700&h=500&fit=crop&q=80', alt: 'Le barbier au travail' },
  { src: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=700&h=500&fit=crop&q=80', alt: 'Taille de barbe' },
  { src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=700&h=500&fit=crop&q=80', alt: 'Ambiance vintage' },
  { src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=700&h=500&fit=crop&q=80', alt: 'Accessoires barbier' },
]

const REVIEWS = [
  { name: 'Thomas M.', rating: 5, text: "Le meilleur barbier d'Arles, sans aucun doute. Service impeccable, coupe toujours au top. Je recommande les yeux fermés !", date: 'Il y a 2 semaines' },
  { name: 'Karim B.', rating: 5, text: "Accueil chaleureux, coupe parfaite. Je viens ici depuis 2 ans et je n'ai jamais été déçu. Un vrai professionnel.", date: 'Il y a 1 mois' },
  { name: 'Julien R.', rating: 4, text: 'Excellent travail sur la barbe. Ambiance authentique et rapport qualité/prix vraiment imbattable à Arles.', date: 'Il y a 1 mois' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

function StarRating({ rating, size = 'md' }) {
  const cls = { sm: 'text-sm', md: 'text-xl', lg: 'text-4xl' }
  return (
    <div className={`flex gap-0.5 ${cls[size]}`}>
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={s <= Math.floor(rating) ? 'text-yellow-400' : s - 0.5 <= rating ? 'text-yellow-300' : 'text-gray-600'}>★</span>
      ))}
    </div>
  )
}

function GoldDivider({ label }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-5">
      <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A84C]" />
      <span className="text-[#C9A84C] text-[10px] tracking-[0.35em] uppercase font-medium">{label}</span>
      <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A84C]" />
    </div>
  )
}

function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Services', href: '#services' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Avis', href: '#avis' },
    { label: 'Contact', href: '#contact' },
  ]
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md shadow-xl shadow-black/60 border-b border-[#C9A84C]/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#accueil" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 border-2 border-[#C9A84C] rotate-45 group-hover:rotate-[55deg] transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#C9A84C] text-[10px] font-bold tracking-tight font-serif">BS</span>
              </div>
            </div>
            <div className="leading-none">
              <p className="font-serif text-[#F5F0E8] text-sm font-semibold tracking-[0.15em] uppercase">Barber Shop</p>
              <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase">de La Roquette</p>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} className="relative text-[#F5F0E8]/60 hover:text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 group py-1">
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="tel:+33682367193" className="ml-2 bg-[#C9A84C] hover:bg-[#E8C97A] text-[#1a1a1a] text-xs font-bold tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]">
              Réserver
            </a>
          </div>
          <button onClick={() => setMenuOpen(v => !v)} aria-label="Ouvrir le menu" className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={`block h-0.5 bg-[#F5F0E8] w-6 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-[#F5F0E8] w-6 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 bg-[#F5F0E8] w-6 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#141414]/98 backdrop-blur-md border-t border-[#C9A84C]/15">
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)}
                  className="text-[#F5F0E8]/70 hover:text-[#C9A84C] text-sm tracking-[0.2em] uppercase py-3 border-b border-[#2a2a2a] transition-colors">
                  {label}
                </a>
              ))}
              <a href="tel:+33682367193" onClick={() => setMenuOpen(false)}
                className="mt-4 bg-[#C9A84C] hover:bg-[#E8C97A] text-[#1a1a1a] text-sm font-bold tracking-[0.2em] uppercase text-center py-4 transition-colors">
                📞 Appeler pour Réserver
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop&q=90')` }} />
      <div className="absolute inset-0 bg-[#1a1a1a]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-[#1a1a1a]/50" />
      <div className="absolute left-6 xl:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent hidden lg:block" />
      <div className="absolute right-6 xl:right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent hidden lg:block" />
      <div className="relative z-10 text-center px-5 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-7">
          <div className="h-px w-14 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[11px] tracking-[0.4em] uppercase font-medium">Arles · Ouvert 7j/7</span>
          <div className="h-px w-14 bg-[#C9A84C]" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif font-bold leading-[0.9] mb-6">
          <span className="block text-[#F5F0E8] text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8rem]">L’Art du</span>
          <span className="block text-[#C9A84C] italic text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8rem]">Barbier</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
          className="text-[#F5F0E8]/65 text-base sm:text-lg lg:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          Coupes précises, rasages traditionnels et tailles de barbe soignées — votre style entre les mains d’experts.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="tel:+33682367193" className="flex items-center gap-3 bg-[#C9A84C] hover:bg-[#E8C97A] text-[#1a1a1a] font-bold px-8 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.45)] group">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.5c0-.55.45-1 1-1H7.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.23 1.01L6.6 10.8z"/></svg>
            Appeler pour Réserver
          </a>
          <a href="#services" className="text-[#F5F0E8]/75 hover:text-[#C9A84C] text-sm tracking-[0.2em] uppercase border border-[#F5F0E8]/20 hover:border-[#C9A84C]/60 px-8 py-4 transition-all duration-300">
            Voir les Tarifs
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 pt-10 border-t border-[#F5F0E8]/10 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[{ value: '4.7★', label: 'Note Google' }, { value: '37+', label: 'Avis clients' }, { value: '7j/7', label: '09h – 21h' }].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif text-[#C9A84C] text-2xl font-bold leading-none">{value}</p>
              <p className="text-[#F5F0E8]/40 text-[10px] tracking-[0.25em] uppercase mt-2">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-[#F5F0E8]/30 text-[9px] tracking-[0.4em] uppercase">Défiler</p>
        <div className="w-5 h-8 rounded-full border border-[#C9A84C]/35 flex items-start justify-center pt-1.5">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="w-1 h-2 bg-[#C9A84C] rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-24 h-24 border-l border-t border-[#C9A84C]/20" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-[#C9A84C]/20" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-16">
          <motion.div variants={fadeUp}><GoldDivider label="Nos Prestations" /></motion.div>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[#F5F0E8] font-bold">Nos Tarifs</motion.h2>
          <motion.p variants={fadeUp} className="text-[#F5F0E8]/45 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Prestations haut de gamme à des prix justes. Sans rendez-vous, ouvert 7j/7 de 9h à 21h.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SERVICES.map((s) => (
            <motion.div key={s.name} variants={fadeUp}
              className={`relative group p-7 lg:p-8 border transition-all duration-500 cursor-default overflow-hidden ${
                s.featured ? 'bg-gradient-to-br from-[#C9A84C]/15 via-[#C9A84C]/8 to-transparent border-[#C9A84C]/50 hover:border-[#C9A84C]'
                  : 'bg-[#242424] border-[#333] hover:border-[#C9A84C]/35 hover:bg-[#272727]'
              }`}>
              {s.featured && <div className="absolute top-0 right-0"><div className="bg-[#C9A84C] text-[#1a1a1a] text-[9px] font-bold px-3 py-1.5 tracking-[0.25em] uppercase">Populaire</div></div>}
              <div className="absolute bottom-4 right-5 text-6xl opacity-[0.06] select-none pointer-events-none">{s.icon}</div>
              <div className="flex items-start justify-between mb-5">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-serif text-[#C9A84C] text-2xl lg:text-3xl font-bold">{s.price}</span>
              </div>
              <h3 className="font-serif text-[#F5F0E8] text-lg lg:text-xl font-semibold mb-2">{s.name}</h3>
              <p className="text-[#F5F0E8]/45 text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex items-center gap-2 text-[#F5F0E8]/25 text-xs">
                <svg className="w-3.5 h-3.5 text-[#C9A84C]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{s.duration}</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center mt-12">
          <a href="tel:+33682367193" className="inline-flex items-center gap-3 text-[#C9A84C] border border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#C9A84C]/8 px-8 py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.5c0-.55.45-1 1-1H7.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.23 1.01L6.6 10.8z"/></svg>
            Réserver par téléphone — 06 82 36 71 93
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function GalleryOverlay({ label }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
      <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[#F5F0E8] text-sm font-medium">{label}</p>
        <div className="h-px w-8 bg-[#C9A84C] mt-1.5" />
      </div>
    </div>
  )
}

function Gallery() {
  return (
    <section id="galerie" className="py-24 lg:py-32 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-16">
          <motion.div variants={fadeUp}><GoldDivider label="Notre Univers" /></motion.div>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[#F5F0E8] font-bold">La Galerie</motion.h2>
          <motion.p variants={fadeUp} className="text-[#F5F0E8]/45 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Un espace alliant tradition et modernité, où chaque détail a été pensé pour votre confort et votre style.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3" style={{ gridTemplateRows: 'repeat(2, 280px)' }}>
          <motion.div variants={fadeUp} className="relative overflow-hidden group cursor-pointer">
            <img src={GALLERY[0].src} alt={GALLERY[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <GalleryOverlay label={GALLERY[0].alt} />
          </motion.div>
          <motion.div variants={fadeUp} className="relative overflow-hidden group cursor-pointer row-span-2">
            <img src={GALLERY[1].src} alt={GALLERY[1].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <GalleryOverlay label={GALLERY[1].alt} />
          </motion.div>
          <motion.div variants={fadeUp} className="relative overflow-hidden group cursor-pointer">
            <img src={GALLERY[2].src} alt={GALLERY[2].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <GalleryOverlay label={GALLERY[2].alt} />
          </motion.div>
          <motion.div variants={fadeUp} className="relative overflow-hidden group cursor-pointer">
            <img src={GALLERY[3].src} alt={GALLERY[3].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <GalleryOverlay label={GALLERY[3].alt} />
          </motion.div>
          <motion.div variants={fadeUp} className="relative overflow-hidden group cursor-pointer">
            <img src={GALLERY[4].src} alt={GALLERY[4].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <GalleryOverlay label={GALLERY[4].alt} />
          </motion.div>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-2 lg:mt-3" style={{ height: '200px' }}>
          <motion.div variants={fadeUp} className="relative overflow-hidden group cursor-pointer h-full">
            <img src={GALLERY[5].src} alt={GALLERY[5].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <GalleryOverlay label={GALLERY[5].alt} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="avis" className="py-24 lg:py-32 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-16">
          <motion.div variants={fadeUp}><GoldDivider label="Ils nous font confiance" /></motion.div>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[#F5F0E8] font-bold mb-10">Avis Clients</motion.h2>
          <motion.div variants={fadeUp} className="inline-flex flex-col items-center gap-4 bg-[#242424] border border-[#333] px-12 py-8 relative">
            <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-[#C9A84C] -translate-x-0.5 -translate-y-0.5" />
            <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-[#C9A84C] translate-x-0.5 -translate-y-0.5" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-[#C9A84C] -translate-x-0.5 translate-y-0.5" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-[#C9A84C] translate-x-0.5 translate-y-0.5" />
            <span className="font-serif text-[#C9A84C] text-7xl font-bold leading-none">4.7</span>
            <StarRating rating={4.7} size="lg" />
            <p className="text-[#F5F0E8]/45 text-sm">Basé sur <span className="text-[#F5F0E8] font-medium">37 avis</span> sur Google</p>
          </motion.div>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-[#242424] border border-[#333] p-7 hover:border-[#C9A84C]/25 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-4 right-5 font-serif text-6xl text-[#C9A84C]/8 leading-none select-none">&ldquo;</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-[#C9A84C]/30 to-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] font-serif font-bold text-lg flex-shrink-0">{r.name[0]}</div>
                <div>
                  <p className="text-[#F5F0E8] font-semibold text-sm">{r.name}</p>
                  <p className="text-[#F5F0E8]/30 text-xs mt-0.5">{r.date}</p>
                </div>
              </div>
              <StarRating rating={r.rating} size="sm" />
              <p className="text-[#F5F0E8]/55 text-sm leading-relaxed mt-3 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  const infoItems = [
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: 'Adresse', value: '70 Bd Georges Clemenceau', sub: '13200 Arles, France' },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: 'Téléphone', value: '06 82 36 71 93', link: 'tel:+33682367193' },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: 'Horaires', value: 'Ouvert 7 jours / 7', sub: '09:00 – 21:00' },
  ]
  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#141414] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif font-black text-[clamp(120px,25vw,300px)] text-[#F5F0E8]/[0.015] leading-none whitespace-nowrap">ARLES</span>
      </div>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-16">
          <motion.div variants={fadeUp}><GoldDivider label="Nous trouver" /></motion.div>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[#F5F0E8] font-bold">Contact & Accès</motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.div variants={stagger} className="space-y-3 mb-10">
              {infoItems.map(({ icon, label, value, sub, link }) => (
                <motion.div key={label} variants={fadeUp}
                  className="flex items-start gap-4 p-5 bg-[#1a1a1a] border border-[#2e2e2e] hover:border-[#C9A84C]/30 transition-all duration-300 group">
                  <div className="w-11 h-11 border border-[#C9A84C]/25 flex items-center justify-center text-[#C9A84C] flex-shrink-0 group-hover:bg-[#C9A84C]/8 group-hover:border-[#C9A84C]/50 transition-all duration-300">{icon}</div>
                  <div>
                    <p className="text-[#F5F0E8]/35 text-[10px] tracking-[0.3em] uppercase mb-1">{label}</p>
                    {link ? <a href={link} className="text-[#F5F0E8] font-medium text-base hover:text-[#C9A84C] transition-colors">{value}</a>
                          : <p className="text-[#F5F0E8] font-medium text-base">{value}</p>}
                    {sub && <p className="text-[#F5F0E8]/40 text-sm mt-0.5">{sub}</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <a href="tel:+33682367193" className="group flex items-center justify-center gap-4 w-full bg-[#C9A84C] hover:bg-[#E8C97A] text-[#1a1a1a] font-bold py-5 text-sm tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.45)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.5c0-.55.45-1 1-1H7.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.23 1.01L6.6 10.8z"/></svg>
                Appeler maintenant — 06 82 36 71 93
              </a>
              <p className="text-[#F5F0E8]/25 text-xs text-center mt-3 tracking-wider">Sans rendez-vous · Ouvert 7j/7 · 09h00 – 21h00</p>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9 }} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/15 via-transparent to-[#C9A84C]/8 blur-sm" />
            <div className="relative border border-[#C9A84C]/20 overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <iframe
                title="Barber Shop de La Roquette"
                src="https://maps.google.com/maps?q=70+Boulevard+Georges+Clemenceau,+13200+Arles,+France&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%"
                style={{ border: 0, filter: 'grayscale(75%) contrast(1.1) brightness(0.65)', display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 bg-[#1a1a1a]/92 backdrop-blur-sm border border-[#C9A84C]/40 px-4 py-2.5 pointer-events-none">
                <p className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase">Barber Shop de La Roquette</p>
                <p className="text-[#F5F0E8]/55 text-xs mt-0.5">70 Bd Georges Clemenceau, 13200 Arles</p>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#C9A84C]/50 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#C9A84C]/50 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#252525] py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 border border-[#C9A84C]/60 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#C9A84C] text-[8px] font-bold font-serif">BS</span>
              </div>
            </div>
            <div className="leading-none">
              <p className="font-serif text-[#F5F0E8]/80 text-xs font-semibold tracking-[0.2em] uppercase">Barber Shop de La Roquette</p>
              <p className="text-[#F5F0E8]/25 text-[10px] tracking-wider mt-0.5">70 Bd Georges Clemenceau · 13200 Arles</p>
            </div>
          </div>
          <p className="text-[#F5F0E8]/15 text-xs tracking-wider">© {new Date().getFullYear()} Barber Shop de La Roquette</p>
          <a href="tel:+33682367193" className="text-[#C9A84C] text-sm hover:text-[#E8C97A] transition-colors duration-300 tracking-wider">06 82 36 71 93</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="bg-[#1a1a1a] min-h-screen font-sans antialiased overflow-x-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Services />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  )
}
