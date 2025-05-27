import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap, TrendingUp, Target, Building2, ArrowRight
} from "lucide-react";

const pillars = [
  {
    id: 1,
    number: "01",
    title: "PerpeX Institute",
    description: "Comprehensive training ecosystem",
    icon: GraduationCap,
    highlights: [
      "Hands-on practical modules",
      "Industry expert mentorship", 
      "Real-world case studies",
      "Professional skill development",
      "Continuous learning support"
    ],
    gradient: "from-blue-50 to-cyan-50"
  },
  {
    id: 2,
    number: "02", 
    title: "SaleX",
    description: "Business development excellence",
    icon: TrendingUp,
    highlights: [
      "Client-centric sales funnels",
      "B2B sales strategies",
      "Revenue optimization",
      "Sales team training",
      "Performance analytics"
    ],
    gradient: "from-slate-50 to-blue-50"
  },
  {
    id: 3,
    number: "03",
    title: "MarketriX", 
    description: "Strategic marketing solutions",
    icon: Target,
    highlights: [
      "Lead generation systems",
      "Organic marketing strategies",
      "Technology integration",
      "Brand visibility enhancement",
      "Growth-focused campaigns"
    ],
    gradient: "from-blue-50 to-slate-50"
  },
  {
    id: 4,
    number: "04",
    title: "PlaceX",
    description: "Talent placement hub",
    icon: Building2,
    highlights: [
      "Campus-industry connections",
      "Job matching algorithms",
      "Recruiter network access",
      "Career guidance support",
      "Placement success tracking"
    ],
    gradient: "from-slate-50 to-cyan-50"
  }
];

const PillarCard = ({ pillar }: { pillar: any }) => {
  const Icon = pillar.icon;
  
  return (
    <div className="w-screen min-w-screen flex-shrink-0 h-full px-12 flex items-center justify-center relative">
      {/* Content card */}
      <div className={`bg-gradient-to-br ${pillar.gradient} rounded-3xl shadow-xl max-w-2xl w-full mx-auto ml-auto mr-16 relative z-20 overflow-hidden h-4/5 border border-slate-200/50 backdrop-blur-sm`}>
        
        {/* Icon header */}
        <div className="absolute top-0 right-0 w-24 h-24 flex items-center justify-center rounded-bl-3xl bg-">
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        {/* Number tab */}
        <div className="absolute left-8 top-0 rounded-b-xl px-4 py-2 text-sm font-medium bg-slate-900 text-white">
          {pillar.number}
        </div>
        
        {/* Card Content */}
        <div className="pt-20 px-8 pb-8 h-full flex flex-col">
          <h2 className="text-4xl font-light text-slate-900 mb-2">{pillar.title}</h2>
          <p className="text-lg font-light text-slate-600 mb-8">{pillar.description}</p>
          
          <div className="w-16 h-0.5 rounded-full mb-8 bg-slate-900"></div>
          
          {/* Highlights */}
          <div className="space-y-4 flex-1">
            {pillar.highlights.map((highlight: string, idx: number) => (
              <div key={idx} className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-3 flex-shrink-0"></div>
                <p className="text-slate-700 text-base font-light">{highlight}</p>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <a href="/contact" className="mt-8 w-full py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-300 font-medium flex items-center justify-center group">
            Get Started Today
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
      
      {/* Step indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {pillars.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === pillar.id - 1 ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function PerpeXPillarsScroll() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  // Adjusted for 4 pillars instead of 8
  const x = useTransform(scrollYProgress, [0, 0.9], ["0%", `-${(pillars.length - 1) * 100}%`]);  
  const progressWidth = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);
  
  return (
    <section 
      ref={targetRef} 
      className="relative bg-black"
      style={{ height: `${800}vh` }}
    >
      {/* Progress bar */}
      <div className="sticky top-6 left-0 w-full z-50 px-12">
        <div className="h-0.5 bg-slate-700 rounded-full">
          <motion.div 
            className="h-full bg-white rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-start">
        {/* Background heading text */}
        <div className="absolute left-12 px-12 top-1/2 transform -translate-y-1/2 text-white max-w-xl z-0 pointer-events-none">
          <h1 className="text-7xl font-extralight leading-tight tracking-tight">
            Four-Pillar
            <br />
            <span className="flex font-light">
              Ecosystem
            </span>
          </h1>
          <p className="text-xl font-light text-slate-400 mt-6 max-w-md leading-relaxed">
            An integrated approach designed to transform potential into professional excellence
          </p>
        </div>
        
        {/* Horizontal carousel */}
        <motion.div
          style={{ x }}
          className="flex flex-nowrap h-screen pt-16 pb-0 w-full"
        >
          {pillars.map((pillar) => (
            <PillarCard 
              key={pillar.id} 
              pillar={pillar}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Call to action section */}
     
    </section>
  );
}
