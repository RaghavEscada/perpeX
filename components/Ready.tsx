"use client";
import Link from "next/link";
import { useRef } from "react";
import { TextMask } from "@/animation";
import { ArrowUpRight } from "lucide-react";
import { Rounded } from "@/components";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Ready() {
	const container = useRef(null);
	const phrase = ["LET'S", "get to", "Business"];

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const mq = useTransform(scrollYProgress, [0, 1], [0, -700]);

	return (
		<section
			className="w-full text-secondary relative font-NeueMontreal z-30 min-h-screen bg-black px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 rounded-t-[20px] mt-[-20px]"
			ref={container}>
			<div className="w-full h-full flex justify-center items-center flex-col gap-8 sm:gap-12 md:gap-16">
				{/* Main Heading */}
				<div className="flex flex-col gap-2 sm:gap-4">
					<h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[170px] 
						leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight 2xl:leading-[170px]
						tracking-tight font-bold text-blue-700 uppercase pointer-events-none text-center">
						<TextMask>{phrase}</TextMask>
					</h1>
				</div>

				{/* Contact Button */}
				<div className="flex flex-col items-center gap-4">
					<div className="flex items-center justify-between bg-transparent cursor-pointer rounded-full group border border-[#212121] hover:border-blue-600 transition-colors duration-300">
						<Link
							className="text-sm sm:text-base lg:text-lg uppercase font-normal font-NeueMontreal"
							href="/contact">
							<Rounded
								className="py-2 sm:py-3"
								backgroundColor="#ffffff">
								<p className="z-10 px-4 sm:px-6 ml-3 sm:ml-4 py-2 sm:py-3 font-['Gilda_Display'] group-hover:text-white text-blue-600 text-sm sm:text-base transition-colors duration-300">
									info@perpex.in
								</p>
								<div className="bg-white group-hover:bg-blue-600 p-2 sm:p-3 rounded-full scale-[0.3] mr-2 sm:mr-3 group-hover:scale-[0.9] transition-all z-10 transform duration-300 ease-[.215,.61,.355,1]">
									<ArrowUpRight
										strokeWidth={1.5}
										size={20}
										className="scale-0 group-hover:scale-100 transition-transform duration-300 text-blue-600 group-hover:text-white sm:w-6 sm:h-6"
									/>
								</div>
							</Rounded>
						</Link>
					</div>
				</div>
			</div>

			{/* Animated Background Element */}
			<motion.div
				className="w-full absolute top-1/2 left-0 -translate-y-1/2 gap-6 sm:gap-8 flex items-center justify-center pointer-events-none"
				style={{ y: mq }}>
				{/* Add your background elements here if needed */}
			</motion.div>
		</section>
	);
}