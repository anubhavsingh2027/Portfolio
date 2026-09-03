import { useEffect, useRef } from "react";

function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const auraRef = useRef(null);
  const dotRef = useRef(null);
  const frameRef = useRef(0);
  const positionRef = useRef({ x: -100, y: -100 });
  const ringPositionRef = useRef({ x: -100, y: -100 });
  const auraPositionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const aura = auraRef.current;
    const dot = dotRef.current;

    if (!cursor || !ring || !aura || !dot) return undefined;

    const moveCursor = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      cursor.classList.add("site-cursor--visible");
      dot.classList.add("site-cursor--visible");
      ring.classList.add("site-cursor--visible");
      aura.classList.add("site-cursor--visible");

      const interactive = event.target.closest(
        "a, button, input, textarea, select, [role=button], [data-cursor-hover]",
      );
      cursor.classList.toggle("site-cursor--hover", Boolean(interactive));
      ring.classList.toggle("site-cursor--hover", Boolean(interactive));
      aura.classList.toggle("site-cursor--hover", Boolean(interactive));
    };

    const hideCursor = () => {
      cursor.classList.remove("site-cursor--visible");
      dot.classList.remove("site-cursor--visible");
      ring.classList.remove("site-cursor--visible");
      aura.classList.remove("site-cursor--visible");
    };

    const pulseCursor = () => {
      cursor.classList.remove("site-cursor--click");
      void cursor.offsetWidth;
      cursor.classList.add("site-cursor--click");
    };

    const animate = () => {
      const position = positionRef.current;
      const ringPosition = ringPositionRef.current;
      const auraPosition = auraPositionRef.current;
      const target = targetRef.current;
      position.x += (target.x - position.x) * 0.2;
      position.y += (target.y - position.y) * 0.2;
      ringPosition.x += (target.x - ringPosition.x) * 0.12;
      ringPosition.y += (target.y - ringPosition.y) * 0.12;
      auraPosition.x += (target.x - auraPosition.x) * 0.07;
      auraPosition.y += (target.y - auraPosition.y) * 0.07;
      const smoothX = `${position.x}px`;
      const smoothY = `${position.y}px`;

      cursor.style.transform = `translate3d(${smoothX}, ${smoothY}, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%)`;
      aura.style.transform = `translate3d(${auraPosition.x}px, ${auraPosition.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerleave", hideCursor);
    document.addEventListener("click", pulseCursor);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerleave", hideCursor);
      document.removeEventListener("click", pulseCursor);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="site-cursor-layer" aria-hidden="true">
      <span ref={auraRef} className="site-cursor site-cursor__aura" />
      <span ref={ringRef} className="site-cursor site-cursor__ring" />
      <span ref={cursorRef} className="site-cursor site-cursor__orb" />
      <span ref={dotRef} className="site-cursor site-cursor__dot" />
    </div>
  );
}

export default CustomCursor;
