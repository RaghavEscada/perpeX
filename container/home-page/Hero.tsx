import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Target, TrendingUp, Users, Award, Briefcase } from "lucide-react";

// Enhanced Mouse Position Hook with smooth tracking
interface MousePosition {
  x: number;
  y: number;
}

function MousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

// Enhanced Particles with magnetic interaction
interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 120,
  staticity = 30,
  ease = 25,
  size = 0.6,
  refresh = false,
  color = "#3b82f6",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = MousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [color]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 3) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.8 + 0.2).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.3;
    const dy = (Math.random() - 0.5) * 0.3;
    const magnetism = 0.2 + Math.random() * 6;
    return { x, y, translateX, translateY, size: pSize, alpha, targetAlpha, dx, dy, magnetism };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      
      // Enhanced gradient effect
      const gradient = context.current.createRadialGradient(x, y, 0, x, y, size * 2);
      gradient.addColorStop(0, `rgba(${rgb.join(", ")}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${rgb.join(", ")}, ${alpha * 0.3})`);
      
      context.current.fillStyle = gradient;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
      
      if (remapClosestEdge > 1) {
        circle.alpha += 0.03;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      drawCircle(circle, true);

      if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size || 
          circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    window.requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};

// Official Container Text Flip Component
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["Business Leaders", "Entrepreneurs", "Sales Experts", "Industry Professionals"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = React.useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add some padding to the text width (30px on each side)
      // @ts-ignore
      const textWidth = textRef.current.scrollWidth + 60; // Increased for larger text
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.p
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center font-bold text-white md:text-7xl lg:text-[87px]",
        "bg-gradient-to-br from-gray-900 via-black to-gray-900",
        "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
        "border border-white/10",
        "hover:scale-105 transition-all duration-300",
        "hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]",
        className,
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.p>
  );
}

