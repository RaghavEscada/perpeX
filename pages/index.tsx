"use client";
import { Curve, Ready } from "@/components";
import { About, Clients, Hero, Projects, VideoHome, X } from "@/container";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP for loader animation
    const loadGSAP = async () => {
      if (!window.gsap) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        script.onload = () => startLoaderAnimation();
        document.head.appendChild(script);
      } else {
        startLoaderAnimation();
      }
    };

    const startLoaderAnimation = () => {
      const { gsap } = window;
      const loader = loaderRef.current;
      if (!loader) return;

      const tl = gsap.timeline();
      
      // Sophisticated entrance
      tl.fromTo('.main-logo', {
        scale: 0.3,
        opacity: 0,
        rotationY: 180
      }, {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 2.5,
        ease: "power3.out"
      })
      
      // Elegant quote reveal
      .fromTo('.sophisticated-quote', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.8,
        ease: "power2.out"
      }, "-=1.2")
      
      // Progress sophistication
      .fromTo('.progress-container', {
        scaleX: 0,
        opacity: 0
      }, {
        scaleX: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.8");

      // Counter animation
      let counter = { value: 0 };
      const counterElement = loader.querySelector('.elegant-counter');
      if (!counterElement) return;
      
      tl.to(counter, {
        value: 100,
        duration: 4,
        ease: "power1.out",
        onUpdate: () => {
          counterElement.textContent = String(Math.round(counter.value)).padStart(2, '0');
        }
      }, "-=3")
      
      // Progress fill
      .to('.progress-fill', {
        scaleX: 1,
        duration: 4,
        ease: "power1.out"
      }, "-=4")
      
      // Sophisticated exit
      .to('.loader-content', {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in"
      }, "+=0.5")
      
      .to('.reveal-overlay', {
        scaleY: 0,
        duration: 1.8,
        ease: "power3.inOut",
        transformOrigin: "top center"
      }, "-=0.8")
      
      .call(() => {
        setLoading(false);
      }, [], "-=0.5");
    };

    if (loading) {
      loadGSAP();
    }
  }, [loading]);

  useEffect(() => {
    // Initialize Locomotive Scroll after loading
    if (!loading) {
      (async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const locomotiveScroll = new LocomotiveScroll({});
        
        return () => {
          locomotiveScroll.destroy();
        };
      })();
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        ref={loaderRef}
        className="fixed inset-0 bg-black text-white z-50 overflow-hidden"
        style={{
          fontFamily: '"Inter", "Helvetica Neue", system-ui, sans-serif'
        }}
      >
        {/* Sophisticated grid background */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Ambient gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Main content */}
        <div className="loader-content relative z-10 h-full flex flex-col items-center justify-center">
          
          {/* Logo */}
          <div className="main-logo mb-20">
            <img 
              src="/loader.webp" 
              alt="Perpex" 
              className="w-20 h-20 object-contain"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.1))'
              }}
            />
          </div>
          
          {/* Sophisticated Quote */}
          <div className="sophisticated-quote text-center mb-24 max-w-2xl">
            <div className="text-lg leading-relaxed font-light tracking-wide opacity-90 mb-6">
              "Excellence is never an accident. It is always the result of high intention,
              <br />
              sincere effort, and intelligent execution."
            </div>
            <div className="text-xs tracking-[0.25em] opacity-40 font-medium">
              ARISTOTLE
            </div>
          </div>
          
          {/* Elegant counter */}
          <div className="flex items-center gap-8 mb-16">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-white/40"></div>
            <div className="text-center">
              <div className="elegant-counter text-3xl font-extralight tracking-[0.2em] mb-1">00</div>
              <div className="text-[10px] tracking-[0.4em] opacity-30 font-medium">PERCENT</div>
            </div>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-white/20 to-white/40"></div>
          </div>
          
          {/* Minimal progress */}
          <div className="progress-container">
            <div className="w-80 h-[1px] bg-white/10 overflow-hidden">
              <div className="progress-fill w-full h-full bg-white/60 transform scale-x-0 origin-left"></div>
            </div>
          </div>
          
        </div>
        
        {/* Reveal overlay */}
        <div className="reveal-overlay absolute inset-0 bg-black transform scale-y-100 origin-top"></div>
        
        {/* Corner details */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/10"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/10"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/10"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/10"></div>
      </div>
    );
  }

  return (
    <>
      <Curve backgroundColor={"#f1f1f1"}>
        <Hero />
        <About />
        <X />
        <Projects />
        <Clients />
        <Ready />
      </Curve>
    </>
  );
}