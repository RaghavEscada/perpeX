
import { Heading, ProjectCard, RoundButton, Tags } from "@/components";



export default function Projects() {
	return (
		<section className="w-full text-center rounded-t-[20px]">
			{/* Heading */}
			<Heading
				title="Corporate Service Portfolio"
				className="padding-x padding-y pb-[50px] border-b border-[#21212155]"
			/>

			


			{/* Button Section */}
			<div className="w-full flex justify-center mt-10 pb-10">
				<div className="flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
					<RoundButton
						href="/contact"
						title="Contact Us"
						bgcolor="#000"
						className="bg-white text-black"
						style={{ color: "#fff" }}
					/>
				</div>
			</div>

		
		
			
		</section>
		
	);
}
