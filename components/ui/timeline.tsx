"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
  step?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Changed offset to make scroll progress slower and start the first node in middle
    offset: ["start 10%", "end 130%"]
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  // Track active section based on scroll position - even smoother calculation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = Math.max(0, Math.min(1, latest));
    // Much more gradual progression - slower transitions between sections
    const sectionProgress = progress * (data.length - 1); // Removed the 0.8 multiplier for proper progression
    const newActiveIndex = Math.round(sectionProgress);
    
    if (newActiveIndex >= 0 && newActiveIndex < data.length && newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  });

  return (
    <div
      className="w-full bg-black font-sans relative"
      ref={containerRef}
      // Increased minimum height for more scroll area - makes scrolling feel slower
      style={{ minHeight: '300vh' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Left side content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 lg:py-40 lg:sticky lg:top-0 lg:h-screen">
          <div className="max-w-xl">
            <p className="text-sm text-white font-medium uppercase tracking-wider mb-12 lg:mb-20">
              Our Process
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-tight mb-16 lg:mb-24">
              From Consult<br />
              to Project<br />
              Launch
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
              <button className="px-10 lg:px-12 py-4 lg:py-5 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors text-center">
                Book A Call
              </button>
              <button className="px-10 lg:px-12 py-4 lg:py-5 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors text-center">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Right side timeline */}
        <div className="w-full lg:w-1/2 relative bg-black">
          <div ref={ref} className="pt-32 lg:pt-80 px-8 md:px-16 lg:pl-28 lg:pr-24 pb-20 lg:pb-32">
            {data.map((item, index) => {
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={index}
                  className={`relative pl-10 lg:pl-0 ${
                    index < data.length - 1 ? 'mb-16 lg:mb-28' : 'mb-32 lg:mb-56'
                  }`}
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute -left-3 lg:-left-20 top-1 w-4 lg:w-6 h-4 lg:h-6 rounded-full transition-all duration-700 ease-out ${
                      isActive ? 'bg-white scale-110' : 'bg-gray-600'
                    }`}
                  />

                  {/* Content */}
                  <div 
                    className={`transition-all duration-700 ease-out ${
                      isActive ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    {item.step && (
                      <p className="text-xs text-gray-400 mb-4 lg:mb-8 font-medium uppercase tracking-wider">
                        {item.step}
                      </p>
                    )}
                    
                    <h3 
                      className={`text-2xl md:text-3xl lg:text-4xl mb-5 lg:mb-10 leading-tight transition-all duration-700 ease-out ${
                        isActive ? 'text-white font-bold' : 'text-gray-400 font-medium'
                      }`}
                    >
                      {item.title}
                    </h3>
                    
                    <div
                      className={`leading-relaxed max-w-lg text-base lg:text-lg transition-all duration-700 ease-out ${
                        isActive ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Timeline line - slower and smoother animation */}
            <div
              style={{
                height: height - 200 + "px",
              }}
              className="absolute left-1 lg:-left-17 top-16 lg:top-40 w-px bg-gray-700"
            >
              <motion.div
                className="absolute inset-x-0 top-0 w-px bg-white origin-top"
                style={{
                  scaleY: useTransform(scrollYProgress, [0, 1], [0, 1])
                }}
                transition={{
                  type: "spring",
                  // Reduced stiffness for slower, more fluid animation
                  stiffness: 200,
                  damping: 50,
                  mass: 1.2
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Clean timeline data
const timelineData = [
  {
    step: "01",
    title: "Discovery Call",
    content: (
      <p>
        We begin with a conversation to understand your brand, goals, and content needs.
      </p>
    ),
  },
  {
    step: "02", 
    title: "Strategic Planning",
    content: (
      <p>
        Crafting a defined roadmap to ensure your content resonates with the right audience.
      </p>
    ),
  },
  {
    step: "03",
    title: "Creative Ideation & Scripting", 
    content: (
      <p>
        Developing compelling concepts and scripts that enhance storytelling and audience engagement.
      </p>
    ),
  },
  {
    step: "04",
    title: "Production & Shoot",
    content: (
      <p>
        Capturing high-quality visuals with cinematography, lighting, and thematic direction.
      </p>
    ),
  },
  {
    step: "05",
    title: "Precision Editing",
    content: (
      <p>
        Refining, enhancing, and adding creative elements to create visually impactful content.
      </p>
    ),
  },
  {
    step: "06",
    title: "Social Media Optimization",
    content: (
      <p>
        Strategically positioning your content for maximum reach, engagement, and impact.
      </p>
    ),
  },
];

// Demo component
export default function TimelineDemo() {
  return (
    <div>
      <Timeline data={timelineData} />
    </div>
  );
}