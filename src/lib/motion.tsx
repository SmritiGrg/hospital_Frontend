import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export const STAGGER = 38;

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** 0 → 1 progress across a pinned stage wrapper. */
export function useStageProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setP(1);
      return;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const raw = -rect.top / travel;
      setP(raw < 0 ? 0 : raw > 1 ? 1 : raw);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return [ref, p] as const;
}

/** Adds `is-in` once the element enters the viewport. */
export function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

export function Reveal({
  children,
  className = "",
  threshold,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}) {
  const ref = useReveal<HTMLDivElement>(threshold);
  const Comp = Tag as "div";
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}

/** Splits text into per-word spans with a 38ms stagger. */
export function Words({
  text,
  em,
  base = 0,
  className = "",
  emClassName = "display-em",
}: {
  text: string;
  em?: string;
  base?: number;
  className?: string;
  emClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="w-split">
          <span
            className={`w-inner ${em && w === em ? emClassName : ""}`}
            style={{ "--d": `${base + i * STAGGER}ms` } as CSSProperties}
          >
            {w}
          </span>
          {i < words.length - 1 ? (
            <span className="w-split">&nbsp;</span>
          ) : null}
        </span>
      ))}
    </span>
  );
}

export const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}

export function clampP(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** map progress from [a,b] to [0,1] */
export function seg(p: number, a: number, b: number) {
  return clampP((p - a) / (b - a));
}

export function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  const check = useCallback(() => setM(window.innerWidth < bp), [bp]);
  useEffect(() => {
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [check]);
  return m;
}
