import React, { useEffect } from 'react';
import { ArrowRight, Instagram, Linkedin, MessageCircle, Award, Users, BookOpen, TrendingUp, CheckCircle, Star, Briefcase, Target, GraduationCap, Rocket, Clock } from 'lucide-react';
import { Timeline } from '@/components/ui/timeline';

// Add type definitions for GSAP and ScrollTrigger
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
      getAll: () => Array<{ kill: () => void }>;
    };
    Lenis: new () => {
      on: (event: string, callback: () => void) => void;
      raf: (time: number) => void;
    };
  }
}

const socialLinks = [
  { id: 1, title: "Instagram", href: "#", icon: <Instagram size={20} /> },
  { id: 2, title: "LinkedIn", href: "#", icon: <Linkedin size={20} /> },
  { id: 3, title: "WhatsApp", href: "#", icon: <MessageCircle size={20} /> },
];

const stats = [
  { number: "100+", label: "CEOs Approved" },
  { number: "1500+", label: "Students Trained" },
  { number: "95%", label: "Placement Rate*" },
  { number: "20+", label: "Industry Partners" }
];

const whyChooseUs = [
  { icon: <Users className="w-6 h-6" />, title: "Hands-on Training", description: "Learn by doing with real-world projects" },
  { icon: <Rocket className="w-6 h-6" />, title: "BYOB - Build Your Own Business", description: "Create your startup during the program" },
  { icon: <Award className="w-6 h-6" />, title: "100+ CEOs Approved", description: "Curriculum endorsed by industry leaders" },
  { icon: <Star className="w-6 h-6" />, title: "Mentorship from CXOs", description: "Direct guidance from C-level executives" },
  { icon: <CheckCircle className="w-6 h-6" />, title: "100% Placement Guarantee*", description: "Assured career placement support" }
];

const journeySteps = [
  {
    step: "1",
    name: "Enroll",
    description: "Join our comprehensive business development program and start your transformation journey",
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    step: "2", 
    name: "Train",
    description: "Learn from industry experts through hands-on training and real-world case studies",
    icon: <Users className="w-6 h-6" />
  },
  {
    step: "3",
    name: "Build Projects",
    description: "Apply your knowledge by working on live projects and building your portfolio",
    icon: <Target className="w-6 h-6" />
  },
  {
    step: "4",
    name: "Get Certified",
    description: "Earn industry-recognized certification that validates your expertise",
    icon: <Award className="w-6 h-6" />
  },
  {
    step: "5",
    name: "Get Hired",
    description: "Land your dream job with our 100% placement guarantee and career support",
    icon: <Briefcase className="w-6 h-6" />
  }
];

