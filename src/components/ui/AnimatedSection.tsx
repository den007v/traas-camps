"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useRef,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function AnimatedSection({
  children,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={className} {...rest}>
      {children}
    </section>
  );
}
