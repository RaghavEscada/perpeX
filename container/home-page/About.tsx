import React, { useEffect } from 'react';
import { ArrowRight, Instagram, Linkedin, MessageCircle, Target, TrendingUp, Users, Star, Building2, GraduationCap, Briefcase, Calendar } from 'lucide-react';

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
  { id: 1, title: "Instagram", href: "https://instagram.com", icon: <Instagram size={20} /> },
  { id: 2, title: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin size={20} /> },
  { id: 3, title: "WhatsApp", href: "https://wa.me/+919745100036", icon: <MessageCircle size={20} /> },
];

const stats = [
  { number: "100+", label: "Partner Companies" },
  { number: "1000+", label: "Job Opportunities" },
  { number: "95%", label: "Youth Employment" },
  { number: "500+", label: "Students Trained" }
];

// Original Scroll Animation Component - UNTOUCHED
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
            [10, 50, -10, 10],
            [20, -10, -45, 20],
          ],
          [
            [0, 47.5, -10, 15],
            [-25, 15, -45, 30],
          ],
          [
            [0, 52.5, -10, 5],
            [15, -5, -40, 60],
          ],
          [
            [0, 50, 30, -80],
            [20, -10, 60, 5],
          ],
          [
            [0, 55, -15, 30],
            [25, -15, 60, 95],
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
          background-color: #f1f5f9;
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
          color: #1e293b;
          font-size: 30vw;
          font-weight: 100;
          letter-spacing: -0.05em;
          line-height: 100%;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .scroll-card {
          position: absolute;
          top: 10%;
          left: 100%;
          width: 325px;
          height: 500px;
          background-color: #ffffff;
          border-radius: 1em;
          padding: 0.5em;
          will-change: transform;
          z-index: 2;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .scroll-card .card-img {
          width: 100%;
          height: 200px;
          border-radius: 0.5em;
          overflow: hidden;
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
        }

        .scroll-card .card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          width: 100%;
          height: 275px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #1e293b;
          padding: 0.5em;
        }

        .card-content h2 {
          font-size: 42px;
          font-weight: 300;
          letter-spacing: -0.005em;
          margin: 0;
        }

        .card-content p {
          font-size: 20px;
          font-weight: 300;
          letter-spacing: -0.005em;
          margin: 0;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .scroll-sticky-header h1 {
            font-size: 40vw;
          }
          
          .scroll-card {
            width: 280px;
            height: 450px;
          }
          
          .card-content h2 {
            font-size: 32px;
          }
          
          .card-content p {
            font-size: 16px;
          }
        }
      `}</style>

      <section className="scroll-section scroll-sticky">
        <div className="scroll-sticky-header">
          <h1>PerpeX Focus</h1>
        </div>

        <div className="scroll-card">
          <div className="card-img">
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              EMPLOYABILITY
            </div>
          </div>
          <div className="card-content">
            <div className="card-title">
              <h2>Increased employability</h2>
            </div>
            <div className="card-description">
              <p>
                Increased employability of
                graduates in business
                development roles.
              </p>
            </div>
          </div>
        </div>

        <div className="scroll-card">
          <div className="card-img">
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              ENTREPRENEURSHIP
            </div>
          </div>
          <div className="card-content">
            <div className="card-title">
              <h2>successful entrepreneurial
                ventures</h2>
            </div>
            <div className="card-description">
              <p>
                initiated by numerous of our network of
                graduates.
              </p>
            </div>
          </div>
        </div>

        <div className="scroll-card">
          <div className="card-img">
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #64748b 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              COMMUNITY
            </div>
          </div>
          <div className="card-content">
            <div className="card-title">
              <h2>Business community</h2>
            </div>
            <div className="card-description">
              <p>
                Strengthened connections
                between the trainees and the community and fostering a
                mutually beneficial relationship.
              </p>
            </div>
          </div>
        </div>

        <div className="scroll-card">
          <div className="card-img">
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #334155 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              TALENT
            </div>
          </div>
          <div className="card-content">
            <div className="card-title">
              <h2>Talent Pipeline</h2>
            </div>
            <div className="card-description">
              <p>
                Enhanced Innovation for Businesses
                as we become a breeding
                ground for fresh ideas and
                talent.
              </p>
            </div>
          </div>
        </div>

        <div className="scroll-card">
          <div className="card-img">
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              DEVELOPMENT
            </div>
          </div>
          <div className="card-content">
            <div className="card-title">
              <h2>Regional Development</h2>
            </div>
            <div className="card-description">
              <p>
                Boosted Economic Growth and
                Regional Development
                potentially resulting in high
                living standards
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default function PerpeXLanding() {
  return (
    <div className="bg-white text-slate-800">
      {/* Hero Section - Nordic Style */}
      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 pt-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-600 font-medium">
                <Calendar className="w-4 h-4 mr-2" />
                The Perpetual Excellence
              </div>

              <h1 className="text-6xl lg:text-8xl font-extralight leading-[0.85] tracking-tight text-slate-900">
                Grow<br />
                <span className="text-blue-600 font-light">X Times</span><br />
                <span className="font-light">with PerpeX</span>
              </h1>

              <p className="text-xl font-light leading-relaxed text-slate-600 max-w-lg">
                Empowering Kerala's youth through strategic business development solutions that bridge the critical gap between education and industry.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button className="bg-slate-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-800 transition-colors duration-300">
                  Join INSIGHT 2.4
                  <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
                <button className="border border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-medium hover:bg-slate-50 transition-colors duration-300">
                  Partner with Us
                </button>
              </div>
            </div>

            {/* Right Column - Clean Visual */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden relative border border-slate-200 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-slate-800 mb-6">PerpeX</div>
                    <div className="w-24 h-24 bg-slate-900 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-slate-600 font-medium">Strategic Excellence</p>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-700">Live Training</span>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200">
                  <div className="text-2xl font-light text-slate-900">95%</div>
                  <div className="text-sm text-slate-600 font-medium">Job Success</div>
                </div>

                <div className="absolute top-1/2 left-8 bg-slate-900 rounded-xl p-4 shadow-lg transform -translate-y-1/2">
                  <div className="text-white text-center">
                    <div className="text-lg font-medium">1000+</div>
                    <div className="text-xs opacity-90">Opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 mt-16 border-t border-slate-200">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left group">
                <div className="text-3xl lg:text-4xl font-light text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{stat.number}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCROLL ANIMATION SECTION - UNTOUCHED */}
      <ScrollAnimationSection />

      {/* Problem Statement - Nordic Clean */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-slate-900 mb-6">
              The Kerala <span className="font-normal text-blue-600">Challenge</span>
            </h2>
            <p className="text-xl font-light text-slate-600 max-w-3xl mx-auto leading-relaxed">
              While India averages 20% youth unemployment, Kerala confronts a crisis with
              qualified graduates facing unprecedented challenges in career placement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-6 group">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-slate-700" />
              </div>
              <div>
                <h3 className="text-xl font-light text-slate-900 mb-4">Skills Misalignment</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  3 lakh qualified graduates registered but unemployed. Educational systems
                  disconnected from rapidly evolving industry requirements.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6 group">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg transition-all duration-300">
                <Users className="w-8 h-8 text-slate-700" />
              </div>
              <div>
                <h3 className="text-xl font-light text-slate-900 mb-4">Untapped Potential</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  33% planning international migration. Critical gaps in communication,
                  business acumen, and practical professional skills.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6 group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg transition-all duration-300">
                <Target className="w-8 h-8 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-light text-slate-900 mb-4">Strategic Solution</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Comprehensive ecosystem bridging education-industry divide through
                  practical training and guaranteed placement pathways.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* INSIGHT 2.4 - Clean Design */}
      <section className="py-24 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700 font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Current Opportunity
            </div>

            <h2 className="text-5xl lg:text-6xl font-light text-white mb-6">
              INSIGHT <span className="font-normal text-blue-700">2.4</span>
            </h2>

            <p className="text-xl font-light text-slate-200 max-w-3xl mx-auto leading-relaxed">
              An exclusive convergence of opportunity and innovation. Register once,
              access unlimited possibilities until you secure your ideal position.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-2xl p-10 hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <h3 className="text-2xl font-light text-slate-900">Premium Job Fair</h3>
                </div>
                <p className="text-slate-600 font-light leading-relaxed">
                  Connect with 100+ leading companies offering 1000+ strategic positions
                  through our structured three-round interview process.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                    Exclusive training sessions
                  </div>
                  <div className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                    Premium company access
                  </div>
                  <div className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                    Guaranteed interview opportunity
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200">
                  <div className="text-3xl font-light text-slate-900">₹299</div>
                  <div className="text-sm text-slate-600">One-time registration</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-10 hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <h3 className="text-2xl font-light text-slate-900">Innovation Ideathon</h3>
                </div>
                <p className="text-slate-600 font-light leading-relaxed">
                  Transform visionary concepts into funded ventures through expert mentorship,
                  strategic guidance, and direct investor connections.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                    Seed funding opportunities
                  </div>
                  <div className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                    Industry expert mentoring
                  </div>
                  <div className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                    Investor network access
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200">
                  <div className="text-3xl font-light text-slate-900">₹499</div>
                  <div className="text-sm text-slate-600">Complete program access</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <a href="/insights.pdf" target="_blank" rel="noopener noreferrer">
              <button className="bg-slate-300 text-black px-12 py-4 rounded-lg font-medium hover:bg-slate-800 transition-colors duration-300 text-lg">
                Download Brochure
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </button>
            </a>


          </div>

        </div>
      </section>

      {/* Malabar B-School - Clean Design */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-slate-800 rounded-full text-sm text-slate-300 font-medium mb-8">
              <Building2 className="w-4 h-4 mr-2" />
              Entrepreneurial Excellence
            </div>

            <h2 className="text-5xl lg:text-6xl font-light text-white mb-6">
              Rebuild <span className="font-normal text-blue-500">Malabar</span>
            </h2>

            <p className="text-xl font-light text-slate-300 max-w-3xl mx-auto leading-relaxed">
              A 3-month entrepreneurial launchpad designed to revive Malabar's trading legacy.
              Build your startup from inception to investor pitch with 100+ CEO-approved curriculum.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-slate-800 rounded-2xl p-10 hover:shadow-lg transition-shadow duration-300 border border-slate-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-2xl font-light text-white">BYOB Challenge</h3>
                </div>
                <p className="text-slate-300 font-light leading-relaxed">
                  Build Your Own Business from idea to MVP. Launch your startup while learning
                  through our proven 5-phase methodology with real-world mentorship.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-slate-500 rounded-full mr-3"></div>
                    Inception to Revolution phases
                  </div>
                  <div className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-slate-500 rounded-full mr-3"></div>
                    100+ CEO mentorship network
                  </div>
                  <div className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-slate-500 rounded-full mr-3"></div>
                    Live investor pitch opportunity
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-10 hover:shadow-lg transition-shadow duration-300 border border-slate-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-2xl font-light text-white">CapeX Funding</h3>
                </div>
                <p className="text-slate-300 font-light leading-relaxed">
                  Compete for ₹3 Cr seed fund through our startup accelerator program.
                  Equity-free support for high-potential teams with investor connections.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-slate-500 rounded-full mr-3"></div>
                    Career Credit Score system
                  </div>
                  <div className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-slate-500 rounded-full mr-3"></div>
                    110% placement assistance
                  </div>
                  <div className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-slate-500 rounded-full mr-3"></div>
                    Proof-of-work portfolio
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">3 Months</div>
                <div className="text-sm text-slate-400">Intensive Program</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">100+</div>
                <div className="text-sm text-slate-400">CEO Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">₹3 Cr</div>
                <div className="text-sm text-slate-400">Seed Fund Pool</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">110%</div>
                <div className="text-sm text-slate-400">Placement Support</div>
              </div>
            </div>

            <a href="/malabar.pdf" target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-600 text-white px-12 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 text-lg">
                Download Program Guide
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </button>
            </a>
          </div>

        </div>
      </section>

      {/* Mission - Minimal Nordic */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div>
            <h2 className="text-5xl font-light text-slate-900 mb-8">
              Empowering Talents<br />
              <span className="font-normal text-blue-700">Transforming Societies</span>
            </h2>
            <p className="text-xl font-light text-slate-600 leading-relaxed max-w-3xl mx-auto">
              We envision a future where every individual, regardless of background,
              has access to transformative education that bridges the gap between potential and professional success.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="w-12 h-12 bg-white hover:bg-slate-100 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm border border-slate-200"
              >
                <span className="text-slate-600">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600 font-light">© 2024 PerpeX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}