"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 font-sans bg-black text-white rounded-[19px] shadow-xl flex flex-col md:flex-row items-center gap-12 overflow-hidden">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative h-72 w-72">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: index === active ? 1 : 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-full w-full rounded-full object-cover border border-gray-700 shadow-lg"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <motion.div
          key={active}
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="p-6 border border-gray-700 rounded-lg backdrop-blur-md"
        >
          <h3 className="text-xl font-semibold text-white">
            {testimonials[active].name}
          </h3>
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            {testimonials[active].designation}
          </p>
          <motion.p className="mt-6 text-lg text-white leading-relaxed">
            {testimonials[active].quote.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ filter: "blur(5px)", opacity: 0, x: -10 }}
                animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.02 * index }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex gap-6 mt-8 justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
          >
            <IconArrowLeft className="h-6 w-6 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
          >
            <IconArrowRight className="h-6 w-6 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};