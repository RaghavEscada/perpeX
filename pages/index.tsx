"use client";
import { Curve, Ready } from "@/components";
import { About, Clients, Hero, Projects, VideoHome, X } from "@/container";
import { useEffect, useRef } from "react";
export default function Home() {


	useEffect(() => {
		// If you still want to manually initialize Locomotive Scroll
		// (though using LocomotiveScrollProvider is recommended)
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll({

			});
			// Optionally, you can destroy the instance when the component unmounts
			return () => {
				locomotiveScroll.destroy();
			};
		})();
	}, []);





	return (
		<>
			<Curve backgroundColor={"#f1f1f1"}>


				<Hero />

				<About />


				<X />
				<Projects />
				<Clients />
				<Ready />
			</Curve>
		</>
	);
}
