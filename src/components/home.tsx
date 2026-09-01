// import { useEffect, useState, type CSSProperties } from "react";
// import {
//   STAGGER,
//   Words,
//   d,
//   seg,
//   useHydrated,
//   usePrefersReducedMotion,
//   useReveal,
//   useStageProgress,
// } from "../lib/motion";

// import hospitalExteriorImg from "../assets/images/hospital-exterior.jpeg";
// import hospitalInteriorImg from "../assets/images/hospital-interior.jpeg";
// import frameImg from "../assets/images/frame-surgery.jpg";
// import irisImg from "../assets/images/iris-mri.jpeg";

// const NAVY = "#071B2C";

// /* ───────────────────────── 1. HERO — OUTSIDE TO INSIDE ───────────────────────── */

// const ease = (t: number) =>
//   t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// function useBreakpoint() {
//   const [breakpoint, setBreakpoint] = useState<"desktop" | "tablet" | "mobile">(
//     "desktop",
//   );

//   useEffect(() => {
//     const updateBreakpoint = () => {
//       const width = window.innerWidth;
//       setBreakpoint(
//         width < 768 ? "mobile" : width < 1180 ? "tablet" : "desktop",
//       );
//     };

//     updateBreakpoint();
//     window.addEventListener("resize", updateBreakpoint);
//     return () => window.removeEventListener("resize", updateBreakpoint);
//   }, []);

//   return breakpoint;
// }

// const HERO_RIG = {
//   entranceX: 50,
//   entranceY: 73,
//   entranceYMobile: 70,
//   zoom: { desktop: 2.35, tablet: 2.05, mobile: 1.85 },
//   driftX: 0,
//   driftY: 0,
//   maskWidth: 11,
//   maskHeight: 9,
//   interiorFocus: "50% 52%",
//   interiorFocusMobile: "50% 46%",
// } as const;

// export function StageHero() {
//   const [ref, p] = useStageProgress<HTMLDivElement>();
//   const reduced = usePrefersReducedMotion();
//   const hydrated = useHydrated();
//   const inner = useReveal<HTMLDivElement>(0.05);
//   const breakpoint = useBreakpoint();

//   const entranceX = HERO_RIG.entranceX;
//   const entranceY =
//     breakpoint === "mobile" ? HERO_RIG.entranceYMobile : HERO_RIG.entranceY;

//   const intro = ease(seg(p, 0, 0.2));
//   const approach = ease(seg(p, 0.2, 0.55));
//   const open = ease(seg(p, 0.45, 0.75));
//   const flood = ease(seg(p, 0.75, 0.96));
//   const arrive = ease(seg(p, 0.86, 1));

//   const exteriorScale = lerp(
//     1.02 + intro * 0.05,
//     HERO_RIG.zoom[breakpoint],
//     approach,
//   );
//   const exteriorX = (entranceX - 50) * -approach + HERO_RIG.driftX * approach;
//   const exteriorY = (entranceY - 50) * -approach + HERO_RIG.driftY * approach;
//   const exteriorBlur = seg(p, 0.44, 0.62) * 6;
//   const exteriorOpacity = 1 - ease(seg(p, 0.88, 0.99));

//   const maskCenterX = lerp(entranceX, 50, approach);
//   const maskCenterY = lerp(entranceY, 50, approach);
//   const maskWidth = lerp(HERO_RIG.maskWidth, 100, Math.max(open * 0.55, flood));
//   const maskHeight = lerp(
//     HERO_RIG.maskHeight,
//     100,
//     Math.max(open * 0.5, flood),
//   );

//   const clipPath = `inset(${(maskCenterY - maskHeight / 2).toFixed(2)}% ${(
//     100 -
//     maskCenterX -
//     maskWidth / 2
//   ).toFixed(2)}% ${(100 - maskCenterY - maskHeight / 2).toFixed(2)}% ${(
//     maskCenterX -
//     maskWidth / 2
//   ).toFixed(2)}% round ${(6 * (1 - flood)).toFixed(2)}px)`;

