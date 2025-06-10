import "@/styles/globals.css";
import { Footer, Navbar } from "@/components";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Declare Chatbase types
declare global {
	interface Window {
		chatbase: {
			q: any[];
			(command: string, ...args: any[]): void;
		} & ((command: string, ...args: any[]) => void);
	}
}

type ChatbaseFunction = {
	(command: string, ...args: any[]): void;
	q: any[];
};

export default function App({
	Component,
	pageProps,
	router,
}: {
	Component: any;
	pageProps: any;
	router: any;
}) {
	// Define the route where you don't want the footer
	const hideFooterRoutes = ["/core"]; // Add more routes if needed

	// Initialize Chatbase
	useEffect(() => {
		// Chatbase initialization script
		(function() {
			if (!window.chatbase || typeof window.chatbase("getState") !== "string") {
				const chatbaseFn: ChatbaseFunction = function(command: string, ...args: any[]) {
					if (!chatbaseFn.q) {
						chatbaseFn.q = [];
					}
					chatbaseFn.q.push([command, ...args]);
				};
				chatbaseFn.q = [];
				window.chatbase = chatbaseFn as Window["chatbase"];
				window.chatbase = new Proxy(window.chatbase, {
					get(target, prop) {
						if (prop === "q") {
							return target.q;
						}
						return (...args: any[]) => target(prop as string, ...args);
					}
				});
			}

			const onLoad = function() {
				const script = document.createElement("script");
				script.src = "https://www.chatbase.co/embed.min.js";
				script.id = "NMhH2zlNafSqe-CirT7zr";
				script.setAttribute("data-domain", "www.chatbase.co");
				document.body.appendChild(script);
			};

			if (document.readyState === "complete") {
				onLoad();
			} else {
				window.addEventListener("load", onLoad);
			}
		})();
	}, []); // Empty dependency array means this runs once on mount

	return (
		<>
	
			<Navbar />
			<AnimatePresence mode="wait">
				<Component
					key={router.route}
					{...pageProps}
				/>
			</AnimatePresence>
			{/* Render footer only if the current route is not in the hideFooterRoutes array */}
			{!hideFooterRoutes.includes(router.route) && <Footer />}
		</>
	);
}