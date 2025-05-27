import React, { useEffect, useRef } from 'react';

interface EntryAnimationProps {
  onComplete: () => void;
}

const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loadGSAP = async () => {
      // Load GSAP from CDN
      if (!window.gsap) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        script.onload = () => initializeAnimation();
        document.head.appendChild(script);
      } else {
        initializeAnimation();
      }
    };

    const initializeAnimation = () => {
      const { gsap } = window;
      const windowWidth = window.innerWidth;
      const wrapperWidth = 180;
      const finalPosition = windowWidth - wrapperWidth;
      const stepDistance = finalPosition / 6;
      const tl = gsap.timeline();

      // Counter animation
      tl.to(".count", {
        x: -900,
        duration: 0.85,
        delay: 0.5,
        ease: "power4.inOut",
      });

      for (let i = 1; i <= 6; i++) {
        const xPosition = -900 + i * 180;
        tl.to(".count", {
          x: xPosition,
          duration: 0.85,
          ease: "power4.inOut",
          onStart: () => {
            gsap.to(".count-wrapper", {
              x: stepDistance * i,
              duration: 0.85,
              ease: "power4.inOut",
            });
          },
        });
      }

      // Set initial state for reveal elements
      gsap.set(".revealer svg", { scale: 0 });

      // Reveal animation
      const delays = [6, 6.5, 7];
      document.querySelectorAll(".revealer svg").forEach((el, i) => {
        gsap.to(el, {
          scale: 45,
          duration: 1.5,
          ease: "power4.inOut",
          delay: delays[i],
          onComplete: () => {
            if (i === delays.length - 1) {
              // Remove loader and call completion callback
              if (loaderRef.current) {
                (loaderRef.current as HTMLElement).style.display = 'none';
              }
              if (onComplete) {
                onComplete();
              }
            }
          },
        });
      });
    };

    loadGSAP();
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full bg-black text-white flex items-end overflow-hidden z-50"
      style={{ fontFamily: '"PP Editorial Old", serif' }}
    >
      {/* Counter Animation */}
      <div className="relative w-45 h-90 overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', willChange: 'transform' }}>
        <div className="relative flex justify-between transform -translate-x-full" style={{ width: '1080px', height: '360px', transform: 'translateX(-1080px)', willChange: 'transform' }}>
          {['9', '8', '7', '4', '2', '0'].map((digit, index) => (
            <div key={index} className="relative" style={{ width: '180px', height: '360px' }}>
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-light leading-none" style={{ fontSize: '360px' }}>
                {digit}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-45 h-90 overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', willChange: 'transform' }}>
        <div className="relative flex justify-between transform -translate-x-full" style={{ width: '1080px', height: '360px', transform: 'translateX(-1080px)', willChange: 'transform' }}>
          {['9', '5', '9', '7', '4', '0'].map((digit, index) => (
            <div key={index} className="relative" style={{ width: '180px', height: '360px' }}>
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-light leading-none" style={{ fontSize: '360px' }}>
                {digit}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Reveal Stars */}
      <div className="revealer revealer-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="151" height="148" viewBox="0 0 151 148" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="revealer revealer-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="151" height="148" viewBox="0 0 151 148" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
            fill="#CDFD50"
          />
        </svg>
      </div>

      <div className="revealer revealer-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="151" height="148" viewBox="0 0 151 148" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default EntryAnimation;