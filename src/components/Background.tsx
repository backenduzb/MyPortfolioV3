"use client"

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

export default function () {
    const particlesInit = async (engine: Engine) => {
        await loadFull(engine);
      };
    return(
        <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: { 
            color: { value: "#000" },
          },
          particles: {
            number: { value: 80 },
            color: { value: "#ffffff" },
            links: {
              enable: true,
              color: "#ffffff",
              distance: 150,
              opacity: 0.5,
            },
            move: {
              enable: true,
              speed: 2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: ["grab"] },
            },
            modes: {
              grab: {
                distance: 200, 
                links: { opacity: 0.8 },
              },
              repulse: { distance: 100 },
              push: { quantity: 4 },
            },
          },
        }}
      />
    )
}