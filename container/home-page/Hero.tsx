import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WavyBackgroundDemo } from "@/data/data";

// Mouse Position Hook
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

// Particles Component
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
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
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
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
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

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
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
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
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

const Hero = () => {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <section className="min-h-screen w-full relative">
            {/* Grid background */}
            <div className="absolute inset-0 -z-10 h-[150vh] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            {/* Particles */}
            <Particles
              className="absolute inset-0 -z-20"
              quantity={80}
              color="#3b82f6"
              ease={20}
              refresh
            />

            <div className="min-h-screen w-full pt-6" >
              <div className="flex min-h-[85vh] w-full flex-col items-center justify-center px-8">
                <div className="flex w-full max-w-6xl flex-col items-center text-center space-y-16">

                  {/* Hero Badge */}
                  <div className="inline-flex items-center px-6 py-3 bg-white border border-blue-200 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-blue-700 tracking-wide">
                      Kerala's #1 Business Development Training Institute
                    </span>
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-8">
                    <h1 className="text-5xl font-bold text-black md:text-7xl lg:text-[87px] tracking-tight leading-[1.1] max-w-5xl">
                      <span className="block font-bold text-blue-600">
                        PerpeX
                      </span>
                      Transforms Students Into
                      <span className="block mt-3 font-bold text-black">
                        Business Leaders
                      </span>
                    </h1>
                  </div>

                  <div className="pt-0 w-full">
                    <LogoCloud />
                  </div>

                  {/* Enhanced Description */}
                  <div className="space-y-6 max-w-4xl">
                    <p className="text-2xl text-gray-800 font-medium leading-relaxed tracking-wide">
                      Bridge Kerala's 40% youth unemployment gap with industry-aligned business development training
                    </p>
                    <p className="text-lg text-gray-600 font-normal leading-relaxed">
                      From unemployed graduate to high-earning business professional. Complete sales training, entrepreneurship skills, and guaranteed placement assistance.
                    </p>
                  </div>

                  {/* Enhanced CTAs */}
                  <div className="flex flex-col sm:flex-row gap-6 pt-8">
                    <button className="group relative px-12 py-5 bg-blue-600 text-white font-medium text-lg tracking-wide overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-blue-700 rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <a href="/contact" target="_blank" rel="noopener noreferrer">
                        <button className="bg-slate-300 text-black px-12 py-4 rounded-lg font-medium hover:bg-slate-200 transition-colors duration-300 text-lg">
                          Enroll Now
                          <ArrowRight className="inline ml-2 w-5 h-5" />
                        </button>
                      </a>
                    </button>

                    <a href="/heroperpex.pdf" target="_blank" rel="noopener noreferrer">
                      <button className="bg-slate-300 text-black px-12 py-4 rounded-lg font-medium hover:bg-slate-200 transition-colors duration-300 text-lg">
                        Pertual Excellence Agenda
                        <ArrowRight className="inline ml-2 w-5 h-5" />
                      </button>
                    </a>
                  </div>

                  {/* Trust indicators */}
                  <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Industry-Aligned Curriculum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>100% Placement Assistance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Entrepreneurship Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      }
    >
      <div className="relative mx-auto w-full rounded-[30px] border border-black bg-gray-700 p-2 opacity-100 backdrop-blur-lg will-change-auto md:p-4">
        <img
          alt="PerpeX Business Development Training Program Interface"
          width={1920}
          height={1080}
          className="w-full h-full object-cover rounded-[20px]"
          style={{ color: "transparent" }}
          src={"/tab.webp"}
        />
      </div>
    </ContainerScroll>
  );
};

export default Hero;

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

        {/* Stats section below the image */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16 text-center max-w-4xl mx-auto pb-20">
          <div className="space-y-3">
            <div className="text-5xl font-light text-black tracking-wide">95%</div>
            <div className="text-sm uppercase tracking-widest text-gray-600 font-light">Placement Success Rate</div>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-light text-black tracking-wide">₹8L</div>
            <div className="text-sm uppercase tracking-widest text-gray-600 font-light">Average Starting Package</div>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-light text-black tracking-wide">1500+</div>
            <div className="text-sm uppercase tracking-widest text-gray-600 font-light">Graduates Trained</div>
          </div>
        </div>
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
      <div className="relative mx-auto w-full rounded-[32px] border border-gray-300 bg-gray-100 p-2 opacity-100 backdrop-blur-lg will-change-auto md:p-4">
        {children}
      </div>
    </motion.div>
  );
};

const logos1 = [
  {
    name: "Byjus",
    url: "https://cdn.brandfetch.io/idtntkVe3D/theme/dark/idB5akcINh.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Upgrad",
    url: "https://cdn.brandfetch.io/idvsI-ggxm/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Interval",
    url: "https://www.intervaledu.com/static/web/images/logo/logo-dark.png",
  },
  {
    name: "HCL Tech",
    url: "https://cdn.brandfetch.io/idMbiw2eNO/w/960/h/960/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "XPayBack",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8w5cYFHW3PdWDJSKF4vWdbptQxodZ8nC68Q&s",
  },
];

const logos2 = [
  {
    name: "Amazon",
    url: "https://cdn.brandfetch.io/ideEwHhDrj/w/1024/h/300/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Google",
    url: "https://cdn.brandfetch.io/idOeG0NYWQ/w/1448/h/1448/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Microsoft",
    url: "https://cdn.brandfetch.io/idkGNnB58L/w/280/h/80/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "IBM",
    url: "https://cdn.brandfetch.io/id4Ol9YiiE/w/577/h/239/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Oracle",
    url: "https://cdn.brandfetch.io/idAuvto6zH/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    name: "Salesforce",
    url: "https://cdn.brandfetch.io/idTlKvL568/w/206/h/41/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  },
];

const LogoCloud = () => {
  return (
    <div className="w-full pt-0 py-8">
      <div className="mx-auto w-full px-2 md:px-4">
        <p className="text-sm text-gray-600 text-center mb-6 font-medium">
          Our graduates are placed in leading companies
        </p>

        {/* CSS animations using style tag */}
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
            
            .animate-logo-cloud {
              animation: logo-cloud 30s linear infinite;
            }
            
            .animate-logo-cloud-reverse {
              animation: logo-cloud-reverse 30s linear infinite;
            }
          `
        }} />

        {/* First row - moving left */}
        <div
          className="group relative mt-4 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos1.map((logo, key) => (
                  <img
                    key={key}
                    src={logo.url}
                    className="h-8 w-24 px-2 opacity-60 hover:opacity-100 transition-opacity"
                    alt={`${logo.name} logo - PerpeX placement partner`}
                  />
                ))}
              </div>
            ))}
        </div>

        {/* Second row - moving right */}
        <div
          className="group relative mt-2 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud-reverse flex-row justify-around gap-6"
              >
                {logos2.map((logo, key) => (
                  <img
                    key={key}
                    src={logo.url}
                    className="h-8 w-24 px-2 opacity-60 hover:opacity-100 transition-opacity"
                    alt={`${logo.name} logo - PerpeX placement partner`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};