const timelineData = [
  {
    week: "Phase 1",
    title: "Inception",
    icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Build foundational awareness and mindset needed for entrepreneurship or consultancy.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Clarifying your personal vision and long-term "why"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Understanding fundamental business concepts: value creation, customer needs, and problem-solving</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Learning core business terminology and frameworks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Developing a basic understanding of sales psychology and human motivation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Gaining awareness of what it takes to become an entrepreneur or consultant — mindset, risks, and opportunities</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    week: "Phase 2",
    title: "Revelation",
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Gain clarity in business dynamics, sharpen communication, and understand marketing and sales mechanics.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Building confident, strategic communication for business settings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Understanding how to position ideas, services, or products in the market</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Learning modern marketing strategies: content, performance, brand building</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Getting hands-on with marketing tools like CRMs, automation platforms, and analytics</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Studying real business scenarios through case studies</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Deep diving into sales strategies: discovery, handling objections, pitching, and negotiation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Strengthening financial literacy: cash flow, pricing, budgeting</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Exploring how to assess and manage risks in business environments</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    week: "Phase 3",
    title: "Transition",
    icon: <Target className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Bridge theory and practice; start forming real-world structures and taking ownership.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Moving from idea to action: building a service or business framework</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Developing entrepreneurial habits and decision-making processes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Constructing a minimal viable offer or prototype and testing in the real world</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Understanding data-driven approaches to strategy and business growth</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Beginning to operate in a semi-professional capacity (freelance, consulting, side project)</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    week: "Phase 4",
    title: "Implementation",
    icon: <Rocket className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Apply everything learned in real scenarios; refine tools and prepare for professional performance.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Reviewing and applying all tools, models, and strategies in practical settings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Participating in simulations, roleplays, or client-like interactions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Gaining structured feedback and refining your pitch or value offer</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Enhancing your professional toolkit (templates, proposals, decks, SOPs)</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    week: "Phase 5",
    title: "Revolution",
    icon: <Star className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-semibold text-blue-300 mb-2">Objective</p>
          <p className="text-white">Become client-ready or job-ready; confidently operate as a professional consultant, entrepreneur, or team leader.</p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-blue-900">Key Focus Areas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Finalizing your personal brand and positioning</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Preparing for client acquisition or job interviews</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Building and showcasing a project portfolio or case-based pitch</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Understanding how to sustain and scale either a consulting career or business venture</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Mapping out next steps: business launch, freelancing career, or high-performance corporate role</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
];


const ScrollAnimationSection = () => {
  useEffect(() => {
    // Load GSAP and ScrollTrigger dynamically
    const loadGSAP = async () => {
      // Create script elements
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';

      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';

      const lenisScript = document.createElement('script');
      lenisScript.src = 'https://unpkg.com/lenis@1.1.14/dist/lenis.min.js';

      // Add scripts to head
      document.head.appendChild(gsapScript);
      document.head.appendChild(scrollTriggerScript);
      document.head.appendChild(lenisScript);

      // Wait for scripts to load
      await new Promise<void>((resolve) => {
        let scriptsLoaded = 0;
        const onLoad = () => {
          scriptsLoaded++;
          if (scriptsLoaded === 3) resolve();
        };
        gsapScript.onload = onLoad;
        scrollTriggerScript.onload = onLoad;
        lenisScript.onload = onLoad;
      });

      // Initialize animation after scripts load
      initializeAnimation();
    };

    const initializeAnimation = () => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger && window.Lenis) {
        const lenis = new window.Lenis();
        lenis.on('scroll', window.ScrollTrigger.update);
        window.gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);

        window.gsap.registerPlugin(window.ScrollTrigger);

        const stickySection = document.querySelector('.scroll-sticky');
        const stickyHeader = document.querySelector('.scroll-sticky-header') as HTMLElement;
        const cards = document.querySelectorAll('.scroll-card');
        const stickyHeight = window.innerHeight * 5;

        const transforms = [
          [
            [10, 30, -5, 5],
            [10, -5, -25, 10],
          ],
          [
            [0, 27.5, -5, 7.5],
            [-15, 7.5, -25, 15],
          ],
          [
            [0, 32.5, -5, 2.5],
            [7.5, -2.5, -20, 30],
          ],
          [
            [0, 30, 15, -40],
            [10, -5, 30, 2.5],
          ],
          [
            [0, 35, -7.5, 15],
            [12.5, -7.5, 30, 47.5],
          ],
          [
            [5, 25, -10, 12.5],
            [7.5, -10, -25, 20],
          ],
        ];

        window.ScrollTrigger.create({
          trigger: stickySection,
          start: 'top top',
          end: `+=${stickyHeight}px`,
          pin: true,
          pinSpacing: true,
          onUpdate: (self: { progress: number }) => {
            const progress = self.progress;

            if (stickyHeader) {
              const maxTranslate = stickyHeader.offsetWidth - window.innerWidth;
              const translateX = -progress * maxTranslate;
              window.gsap.set(stickyHeader, { x: translateX });
            }

            cards.forEach((card, index) => {
              const delay = index * 0.1125;
              const cardProgress = Math.max(0, Math.min((progress - delay) * 2, 1));

              if (cardProgress > 0) {
                const cardStartX = 25;
                const cardEndX = -650;
                const yPos = transforms[index][0];
                const rotations = transforms[index][1];

                const cardX = window.gsap.utils.interpolate(
                  cardStartX,
                  cardEndX,
                  cardProgress
                );

                const yProgress = cardProgress * 3;
                const yIndex = Math.min(Math.floor(yProgress), yPos.length - 2);
                const yInterpolation = yProgress - yIndex;
                const cardY = window.gsap.utils.interpolate(
                  yPos[yIndex],
                  yPos[yIndex + 1],
                  yInterpolation
                );

                const cardRotation = window.gsap.utils.interpolate(
                  rotations[yIndex],
                  rotations[yIndex + 1],
                  yInterpolation
                );

                window.gsap.set(card, {
                  xPercent: cardX,
                  yPercent: cardY,
                  rotation: cardRotation,
                  opacity: 1,
                });
              } else {
                window.gsap.set(card, { opacity: 0 });
              }
            });
          },
        });
      }
    };

    loadGSAP();

    return () => {
      // Cleanup
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .scroll-section {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .scroll-sticky {
          position: relative;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        }

        .scroll-sticky-header {
          position: absolute;
          top: 0;
          left: 0;
          width: 250vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          will-change: transform;
        }

        .scroll-sticky-header h1 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(24vw, 30vw, 40vw);
          font-weight: 100;
          letter-spacing: -0.05em;
          line-height: 100%;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .scroll-card {
          position: absolute;
          top: 10%;
          left: 100%;
          width: min(325px, 90vw);
          height: min(500px, 80vh);
          background-color: #ffffff;
          border-radius: 1em;
          padding: 0.5em;
          will-change: transform;
          z-index: 2;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
        }

        .scroll-card .card-icon {
          width: 100%;
          height: 30%;
          border-radius: 1em;
          overflow: hidden;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1em;
        }

        .card-content {
          width: 100%;
          height: 65%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #1f2937;
        }

        .card-content h2 {
          font-size: clamp(20px, 4vw, 28px);
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 0.5em 0;
          color: #1e3a8a;
          line-height: 1.2;
        }

        .card-content p {
          font-size: clamp(14px, 2.5vw, 16px);
          font-weight: 400;
          letter-spacing: -0.005em;
          margin: 0 0 1em 0;
          color: #6b7280;
          line-height: 1.5;
        }

        .card-meta {
          font-size: clamp(12px, 2vw, 14px);
          color: #3b82f6;
          font-weight: 500;
          margin-bottom: 1em;
        }

        .card-cta {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 0.75em 1.5em;
          border-radius: 0.5em;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .card-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        @media (max-width: 768px) {
          .scroll-card {
            width: 300px;
            height: 400px;
          }
        }
      `}</style>

      <section className="scroll-section scroll-sticky">
        <div className="scroll-sticky-header">
          <h1>Your Journey</h1>
        </div>

        {journeySteps.map((step, index) => (
          <div key={index} className="scroll-card">
            <div className="card-icon">
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {step.step}
                </div>
                <span className="text-white text-2xl">{step.icon}</span>
              </div>
            </div>
            <div className="card-content">
              <div>
                <h2>{step.name}</h2>
                <p>{step.description}</p>
              </div>
              <button className="card-cta">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default function BusinessDevelopmentSite() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 pt-20 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-white text-blue-900 rounded-full text-sm font-medium">
              <GraduationCap className="w-4 h-4 mr-2" />
              Business Development Training
            </div>

            <h1 className="text-6xl md:text-8xl font-light leading-tight text-white">
              Build Your
              <br />
              <span className="font-normal">Business Future</span>
            </h1>

            <p className="text-xl font-light text-blue-100 max-w-2xl mx-auto">
              Transform your career with hands-on business development training from industry experts.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors">
              View Programs
            </button>
          </div>

          {/* Stats Grid - Horizontal Layout */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-16 border-t border-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center min-w-[120px]">
                <div className="text-3xl md:text-4xl font-light text-white mb-2">{stat.number}</div>
                <div className="text-sm text-blue-200 whitespace-nowrap">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll Animation Section */}
      <ScrollAnimationSection />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Your Success
              <br />
              <span className="font-normal text-blue-600">Is Our Priority</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive business development training with real-world applications and guaranteed career support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Offered Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Our Programs
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Transform Your Career
              <br />
              <span className="font-normal text-blue-600">With Our Programs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of business development programs designed to accelerate your career growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fundamentals in Business Development */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fundamentals in Business Development</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>3 Months</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Outcomes:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Core business concepts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Market analysis skills</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Business strategy fundamentals</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Corporate Ready Bootcamp */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Ready Bootcamp</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>6 Months</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Outcomes:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Corporate leadership skills</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Project management expertise</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Corporate strategy implementation</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Practical MBA */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practical MBA (Mini-MBA)</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>12 Months</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Outcomes:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Comprehensive business knowledge</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Strategic decision making</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Advanced management skills</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            

            {/* Entrepreneurship Track */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Entrepreneurship Track</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>9 Months</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Outcomes:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Startup development skills</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Business model creation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Venture funding knowledge</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* BXP */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">BXP</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>6 Months</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Outcomes:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Business expansion strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Market penetration techniques</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Growth optimization skills</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* EDGE-P */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">EDGE-P</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>4 Months</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Outcomes:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Professional development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Career advancement skills</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                      <span>Industry-specific expertise</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Timeline data={timelineData} />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placement Success Rate */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl font-bold text-white mb-4">95%</div>
              <div className="text-lg text-blue-100 font-medium">Placement Success Rate</div>
            </div>

            {/* Average Starting Package */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl font-bold text-white mb-4">₹8L</div>
              <div className="text-lg text-blue-100 font-medium">Average Starting Package</div>
            </div>

            {/* Graduates Trained */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl font-bold text-white mb-4">1500+</div>
              <div className="text-lg text-blue-100 font-medium">Graduates Trained</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-6xl font-light text-white">
            Ready to
            <br />
            <span className="font-normal">Transform Your Career?</span>
          </h2>

          <p className="text-xl font-light text-blue-100 max-w-2xl mx-auto">
            Join thousands of successful professionals who have accelerated their careers with our programs.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors border border-white/20"
              >
                <span className="text-white">{link.icon}</span>
              </a>
            ))}
          </div>

          <button className="bg-white text-blue-900 px-12 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors text-lg">
            Apply Now
          </button>
        </div>
      </section>

      {/* Student Success Stories Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              From Students to
              <br />
              <span className="font-normal text-blue-600">Industry Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our graduates have transformed their careers and achieved their professional goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                <img src="/success-story-1.jpg" alt="Success Story" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img src="/company-logo-1.png" alt="Company Logo" className="w-12 h-12 object-contain" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                    <p className="text-sm text-gray-600">Product Manager @ Google</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "The program transformed my career trajectory. From a junior developer to a Product Manager at Google in just 6 months."
                </blockquote>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Before:</span>
                  <span>Junior Developer</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="font-medium">After:</span>
                  <span>Product Manager</span>
                </div>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                <img src="/success-story-2.jpg" alt="Success Story" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img src="/company-logo-2.png" alt="Company Logo" className="w-12 h-12 object-contain" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Michael Chen</h3>
                    <p className="text-sm text-gray-600">Founder @ TechStart</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "The entrepreneurship track gave me the tools and confidence to launch my own startup. We're now a team of 20+."
                </blockquote>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Before:</span>
                  <span>Software Engineer</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="font-medium">After:</span>
                  <span>Founder & CEO</span>
                </div>
              </div>
            </div>

            {/* Success Story 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                <img src="/success-story-3.jpg" alt="Success Story" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img src="/company-logo-3.png" alt="Company Logo" className="w-12 h-12 object-contain" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Emma Rodriguez</h3>
                    <p className="text-sm text-gray-600">Business Development Lead @ Microsoft</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "The mentorship and practical experience I gained were invaluable. I now lead a team of 15 at Microsoft."
                </blockquote>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Before:</span>
                  <span>Sales Associate</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="font-medium">After:</span>
                  <span>Business Development Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Partners Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Our Partners
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Trusted by
              <br />
              <span className="font-normal text-blue-600">Industry Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network of hiring partners who actively recruit our graduates.
            </p>
          </div>

          {/* Company Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center">
                <img src={`/company-${index}.png`} alt={`Company ${index}`} className="max-w-[120px] max-h-[60px] object-contain" />
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <img src="/partner-1.jpg" alt="Partner" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-gray-900">David Thompson</h3>
                  <p className="text-sm text-gray-600">CTO @ TechCorp</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                "The quality of graduates from this program is exceptional. They come in with practical experience and are ready to contribute from day one."
              </blockquote>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <img src="/partner-2.jpg" alt="Partner" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-gray-900">Lisa Chen</h3>
                  <p className="text-sm text-gray-600">HR Director @ InnovateTech</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                "We've hired multiple graduates from this program, and they've all exceeded our expectations. The curriculum really prepares them for real-world challenges."
              </blockquote>
            </div>
          </div>
        </div>
        <div className='pt-10'>

        </div>
      </section>
    </div>
  );
}