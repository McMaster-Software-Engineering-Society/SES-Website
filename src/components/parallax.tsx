import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import Hero1 from "../assets/home-hero/hero-1.png";

export default function Parallax() {
  return (
    <ParallaxProvider>
      <ParallaxBanner
        layers={[
          {
            image: { Hero1 },
            translateY: [0, 50],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: "/home-hero/hero-2.png",
            translateY: [5, 45],

            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: "/home-hero/hero-3.png",
            translateY: [10, 30],

            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: "/home-hero/hero-4.png",
            translateY: [15, 25],

            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: "/home-hero/hero-5.png",
            translateY: [20, 20],

            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
        ]}
      />
    </ParallaxProvider>
  );
}