//   const exteriorStyle: CSSProperties = reduced
//     ? { opacity: 1 - ease(seg(p, 0.3, 0.7)) }
//     : {
//         opacity: exteriorOpacity,
//         transformOrigin: `${entranceX}% ${entranceY}%`,
//         transform: `translate3d(${exteriorX.toFixed(3)}vw, ${exteriorY.toFixed(3)}vh, 0) scale(${exteriorScale.toFixed(4)})`,
//         filter: `blur(${exteriorBlur.toFixed(2)}px) brightness(${(
//           1 -
//           approach * 0.12
//         ).toFixed(3)})`,
//       };

//   const interiorStyle: CSSProperties = reduced
//     ? { opacity: ease(seg(p, 0.3, 0.7)) }
//     : {
//         clipPath: hydrated ? clipPath : "inset(50% 50% 50% 50%)",
//         opacity: seg(p, 0.4, 0.5),
//       };

//   const interiorImageStyle: CSSProperties = reduced
//     ? {}
//     : {
//         transform: `scale(${lerp(1.15, 1, Math.max(open, flood)).toFixed(4)})`,
//         filter: `brightness(${(0.86 + 0.14 * Math.max(open, flood)).toFixed(
//           3,
//         )})`,
//       };

//   const headlineStyle: CSSProperties = reduced
//     ? {}
//     : {
//         transform: `scale(${(1 + approach * 0.1).toFixed(
//           3,
//         )}) translateY(${ease(seg(p, 0.2, 0.5)) * -90}px)`,
//         opacity: 1 - ease(seg(p, 0.22, 0.48)),
//       };

//   const exteriorCopyStyle: CSSProperties = reduced
//     ? {}
//     : { opacity: 1 - ease(seg(p, 0.18, 0.44)) };

//   const interiorCopyStyle: CSSProperties = {
//     opacity: reduced ? 1 : arrive,
//     transform: reduced ? undefined : `translateY(${(1 - arrive) * 56}px)`,
//   };

//   return (
//     <section
//       ref={ref}
//       aria-label="Arrival"
//       style={{ height: "400svh" }}
//       className="relative"
//     >
//       <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-navy">
//         <div
//           data-motion="scrub"
//           className="absolute inset-0 will-change-transform"
//           style={hydrated || reduced ? exteriorStyle : undefined}
//         >
//           <img
//             src={hospitalExteriorImg}
//             alt="City Health Hospital front facade with its main entrance centered"
//             width={1600}
//             height={900}
//             loading="eager"
//             fetchPriority="high"
//             className="h-full w-full object-cover"
//             style={{
//               objectPosition: `${entranceX}% ${
//                 breakpoint === "mobile" ? 62 : 50
//               }%`,
//             }}
//           />
//           <div
//             className="absolute inset-0"
//             style={{
//               opacity: 1 - flood,
//               background:
//                 "linear-gradient(to bottom, rgba(7,27,44,0.72) 0%, rgba(7,27,44,0.22) 46%, rgba(7,27,44,0.88) 100%)",
//             }}
//           />
//         </div>

//         <div
//           data-motion="scrub"
//           className="absolute inset-0 will-change-[clip-path,opacity]"
//           style={hydrated || reduced ? interiorStyle : { opacity: 0 }}
//         >
//           <img
//             src={hospitalInteriorImg}
//             alt="Aurelia Medical Center reception atrium seen from inside the entrance"
//             width={1600}
//             height={900}
//             loading="lazy"
//             className="h-full w-full object-cover will-change-transform"
//             style={{
//               ...interiorImageStyle,
//               objectPosition:
//                 breakpoint === "mobile"
//                   ? HERO_RIG.interiorFocusMobile
//                   : HERO_RIG.interiorFocus,
//             }}
//           />
//           <div
//             className="absolute inset-x-0 bottom-0 h-[55%]"
//             style={{
//               opacity: arrive,
//               background:
//                 "linear-gradient(to bottom, rgba(7,27,44,0) 0%, rgba(7,27,44,0.82) 70%, rgba(7,27,44,0.95) 100%)",
//             }}
//           />
//         </div>

//         <div
//           ref={inner}
//           className="relative z-10 flex h-full flex-col justify-between px-[5vw] pb-[7svh] pt-[16svh]"
//           style={{ pointerEvents: p > 0.5 ? "none" : undefined }}
//         >
//           <p
//             className="mono text-blue-soft"
//             data-motion="scrub"
//             style={exteriorCopyStyle}
//           >
//             <Words
//               text="AURELIA MEDICAL CENTER / 27.7172° N / 85.3240° E"
//               base={120}
//             />
//           </p>

