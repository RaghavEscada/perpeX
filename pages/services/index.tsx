"use client";
import {
  Archive,
  Expectations,
  X,
  FAQ,

} from "@/container";
import { useEffect, useRef } from "react";
import { Curve, Ready } from "@/components";
import { LampDemoServ } from "@/data/data";
import Capibilyties from "@/container/services-page/Capibilyties";
import { Timeline } from "@/components/ui/timeline";

// Timeline data - updated for your marketing process
const timelineData = [
  {
    week: "Week 0",
    title: "Discovery Call",
    content: (
      <p>
        Schedule a free call with our team to understand your company and
        the desired outcome. We then create a tailored project plan.
      </p>
    ),
  },
  {
    week: "Week 1",
    title: "Strategy & Branding",
    content: (
      <p>
        The project plan has been approved, and overall brand messaging has
        been confirmed. Now, leave it to us.
      </p>
    ),
  },
  {
    week: "Week 3",
    title: "Design & Development",
    content: (
      <p>
        Our creative team begins developing your content strategy, focusing on
        design elements and content creation that aligns with your brand vision.
      </p>
    ),
  },
  {
    week: "Week 5",
    title: "Content Production",
    content: (
      <p>
        Full-scale content production begins with our professional team handling
        all aspects of creation, from concept to final delivery.
      </p>
    ),
  },
  {
    week: "Week 7",
    title: "Launch & Optimization",
    content: (
      <p>
        Final content review, optimization, and strategic launch across your
        chosen platforms with ongoing performance monitoring.
      </p>
    ),
  },
];

export default function Services() {

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
    <Curve backgroundColor={"#f1f1f1"}>
      <LampDemoServ />

      <div className="mb-0">
        <X />
      </div>

      {/* Timeline Section */}
      <section className="mb-0">

      </section>

      <Timeline data={timelineData} />

      <Archive />
      {/* <Capibilyties /> */}

      <div className="mb-20 mt-20">
        <FAQ />
      </div>



      <Ready />
    </Curve>
  );
}