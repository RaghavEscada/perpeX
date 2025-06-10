"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const Portfolio: React.FC = () => {
  const pinnedSectionRef = useRef<HTMLElement>(null);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const indicesContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const indicesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pinnedSection = pinnedSectionRef.current;
    const stickyHeader = stickyHeaderRef.current;
    const cards = cardsRef.current;
    const indicesContainer = indicesContainerRef.current;
    const indices = indicesRef.current;

    if (!pinnedSection || !stickyHeader || !indicesContainer) return;

    const cardCount = cards.length;
    const pinnedHeight = window.innerHeight * (cardCount + 1);
    const startRotations = [0, 5, 0, -5];
    const endRotations = [-10, -5, 10, 5];

    // Set initial card rotations
    cards.forEach((card, index) => {
      if (card) {
        gsap.set(card, { rotation: startRotations[index] });
      }
    });

    let areIndicesVisible = false;
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

    function showIndices() {
      gsap.to(indicesContainer, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      areIndicesVisible = true;
    }

    function hideIndices() {
      gsap.to(indicesContainer, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      areIndicesVisible = false;
      animateIndexOpacity(-1);
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: pinnedSection,
      start: "top top",
      end: `+=${pinnedHeight}`,
      pin: true,
      pinSpacing: true,
      onLeave: () => {
        hideIndices();
      },
      onEnterBack: () => {
        showIndices();
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

        if (progress > 1 && !areIndicesVisible) {
          showIndices();
        } else if (progress <= 1 && areIndicesVisible) {
          hideIndices();
        }

        if (areIndicesVisible) {
          let colorIndex = -1;
          if (progress > 1) {
            colorIndex = Math.min(Math.floor(progress - 1), cardCount - 1);
          }
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
     

      {/* Hero Section */}
      <section className="w-screen h-screen bg-white flex justify-center items-center">
        <h1 className="text-6xl md:text-4xl font-['Gilda_Display'] text-center text-black italic">"Building the next generation of business rebels who think outside the boardroom."</h1>
      </section>

      {/* Cards Section */}
    
    </>
  );
};

export default Portfolio;