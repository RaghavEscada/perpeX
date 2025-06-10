"use client";
import { Curve, Footer, Ready } from "@/components";
import { About, Clients, Hero, Projects, VideoHome, X } from "@/container";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const loaderRef = useRef<HTMLDivElement>(null);
	const countWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
	const countRefs = useRef<(HTMLDivElement | null)[]>([]);
	const revealersRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		// Set mounted and start loading
		setIsMounted(true);
		setIsLoading(true);
		
		// Tell App component we're loading
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new CustomEvent('homeLoading', { detail: true }));
		}
		
		let tl: gsap.core.Timeline;
		let revealerAnimations: gsap.core.Tween[] = [];
		
		// Import GSAP dynamically
		import('gsap').then(({ gsap }) => {
			const windowWidth = window.innerWidth;
			const wrapperWidth = 180;
			const finalPosition = windowWidth - wrapperWidth;
			const stepDistance = finalPosition / 6;
			tl = gsap.timeline();

			// Initial count animation
			tl.to(".count", {
				x: -900,
				duration: 0.85,
				delay: 0.5,
				ease: "power4.inOut",
			});

			// Step through each position
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

			// Set revealer SVGs initial scale
			gsap.set(".revealer svg", { scale: 0 });

			// Animate revealer elements
			const delays = [6, 6.5, 7];
			document.querySelectorAll(".revealer svg").forEach((el, i) => {
				const animation = gsap.to(el, {
					scale: 45,
					duration: 1.5,
					ease: "power4.inOut",
					delay: delays[i],
					onComplete: () => {
						if (i === delays.length - 1) {
							// Hide loader and show content immediately
							setIsLoading(false);
							setShowContent(true);
							
							// Tell App component we're done loading
							if (typeof window !== 'undefined') {
								window.dispatchEvent(new CustomEvent('homeLoading', { detail: false }));
							}
							
							// Initialize Locomotive Scroll
							setTimeout(() => {
								initLocomotiveScroll();
							}, 100);
						}
					},
				});
				revealerAnimations.push(animation);
			});
		});

		// Cleanup function
		return () => {
			// Kill GSAP timeline and animations
			if (tl) {
				tl.kill();
			}
			revealerAnimations.forEach(anim => anim.kill());
			
			// Reset states
			setIsLoading(false);
			setShowContent(false);
			setIsMounted(false);
			
			// Reset GSAP elements
			if (typeof window !== 'undefined') {
				window.dispatchEvent(new CustomEvent('homeLoading', { detail: false }));
				gsap.set(".revealer svg", { scale: 0 });
				gsap.set(".count", { x: -1080 });
				gsap.set(".count-wrapper", { x: 0 });
			}
		};
	}, []);

	const initLocomotiveScroll = async () => {
		// Initialize Locomotive Scroll after loader completes
		const LocomotiveScroll = (await import("locomotive-scroll")).default;
		const locomotiveScroll = new LocomotiveScroll({});
		
		return () => {
			locomotiveScroll.destroy();
		};
	};

	// Don't render anything until mounted (prevents hydration mismatch)
	if (!isMounted) {
		return null;
	}

	// Show loader or nothing during loading
	if (isLoading || !showContent) {
		return (
			<div 
				ref={loaderRef}
				className="loader fixed top-0 left-0 w-full h-full bg-black text-white flex items-end overflow-hidden z-50"
			>
				<div 
					ref={(el) => {
						countWrapperRefs.current[0] = el;
					}}
					className="count-wrapper relative w-[180px] h-[360px] overflow-hidden"
					style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
				>
					<div 
						ref={(el) => {
							countRefs.current[0] = el;
						}}
						className="count relative w-[1080px] h-[360px] flex justify-between transform -translate-x-[1080px]"
					>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								9
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								8
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								7
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								4
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								2
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								0
							</h1>
						</div>
					</div>
				</div>

				<div 
					ref={(el) => {
						countWrapperRefs.current[1] = el;
					}}
					className="count-wrapper relative w-[180px] h-[360px] overflow-hidden"
					style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
				>
					<div 
						ref={(el) => {
							countRefs.current[1] = el;
						}}
						className="count relative w-[1080px] h-[360px] flex justify-between transform -translate-x-[1080px]"
					>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								9
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								5
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								9
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								7
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								4
							</h1>
						</div>
						<div className="digit relative w-[180px] h-[360px]">
							<h1 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[360px] font-light leading-none"
								style={{ fontFamily: '"PP Editorial Old", serif' }}
							>
								0
							</h1>
						</div>
					</div>
				</div>

				<div 
					ref={(el) => {
						revealersRef.current[0] = el;
					}}
					className="revealer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				>
					<svg
						width="151"
						height="148"
						viewBox="0 0 151 148"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
							fill="white"
						/>
					</svg>
				</div>

				<div 
					ref={(el) => {
						revealersRef.current[1] = el;
					}}
					className="revealer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				>
					<svg
						width="151"
						height="148"
						viewBox="0 0 151 148"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
							fill="red"
						/>
					</svg>
				</div>

				<div 
					ref={(el) => {
						revealersRef.current[2] = el;
					}}
					className="revealer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				>
					<svg
						width="151"
						height="148"
						viewBox="0 0 151 148"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
							fill="black"
						/>
					</svg>
				</div>
			</div>
		);
	}

	// Show main content after loader completes
	if (!isLoading && showContent) {
		return (
			<Curve backgroundColor={"#f1f1f1"}>
				<Hero />
				<About />
				
				<Clients />
				<Ready />
			</Curve>
		);
	}

	// Fallback during transition - show nothing to prevent flashing
	return null;
}