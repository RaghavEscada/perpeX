"use client";
import { useRef } from "react";
import { ProjectCard, Tags } from "@/components";


export default function Projects() {
	const container = useRef(null);
	return (
		<div
			className="w-full"
			ref={container}>
		
			<section className="w-full relative z-30 padding-y rounded-t-[20px] bg-background">
				<div>
					<h2 className="sub-heading font-normal padding-x font-NeueMontreal text-secondry">
						In Nuke Marketing, We CraftPurpose driven, strategy-led digitial solutions
						<br className="sm:hidden xm:hidden" />
						that people care about.
					</h2>
				</div>
				
			</section>
		</div>
	);
}