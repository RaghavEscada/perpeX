"use client";
import Image from "next/image";
import { Star, Instagram, Linkedin, MessageCircle, Target, Zap, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gsap: {
      ticker: {
        add: (callback: (time: number) => void) => void;
        lagSmoothing: (value: number) => void;
      };
      utils: {
        interpolate: (start: number, end: number, progress: number) => number;
      };
      set: (target: Element, vars: any) => void;
      registerPlugin: (plugin: any) => void;
    };
    ScrollTrigger: {
      update: () => void;
      create: (config: any) => {
        progress: number;
      };
      getAll: () => {
        kill: () => void;
      }[];
    };
    Matter: {
      Engine: any;
      Runner: any;
      World: any;
      Bodies: any;
      Body: any;
      Events: any;
    };
    SplitType: any;
    Lenis: new () => { on: (event: string, callback: () => void) => void; raf: (time: number) => void; }
  }
}

const socialLinks = [
  { id: 1, title: "Instagram", href: "https://instagram.com", icon: <Instagram size={20} /> },
  { id: 2, title: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin size={20} /> },
  { id: 3, title: "WhatsApp", href: "https://wa.me/yourphonenumber", icon: <MessageCircle size={20} /> },
];

const logos = [
  {
    name: "Babel",
    url: "https://svgl.app/library/babel.svg",
  },
  {
    name: "Ngrok",
    url: "https://svgl.app/library/ngrok-light.svg",
  },
  {
    name: "Webflow",
    url: "https://svgl.app/library/webflow.svg",
  },
  {
    name: "Perplexity",
    url: "https://svgl.app/library/perplexity_wordmark_light.svg",
  },
  {
    name: "Sanity",
    url: "https://svgl.app/library/sanity.svg",
  },
  {
    name: "Post CSS",
    url: "https://svgl.app/library/postcss_wordmark.svg",
  },
];

const LogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-2 md:px-4">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo, key) => (
                  <Image
                    key={key}
                    src={logo.url}
                    width={128}
                    height={120}
                    className="h-30 w-32 px-2"
                    alt={logo.name}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const storyRef = useRef(null);

  useEffect(() => {
    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.17.1/matter.min.js',
      'https://unpkg.com/split-type',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
      'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js'
    ];

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
      });
    };

    Promise.all(scripts.map(loadScript)).then(() => {
      setTimeout(() => {
        if (
          typeof window !== 'undefined' &&
          window.gsap &&
          (window as any).ScrollTrigger &&
          (window as any).Matter &&
          (window as any).SplitType &&
          (window as any).Lenis
        ) {
          initStoryAnimation();
        }
      }, 500);
    });

    const initStoryAnimation = () => {
      const { gsap, ScrollTrigger, Matter, SplitType, Lenis } = window as any;
      
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time: number) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      const highlightWords = [
        "Nuke", "corporate", "startup", "creative", "freelancing",
        "explodes", "wildfire", "recognition", "standards", "quality", "story"
      ];

      const text = new SplitType(storyRef.current, { types: "words" });
      const words = [...text.words];

      const { Engine, Runner, World, Bodies, Body, Events } = Matter;
      const engine = Engine.create({ gravity: { x: 0, y: 0 } });
      const runner = Runner.create();
      Runner.run(runner, engine);

      const floor = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 5,
        window.innerWidth,
        20,
        { isStatic: true }
      );
      World.add(engine.world, floor);

      const shuffledWords = [...words];
      for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
      }

      const wordsToHighlight = words.filter((word) =>
        highlightWords.some((highlight) => 
          word.textContent.toLowerCase().includes(highlight.toLowerCase())
        )
      );

      let physicsEnabled = false;
      let lastProgress = 0;
      interface CharBody {
        body: any;
        element: HTMLElement;
        initialX: number;
        initialY: number;
      }
      const charBodies: CharBody[] = [];

      wordsToHighlight.forEach((word) => {
        const chars = word.textContent.split("");
        const wordRect = word.getBoundingClientRect();
        const stickyElement = document.querySelector(".sticky");
        if (!stickyElement) return;
        const stickyRect = stickyElement.getBoundingClientRect();

        chars.forEach((char: string, charIndex: number) => {
          const charSpan = document.createElement("span");
          charSpan.className = "char";
          charSpan.textContent = char;
          charSpan.style.cssText = `
            display: inline-block;
            position: absolute;
            pointer-events: none;
            opacity: 0;
            color: #FF4D4D;
            font-size: inherit;
            font-weight: inherit;
          `;
          stickyElement.appendChild(charSpan);

          const charWidth = word.offsetWidth / chars.length;
          const x = wordRect.left - stickyRect.left + charIndex * charWidth;
          const y = wordRect.top - stickyRect.top;

          charSpan.style.left = `${x}px`;
          charSpan.style.top = `${y}px`;

          const body = Bodies.rectangle(
            x + charWidth / 2,
            y + charSpan.offsetHeight / 2,
            charWidth,
            charSpan.offsetHeight,
            {
              restitution: 0.75,
              friction: 0.5,
              frictionAir: 0.0175,
              isStatic: true,
            }
          );

          World.add(engine.world, body);
          charBodies.push({
            body,
            element: charSpan,
            initialX: x,
            initialY: y,
          });
        });
      });

      function resetAnimation() {
        engine.world.gravity.y = 0;

        charBodies.forEach(({ body, element, initialX, initialY }) => {
          Body.setStatic(body, true);
          Body.setPosition(body, {
            x: initialX + element.offsetWidth / 2,
            y: initialY + element.offsetHeight / 2,
          });
          Body.setAngle(body, 0);
          Body.setVelocity(body, { x: 0, y: 0 });
          Body.setAngularVelocity(body, 0);

          element.style.transform = "none";
          element.style.opacity = "0";
        });

        words.forEach((word) => {
          gsap.to(word, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.in",
          });
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky",
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          pin: true,
          scrub: true,
          onUpdate: (self: { progress: number }) => {
            const isScrollingDown = self.progress > lastProgress;
            lastProgress = self.progress;

            if (self.progress >= 0.6 && !physicsEnabled && isScrollingDown) {
              physicsEnabled = true;
              engine.world.gravity.y = 1;

              wordsToHighlight.forEach((word) => {
                word.style.opacity = "0";
              });

              charBodies.forEach(({ body, element }) => {
                element.style.opacity = "1";
                Body.setStatic(body, false);
                Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
                Body.setVelocity(body, {
                  x: (Math.random() - 0.5) * 5,
                  y: -Math.random() * 5,
                });
              });

              gsap.to(
                words.filter(
                  (word) =>
                    !highlightWords.some((hw) => 
                      word.textContent.toLowerCase().includes(hw.toLowerCase())
                    )
                ),
                {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );
            } else if (self.progress < 0.6 && physicsEnabled && !isScrollingDown) {
              physicsEnabled = false;
              resetAnimation();
            }
          },
        },
      });

      // Phase 1: Random words turn red
      const phase1 = gsap.timeline();
      shuffledWords.forEach((word) => {
        phase1.to(word, {
          color: "#FF4D4D",
          duration: 0.1,
          ease: "power2.inOut",
        }, Math.random() * 0.9);
      });

      // Phase 2: Highlight words turn teal
      const phase2 = gsap.timeline();
      const shuffledHighlights = [...wordsToHighlight];
      for (let i = shuffledHighlights.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledHighlights[i], shuffledHighlights[j]] = [shuffledHighlights[j], shuffledHighlights[i]];
      }

      shuffledHighlights.forEach((word) => {
        phase2.to(word, {
          color: "#4ECDC4",
          duration: 0.1,
          ease: "power2.inOut",
        }, Math.random() * 0.9);
      });

      tl.add(phase1, 0).add(phase2, 1).to({}, { duration: 2 });

      Events.on(engine, "afterUpdate", () => {
        charBodies.forEach(({ body, element, initialX, initialY }) => {
          if (physicsEnabled) {
            const deltaX = body.position.x - (initialX + element.offsetWidth / 2);
            const deltaY = body.position.y - (initialY + element.offsetHeight / 2);
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${body.angle}rad)`;
          }
        });
      });
    };

    return () => {
      if (typeof window !== 'undefined') {
        const { ScrollTrigger } = window as any;
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach((trigger: { kill: () => void }) => trigger.kill());
        }
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Intro */}
      <section className="w-full h-screen bg-[#0A0A0A] text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="text-center max-w-4xl mx-auto relative z-10 px-6">
          <h1 className="text-7xl font-black font-NeueMontreal leading-tight tracking-tight mb-8">
            <span className="text-[#FF4D4D]">Let&apos;s Nuke</span> Your Brand&apos;s{" "}
            <span className="text-[#4ECDC4]">Impact</span> Zone
          </h1>
          <p className="text-gray-300 text-xl">
            We&apos;re not just another marketing squad. We&apos;re the strategic force that
            makes your brand explode in the digital space. Time to go nuclear! 💥
          </p>
        </div>
      </section>

      {/* Story - Sticky */}
      <section className="sticky relative w-full h-screen bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-10 p-8 flex flex-col justify-center h-full">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black font-NeueMontreal mb-12 text-center text-[#FF4D4D]">
              Our Story
            </h2>
            <div 
              ref={storyRef}
              className="text-white text-lg leading-relaxed"
              style={{ 
                fontSize: '18px',
                lineHeight: '1.8',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              We started Nuke because, honestly, we just didn&apos;t fit into the corporate world! Both of us started our careers in a Big 4 firm, but somewhere between endless reports and corporate calls, we knew this wasn&apos;t it. Swetha was the first to break free—she quit and joined a startup, where she juggled multiple verticals and got a taste of the fast-paced creative world. Meanwhile, Prabha was always the &quot;fun guy&quot; — the one cracking jokes, pulling off skits at culturals, and entertaining everyone with his out-of-the-box ideas. Sitting at a desk all day? Definitely not his thing. So, he quit too. With zero plans but a lot of excitement, we started freelancing. We worked with creators, and our first-ever collaboration was with our good friend Mano Chandru aka MC. From writing scripts to structuring webinars, we did it all. One gig led to another, and soon we were working with Cuts Coffee Shyam, then Hoodieguy, and many more. But freelancing had its share of struggles—late payments, inconsistent work, and most importantly, the unsung heroes behind the scenes never getting the recognition they deserved. So, we thought, &quot;Why not build something bigger and better?&quot; That&apos;s how Nuke was born. The name? Well, we wanted to create marketing that explodes and spreads like wildfire. Also, let&apos;s be honest, we just thought it sounded cool. But beyond the name, we wanted to set new standards in the industry—where everyone in our team gets the recognition they deserve, where payments are smooth and are on time and where creativity and quality come first, ensuring real value for both our clients and their audience. So yeah, that&apos;s our story. Now, let&apos;s create yours!
            </div>
          </div>
        </div>
      </section>



      {/* Enhanced Brand Section - After Story */}
      <section className="w-full bg-[#0A0A0A] text-white py-32 px-6 sm:px-4 rounded-t-[40px] z-20 relative rounded-xl overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Nuclear Pulse Effect */}
        <motion.div
          className="absolute inset-0 bg-[#FF4D4D]/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto relative z-10 mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[5rem] font-black font-NeueMontreal leading-tight tracking-tight mb-12"
          >
            <motion.span
              className="text-[#FF4D4D] inline-block"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(255, 77, 77, 0)",
                  "0 0 20px rgba(255, 77, 77, 0.5)",
                  "0 0 0px rgba(255, 77, 77, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Let&apos;s Nuke
            </motion.span> Your Brand&apos;s
            <motion.span
              className="text-[#4ECDC4] inline-block"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(78, 205, 196, 0)",
                  "0 0 20px rgba(78, 205, 196, 0.5)",
                  "0 0 0px rgba(78, 205, 196, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              Impact
            </motion.span> Zone
            <br />
            <span className="text-white">Detonating Success</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;re not just another marketing squad. We&apos;re the strategic force that
            makes your brand explode in the digital space. Time to go nuclear! 💥
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto relative z-10 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Section - Enhanced Video */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <video
                  src="/nuke.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Nuclear Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-[#FF4D4D]/10 rounded-3xl"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-[#4ECDC4] rounded-full opacity-60"
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${60 + i * 5}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Section - Strategy Points */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-10"
              >
                {/* Strategy Point 1 */}
                <motion.div
                  className="group flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-[#FF4D4D]/5 to-transparent border border-[#FF4D4D]/20 backdrop-blur-sm hover:from-[#FF4D4D]/10 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="flex-shrink-0 p-3 rounded-full bg-[#FF4D4D]/10 border border-[#FF4D4D]/30"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Star className="text-[#FF4D4D]" size={32} strokeWidth={2.5} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-4 text-[#FF4D4D] group-hover:text-[#FF6B6B] transition-colors">
                      Nuclear-Grade Strategy
                    </h4>
                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors">
                      From explosive social media content to full-scale marketing campaigns,
                      we&apos;re all about maximum impact. Our squad combines creative firepower
                      with data precision to make your brand detonate in the market.
                    </p>
                  </div>
                </motion.div>

                {/* Strategy Point 2 */}
                <motion.div
                  className="group flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-[#4ECDC4]/5 to-transparent border border-[#4ECDC4]/20 backdrop-blur-sm hover:from-[#4ECDC4]/10 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="flex-shrink-0 p-3 rounded-full bg-[#4ECDC4]/10 border border-[#4ECDC4]/30"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.5
                    }}
                  >
                    <Star className="text-[#4ECDC4]" size={32} strokeWidth={2.5} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-4 text-[#4ECDC4] group-hover:text-[#6EDDD6] transition-colors">
                      Chain Reaction Success
                    </h4>
                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors">
                      We&apos;re not just another agency - we&apos;re your brand&apos;s power source.
                      We trigger trends, track engagement metrics, and keep the momentum
                      building. Our mission? Make your brand the center of attention.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-8 pb-6 border-t border-white/10"
              >
                <h3 className="text-2xl font-bold text-white font-NeueMontreal mb-8 flex items-center gap-3">
                  Ready to Launch Your Brand?
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-6 py-3 text-lg text-gray-400 hover:text-white bg-white/5 hover:bg-[#4ECDC4]/20 border border-white/10 hover:border-[#4ECDC4]/50 rounded-full transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="font-medium">{item.title}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Logo Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">Trusted by Industry Leaders</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF4D4D] to-[#4ECDC4] mx-auto rounded-full"></div>
          </div>
          <LogoCloud />
        </motion.div>
      </section>
      <section className="w-full bg-[#0A0A0A] text-white py-32 px-6 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Why NUKE Section */}
        <div className="w-full max-w-6xl mx-auto relative z-10 mb-32">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black font-NeueMontreal mb-8 text-[#4ECDC4]">
              Why NUKE?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#FF4D4D]/10 to-transparent rounded-2xl p-8 border border-[#FF4D4D]/20">
              <div className="flex items-center gap-4 mb-6">
                <Zap className="text-[#FF4D4D]" size={32} />
                <h4 className="text-2xl font-bold text-[#FF4D4D]">Discovery & Strategy</h4>
              </div>
              <p className="text-gray-300">
                First things first, we hop on a <strong>discovery call</strong>—not just to tick a box, 
                but to truly understand what makes you and your brand tick.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-transparent rounded-2xl p-8 border border-[#4ECDC4]/20">
              <div className="flex items-center gap-4 mb-6">
                <Target className="text-[#4ECDC4]" size={32} />
                <h4 className="text-2xl font-bold text-[#4ECDC4]">Work Mode Activated</h4>
              </div>
              <p className="text-gray-300">
                Once we have this foundation, we get to <strong>work mode</strong>—breaking down ideas, 
                brainstorming solutions, and doing competitor analysis.
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center space-y-6">
              <p className="text-xl text-gray-300">
                At NUKE, we don&apos;t do <em>generic</em>. <span className="text-[#4ECDC4]">We make you unforgettable.</span>
              </p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}