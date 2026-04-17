/\*\*

- @license
- SPDX-License-Identifier: Apache-2.0
  \*/

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import {
ArrowRight,
ChevronDown,
Compass,
Globe,
MapPin,
Menu,
Star,
X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Draggable);

export default function App() {
const containerRef = useRef<HTMLDivElement>(null);
const heroRef = useRef<HTMLDivElement>(null);
const [isMenuOpen, setIsMenuOpen] = React.useState(false);

useGSAP(() => {
// Initialize ScrollSmoother
const smoother = ScrollSmoother.create({
wrapper: '#smooth-wrapper',
content: '#smooth-content',
smooth: 1.5,
effects: true,
});

    // Nav animation
    gsap.from('nav', {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5,
    });

    // Hero text animation
    gsap.from('.hero-title span', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
    });

    gsap.from('.hero-sub', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1,
      ease: 'power3.out',
    });

    // Scroll triggered animations for sections
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach((section: any) => {
      gsap.from(section.querySelectorAll('.reveal-item'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    });

    // Parallax effect for hero image
    gsap.to('.hero-image', {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      ease: 'none',
    });

    // Horizontal scroll section
    const horizontalSection = document.querySelector('.horizontal-section');
    const horizontalInner = document.querySelector('.horizontal-inner');

    if (horizontalSection && horizontalInner) {
      const scrollWidth = horizontalInner.scrollWidth;
      const totalScroll = scrollWidth - window.innerWidth;

      const horizontalST = ScrollTrigger.create({
        trigger: '.horizontal-section',
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(horizontalInner, { x: -self.progress * totalScroll });
        }
      });

      // Drag implementation
      const dragProxy = document.createElement("div");
      Draggable.create(dragProxy, {
        type: "x",
        trigger: horizontalInner,
        inertia: true,
        onPress() {
          this.startScroll = horizontalST.scroll();
        },
        onDrag() {
          const ratio = -this.x / totalScroll;
          const newScroll = this.startScroll + (ratio * horizontalST.end - horizontalST.start);
          smoother.scrollTo(newScroll, false);
        },
        onThrowUpdate() {
          const ratio = -this.x / totalScroll;
          const newScroll = this.startScroll + (ratio * horizontalST.end - horizontalST.start);
          smoother.scrollTo(newScroll, false);
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };

}, { scope: containerRef });

return (
<div ref={containerRef} className="relative min-h-screen">
{/_ Navigation _/}
<nav className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-center mix-blend-difference">
<div className="text-xl font-extrabold tracking-tighter uppercase">Studio·Vibe</div>
<div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.2em] font-bold">
<a href="#" className="hover:text-accent transition-colors">Works</a>
<a href="#" className="hover:text-accent transition-colors">Philosophy</a>
<a href="#" className="hover:text-accent transition-colors">Contact</a>
</div>
<button
onClick={() => setIsMenuOpen(!isMenuOpen)}
className="md:hidden p-2" >
{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
</nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { x: 0 } : { x: '100%' }}
        className="fixed inset-0 bg-dark z-[60] flex flex-col items-center justify-center space-y-8 md:hidden"
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-6 p-2"
        >
          <X size={32} />
        </button>
        <a href="#" className="text-4xl font-serif" onClick={() => setIsMenuOpen(false)}>Destinations</a>
        <a href="#" className="text-4xl font-serif" onClick={() => setIsMenuOpen(false)}>Experiences</a>
        <a href="#" className="text-4xl font-serif" onClick={() => setIsMenuOpen(false)}>Our Story</a>
        <a href="#" className="text-4xl font-serif" onClick={() => setIsMenuOpen(false)}>Contact</a>
      </motion.div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506929113675-b55f9d3bb76a?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Travel"
            className="hero-image w-full h-[120%] object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Geometric Shape Background */}
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[380px] h-[480px] bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10 rotate-[5deg] z-0 hidden lg:flex items-center justify-center after:content-['GSAP_SMOOTH'] after:text-[10px] after:text-white/20 after:tracking-[0.5em] after:-rotate-90"></div>

        <div className="relative z-10 w-full px-12 md:px-24">
          <h1 className="hero-title text-8xl md:text-[12vw] leading-[0.85] mb-8 overflow-hidden">
            <span className="block">Kinetic</span>
            <span className="block text-accent md:ml-[140px]">Aesthetics</span>
          </h1>
          <p className="hero-sub text-xl md:text-2xl font-serif italic text-white/60 max-w-md md:ml-[140px] leading-relaxed">
            Building high-end digital experiences with GSAP, Tailwind, and a relentless focus on fluid motion.
          </p>
        </div>

        {/* Meta Data */}
        <div className="absolute bottom-12 right-12 text-right hidden md:block">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Core Stack</span>
          <div className="font-serif italic text-lg mb-4">Next.js / GSAP</div>
          <span className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Location</span>
          <div className="font-serif italic text-lg mb-4">Hanoi, Vietnam</div>
          <span className="block text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Project Code</span>
          <div className="font-serif italic text-lg">SV-2024-X</div>
        </div>

        <div className="absolute bottom-12 left-12 flex items-center space-x-4">
          <div className="w-16 h-[1px] bg-white"></div>
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll To Explore</span>
        </div>
      </section>

      {/* Intro Section */}
      <section className="reveal-section py-48 px-12 md:px-24 grid md:grid-cols-2 gap-24 items-center">
        <div className="reveal-item space-y-10">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">The Philosophy</span>
          <h2 className="text-5xl md:text-7xl leading-[0.9]">Crafting moments that transcend time.</h2>
          <p className="text-xl text-white/60 leading-relaxed font-serif italic">
            We believe travel is not just about the destination, but the transformation that occurs within. Our curators spend years discovering the world's most hidden gems.
          </p>
          <button className="group flex items-center space-x-6 text-[10px] uppercase tracking-[0.3em] font-bold">
            <span>Explore Our Method</span>
            <div className="w-12 h-[1px] bg-white group-hover:w-16 transition-all"></div>
          </button>
        </div>
        <div className="reveal-item grid grid-cols-2 gap-6 items-end">
          <div className="aspect-[2/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1000"
              alt="Portrait Experience"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-square overflow-hidden mb-12">
            <img
              src="https://images.unsplash.com/photo-1517050359323-3dbca97102b3?auto=format&fit=crop&q=80&w=1000"
              alt="Square Moment"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section - Mixed Ratios */}
      <section className="horizontal-section h-screen bg-surface/30 overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="horizontal-inner flex h-full items-center px-[10vw] space-x-32 select-none">
          <div className="flex-shrink-0 w-[450px] space-y-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent">The Collection</span>
            <h2 className="text-6xl md:text-8xl leading-none">Curated Spaces</h2>
            <p className="opacity-40 font-serif italic text-lg pr-12">A fluid assembly of our most distinctive environments, categorized by their architectural impact.</p>
          </div>

          {[
            { title: "Amalfi Coast", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800", loc: "Italy", ratio: "aspect-[3/4]", width: "w-[450px]" },
            { title: "Kyoto Zen", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200", loc: "Japan", ratio: "aspect-video", width: "w-[800px]" },
            { title: "Sahara Nights", img: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?auto=format&fit=crop&q=80&w=800", loc: "Morocco", ratio: "aspect-square", width: "w-[600px]" },
            { title: "Icelandic Blue", img: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1000", loc: "Iceland", ratio: "aspect-[3/4]", width: "w-[500px]" },
            { title: "Patagonian Peak", img: "https://images.unsplash.com/photo-1517050359323-3dbca97102b3?auto=format&fit=crop&q=80&w=1200", loc: "Chile", ratio: "aspect-[21/9]", width: "w-[900px]" },
          ].map((item, i) => (
            <div key={i} className={`flex-shrink-0 ${item.width} group cursor-pointer relative`}>
              <div className={`${item.ratio} overflow-hidden mb-8 border border-white/5`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-[1.05] group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{item.loc}</span>
                <h3 className="text-3xl tracking-tighter uppercase font-extrabold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="reveal-section py-48 px-12 md:px-24">
        <div className="mb-32 reveal-item">
          <h2 className="text-6xl md:text-9xl mb-8">The Aura Standard</h2>
          <p className="text-white/40 max-w-xl font-serif italic text-xl">Excellence is not an act, but a habit. We provide everything you need for a seamless journey.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {[
            { icon: <Compass />, title: "Expert Guides", desc: "Local experts who know the pulse of every destination." },
            { icon: <Globe />, title: "Global Access", desc: "Private entry to the world's most restricted locations." },
            { icon: <MapPin />, title: "Seamless Logistics", desc: "From private jets to luxury transfers, we handle it all." },
          ].map((service, i) => (
            <div key={i} className="reveal-item p-12 bg-surface/50 border border-white/5 hover:border-accent/30 transition-colors group">
              <div className="w-12 h-12 flex items-center justify-center mb-10 text-accent group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-3xl mb-6">{service.title}</h3>
              <p className="text-white/40 leading-relaxed font-serif italic">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-48 bg-accent text-white">
        <div className="max-w-5xl mx-auto px-12 space-y-16">
          <blockquote className="text-4xl md:text-7xl font-sans font-extrabold tracking-tighter leading-[0.85] uppercase">
            "Aura transformed the way we see the world. Every detail was meticulously planned."
          </blockquote>
          <cite className="block font-serif italic text-2xl not-italic opacity-80">
            — Julianne V. <span className="text-sm font-sans font-bold uppercase tracking-widest ml-4">Global Explorer</span>
          </cite>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-12 md:px-24 border-t border-white/10">
        <div className="grid md:grid-cols-4 gap-24 mb-32">
          <div className="col-span-2 space-y-10">
            <div className="text-3xl font-extrabold tracking-tighter uppercase">Studio·Vibe</div>
            <p className="max-w-sm text-white/40 font-serif italic text-lg">
              Crafting the future of luxury travel. Join our newsletter for exclusive access to new destinations.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-b border-white/20 py-4 w-full focus:outline-none focus:border-accent transition-colors font-serif italic"
              />
              <button className="p-4 border-b border-white/20">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Navigation</h4>
            <ul className="space-y-4 text-white/40 text-sm font-serif italic">
              <li><a href="#" className="hover:text-accent transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Experiences</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Journal</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Connect</h4>
            <ul className="space-y-4 text-white/40 text-sm font-serif italic">
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/20 space-y-4 md:space-y-0">
          <p>© 2026 Aura Luxury Travel. All rights reserved.</p>
          <div className="flex space-x-12">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
        </div>
      </div>
    </div>

);
}
