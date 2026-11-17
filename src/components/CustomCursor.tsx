import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  accentColor?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  accentColor = '#b88c52'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const isTouchOrReduced =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchOrReduced) {
      setDisabled(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor]'
        );
        const nextHovered = Boolean(interactiveEl);
        const nextText = interactiveEl ? interactiveEl.getAttribute('data-cursor') || null : null;

        setIsHovered((prev) => (prev !== nextHovered ? nextHovered : prev));
        setCursorText((prev) => (prev !== nextText ? nextText : prev));
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const renderLoop = () => {
      const ease = 0.18;
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (disabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none transition-transform duration-150 ${
          isHovered ? 'scale-0 opacity-0' : isPressed ? 'scale-125' : 'scale-100 opacity-100'
        }`}
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.6)`
        }}
      />

      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center transition-all duration-200 ease-out ${
          cursorText
            ? '-ml-9 -mt-9 w-18 h-18 rounded-full border border-[#c59b67] bg-[#161513]/92 shadow-lg'
            : isHovered
            ? '-ml-6 -mt-6 w-12 h-12 rounded-full border border-[#b88c52] bg-[#b88c52]/8 scale-110'
            : isPressed
            ? '-ml-4 -mt-4 w-8 h-8 rounded-full border border-[#b88c52] bg-[#b88c52]/15 scale-90'
            : '-ml-4 -mt-4 w-8 h-8 rounded-full border border-[#161513]/20 bg-transparent scale-100'
        }`}
      >
        {cursorText && (
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase font-semibold text-[#faf7f2] select-none px-1 text-center">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
