import { useEffect, useRef } from "react";

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const frameRef = useRef(0);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return undefined;

    const moveCursor = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      cursor.classList.add("site-cursor--visible");
      dot.classList.add("site-cursor--visible");

      const interactive = event.target.closest(
        "a, button, input, textarea, select, [role=button], [data-cursor-hover]",
      );
      cursor.classList.toggle("site-cursor--hover", Boolean(interactive));
    };

    const hideCursor = () => {
      cursor.classList.remove("site-cursor--visible");
      dot.classList.remove("site-cursor--visible");
    };

    const pulseCursor = () => {
      cursor.classList.remove("site-cursor--click");
      void cursor.offsetWidth;
      cursor.classList.add("site-cursor--click");
    };

    const animate = () => {
      const position = positionRef.current;
      const target = targetRef.current;
      position.x += (target.x - position.x) * 0.2;
      position.y += (target.y - position.y) * 0.2;
      cursor.style.translate = `${position.x}px ${position.y}px`;
      dot.style.translate = `${target.x}px ${target.y}px`;
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
      <span ref={cursorRef} className="site-cursor site-cursor__orb" />
      <span ref={dotRef} className="site-cursor site-cursor__dot" />
    </div>
  );
}

export default CustomCursor;
