import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const toCssLength = v => (typeof v === 'number' ? `${v}px` : (v ?? undefined));
const cx = (...p) => p.filter(Boolean).join(' ');

const useResizeObserver = (callback, elements, deps) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const onResize = () => callback();
      window.addEventListener('resize', onResize);
      callback();
      return () => window.removeEventListener('resize', onResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const obs = new ResizeObserver(callback);
      obs.observe(ref.current);
      return obs;
    });
    callback();
    return () => observers.forEach(o => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useImageLoader = (seqRef, onLoad, deps) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remaining = images.length;
    const done = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };
    images.forEach(img => {
      if (img.complete) done();
      else {
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    });
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', done);
        img.removeEventListener('error', done);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover) => {
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }

    if (prefersReduced) {
      track.style.transform = 'translate3d(0,0,0)';
      return () => { lastTsRef.current = null; };
    }

    const animate = ts => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;
      const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * dt;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

export const LogoLoop = memo(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,        // color for fades; if not provided uses auto vars
  fadeWidth = '48px',  // width of the left/right fade masks
  scaleOnHover = false,
  ariaLabel = 'Logos',
  className,
  style
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dir = direction === 'left' ? 1 : -1;
    const sign = speed < 0 ? -1 : 1;
    return mag * dir * sign;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerW = containerRef.current?.clientWidth ?? 0;
    const seqW = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;
    if (seqW > 0) {
      setSeqWidth(Math.ceil(seqW));
      const copiesNeeded = Math.ceil(containerW / seqW) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

  const cssVars = useMemo(
    () => ({
      '--logoloop-gap': `${gap}px`,
      '--logoloop-logoHeight': `${logoHeight}px`,
      ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
    }),
    [gap, logoHeight, fadeOutColor]
  );

  const rootClasses = useMemo(
    () =>
      cx(
        'relative overflow-x-hidden group',
        '[--logoloop-gap:32px]',
        '[--logoloop-logoHeight:28px]',
        '[--logoloop-fadeColorAuto:#ffffff]',
        'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
        scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
        className
      ),
    [scaleOnHover, className]
  );

  const handleMouseEnter = useCallback(() => pauseOnHover && setIsHovered(true), [pauseOnHover]);
  const handleMouseLeave = useCallback(() => pauseOnHover && setIsHovered(false), [pauseOnHover]);

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="flex items-center"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, i) => (
            <li
              key={`${copyIndex}-${i}`}
              className="flex-none mr-[var(--logoloop-gap)] leading-[1]"
              role="listitem"
            >
              {'node' in item ? item.node : null}
            </li>
          ))}
        </ul>
      )),
    [copyCount, logos]
  );

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={{ width: toCssLength(width) ?? '100%', ...cssVars, ...style }}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-[1]"
            style={{
              width: fadeWidth,
              background:
                'linear-gradient(to right, var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%, rgba(0,0,0,0) 100%)'
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-[1]"
            style={{
              width: fadeWidth,
              background:
                'linear-gradient(to left, var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%, rgba(0,0,0,0) 100%)'
            }}
          />
        </>
      )}

      <div
        className="flex w-max will-change-transform select-none motion-reduce:transform-none"
        ref={trackRef}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
