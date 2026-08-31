import { useState, type CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STAGGER, Words, d, useReveal } from "../lib/motion";

import specCardio from "../assets/images/spec-cardiology.jpg";
import specNeuro from "../assets/images/spec-neurology.jpg";
import specOnco from "../assets/images/spec-oncology.jpg";
import specRecovery from "../assets/images/spec-recovery.jpg";
import corridor from "../assets/images/corridor.jpg";
import doctor1 from "../assets/images/doctor-1.jpg";
import doctor2 from "../assets/images/doctor-2.jpg";
import irisImg from "../assets/images/iris-mri.jpeg";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────── Three-column explainer ───────────────── */

const COLUMNS = [
  {
    n: "01",
    t: "EXPERTISE",
    b: "Specialists across surgery, cardiology, neurology, pediatrics, oncology, and more — convened around a single patient record.",
  },
  {
    n: "02",
    t: "TECHNOLOGY",
    b: "Advanced diagnostics, minimally invasive procedures, digital health systems, and intelligent monitoring that never looks away.",
  },
  {
    n: "03",
    t: "HUMAN CARE",
    b: "A patient-first environment designed around communication, comfort, recovery, and trust — architecture included.",
  },
];

export function Explainer() {
  const ref = useReveal<HTMLDivElement>(0.12);
  return (
    <section
      className="bg-ice px-[5vw] py-[16svh] text-ink"
      aria-label="How Aurelia works"
    >
      <div ref={ref}>
        <p className="mono rise text-blue" style={d(0)}>
          THE PRACTICE / THREE CONSTANTS
        </p>
        <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-3">
          {COLUMNS.map((c, i) => (
            <article
              key={c.n}
              className="rise-3d border-t border-ink/20 pt-6"
              style={d(160 + i * 130)}
            >
              <p className="mono text-blue">
                {c.n} / {c.t}
              </p>
              <h3 className="display mt-8 text-[clamp(1.8rem,3.2vw,3rem)]">
                <Words text={c.t} base={i * 90} />
              </h3>
              <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-ink/70">
                {c.b}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Specialities ───────────────── */

const SPECIALTIES = [
  {
    t: "CARDIOLOGY",
    img: specCardio,
    m: "DEPT 01 / 24 BEDS",
    b: "Interventional and structural heart programmes with continuous rhythm telemetry.",
  },
  {
    t: "NEUROLOGY",
    img: specNeuro,
    m: "DEPT 02 / STROKE UNIT",
    b: "Neuro-imaging, epilepsy monitoring and rapid stroke pathways under one roof.",
  },
  {
    t: "ONCOLOGY",
    img: specOnco,
    m: "DEPT 03 / MOLECULAR LAB",
    b: "Precision oncology guided by genomic profiling and multidisciplinary tumour boards.",
  },
  {
    t: "ORTHOPEDICS",
    img: corridor,
    m: "DEPT 04 / ROBOTIC OR",
    b: "Joint reconstruction and sports medicine with robot-assisted alignment.",
  },
  {
    t: "PEDIATRICS",
    img: specRecovery,
    m: "DEPT 05 / FAMILY WING",
    b: "Child-scaled clinical spaces where families stay close through every stage.",
  },
  {
    t: "MATERNITY",
    img: irisImg,
    m: "DEPT 06 / BIRTH SUITES",
    b: "Low-intervention birth suites backed by full neonatal intensive capability.",
  },
  {
    t: "EMERGENCY",
    img: specNeuro,
    m: "DEPT 07 / ALWAYS OPEN",
    b: "Resuscitation bays, trauma theatre and helipad access, active every hour.",
  },
];

// export function Specialities() {
//   const ref = useReveal<HTMLDivElement>(0.08);
//   return (
//     <section className="bg-navy px-[5vw] py-[16svh]" aria-label="Departments">
//       <div ref={ref}>
//         <div className="flex flex-wrap items-end justify-between gap-6 border-b border-sky/15 pb-8">
//           <h2 className="display text-[clamp(2.2rem,6.4vw,6rem)] text-paper">
//             <Words text="SEVEN DEPARTMENTS." em="SEVEN" />
//           </h2>
//           <p className="mono rise text-blue-soft" style={d(300)}>
//             SPECIALITIES / 2026 REGISTER
//           </p>
//         </div>

//         <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {SPECIALTIES.map((s, i) => (
//             <article
//               key={s.t}
//               className="rise-3d group relative overflow-hidden border border-sky/12 bg-navy-2"
//               style={d(80 + i * 95)}
//             >
//               <div className="aspect-[3/4] overflow-hidden">
//                 <img
//                   src={s.img}
//                   alt={`${s.t} at Aurelia Medical Center`}
//                   loading="lazy"
//                   width={900}
//                   height={1200}
//                   className="h-full w-full object-cover opacity-70 transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04] group-hover:opacity-100"
//                 />
//               </div>
//               <div className="p-5">
//                 <p className="mono text-blue-soft">{s.m}</p>
//                 <h3 className="display mt-3 text-[clamp(1.3rem,2vw,1.9rem)] text-paper">
//                   {s.t}
//                 </h3>
//                 <p className="mt-3 text-[13px] leading-relaxed text-sky/55">
//                   {s.b}
//                 </p>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

export function Specialities() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    let ctx: gsap.Context | null = null;

    const initializeAnimation = () => {
      ctx = gsap.context(() => {
        /*
         * Calculate how far the gallery needs to move.
         */
        const getDistance = () => {
          return Math.max(0, track.scrollWidth - viewport.clientWidth);
        };

        const distance = getDistance();

        if (distance === 0) {
          console.warn("Departments: No horizontal overflow detected.");
          return;
        }

        /*
         * Horizontal animation
         */
        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",

          scrollTrigger: {
            trigger: section,

            /*
             * Start when Departments reaches
             * the top of the viewport.
             */
            start: "top top",

            /*
             * The vertical scroll distance equals
             * the horizontal distance.
             */
            end: () => `+=${getDistance()}`,

            pin: viewport,

            scrub: 1,

            invalidateOnRefresh: true,

            anticipatePin: 1,

            /*
             * Important for React/GSAP recalculation.
             */
            refreshPriority: 1,
          },
        });

        /*
         * Give ScrollTrigger another refresh after
         * everything has been rendered.
         */
        ScrollTrigger.refresh();
      }, section);
    };

    /*
     * Wait until React has completely rendered the
     * gallery and the browser has calculated widths.
     */
    const timer = window.setTimeout(() => {
      initializeAnimation();
    }, 300);

    /*
     * Recalculate when images finish loading.
     */
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    /*
     * Recalculate on resize.
     */
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);

      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy"
      aria-label="Departments"
    >
      {/* Sticky viewport */}
      <div
        ref={viewportRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Header */}
        <div className="absolute left-[5vw] right-[5vw] top-[8vh] z-20 flex items-end justify-between gap-6 border-b border-sky/15 pb-8">
          <h2 className="display text-[clamp(2.2rem,6.4vw,6rem)] text-paper">
            <Words text="SEVEN DEPARTMENTS." em="SEVEN" />
          </h2>

          <p className="mono hidden text-blue-soft md:block">
            SPECIALITIES / 2026 REGISTER
          </p>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="absolute left-0 top-0 flex h-full w-max items-center gap-6 px-[5vw] pt-[14vh]"
        >
          {SPECIALTIES.map((s, i) => (
            <article
              key={s.t}
              className="group relative w-[78vw] shrink-0 overflow-hidden border border-sky/12 bg-navy-2 sm:w-[55vw] lg:w-[32vw]"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={s.img}
                  alt={`${s.t} at Aurelia Medical Center`}
                  loading={i === 0 ? "eager" : "lazy"}
                  width={900}
                  height={1200}
                  className="h-full w-full object-cover opacity-70 transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05] group-hover:opacity-100"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-90" />

                {/* Number */}
                <div className="absolute left-5 top-5">
                  <span className="mono text-blue-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-6 left-5 right-5">
                  <p className="mono text-blue-soft">{s.m}</p>

                  <h3 className="display mt-3 text-[clamp(1.8rem,3vw,3rem)] text-paper">
                    {s.t}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="min-h-[150px] p-5">
                <p className="text-[13px] leading-relaxed text-sky/55">{s.b}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="mono text-[11px] text-sky/35">
                    DEPARTMENT / {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="mono text-blue-soft transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* End padding */}
          <div className="w-[5vw] shrink-0" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-[5vw] z-20 flex items-center gap-4">
          <span className="mono text-[11px] text-sky/40">
            SCROLL TO EXPLORE
          </span>

          <div className="h-px w-20 bg-sky/20">
            <div className="h-px w-1/2 bg-blue-soft" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Doctors ───────────────── */

const DOCTORS = [
  {
    n: "DR. ANJALI SHRESTHA",
    s: "Interventional Cardiology",
    y: "18 YEARS",
    dep: "CARDIOLOGY",
    img: doctor1,
  },
  {
    n: "DR. BIKRAM GURUNG",
    s: "Neurosurgery",
    y: "22 YEARS",
    dep: "NEUROLOGY",
    img: doctor2,
  },
  {
    n: "DR. PRIYA RAJBHANDARI",
    s: "Medical Oncology",
    y: "14 YEARS",
    dep: "ONCOLOGY",
    img: doctor1,
  },
];

export function Doctors() {
  const ref = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className="bg-sky px-[5vw] py-[16svh] text-ink"
      aria-label="Specialists"
    >
      <div ref={ref}>
        <p className="mono rise text-blue" style={d(0)}>
          THE SPECIALISTS / SELECTED PRACTITIONERS
        </p>
        <h2 className="display mt-8 max-w-[14ch] text-[clamp(2.2rem,6.4vw,6rem)]">
          <Words text="PEOPLE BEFORE PROTOCOL." em="BEFORE" base={120} />
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {DOCTORS.map((doc, i) => (
            <article key={doc.n} className="rise-3d" style={d(140 + i * 150)}>
              <div className="overflow-hidden border border-ink/15 bg-ice">
                <img
                  src={doc.img}
                  alt={`Portrait of ${doc.n}`}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="aspect-[3/4] w-full object-cover grayscale-[0.25] transition-transform duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 border-t border-ink/20 pt-5">
                <h3 className="display text-[clamp(1.2rem,1.7vw,1.6rem)]">
                  {doc.n}
                </h3>
                <p className="mt-2 text-[14px] text-ink/70">{doc.s}</p>
                <dl className="mono mt-5 grid grid-cols-2 gap-y-2 text-ink/55">
                  <dt>EXPERIENCE</dt>
                  <dd className="text-right text-blue">{doc.y}</dd>
                  <dt>DEPARTMENT</dt>
                  <dd className="text-right text-blue">{doc.dep}</dd>
                </dl>
                <a
                  href="#appointments"
                  className="mono mt-6 inline-block border-b border-blue pb-1 text-blue transition-colors hover:text-ink"
                >
                  VIEW PROFILE →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Rates table ───────────────── */

const RATES = [
  ["GENERAL CONSULTATION", "$40"],
  ["SPECIALIST CONSULTATION", "$95"],
  ["DIAGNOSTIC SCREENING", "$130"],
  ["MRI SCAN", "$420"],
  ["CT SCAN", "$310"],
  ["ANNUAL HEALTH CHECKUP", "$260"],
];

export function Rates() {
  const ref = useReveal<HTMLDivElement>(0.1);
  return (
    <section
      className="bg-ice px-[5vw] py-[16svh] text-ink"
      aria-label="Services and rates"
    >
      <div ref={ref}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-[13ch] text-[clamp(2.2rem,5.6vw,5rem)]">
            <Words text="TRANSPARENT FROM THE FIRST VISIT." em="TRANSPARENT" />
          </h2>
          <p className="mono rise text-blue" style={d(320)}>
            RATES / EFFECTIVE 2026
          </p>
        </div>

        <dl className="mt-16">
          {RATES.map(([label, price], i) => (
            <div
              key={label}
              className="rise flex items-baseline gap-4 border-t border-ink/20 py-6"
              style={d(i * 90)}
            >
              <dt className="mono text-ink/80">{label}</dt>
              <span
                aria-hidden="true"
                className="mono min-w-6 flex-1 overflow-hidden text-ink/25"
              >
                ......................................................................................
              </span>
              <dd className="mono-num text-[clamp(1.1rem,2vw,1.6rem)] text-blue">
                {price}
              </dd>
            </div>
          ))}
          <div className="border-t border-ink/20" />
        </dl>
      </div>
    </section>
  );
}

/* ───────────────── Patient journey ───────────────── */

const JOURNEY = [
  {
    n: "01",
    t: "ARRIVE",
    b: "Concierge triage at the atrium. No queue, no paperwork stack.",
  },
  {
    n: "02",
    t: "CONSULT",
    b: "A specialist reads your history before you sit down.",
  },
  {
    n: "03",
    t: "DIAGNOSE",
    b: "Imaging, labs and review returned inside the same visit.",
  },
  {
    n: "04",
    t: "TREAT",
    b: "Minimally invasive first, always with a named lead clinician.",
  },
  {
    n: "05",
    t: "RECOVER",
    b: "Monitored rooms, daylight, and a follow-up that actually follows.",
  },
];

export function Journey() {
  const ref = useReveal<HTMLDivElement>(0.06);
  const [active, setActive] = useState(0);
  return (
    <section
      className="bg-navy px-[5vw] py-[16svh]"
      aria-label="Patient journey"
    >
      <div ref={ref}>
        <p className="mono rise text-blue-soft" style={d(0)}>
          PATIENT JOURNEY / FIVE STAGES
        </p>
        <div className="mt-12 grid gap-x-6 gap-y-8 lg:grid-cols-5">
          {JOURNEY.map((j, i) => {
            const on = active === i;
            return (
              <button
                key={j.n}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="rise-3d group border-t border-sky/15 pt-6 text-left transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={
                  {
                    ...d(90 + i * 110),
                    transform: on ? "translateY(-8px) scale(1.015)" : undefined,
                  } as CSSProperties
                }
              >
                <span
                  className="mono-num block text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-none transition-colors duration-500"
                  style={{ color: on ? "#63C1DD" : "rgba(221,243,250,0.3)" }}
                >
                  {j.n}
                </span>
                <span className="display mt-5 block text-[clamp(1.2rem,1.9vw,1.7rem)] text-paper">
                  {j.t}
                </span>
                <span className="mt-3 block text-[13px] leading-relaxed text-sky/55">
                  {j.b}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── FAQ ───────────────── */

const FAQ = [
  [
    "How do I book an appointment?",
    "Book through the patient portal, by phone, or at the atrium desk. Specialist slots open fourteen days ahead and same-day referrals are held back for urgent cases.",
  ],
  [
    "Which departments are available?",
    "Cardiology, neurology, oncology, orthopedics, pediatrics, maternity and emergency medicine, supported by imaging, pathology and rehabilitation services.",
  ],
  [
    "Do you provide emergency services?",
    "Yes. The emergency department, trauma theatre and resuscitation bays are staffed continuously, every day of the year.",
  ],
  [
    "How can I access my diagnostic reports?",
    "Reports are released to the patient portal as soon as they are verified, usually within hours. Printed copies are available on request.",
  ],
  [
    "Can I choose a specialist?",
    "You can request any practitioner by name. If they are unavailable within your clinical window, we will offer a colleague in the same unit.",
  ],
  [
    "What should I bring to my appointment?",
    "Photo identification, insurance details, current medication list, and any prior imaging or reports from outside our system.",
  ],
];

export function Faq() {
  const ref = useReveal<HTMLDivElement>(0.08);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      className="bg-ice px-[5vw] py-[16svh] text-ink"
      aria-label="Frequently asked questions"
    >
      <div ref={ref}>
        <h2 className="display max-w-[12ch] text-[clamp(2.2rem,6vw,5.4rem)]">
          <Words text="QUESTIONS, ANSWERED PLAINLY." em="PLAINLY." />
        </h2>

        <div className="mt-16">
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div
                key={q}
                className="rise border-t border-ink/20"
                style={d(i * 85)}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="display text-[clamp(1.05rem,2.1vw,1.75rem)]">
                      {q}
                    </span>
                    <span
                      className="mono-num shrink-0 text-blue transition-transform duration-500"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  className="grid transition-all duration-[650ms] ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-8 text-[15px] leading-relaxed text-ink/70">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-ink/20" />
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Footer ───────────────── */

const NODES = Array.from({ length: 46 }, (_, i) => {
  const a = i * 137.508 * (Math.PI / 180);
  const r = Math.sqrt(i / 46) * 46;
  return {
    x: +(50 + r * Math.cos(a) * 1.9).toFixed(3),
    y: +(50 + r * Math.sin(a)).toFixed(3),
    delay: (i * 137) % 4000,
  };
});

const LINKS = [
  "Emergency",
  "Appointments",
  "Departments",
  "Doctors",
  "Patient Portal",
  "Contact",
  "Location",
];

export function SiteFooter() {
  const ref = useReveal<HTMLElement>(0.06);
  return (
    <footer
      id="appointments"
      ref={ref}
      className="relative overflow-hidden bg-navy px-[5vw] pb-14 pt-[18svh]"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {NODES.map((n, i) => {
          const next = NODES[(i + 3) % NODES.length]!;
          return (
            <line
              key={`l${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="#2496C7"
              strokeWidth={0.08}
              opacity={0.35}
            />
          );
        })}
        {NODES.map((n, i) => (
          <circle
            key={`c${i}`}
            cx={n.x}
            cy={n.y}
            r={0.32}
            fill="#63C1DD"
            className="twinkle"
            style={{ "--d": `${n.delay}ms` } as CSSProperties}
          />
        ))}
      </svg>

      <div className="relative z-10">
        <h2 className="display max-w-[11ch] text-[clamp(2.6rem,10vw,9.5rem)] text-paper">
          <Words text="YOUR HEALTH." />
          <br />
          <Words text="OUR CONSTANT." em="CONSTANT." base={2 * STAGGER} />
        </h2>

        <nav
          aria-label="Footer"
          className="mt-20 flex flex-wrap gap-x-10 gap-y-4 border-t border-sky/15 pt-8"
        >
          {LINKS.map((l, i) => (
            <a
              key={l}
              href="#appointments"
              className="rise mono text-sky/70 transition-colors hover:text-blue-soft"
              style={d(i * 70)}
            >
              {l}
            </a>
          ))}
        </nav>

        <p className="mono rise mt-24 text-sky/35" style={d(200)}>
          AURELIA MEDICAL CENTER / HEALTHCARE SYSTEM / EST. 2026
        </p>
      </div>
    </footer>
  );
}