// Enhanced Hero Component
const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ContainerScroll
      titleComponent={
        <section className="min-h-screen w-full relative overflow-hidden">
          {/* Enhanced Grid Background with Animation */}
          <motion.div 
            className="absolute inset-0 -z-10 h-[150vh]"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              background: `
                linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)
              `,
              backgroundSize: "4rem 4rem, 4rem 4rem, 100% 100%",
              maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, #000 70%, transparent 110%)"
            }}
          />

          {/* Enhanced Particles */}
          <Particles
            className="absolute inset-0 -z-20"
            quantity={100}
            color="#3b82f6"
            ease={15}
            refresh
          />

          <div className="min-h-screen w-full pt-6">
            <div className="flex min-h-[85vh] w-full flex-col items-center justify-center px-8">
              <div className="flex w-full max-w-6xl flex-col items-center text-center space-y-16">

                {/* Animated Hero Badge */}
                <motion.div 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border border-blue-200/50 rounded-full shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.3)"
                  }}
                >
                  <span className="text-sm font-medium text-blue-700 tracking-wide">
                    Kerala's #1 Business Development Training Institute
                  </span>
                </motion.div>

                {/* Enhanced Main Heading with Advanced Text Flip */}
                <div className="space-y-8">
                  <motion.h1 
                    className="text-5xl font-bold text-black md:text-7xl lg:text-[87px] tracking-tight leading-[1.1] max-w-5xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <motion.span 
                      className="block font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: "200% 200%"
                      }}
                    >
                      PerpeX
                    </motion.span>
                    
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="block mt-4"
                    >
                      Transforms Students Into
                    </motion.span>
                    
                    <motion.div
                      className="flex justify-center mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <ContainerTextFlip
                        words={["Business Leaders", "Entrepreneurs", "Sales Experts", "Industry Professionals"]}
                        interval={1500}
                        animationDuration={800}
                        className="transform hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  </motion.h1>
                </div>

                {/* Enhanced Logo Cloud */}
                <motion.div 
                  className="pt-0 w-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <LogoCloud />
                </motion.div>

                {/* Enhanced Description with Stagger */}
                <motion.div 
                  className="space-y-6 max-w-4xl"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.3,
                        delayChildren: 1.2
                      }
                    }
                  }}
                >
                  <motion.p 
                    className="text-2xl text-gray-800 font-medium leading-relaxed tracking-wide"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    Bridge Kerala's 40% youth unemployment gap with industry-aligned business development training
                  </motion.p>
                  <motion.p 
                    className="text-lg text-gray-600 font-normal leading-relaxed"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    From unemployed graduate to high-earning business professional. Complete sales training, entrepreneurship skills, and guaranteed placement assistance.
                  </motion.p>
                </motion.div>

                {/* Enhanced CTAs with Hover Effects */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 pt-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  <motion.button 
                    className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-lg tracking-wide overflow-hidden transition-all duration-500 rounded-lg"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: "-100%" }}
                      animate={{ x: isHovered ? "100%" : "-100%" }}
                      transition={{ duration: 0.6 }}
                      style={{ transform: "skewX(-12deg)" }}
                    />
                    <span className="relative z-10 flex items-center">
                      Enroll Now
                      <motion.div
                        className="ml-2"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </motion.button>

                  <motion.button 
                    className="bg-white/80 backdrop-blur-sm text-black px-12 py-4 rounded-lg font-medium border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 text-lg"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      Excellence Agenda
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </motion.button>
                </motion.div>

     
                
              </div>
            </div>
          </div>
        </section>
      }
    >
      <motion.div 
        className="relative mx-auto w-full rounded-[30px] border border-black/10 bg-gradient-to-br from-gray-100 to-gray-200 p-2 opacity-100 backdrop-blur-lg will-change-auto md:p-4 shadow-2xl"
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          rotateX: 5
        }}
        transition={{ duration: 0.3 }}
      >
        <img
          alt="PerpeX Business Development Training Program Interface"
          width={1920}
          height={1080}
          className="w-full h-full object-cover rounded-[20px] transition-transform duration-300"
          style={{ color: "transparent" }}
          src="/tab.webp"
        />
        
        {/* Interactive Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-[20px] opacity-0 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </ContainerScroll>
  );
};

// Enhanced Container Scroll
const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="relative flex items-center justify-center w-full min-h-screen"
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>

       
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="mx-auto -mt-12 h-auto w-full max-w-5xl rounded-[30px]"
    >
      <div className="relative mx-auto w-full rounded-[32px] border border-gray-300/50 bg-gradient-to-br from-gray-50 to-gray-100 p-2 opacity-100 backdrop-blur-lg will-change-auto md:p-4 shadow-xl">
        {children}
      </div>
    </motion.div>
  );
};

// Enhanced Logo Cloud with better animations
const logos1 = [
  { name: "Byjus", url: "https://cdn.brandfetch.io/idtntkVe3D/theme/dark/idB5akcINh.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "Upgrad", url: "https://cdn.brandfetch.io/idvsI-ggxm/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "Interval", url: "https://www.intervaledu.com/static/web/images/logo/logo-dark.png" },
  { name: "HCL Tech", url: "https://cdn.brandfetch.io/idMbiw2eNO/w/960/h/960/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "XPayBack", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8w5cYFHW3PdWDJSKF4vWdbptQxodZ8nC68Q&s" },
];

const logos2 = [
  { name: "Amazon", url: "https://cdn.brandfetch.io/ideEwHhDrj/w/1024/h/300/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "Google", url: "https://cdn.brandfetch.io/idOeG0NYWQ/w/1448/h/1448/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "Microsoft", url: "https://cdn.brandfetch.io/idkGNnB58L/w/280/h/80/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "IBM", url: "https://cdn.brandfetch.io/id4Ol9YiiE/w/577/h/239/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "Oracle", url: "https://cdn.brandfetch.io/idAuvto6zH/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "Salesforce", url: "https://cdn.brandfetch.io/idTlKvL568/w/206/h/41/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" },
];

const LogoCloud = () => {
  return (
    <div className="w-full pt-0 py-8">
      <div className="mx-auto w-full px-2 md:px-4">
        <motion.p 
          className="text-sm text-gray-600 text-center mb-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Our graduates are placed in leading companies
        </motion.p>

        {/* Enhanced CSS animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes logo-cloud {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
            
            @keyframes logo-cloud-reverse {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(0); }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-10px) scale(1.05); }
            }
            
            .animate-logo-cloud {
              animation: logo-cloud 25s linear infinite;
            }
            
            .animate-logo-cloud-reverse {
              animation: logo-cloud-reverse 25s linear infinite;
            }
            
            .logo-hover:hover {
              animation: float 0.6s ease-in-out;
              filter: brightness(1.2) drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3));
            }
          `
        }} />

        {/* First row - enhanced with hover effects */}
        <motion.div
          className="group relative mt-4 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage: "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {Array(5).fill(null).map((_, index) => (
            <div
              key={index}
              className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
            >
              {logos1.map((logo, key) => (
                <motion.img
                  key={key}
                  src={logo.url}
                  className="h-8 w-24 px-2 opacity-60 hover:opacity-100 transition-all duration-300 logo-hover cursor-pointer"
                  alt={`${logo.name} logo - PerpeX placement partner`}
                  whileHover={{ 
                    scale: 1.1,
                    filter: "brightness(1.2)",
                    zIndex: 10
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* Second row - enhanced with hover effects */}
        <motion.div
          className="group relative mt-2 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {Array(5).fill(null).map((_, index) => (
            <div
              key={index}
              className="flex shrink-0 animate-logo-cloud-reverse flex-row justify-around gap-6"
            >
              {logos2.map((logo, key) => (
                <motion.img
                  key={key}
                  src={logo.url}
                  className="h-8 w-24 px-2 opacity-60 hover:opacity-100 transition-all duration-300 logo-hover cursor-pointer"
                  alt={`${logo.name} logo - PerpeX placement partner`}
                  whileHover={{ 
                    scale: 1.1,
                    filter: "brightness(1.2)",
                    zIndex: 10
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;