//           <div
//             className="absolute inset-0 flex flex-col items-center justify-center px-[5vw] text-center will-change-transform"
//             data-motion="scrub"
//             style={headlineStyle}
//           >
//             <h1 className="display max-w-[15ch] text-[clamp(2.4rem,7.4vw,7.4rem)] leading-[0.95] text-paper">
//               <Words text="ADVANCED CARE" base={260} />
//               <br />
//               <Words
//                 text="FOR EVERY TOMORROW."
//                 em="TOMORROW."
//                 base={260 + 2 * STAGGER}
//               />
//             </h1>
//             <p className="rise mono mt-8 text-sky/70" style={d(820)}>
//               24/7 EMERGENCY CARE
//             </p>
//           </div>

//           <div
//             data-motion="scrub"
//             style={exteriorCopyStyle}
//             className="relative z-10 self-end text-right will-change-transform"
//           >
//             <div
//               className="rise mono-num text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-none text-blue-soft"
//               style={d(700)}
//             >
//               24/7
//             </div>
//             <div className="rise mono mt-3 text-sky/70" style={d(820)}>
//               ALWAYS OPEN
//             </div>
//           </div>
//         </div>

//         <div
//           className="absolute bottom-5 left-[5vw] z-10 mono text-sky/45"
//           data-motion="scrub"
//           style={{ opacity: reduced ? 1 : 1 - seg(p, 0.08, 0.26) }}
//         >
//           SCROLL TO ENTER
//         </div>

//         <div
//           className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-[5vw] pb-[9svh] will-change-transform"
//           data-motion="scrub"
//           style={interiorCopyStyle}
//         >
//           <p className="mono text-blue-soft">WELCOME INSIDE</p>
//           <h2 className="display mt-4 max-w-[16ch] text-[clamp(2rem,6vw,5.4rem)] text-paper">
//             CARE DESIGNED <span className="display-em">AROUND</span> YOU.
//           </h2>
//           <p className="mt-5 max-w-[46ch] text-sky/80">
//             Advanced facilities, experienced specialists, and compassionate
//             care—all under one roof.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─────────────────────── 2. THE OPENING FRAME ─────────────────────── */

// export function StageFrame() {
//   const [ref, p] = useStageProgress<HTMLDivElement>();
//   const inner = useReveal<HTMLDivElement>(0.05);
//   const reduced = usePrefersReducedMotion();
//   const hydrated = useHydrated();
//   const open = seg(p, 0.06, 0.72);

//   const clip = reduced
//     ? undefined
//     : `inset(calc(34% - ${open} * 34%) calc(30% - ${open} * 30%) round 4px)`;

//   return (
//     <section
//       ref={ref}
//       aria-label="The opening frame"
//       style={{ height: "360svh" }}
//       className="relative"
//     >
//       <div
//         ref={inner}
//         className="sticky top-0 h-[100svh] w-full overflow-hidden bg-navy"
//       >
//         <div
//           data-motion="scrub"
//           className="absolute inset-0 will-change-[clip-path]"
//           style={{ clipPath: hydrated ? clip : undefined }}
//         >
//           <img
//             src={frameImg}
//             alt="Surgical team working together in a modern operating theatre"
//             loading="lazy"
//             width={1600}
//             height={1008}
//             className="h-full w-full object-cover"
//             style={
//               reduced ? undefined : { transform: `scale(${1.1 - open * 0.1})` }
//             }
//           />
//           <div
//             className="absolute inset-x-0 bottom-0 h-[62%]"
//             style={{
//               opacity: open,
//               background:
//                 "linear-gradient(to bottom, transparent, rgba(7, 27, 44, 0.92) 56%, rgba(7, 27, 44, 0.98) 92%)",
//             }}
//           />
//         </div>

//         <div
//           className="absolute right-[5vw] top-[12svh] z-10 text-right"
//           data-motion="scrub"
//           style={
//             reduced
//               ? undefined
//               : {
//                   opacity: 0.25 + open * 0.75,
//                   transform: `translateY(${(1 - open) * 40}px)`,
//                 }
//           }
//         >
//           <div className="mono-num text-[clamp(4rem,12vw,11rem)] font-light leading-none text-blue-soft">
//             02
//           </div>
//           <div className="mono mt-2 text-sky/60">SPECIALIST CARE</div>
//         </div>

