"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const logos1 = [
  {
    name: "Byjus",
    url: "https://cdn.brandfetch.io/idtntkVe3D/theme/dark/idB5akcINh.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Upgrad",
    url: "https://cdn.brandfetch.io/idvsI-ggxm/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Interval",
    url: "https://www.intervaledu.com/static/web/images/logo/logo-dark.png",
  },
  {
    name: "HCL Tech",
    url: "https://cdn.brandfetch.io/idMbiw2eNO/w/960/h/960/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "XPayBack",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8w5cYFHW3PdWDJSKF4vWdbptQxodZ8nC68Q&s",
  },
];

const logos2 = [
  {
    name: "Amazon",
    url: "https://cdn.brandfetch.io/ideEwHhDrj/w/1024/h/300/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Google",
    url: "https://cdn.brandfetch.io/idOeG0NYWQ/w/1448/h/1448/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Microsoft",
    url: "https://cdn.brandfetch.io/idkGNnB58L/w/280/h/80/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "IBM",
    url: "https://cdn.brandfetch.io/id4Ol9YiiE/w/577/h/239/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Oracle",
    url: "https://cdn.brandfetch.io/idAuvto6zH/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Salesforce",
    url: "https://cdn.brandfetch.io/idTlKvL568/w/206/h/41/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  },
];

const LogoCloud = () => {
  return (
    <div className="w-full pt-0 py-8">
      <div className="mx-auto w-full px-2 md:px-4">
        <p className="text-sm text-gray-600 text-center mb-6 font-medium">
          Our graduates are placed in leading companies
        </p>
        
        {/* First row - moving left */}
        <div
          className="group relative mt-4 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos1.map((logo, key) => (
                  <img
                    key={key}
                    src={logo.url}
                    className="h-8 w-24 px-2 opacity-60 hover:opacity-100 transition-opacity"
                    alt={`${logo.name} logo - PerpeX placement partner`}
                  />
                ))}
              </div>
            ))}
        </div>

        {/* Second row - moving right */}
        <div
          className="group relative mt-2 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud-reverse flex-row justify-around gap-6"
              >
                {logos2.map((logo, key) => (
                  <img
                    key={key}
                    src={logo.url}
                    className="h-8 w-24 px-2 opacity-60 hover:opacity-100 transition-opacity"
                    alt={`${logo.name} logo - PerpeX placement partner`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const pinnedSectionRef = useRef<HTMLElement>(null);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const indicesContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const indicesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pinnedSection = pinnedSectionRef.current;
    const stickyHeader = stickyHeaderRef.current;
    const cards = cardsRef.current;
    const progressBarContainer = progressBarContainerRef.current;
    const progressBar = progressBarRef.current;
    const indicesContainer = indicesContainerRef.current;
    const indices = indicesRef.current;

    if (!pinnedSection || !stickyHeader || !progressBarContainer || !progressBar || !indicesContainer) return;

    const cardCount = cards.length;
    const pinnedHeight = window.innerHeight * (cardCount + 1);
    const startRotations = [0, 5, 0, -5];
    const endRotations = [-10, -5, 10, 5];
    const progressColors = ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe", "#eff6ff"];

    // Set initial card rotations
    cards.forEach((card, index) => {
      if (card) {
        gsap.set(card, { rotation: startRotations[index] });
      }
    });

    let isProgressBarVisible = false;
    let currentActiveIndex = -1;

    function animateIndexOpacity(newIndex: number) {
      if (newIndex !== currentActiveIndex) {
        indices.forEach((index, i) => {
          if (index) {
            gsap.to(index, {
              opacity: i === newIndex ? 1 : 0.25,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        });
        currentActiveIndex = newIndex;
      }
    }

    function showProgressAndIndices() {
      gsap.to([progressBarContainer, indicesContainer], {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      isProgressBarVisible = true;
    }

    function hideProgressAndIndices() {
      gsap.to([progressBarContainer, indicesContainer], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      isProgressBarVisible = false;
      animateIndexOpacity(-1);
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: pinnedSection,
      start: "top top",
      end: `+=${pinnedHeight}`,
      pin: true,
      pinSpacing: true,
      onLeave: () => {
        hideProgressAndIndices();
      },
      onEnterBack: () => {
        showProgressAndIndices();
      },
      onUpdate: (self) => {
        const progress = self.progress * (cardCount + 1);
        const currentCard = Math.floor(progress);

        if (progress <= 1) {
          gsap.to(stickyHeader, {
            opacity: 1 - progress,
            duration: 0.1,
            ease: "none",
          });
        } else {
          gsap.set(stickyHeader, { opacity: 0 });
        }

        if (progress > 1 && !isProgressBarVisible) {
          showProgressAndIndices();
        } else if (progress <= 1 && isProgressBarVisible) {
          hideProgressAndIndices();
        }

        let progressHeight = 0;
        let colorIndex = -1;
        if (progress > 1) {
          progressHeight = ((progress - 1) / cardCount) * 100;
          colorIndex = Math.min(Math.floor(progress - 1), cardCount - 1);
        }

        gsap.to(progressBar, {
          height: `${progressHeight}%`,
          backgroundColor: progressColors[colorIndex],
          duration: 0.3,
          ease: "power1.out",
        });

        if (isProgressBarVisible) {
          animateIndexOpacity(colorIndex);
        }

        cards.forEach((card, index) => {
          if (!card) return;
          
          if (index < currentCard) {
            gsap.set(card, {
              top: "50%",
              rotation: endRotations[index],
            });
          } else if (index === currentCard) {
            const cardProgress = progress - currentCard;
            const newTop = gsap.utils.interpolate(150, 50, cardProgress);
            const newRotation = gsap.utils.interpolate(
              startRotations[index],
              endRotations[index],
              cardProgress
            );
            gsap.set(card, {
              top: `${newTop}%`,
              rotation: newRotation,
            });
          } else {
            gsap.set(card, {
              top: "150%",
              rotation: startRotations[index],
            });
          }
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        
        .animate-marquee {
          animation: marquee var(--duration, 20s) linear infinite;
        }
        
        .animate-marquee-reverse {
          animation: marquee-reverse var(--duration, 20s) linear infinite;
        }

        @keyframes logo-cloud {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes logo-cloud-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        
        .animate-logo-cloud {
          animation: logo-cloud 30s linear infinite;
        }
        
        .animate-logo-cloud-reverse {
          animation: logo-cloud-reverse 30s linear infinite;
        }

        body {
          font-family: "Arial", sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <section className="w-screen h-screen bg-white flex justify-center items-center">
        <h1 className="text-6xl md:text-4xl font-['Gilda_Display'] text-center text-black italic">"Building the next generation of business rebels who think outside the boardroom."</h1>
      </section>

      {/* Cards Section */}
      <section 
        ref={pinnedSectionRef}
        className="w-screen h-screen overflow-hidden bg-black relative"
      >
        <div 
          ref={stickyHeaderRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100"
        >
          <h1 className="text-[20vw] font-light text-transparent" style={{WebkitTextStroke: '2px #fff', textAlign: 'center'}}>
            SERVICES
          </h1>
        </div>

        <div 
          ref={progressBarContainerRef}
          className="absolute top-0 right-0 w-2 h-full bg-white opacity-0 z-10"
        >
          <div 
            ref={progressBarRef}
            className="w-full h-0 bg-gray-600"
          ></div>
        </div>

        <div 
          ref={indicesContainerRef}
          className="absolute top-0 right-6 h-full flex flex-col justify-center gap-16 opacity-0 z-10"
        >
          {[
            { icon: "🎓", service: "Campus", title: "Recruitment" },
            { icon: "👔", service: "Executive", title: "Education" },
            { icon: "🔬", service: "Research &", title: "Advisory" },
            { icon: "🤝", service: "Corporate", title: "Partnerships" },
            { icon: "💡", service: "Innovation", title: "Center" },
            { icon: "🌐", service: "Industry", title: "Integration" }
          ].map((item, index) => (
            <div 
              key={index}
              ref={el => {if (el) indicesRef.current[index] = el}}
              className="text-right opacity-25"
              style={{color: ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe", "#ffffff"][index]}}
            >
              <p className="line-through uppercase text-sm">{item.icon}</p>
              <p className="text-sm">{item.service}</p>
              <p className="text-lg">{item.title}</p>
            </div>
          ))}
        </div>

        {[
          { 
            phase: "01", 
            service: "Campus Recruitment Programs", 
            title: "Campus", 
            subtitle: "Recruitment", 
            description: "We facilitate strategic partnerships between leading corporations and our distinguished MBA graduates through comprehensive campus recruitment programs, ensuring optimal talent acquisition with pre-placement training and industry-aligned skill development initiatives.",
            icon: "👔"
          },
          { 
            phase: "02", 
            service: "Executive Education Programs", 
            title: "Executive", 
            subtitle: "Education", 
            description: "We deliver premier executive education programs and advanced corporate training solutions developed by our distinguished faculty, enabling organizations to enhance workforce capabilities through cutting-edge business methodologies and strategic leadership development.",
            icon: "🎓"
          },
          { 
            phase: "03", 
            service: "Business Research & Advisory Services", 
            title: "Research &", 
            subtitle: "Advisory", 
            description: "Our distinguished faculty and advanced degree candidates provide comprehensive business research, strategic market analysis, and professional consulting services to support organizational decision-making and identify sustainable growth opportunities.",
            icon: "🔬"
          },
          { 
            phase: "04", 
            service: "Strategic Corporate Partnerships", 
            title: "Corporate", 
            subtitle: "Partnerships", 
            description: "We establish and maintain strategic long-term partnerships between our institution and leading corporations, facilitating knowledge exchange, collaborative research initiatives, and mutually beneficial learning experiences that drive innovation and excellence.",
            icon: "🌐"
          },
          { 
            phase: "05", 
            service: "Innovation & Entrepreneurship Center", 
            title: "Innovation", 
            subtitle: "Center", 
            description: "We foster entrepreneurial excellence through our comprehensive incubation center, providing strategic mentorship, venture capital access, and business development support for innovative startups and emerging enterprises led by our students and faculty.",
            icon: "💡"
          },
          { 
            phase: "06", 
            service: "Industry Integration Programs", 
            title: "Industry", 
            subtitle: "Integration", 
            description: "We bridge academic excellence with industry expertise through distinguished guest lectures, professional workshops, strategic internships, and live business projects, ensuring our students gain invaluable practical exposure while organizations access innovative talent and fresh perspectives.",
            icon: "🤝"
          }
        ].map((card, index) => (
          <div
            key={index}
            ref={el => {if (el) cardsRef.current[index] = el}}
            className="absolute top-[150%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[80vh] flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border-2 border-blue-400/30 rounded-2xl overflow-hidden shadow-2xl p-8"
            style={{willChange: 'transform'}}
          >
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-lg font-bold text-white flex items-center gap-2">
                <span>{card.icon}</span>
                Service #{card.phase}
              </p>
            </div>
            <div className="text-center w-full max-w-3xl mx-auto mt-16">
              <p className="text-2xl text-blue-200 mb-8 font-semibold">{card.service}</p>
              <h1 className="text-7xl md:text-6xl font-bold leading-tight text-white mb-8">
                {card.title} <span className="text-blue-300 font-medium">{card.subtitle}</span>
              </h1>
              <p className="text-lg text-gray-200 leading-relaxed font-medium">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Portfolio;