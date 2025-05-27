import { useEffect, useRef } from "react";
import { Curve } from "@/components";
import { Herocontact, Form, FAQ, Socials } from "@/container";


export default function Contact() {
  const containerRef = useRef(null);

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
  
      <div data-scroll-container ref={containerRef}>
        <Curve backgroundColor={"#f1f1f1"}>
          <Herocontact />
          <Form />
          <div className="mb-20">
            <Socials />
          </div>
          <div className="mb-20">
            <FAQ />
          </div>
        </Curve>
      </div>
  
  );
}