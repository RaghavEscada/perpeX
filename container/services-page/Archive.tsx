import { motion } from "framer-motion";

const logos = [
  {
    name: "Babel",
    url: "https://svgl.app/library/babel.svg",
  },
  {
    name: "Ngrok", 
    url: "https://svgl.app/library/ngrok-light.svg",
  },
  {
    name: "Webflow",
    url: "https://svgl.app/library/webflow.svg",
  },
  {
    name: "Perplexity",
    url: "https://svgl.app/library/perplexity_wordmark_light.svg",
  },
  {
    name: "Sanity",
    url: "https://svgl.app/library/sanity.svg",
  },
  {
    name: "Post CSS",
    url: "https://svgl.app/library/postcss_wordmark.svg",
  },
];

const MinimalLogoCloud = () => {
  return (
    <div className="w-full py-20">
      <style jsx>{`
        @keyframes logo-cloud {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - 3rem));
          }
        }
        
        .animate-logo-cloud {
          animation: logo-cloud 20s linear infinite;
        }
      `}</style>
      
      <div className="mx-auto w-full px-4">
        <motion.h3 
          className="text-center text-sm font-light text-zinc-500 tracking-wide uppercase mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Trusted Partners
        </motion.h3>
        
        <div
          className="relative flex gap-8 overflow-hidden py-4"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <motion.div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                {logos.map((logo, key) => (
                  <div key={key} className="group relative">
                    <div className="relative bg-zinc-950/30 border border-zinc-800/30 rounded-lg p-4 hover:border-zinc-700/50 transition-all duration-300">
                      <img
                        src={logo.url}
                        className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                        alt={logo.name}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <div className="w-full min-h-screen bg-black text-white relative">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Main Hook */}
        <div className="space-y-20 mb-40">
          <div className="relative">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none">
              Your audience is
              <br />
              <span className="text-zinc-400 font-light">scrolling.</span>
              <br />
              <span className="text-zinc-500 font-light">Are they stopping?</span>
            </h1>
            
            {/* Simple line decoration */}
            <div className="absolute top-1/2 -right-12 w-20 h-[1px] bg-white/30" />
          </div>
          
          <div className="flex items-center gap-6 ml-2">
            <div className="w-16 h-[1px] bg-white/40" />
            <p className="text-lg font-normal tracking-wide text-zinc-300">
              Stop the scroll. Start the growth.
            </p>
          </div>
        </div>

        {/* Image Placeholder Section */}
        <div className="mb-40">
          <div className="bg-zinc-900 rounded-3xl h-[52rem] flex items-center justify-center border border-zinc-800">
             <img src="/m1.webp" alt="CTA Image" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 mb-40">
          {/* Left Column */}
          <div className="space-y-10">
            <div className="border border-zinc-700 rounded-2xl p-10">
              <h2 className="text-3xl md:text-4xl font-normal mb-8 leading-relaxed">
                Social media isn't just posting—
                <span className="block text-zinc-400 font-light mt-2">
                  it's about standing out.
                </span>
              </h2>
              
              <p className="text-zinc-300 text-lg leading-relaxed font-light">
                A weak presence means missed opportunities. We create content that 
                turns scrollers into followers and followers into loyal customers.
              </p>
            </div>
            
            <button className="bg-white text-black px-10 py-4 rounded-full font-normal tracking-wide hover:bg-zinc-200 transition-colors duration-300">
              Let's Create →
            </button>
          </div>

          {/* Right Column with Image Space */}
          <div className="space-y-10">
            {/* Image Placeholder */}
            <div className="bg-zinc-900 rounded-lg h-80 flex items-center justify-center border border-zinc-800">
            <img src="/a1.webp" alt="CTA Image" className="w-full h-full object-cover" />
            </div>
            
            <div className="border border-zinc-700 rounded-2xl p-10">
              <h3 className="text-2xl font-normal mb-6">
                Nuke is a winning formula
              </h3>
              
              <p className="text-zinc-300 text-lg leading-relaxed font-light mb-8">
                Your brand deserves a strategy that pulls in leads like a magnet. 
                With viral-worthy content and a brand identity that sticks.
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="text-zinc-400 font-normal">Meet the team</span>
                <div className="w-6 h-[1px] bg-zinc-600" />
                <span className="text-white font-medium">5 Masterminds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-40">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-light mb-4">The Masterminds</h2>
              <div className="w-20 h-[1px] bg-white/40" />
            </div>
            <button className="text-zinc-400 hover:text-white transition-colors duration-300 font-normal rounded-full border border-zinc-600 hover:border-white px-6 py-2">
              View All →
            </button>
          </div>

          {/* Image Space for Team */}
          <div className="bg-zinc-900 rounded-3xl h-[64rem] flex items-center justify-center border border-zinc-800 mb-12">
          <img src="/g.webp" alt="CTA Image" className="w-full h-full object-cover" />
          </div>

          {/* Team Grid */}
         
        </div>

        {/* Stats with Image Space */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {/* Stats */}
          <div className="border border-zinc-700 rounded-3xl p-12">
            <div className="grid grid-cols-1 gap-8">
              {[
                { number: "500K+", label: "Impressions Generated" },
                { number: "< 3 Months ", label: "in Time" },
                { number: "2M+", label: "Viral Views" }
              ].map((stat, index) => (
                <div key={index} className="text-center relative pb-6 border-b border-zinc-800 last:border-b-0">
                  <div className="text-4xl md:text-5xl font-light mb-2">
                    {stat.number}
                  </div>
                  <div className="text-zinc-400 text-sm font-normal">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image Space */}
          <div className="bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800">
            <p className="text-zinc-500 font-light">Results / Portfolio Image</p>
          </div>
        </div>
      </div>

      {/* Logo Cloud Section - UNCHANGED */}
      <div className="bg-black">
        <MinimalLogoCloud />
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Image Space for CTA */}
          <div className="bg-zinc-900 rounded-3xl h-96 flex items-center justify-center border border-zinc-800 mb-16">
            <img src="/cta.webp" alt="CTA Image" className="w-full h-full object-cover" />
          </div>
          
          <div className="text-center">
            <h2 className="text-6xl md:text-7xl font-light mb-8 leading-tight">
              Ready to go
              <span className="block text-zinc-400 font-light">
                viral?
              </span>
            </h2>
            
            <p className="text-xl mb-16 text-zinc-300 font-light max-w-2xl mx-auto">
              Let's create content that stops the scroll—starting today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-black px-12 py-4 rounded-full font-normal tracking-wide hover:bg-zinc-200 transition-colors duration-300">
                Book A Call
              </button>
              
              <button className="border border-white text-white px-12 py-4 rounded-full font-normal tracking-wide hover:bg-white hover:text-black transition-all duration-300">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}