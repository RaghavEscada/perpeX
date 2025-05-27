import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, Users, Play } from "lucide-react";
import { Curve } from "@/components";
import { LampDemoTeam } from "@/data/data";
import Spline from "@splinetool/react-spline";
import Image from "next/image";

// Create a motion-wrapped Image component for animations
const MotionImage = motion(Image);

// Updated team members with correct roles
const teamMembers = [
  {
    name: "PRABHA",
    role: "Co-Founder",
    image: "/dev.jpeg",
    description: "Visionary leader driving innovation and strategic growth with an unwavering commitment to excellence and transformative business solutions.",
    color: "purple" as const
  },
  {
    name: "SWETHA",
    role: "Co-Founder",
    image: "/adi.jpeg",
    description: "Creative mastermind orchestrating brand narratives and user experiences that captivate audiences and inspire lasting connections.",
    color: "blue" as const
  },
  {
    name: "RIYAS",
    role: "Chief Video Editor",
    image: "/rag.jpeg",
    description: "Crafting compelling visual stories through expert editing, bringing concepts to life with cinematic precision and creative flair.",
    color: "green" as const
  },
  {
    name: "MASVOOD",
    role: "Chief Video Editor",
    image: "/dev.jpeg",
    description: "Transforming raw footage into powerful narratives with technical mastery and an artistic eye for detail and storytelling excellence.",
    color: "orange" as const
  },
  {
    name: "RAGHAV",
    role: "Website Developer",
    image: "/rag.jpeg",
    description: "Building digital experiences where cutting-edge technology meets elegant design, creating seamless and performant web solutions.",
    color: "indigo" as const
  },
];

type ColorType = 'purple' | 'blue' | 'green' | 'orange' | 'indigo';

interface ColorClasses {
  bg: string;
  text: string;
  border: string;
}

const getColorClasses = (color: ColorType): ColorClasses => {
  const colors: Record<ColorType, ColorClasses> = {
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200' }
  };
  return colors[color] || colors.purple;
};

export default function MeetOurTeam() {
  const [index, setIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [viewMode, setViewMode] = useState('carousel');

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle when Spline is loaded
  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  const TeamCarousel = () => (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-50 text-black pt-32 px-4">
      {/* View Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={() => setViewMode('showcase')}
          className="p-3 rounded-xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <Users className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Header */}
      <div className="text-center w-full max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-800 mb-4">
          Meet Our Team
        </h1>
        <p className="text-xl text-gray-600 font-light italic">
          &quot;Elevating moments into masterpieces, simplicity into significance&quot;
        </p>
      </div>

      {/* Team Member Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full px-4"
        >
          {/* Image Section */}
          <div className="relative">
            <div className={`absolute -inset-1 ${getColorClasses(teamMembers[index].color).bg} rounded-3xl opacity-20`} />
            <MotionImage
              src={teamMembers[index].image}
              alt={teamMembers[index].name}
              width={400}
              height={400}
              className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl object-cover shadow-xl border-4 border-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Role Badge */}
            <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 ${getColorClasses(teamMembers[index].color).bg} rounded-full shadow-lg`}>
              <p className="text-white font-medium text-sm">
                {teamMembers[index].role}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-800 mb-4">
              {teamMembers[index].name}
            </h2>

            <div className={`h-1 w-24 ${getColorClasses(teamMembers[index].color).bg} rounded-full my-4`} />

            <p className="text-lg text-gray-600 leading-relaxed font-light italic">
              {teamMembers[index].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
          aria-label="Previous team member"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
        <button
          onClick={nextSlide}
          className="p-4 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
          aria-label="Next team member"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {teamMembers.map((_, memberIndex) => (
          <button
            key={memberIndex}
            onClick={() => setIndex(memberIndex)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              memberIndex === index 
                ? `${getColorClasses(teamMembers[index].color).bg} shadow-md` 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );

  const TeamShowcase = () => (
    <section className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 text-black pt-32 px-4 pb-16">
      {/* View Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={() => setViewMode('carousel')}
          className="p-3 rounded-xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <Play className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Header */}
      <div className="text-center w-full max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-800 mb-4">
          Our Creative Team
        </h1>
        <p className="text-xl text-gray-600 font-light">
          Meet the passionate individuals behind our success
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, memberIndex) => (
          <motion.div
            key={memberIndex}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: memberIndex * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            onClick={() => {
              setIndex(memberIndex);
              setViewMode('carousel');
            }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="relative mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                
                <div className={`h-0.5 w-16 ${getColorClasses(member.color).bg} rounded-full mx-auto mb-3`} />
                
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 ${getColorClasses(member.color).bg} text-white text-sm font-medium rounded-full`}>
                    {member.role}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {member.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  return (
    <Curve backgroundColor={"#f1f1f1"}>
      {/* Spline container - unchanged */}
      <div className="relative w-full h-screen">
        {/* Loading animation */}
        <AnimatePresence>
          {!isSplineLoaded && (
            <motion.div
              className="absolute inset-0 z-20 bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center items-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MotionImage
                src="/nuke.png"
                alt="nuke"
                width={112}
                height={112}
                className="h-28 w-auto object-contain mb-8"
                animate={{
                  scale: [1, 1.05, 1],
                  filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="w-72 h-1 bg-gray-100 rounded-full overflow-hidden mt-6"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-gray-400 to-black rounded-full"
                  animate={{ x: [-288, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <p className="mt-6 text-gray-500 font-light tracking-wider animate-pulse">
                CURATING EXPERIENCE
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Spline
          scene="https://prod.spline.design/d4yC8aVQfxXXcEUr/scene.splinecode"
          className="w-full h-full"
          onLoad={handleSplineLoad}
        />

        {/* Full-width black footer with centered logo */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-black z-10 flex justify-center items-center rounded-t-3xl">
          <Image
            src="/nuke.png"
            alt="nuke"
            width={64}
            height={64}
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Centered scroll indicator */}
        <AnimatePresence>
          {showScrollIndicator && isSplineLoaded && (
            <motion.div
              className="absolute bottom-32 text-white left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-lg font-medium mb-2 drop-shadow-lg">Scroll Down</p>
              <ChevronDown className="w-6 h-6 drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LampDemoTeam />
      
      {/* Clean Team Section */}
      {viewMode === 'carousel' ? <TeamCarousel /> : <TeamShowcase />}
    </Curve>
  );
}