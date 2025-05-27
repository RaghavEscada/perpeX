"use client";
import { useState } from "react";
import { FaqItems } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export default function Faq() {
	const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
	const toggleAccordion = (itemId: number) => {
		setActiveAccordion((prev) => prev === itemId ? null : itemId);
	};

	return (
		<section className="w-full pt-10 max-w-4xl mx-auto px-10 py-20 bg-[#111] text-white rounded-3xl shadow-xl border border-gray-800">
			<h1 className="text-4xl font-extrabold text-center text-gray-100 mb-14 tracking-wide">
				Frequently Asked Questions
			</h1>
			<div className="space-y-8">
				{FaqItems.map((item) => (
					<div key={item.id} className="border-b border-gray-700 pb-6">
						<button
							onClick={() => toggleAccordion(item.id)}
							className="w-full flex justify-between items-center text-2xl font-medium text-gray-300 hover:text-white transition-all duration-300"
						>
							<span>{item.question}</span>
							{activeAccordion === item.id ? (
								<IoIosArrowDown size={26} className="text-gray-500" />
							) : (
								<IoIosArrowForward size={26} className="text-gray-500" />
							)}
						</button>
						<AnimatePresence>
							{activeAccordion === item.id && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.5 }}
									className="mt-4 text-lg text-gray-400 leading-relaxed"
								>
									{item.description}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</div>
		</section>
	);
}