//         <div
//           className="absolute inset-x-0 bottom-0 z-10 px-[5vw] pb-[8svh]"
//           style={reduced ? undefined : { opacity: seg(p, 0.34, 0.62) }}
//           data-motion="scrub"
//         >
//           <p className="display max-w-[20ch] text-[clamp(1.6rem,4.4vw,3.9rem)] text-paper">
//             <Words
//               text="Medicine becomes powerful when technology and human attention move together."
//               em="powerful"
//             />
//           </p>
//           <p className="mono mt-6 text-blue-soft">
//             SURGERY / DIAGNOSTICS / RECOVERY
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─────────────────────── 3. THE CIRCULAR IRIS ─────────────────────── */

// export function StageIris() {
//   const [ref, p] = useStageProgress<HTMLDivElement>();
//   const inner = useReveal<HTMLDivElement>(0.05);
//   const reduced = usePrefersReducedMotion();
//   const hydrated = useHydrated();
//   const open = seg(p, 0.05, 0.8);
//   const capIn = open > 0.5;

//   return (
//     <section
//       ref={ref}
//       aria-label="Care that sees beyond the obvious"
//       style={{ height: "320svh" }}
//       className="relative"
//     >
//       <div
//         ref={inner}
//         className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ice text-ink"
//       >
//         <div
//           data-motion="scrub"
//           className="absolute inset-0 will-change-[clip-path]"
//           style={{
//             clipPath:
//               hydrated && !reduced
//                 ? `circle(calc(${open} * 78%) at 50% 50%)`
//                 : undefined,
//           }}
//         >
//           <img
//             src={irisImg}
//             alt="Advanced MRI suite illuminated in sky blue light"
//             loading="lazy"
//             width={1408}
//             height={1408}
//             className="h-full w-full object-cover"
//             style={
//               reduced
//                 ? undefined
//                 : {
//                     transform: `scale(${1.14 - open * 0.14}) rotate(${(1 - open) * 2}deg)`,
//                     filter: `brightness(${1 - open * 0.3}) saturate(1.05)`,
//                   }
//             }
//           />
//         </div>

//         <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[5vw]">
//           <h2
//             data-motion="scrub"
//             className="display text-center text-[clamp(2.4rem,8.6vw,8rem)]"
//             style={{
//               color: "#FFFFFF",
//               mixBlendMode: reduced ? "normal" : "difference",
//               opacity: reduced ? 1 : 1 - seg(p, 0.72, 0.95) * 0.9,
//               transform: reduced ? undefined : `translateY(${p * -40}px)`,
//             }}
//           >
//             <Words text="CARE THAT SEES" />
//             <br />
//             <Words
//               text="BEYOND THE OBVIOUS."
//               em="OBVIOUS."
//               base={3 * STAGGER}
//             />
//           </h2>
//         </div>

//         <div
//           className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-4 px-[5vw] pb-[7svh]"
//           style={{
//             opacity: reduced || capIn ? 1 : 0,
//             transform: reduced || capIn ? "translateY(0)" : "translateY(26px)",
//             transition:
//               "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
//           }}
//         >
//           <p className="mono text-paper mix-blend-difference">01 / PRECISION</p>
//           <p className="mono text-paper mix-blend-difference">
//             ADVANCED DIAGNOSTICS
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─────────────── 4. THE NIGHT SHIFT / CARE IN MOTION ─────────────── */

// const POINTS = Array.from({ length: 220 }, (_, i) => {
//   const a = i * 137.508 * (Math.PI / 180);
//   const r = Math.sqrt(i / 220) * 47;
//   return {
//     x: +(50 + r * Math.cos(a)).toFixed(3),
//     y: +(50 + r * Math.sin(a)).toFixed(3),
//     s: +(0.9 + (i % 5) * 0.35).toFixed(2),
//     delay: (i * 53) % 3600,
//   };
// });

// const ROWS = [
//   "06:00 — DIAGNOSTICS ONLINE",
//   "08:30 — SPECIALIST ROUNDS",
//   "12:15 — PROCEDURES BEGIN",
//   "18:40 — RECOVERY MONITORED",
//   "23:59 — EMERGENCY CARE ACTIVE",
// ];

