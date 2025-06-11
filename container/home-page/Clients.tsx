"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// Import ScrollTrigger only on client side
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { client, urlFor } from "@/sanity/client";

// Type definition for card data from Sanity
interface Card {
  _id: string;
  title: string;
  description: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  imageUrl?: string;
}

// Import and register ScrollTrigger only on client side
const Portfolio: React.FC = () => {
  const pinnedSectionRef = useRef<HTMLElement>(null);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const indicesContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const indicesRef = useRef<HTMLDivElement[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cards from Sanity
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const query = `*[_type == "card"] {
          _id,
          title,
          description,
          image,
          imageUrl
        }`;
        
        const result = await client.fetch(query);
        setCards(result);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCards();
  }, []);

  useEffect(() => {
    // Import ScrollTrigger dynamically on client side
    if (typeof window === "undefined") return;

    // Dynamic import of ScrollTrigger
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      // Register the plugin
      gsap.registerPlugin(ScrollTrigger);

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
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="w-screen h-screen bg-white flex justify-center items-center">
        <h1 className="text-6xl md:text-4xl font-['Gilda_Display'] text-center text-black italic">"Building the next generation of business rebels who think outside the boardroom."</h1>
      </section>

      {/* Cards Section */}
      <section className="w-full bg-white py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-['Gilda_Display'] text-black mb-12">Our Work</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-xl">Loading cards...</p>
            </div>
          ) : cards.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-xl">No cards found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card) => (
                <div 
                  key={card._id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative w-full h-64">
                    {card.image ? (
                      <Image
                        src={urlFor(card.image).width(800).height(500).url()}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    ) : card.imageUrl ? (
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-gray-700">{card.description}</p>
                    <button className="mt-4 flex items-center text-black font-medium hover:underline">
                      Learn more <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Portfolio;