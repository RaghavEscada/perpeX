export default function Form() {
	return (
		<section className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			<h1 className="text-3xl font-bold text-gray-800 mb-4">Fill Out the Form</h1>
			<p className="text-lg text-gray-600 mb-6">Let's launch off with your project!</p>
			<div className="w-full max-w-4xl h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden">
				<iframe
					src="https://tally.so/embed/mObJOa?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
					width="100%"
					height="100%"
			
					title="Nuke Marketing Lead Gen Form"
					className="w-full h-full"
				></iframe>
			</div>
		</section>
	);
}