// export function StageNight() {
//   const [ref, p] = useStageProgress<HTMLDivElement>();
//   const inner = useReveal<HTMLDivElement>(0.05);
//   const reduced = usePrefersReducedMotion();
//   const active = Math.floor(seg(p, 0.12, 0.9) * ROWS.length + 0.0001);

//   return (
//     <section
//       ref={ref}
//       aria-label="Care never clocks out"
//       style={{ height: "360svh" }}
//       className="relative"
//     >
//       <div
//         ref={inner}
//         className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden bg-navy"
//       >
//         <div
//           aria-hidden="true"
//           data-motion="scrub"
//           className="absolute left-1/2 top-1/2 aspect-square w-[min(150vh,150vw)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
//           style={{
//             transform: `translate(-50%,-50%) rotate(${p * 46}deg) scale(${0.86 + p * 0.2})`,
//           }}
//         >
//           {POINTS.map((pt, i) => (
//             <span
//               key={i}
//               className="twinkle absolute rounded-full"
//               style={
//                 {
//                   left: `${pt.x}%`,
//                   top: `${pt.y}%`,
//                   width: `${pt.s}px`,
//                   height: `${pt.s}px`,
//                   background: i % 7 === 0 ? "#63C1DD" : "#2496C7",
//                   boxShadow: i % 11 === 0 ? "0 0 6px #63C1DD" : "none",
//                   "--d": `${pt.delay}ms`,
//                 } as CSSProperties
//               }
//             />
//           ))}
//         </div>

//         <div
//           className="absolute inset-0"
//           style={{
//             background: `radial-gradient(circle at 50% 50%, rgba(7,27,44,0) 42%, ${NAVY} 92%)`,
//           }}
//         />

//         <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 px-[5vw] lg:grid-cols-[1.1fr_0.9fr]">
//           <h2 className="display max-w-[12ch] text-[clamp(2.6rem,8.4vw,8rem)] text-paper">
//             <Words text="CARE NEVER CLOCKS OUT." em="NEVER" />
//           </h2>

//           <ul className="w-full">
//             {ROWS.map((row, i) => {
//               const on = reduced || i < active;
//               return (
//                 <li
//                   key={row}
//                   className="mono flex items-center justify-between gap-4 border-t border-sky/15 py-4 transition-all duration-700"
//                   style={{
//                     color: on ? "#63C1DD" : "rgba(221,243,250,0.28)",
//                     transform: on ? "translateX(0)" : "translateX(14px)",
//                     transitionDelay: `${i * 90}ms`,
//                   }}
//                 >
//                   <span>{row}</span>
//                   <span
//                     className="h-1.5 w-1.5 rounded-full transition-colors duration-700"
//                     style={{
//                       background: on ? "#2496C7" : "rgba(221,243,250,0.2)",
//                     }}
//                   />
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  STAGGER,
  Words,
  d,
  seg,
  useHydrated,
  usePrefersReducedMotion,
  useReveal,
  useStageProgress,
} from "../lib/motion";

import hospitalExteriorImg from "../assets/images/hospital-exterior.jpeg";
import hospitalInteriorImg from "../assets/images/hospital-interior.jpeg";
import heroVideo from "../assets/videos/hero-arrival.mp4";
import frameImg from "../assets/images/frame-surgery.jpg";
import irisImg from "../assets/images/iris-mri.jpeg";

const NAVY = "#071B2C";

/* ───────────────────────── 1. HERO — VIDEO ARRIVAL ───────────────────────── */

