"use client";
import Image from "next/image";
import { eyes } from "@/public";
import React, { useEffect, useState } from "react";

const ROTATION_OFFSET = 280; // Offset to align the eye image correctly

export default function Eyes({ className }: { className: string }) {
	const [rotate, setRotate] = useState(0);
	
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			const deltaX = mouseX - window.innerWidth / 2;
			const deltaY = mouseY - window.innerHeight / 2;

			const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
			setRotate(angle - ROTATION_OFFSET);
		};

		window.addEventListener("mousemove", handleMouseMove);
		
		// Cleanup function to remove event listener
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className="w-full gap-[30px] flex items-center justify-center">
			<div
				className={`bg-white border-[2px] border-[#21212188] rounded-full flex items-center justify-center ${className}`}>
				<Image
					style={{
						transform: `rotate(${rotate}deg)`,
					}}
					src={eyes}
					alt="img"
					className="w-full h-full object-cover"
				/>
			</div>
			<div
				className={`bg-white border-[2px] border-[#21212188] rounded-full flex items-center justify-center ${className}`}>
				<Image
					style={{
						transform: `rotate(${rotate}deg)`,
					}}
					src={eyes}
					alt="img"
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
}