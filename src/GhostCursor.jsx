import { useEffect, useRef } from "react";
import "./GhostCursor.css";

const TRAIL_LENGTH = 8;

export default function GhostCursor({ style, global = false }) {
  const rootRef = useRef(null);
  const dotsRef = useRef([]);
  const pointer = useRef({ x: -100, y: -100 });
  const trail = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let frameId = 0;

    const updatePointer = (event) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = global || (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height);

      pointer.current = inside ? { x, y } : { x: -100, y: -100 };
    };

    const animate = () => {
      trail.current.forEach((dot, index) => {
        const target = index === 0 ? pointer.current : trail.current[index - 1];
        const speed = index === 0 ? 0.34 : 0.24;
        dot.x += (target.x - dot.x) * speed;
        dot.y += (target.y - dot.y) * speed;

        const node = dotsRef.current[index];
        if (node) {
          node.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
        }
      });

      frameId = requestAnimationFrame(animate);
    };

    const hidePointer = () => {
      pointer.current = { x: -100, y: -100 };
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", hidePointer);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", hidePointer);
      cancelAnimationFrame(frameId);
    };
  }, [global]);

  return (
    <div ref={rootRef} className={`ghost-cursor effect-glow${global ? " ghost-cursor-global" : ""}`} style={style} aria-hidden="true">
      {Array.from({ length: TRAIL_LENGTH }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            dotsRef.current[index] = node;
          }}
          className="ghost-cursor-dot"
          style={{
            width: `${34 - index * 2}px`,
            height: `${34 - index * 2}px`,
            opacity: `${0.42 - index * 0.035}`,
          }}
        />
      ))}
    </div>
  );
}