export function StageHero() {
  const [ref, p] = useStageProgress<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const inner = useReveal<HTMLDivElement>(0.05);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  // Always enable the scroll-video experience on mobile. The static fallback
  // remains available for reduced-motion users on tablet and desktop.
  const staticMode = reduced && !isMobile;

  // Only update the desired video time when scroll progress changes.
  // Do not create/cancel the animation loop here.
  useEffect(() => {
    if (staticMode || !duration) return;
    targetTimeRef.current = Math.min(0.999, Math.max(0, p)) * duration;
  }, [p, duration, staticMode]);

  // Keep one scrub loop alive. Because `p` is not a dependency, rapid scroll
  // updates cannot repeatedly cancel the loop before the video seeks.
  useEffect(() => {
    if (staticMode || !duration) return;

    const scrubVideo = () => {
      const video = videoRef.current;

      if (video && video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        const difference = targetTimeRef.current - video.currentTime;

        if (Math.abs(difference) > 0.008 && !video.seeking) {
          video.currentTime += difference * 0.24;
        }
      }

      animationFrameRef.current = requestAnimationFrame(scrubVideo);
    };

    animationFrameRef.current = requestAnimationFrame(scrubVideo);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [duration, staticMode]);

  const arrive = seg(p, 0.86, 1);

  const headlineStyle: CSSProperties = staticMode
    ? {}
    : {
        transform: `translateY(${seg(p, 0.2, 0.5) * -90}px)`,
        opacity: 1 - seg(p, 0.22, 0.48),
      };

  const exteriorCopyStyle: CSSProperties = staticMode
    ? {}
    : { opacity: 1 - seg(p, 0.18, 0.44) };

  const interiorCopyStyle: CSSProperties = {
    opacity: staticMode ? 1 : arrive,
    transform: staticMode ? undefined : `translateY(${(1 - arrive) * 56}px)`,
  };

  return (
    <section
      ref={ref}
      aria-label="Arrival"
      style={{
        height: staticMode ? "100svh" : isMobile ? "320svh" : "400svh",
      }}
      className="relative"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-navy">
        {staticMode ? (
          <img
            src={hospitalExteriorImg}
            alt="City Health Hospital entrance and reception lobby"
            width={1600}
            height={900}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            src={heroVideo}
            poster={hospitalExteriorImg}
            muted
            playsInline
            preload="auto"
            aria-label="Slow forward movement from the hospital entrance into the reception lobby"
            className="absolute inset-0 h-full w-full object-cover object-center"
            onLoadedMetadata={(event) => {
              const video = event.currentTarget;
              video.pause();
              const loadedDuration = Number.isFinite(video.duration)
                ? video.duration
                : 0;

              setDuration(loadedDuration);
              targetTimeRef.current = Math.min(
                loadedDuration * 0.999,
                Math.max(0, p * loadedDuration),
              );

              // A tiny initial seek forces browsers to decode and paint the
              // first frame before scroll scrubbing begins.
              video.currentTime = Math.min(0.01, loadedDuration);
            }}
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            opacity: hydrated ? 1 - seg(p, 0.75, 0.96) * 0.45 : 1,
            background:
              "linear-gradient(to bottom, rgba(7,27,44,0.72) 0%, rgba(7,27,44,0.18) 46%, rgba(7,27,44,0.88) 100%)",
          }}
        />

        {staticMode && (
          <img
            src={hospitalInteriorImg}
            alt="City Health Hospital reception lobby"
            width={1600}
            height={900}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ opacity: arrive }}
          />
        )}

        <div
          ref={inner}
          className="relative z-10 flex h-full flex-col justify-between px-[5vw] pb-[7svh] pt-[16svh]"
          style={{ pointerEvents: p > 0.5 ? "none" : undefined }}
        >
          <p className="mono text-blue-soft" style={exteriorCopyStyle}>
            <Words
              text="CITY HEALTH HOSPITAL / 27.7172° N / 85.3240° E"
              base={120}
            />
          </p>

          <div
            className="absolute left-[5vw] top-[32svh] flex w-[min(34rem,46vw)] flex-col items-start text-left will-change-transform max-md:top-[30svh] max-md:w-[78vw]"
            style={headlineStyle}
          >
            <h1 className="display max-w-[11ch] text-[clamp(2rem,4.2vw,4.8rem)] leading-[0.92] text-paper">
              <Words text="YOUR HEALTH," base={260} />
              <br />
              <Words
                text="OUR GREATEST PRIORITY."
                em="TOMORROW."
                base={260 + 2 * STAGGER}
              />
            </h1>
            <p className="rise mono mt-5 text-sky/70" style={d(820)}>
              24/7 EMERGENCY CARE
            </p>
          </div>

          <div
            style={exteriorCopyStyle}
            className="relative z-10 self-end text-right will-change-transform"
          >
            <div
              className="rise mono-num text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-none text-blue-soft"
              style={d(700)}
            >
              24/7
            </div>
            <div className="rise mono mt-3 text-sky/70" style={d(820)}>
              ALWAYS OPEN
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-5 left-[5vw] z-10 mono text-sky/45"
          style={{ opacity: staticMode ? 0 : 1 - seg(p, 0.08, 0.26) }}
        >
          SCROLL TO ENTER
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-[5vw] pb-[9svh]"
          style={interiorCopyStyle}
        >
          <p className="mono text-blue-soft">WELCOME INSIDE</p>
          <h2 className="display mt-4 max-w-[16ch] text-[clamp(2rem,6vw,5.4rem)] text-paper">
            CARE DESIGNED <span className="display-em">AROUND</span> YOU.
          </h2>
          <p className="mt-5 max-w-[46ch] text-sky/80">
            Advanced facilities, experienced specialists, and compassionate
            care—all under one roof.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 2. THE OPENING FRAME ─────────────────────── */

export function StageFrame() {
  const [ref, p] = useStageProgress<HTMLDivElement>();
  const inner = useReveal<HTMLDivElement>(0.05);
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const open = seg(p, 0.06, 0.72);

  const clip = reduced
    ? undefined
    : `inset(calc(34% - ${open} * 34%) calc(30% - ${open} * 30%) round 4px)`;

  return (
    <section
      ref={ref}
      aria-label="The opening frame"
      style={{ height: "360svh" }}
      className="relative"
    >
      <div
        ref={inner}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-navy"
      >
        <div
          data-motion="scrub"
          className="absolute inset-0 will-change-[clip-path]"
          style={{ clipPath: hydrated ? clip : undefined }}
        >
          <img
            src={frameImg}
            alt="Surgical team working together in a modern operating theatre"
            loading="lazy"
            width={1600}
            height={1008}
            className="h-full w-full object-cover"
            style={
              reduced ? undefined : { transform: `scale(${1.1 - open * 0.1})` }
            }
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[62%]"
            style={{
              opacity: open,
              background:
                "linear-gradient(to bottom, transparent, rgba(7, 27, 44, 0.92) 56%, rgba(7, 27, 44, 0.98) 92%)",
            }}
          />
        </div>

        <div
          className="absolute right-[5vw] top-[12svh] z-10 text-right"
          data-motion="scrub"
          style={
            reduced
              ? undefined
              : {
                  opacity: 0.25 + open * 0.75,
                  transform: `translateY(${(1 - open) * 40}px)`,
                }
          }
        >
          <div className="mono-num text-[clamp(4rem,12vw,11rem)] font-light leading-none text-blue-soft">
            02
          </div>
          <div className="mono mt-2 text-sky/60">SPECIALIST CARE</div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-10 px-[5vw] pb-[8svh]"
          style={reduced ? undefined : { opacity: seg(p, 0.34, 0.62) }}
          data-motion="scrub"
        >
          <p className="display max-w-[20ch] text-[clamp(1.6rem,4.4vw,3.9rem)] text-paper">
            <Words
              text="Medicine becomes powerful when technology and human attention move together."
              em="powerful"
            />
          </p>
          <p className="mono mt-6 text-blue-soft">
            SURGERY / DIAGNOSTICS / RECOVERY
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 3. THE CIRCULAR IRIS ─────────────────────── */

export function StageIris() {
  const [ref, p] = useStageProgress<HTMLDivElement>();
  const inner = useReveal<HTMLDivElement>(0.05);
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const open = seg(p, 0.05, 0.8);
  const capIn = open > 0.5;

  return (
    <section
      ref={ref}
      aria-label="Care that sees beyond the obvious"
      style={{ height: "320svh" }}
      className="relative"
    >
      <div
        ref={inner}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ice text-ink"
      >
        <div
          data-motion="scrub"
          className="absolute inset-0 will-change-[clip-path]"
          style={{
            clipPath:
              hydrated && !reduced
                ? `circle(calc(${open} * 78%) at 50% 50%)`
                : undefined,
          }}
        >
          <img
            src={irisImg}
            alt="Advanced MRI suite illuminated in sky blue light"
            loading="lazy"
            width={1408}
            height={1408}
            className="h-full w-full object-cover"
            style={
              reduced
                ? undefined
                : {
                    transform: `scale(${1.14 - open * 0.14}) rotate(${(1 - open) * 2}deg)`,
                    filter: `brightness(${1 - open * 0.3}) saturate(1.05)`,
                  }
            }
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[5vw]">
          <h2
            data-motion="scrub"
            className="display text-center text-[clamp(2.4rem,8.6vw,8rem)]"
            style={{
              color: "#FFFFFF",
              mixBlendMode: reduced ? "normal" : "difference",
              opacity: reduced ? 1 : 1 - seg(p, 0.72, 0.95) * 0.9,
              transform: reduced ? undefined : `translateY(${p * -40}px)`,
            }}
          >
            <Words text="CARE THAT SEES" />
            <br />
            <Words
              text="BEYOND THE OBVIOUS."
              em="OBVIOUS."
              base={3 * STAGGER}
            />
          </h2>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-4 px-[5vw] pb-[7svh]"
          style={{
            opacity: reduced || capIn ? 1 : 0,
            transform: reduced || capIn ? "translateY(0)" : "translateY(26px)",
            transition:
              "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <p className="mono text-paper mix-blend-difference">01 / PRECISION</p>
          <p className="mono text-paper mix-blend-difference">
            ADVANCED DIAGNOSTICS
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 4. THE NIGHT SHIFT / CARE IN MOTION ─────────────── */

const POINTS = Array.from({ length: 220 }, (_, i) => {
  const a = i * 137.508 * (Math.PI / 180);
  const r = Math.sqrt(i / 220) * 47;
  return {
    x: +(50 + r * Math.cos(a)).toFixed(3),
    y: +(50 + r * Math.sin(a)).toFixed(3),
    s: +(0.9 + (i % 5) * 0.35).toFixed(2),
    delay: (i * 53) % 3600,
  };
});

const ROWS = [
  "06:00 — DIAGNOSTICS ONLINE",
  "08:30 — SPECIALIST ROUNDS",
  "12:15 — PROCEDURES BEGIN",
  "18:40 — RECOVERY MONITORED",
  "23:59 — EMERGENCY CARE ACTIVE",
];

export function StageNight() {
  const [ref, p] = useStageProgress<HTMLDivElement>();
  const inner = useReveal<HTMLDivElement>(0.05);
  const reduced = usePrefersReducedMotion();
  const active = Math.floor(seg(p, 0.12, 0.9) * ROWS.length + 0.0001);

  return (
    <section
      ref={ref}
      aria-label="Care never clocks out"
      style={{ height: "360svh" }}
      className="relative"
    >
      <div
        ref={inner}
        className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden bg-navy"
      >
        <div
          aria-hidden="true"
          data-motion="scrub"
          className="absolute left-1/2 top-1/2 aspect-square w-[min(150vh,150vw)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            transform: `translate(-50%,-50%) rotate(${p * 46}deg) scale(${0.86 + p * 0.2})`,
          }}
        >
          {POINTS.map((pt, i) => (
            <span
              key={i}
              className="twinkle absolute rounded-full"
              style={
                {
                  left: `${pt.x}%`,
                  top: `${pt.y}%`,
                  width: `${pt.s}px`,
                  height: `${pt.s}px`,
                  background: i % 7 === 0 ? "#63C1DD" : "#2496C7",
                  boxShadow: i % 11 === 0 ? "0 0 6px #63C1DD" : "none",
                  "--d": `${pt.delay}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(7,27,44,0) 42%, ${NAVY} 92%)`,
          }}
        />

        <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 px-[5vw] lg:grid-cols-[1.1fr_0.9fr]">
          <h2 className="display max-w-[12ch] text-[clamp(2.6rem,8.4vw,8rem)] text-paper">
            <Words text="CARE NEVER CLOCKS OUT." em="NEVER" />
          </h2>

          <ul className="w-full">
            {ROWS.map((row, i) => {
              const on = reduced || i < active;
              return (
                <li
                  key={row}
                  className="mono flex items-center justify-between gap-4 border-t border-sky/15 py-4 transition-all duration-700"
                  style={{
                    color: on ? "#63C1DD" : "rgba(221,243,250,0.28)",
                    transform: on ? "translateX(0)" : "translateX(14px)",
                    transitionDelay: `${i * 90}ms`,
                  }}
                >
                  <span>{row}</span>
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-colors duration-700"
                    style={{
                      background: on ? "#2496C7" : "rgba(221,243,250,0.2)",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
