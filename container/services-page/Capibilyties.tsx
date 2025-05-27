"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedTestimonialsDemo } from "@/data/data";

export default function Clients() {
  return (
    <>
      <section className="padding-y">
        <AnimatedTestimonialsDemo/>
      </section>
      <section className="padding-y">
        <Testimonial />
      </section>
    </>
  );
}

const Testimonial = () => {
  return (
    <div className="relative flex h-auto w-full flex-col items-center font-NeueMontreal justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="mx-auto max-w-4xl p-4 text-center sm:py-14">
        <h1 className="mb-4 text-7xl  font-NeueMontreal text-black dark:text-black md:text-5xl">
          Our Clients
          <br />
          <span className="bg-red-800 bg-clip-text text-transparent ">
          Loves Us!
          </span>
        </h1>
        <p className="text-3xl p-7 text-black italic dark:text-black md:text-xl">
        "Ordinary doesn't live here. We craft the extraordinary, one bold idea at a time."
        </p>
      </div>

      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.email} {...review} />
        ))}
      </Marquee> 
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.email} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:20s]">
        {thirdRow.map((review) => (
          <ReviewCard key={review.email} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-ray-500 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

const ReviewCard = ({ img, name, email, description }: any) => {
  return (
    <figure
      className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-black">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{email}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{description}</blockquote> 
    </figure>
  );
};

const testimonials = [
  {
    name: "John Doe",
    email: "johndoe23@gmail.com",
    description:
      "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://img.freepik.com/free-photo/brunette-girl-posing_23-2148108748.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Alex Johnson",
    email: "alexjohnson@gmail.com",
    description: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@gmail.com",
    description: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://img.freepik.com/free-photo/smiling-asian-woman_23-2147766303.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Michael Brown",
    email: "michaelbrown@gmail.com",
    description: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://img.freepik.com/free-photo/portrait-modern-man_23-2147960990.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Sarah Miller",
    email: "sarahmiller@gmail.com",
    description: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Laura White",
    description: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://img.freepik.com/premium-photo/woman-wearing-glasses-yellow-shirt-is-wearing-yellow-shirt_911060-133057.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
];

const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 3));
const secondRow = testimonials.slice(
  Math.ceil(testimonials.length / 3),
  2 * Math.ceil(testimonials.length / 3),
);
const thirdRow = testimonials.slice(2 * Math.ceil(testimonials.length / 3));

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={`group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around [gap:var(--gap)] ${
              vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row"
            } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""} ${
              reverse ? "[animation-direction:reverse]" : ""
            }`}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
