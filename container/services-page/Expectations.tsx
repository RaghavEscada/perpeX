"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Digital Marketing",
    description: "Strategic campaigns to boost your brand's online presence and drive results.",
    icon: "📈"
  },
  {
    id: 2,
    title: "Personal Branding",
    description: "Develop a distinctive personal brand that amplifies your unique voice and identity.",
    icon: "👤"
  },
  {
    id: 3,
    title: "Content Creation",
    description: "Captivating content that tells your story and connects with your audience.",
    icon: "✍️"
  },
  {
    id: 4,
    title: "Product Photography",
    description: "Professional photography that showcases your products in their best light.",
    icon: "📸"
  },
  {
    id: 5,
    title: "Website Development",
    description: "Stunning, functional websites that deliver exceptional user experiences.",
    icon: "🌐"
  },
  {
    id: 6,
    title: "Video Editing",
    description: "Professional video production that captures attention with impact.",
    icon: "🎬"
  },
  {
    id: 7,
    title: "Brand Identity & Designing",
    description: "Cohesive brand identities that capture your essence and create lasting impressions.",
    icon: "📝"
  }
];

export default function InfiniteScrollServices() {
  // Fix the type of activeService state to be number | null
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fix the type definition for the openModal function
  const openModal = (id: number) => {
    setActiveService(id);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const selectedService = services.find(service => service.id === activeService);

  // Duplicate the services for the infinite loop
  const duplicatedServices = [...services, ...services];

  return (
    <section className="w-full bg-black text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="text-6xl sm:text-4xl font-NeueMontreal font-semibold">Our Services</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive service offerings
          </p>
        </div>

        {/* Infinite scrolling service container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* First infinite scroll track */}
          <div 
            className={`flex gap-6 mb-8 ${isPaused ? 'animate-paused' : 'animate-scroll'}`}
            style={{
              animationDuration: '35s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          >
            {duplicatedServices.map((service, index) => (
              <div
                key={`track1-${service.id}-${index}`}
                className="flex-shrink-0 w-[280px] border border-white/10 rounded-lg p-6 hover:border-white/40 transition-all cursor-pointer"
                onClick={() => openModal(service.id)}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
          
          {/* Second infinite scroll track (reversed) */}
          <div 
            className={`flex gap-6 ${isPaused ? 'animate-paused' : 'animate-scroll-reverse'}`}
            style={{
              animationDuration: '30s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          >
            {[...duplicatedServices].reverse().map((service, index) => (
              <div
                key={`track2-${service.id}-${index}`}
                className="flex-shrink-0 w-[280px] border border-white/10 rounded-lg p-6 hover:border-white/40 transition-all cursor-pointer"
                onClick={() => openModal(service.id)}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-black text-white border border-white/20 rounded-lg max-w-lg w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                ✕
              </button>
              
              <div className="text-5xl mb-6">{selectedService.icon}</div>
              <h2 className="text-2xl font-bold mb-4">{selectedService.title}</h2>
              <p className="text-gray-300 mb-6">{selectedService.description}</p>
              
              <h3 className="text-lg font-semibold mb-4 border-t border-white/10 pt-6">
                What we offer
              </h3>
              
              <ul className="space-y-2 mb-8">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-white/60">—</span>
                    <span className="text-gray-300">
                      Professional {selectedService.title.toLowerCase()} service tailored to your needs
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="text-center">
                <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors">
                  Get Started
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add required CSS animations */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-280px * 7 - 6rem * 7));
          }
        }
        
        @keyframes scrollReverse {
          0% {
            transform: translateX(calc(-280px * 7 - 6rem * 7));
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }
        
        .animate-scroll-reverse {
          animation: scrollReverse 30s linear infinite;
        }
        
        .animate-paused {
          animation-play-state: paused;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}