"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ZAxisStageProps {
  activeIndex: number;
  totalScenes: number;
  isLocked?: boolean;
  onChangeScene: (nextIndex: number) => void;
  onDepthUpdate: (progress: number) => void;
  children: React.ReactNode[];
}

export const ZAxisStage: React.FC<ZAxisStageProps> = ({
  activeIndex,
  totalScenes,
  isLocked = false,
  onChangeScene,
  onDepthUpdate,
  children,
}) => {
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const cameraState = useRef<{ currentScene: number }>({ currentScene: 0 });
  const isAnimatingRef = useRef<boolean>(false);
  const wheelAccumulator = useRef<number>(0);
  const touchStartY = useRef<number | null>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: false,
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const updateScenePositions = (progressIndex: number) => {
      const normalizedProgress =
        totalScenes > 1 ? progressIndex / (totalScenes - 1) : 0;
      onDepthUpdate(normalizedProgress);

      sceneRefs.current.forEach((sceneEl, idx) => {
        if (!sceneEl) return;

        const offset = idx - progressIndex;
        const absOffset = Math.abs(offset);
        const isCurrentActive = idx === activeIndex;

        const scale =
          offset < 0
            ? 1 + absOffset * 0.16
            : Math.max(0.84, 1 - absOffset * 0.12);
        const opacity =
          absOffset > 0.95 ? 0 : Math.max(0, 1 - Math.pow(absOffset, 1.4));

        sceneEl.style.transform = `scale(${scale.toFixed(4)})`;
        sceneEl.style.opacity = opacity.toFixed(3);
        sceneEl.style.zIndex = isCurrentActive ? "30" : "10";
        sceneEl.style.pointerEvents = isCurrentActive ? "auto" : "none";
        sceneEl.style.visibility = opacity <= 0.02 ? "hidden" : "visible";
      });
    };

    isAnimatingRef.current = true;
    gsap.to(cameraState.current, {
      currentScene: activeIndex,
      duration: prefersReducedMotion || isMobile ? 0.45 : 0.72,
      ease: "power3.out",
      onUpdate: () => {
        updateScenePositions(cameraState.current.currentScene);
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        wheelAccumulator.current = 0;
      },
    });
  }, [
    activeIndex,
    totalScenes,
    isMobile,
    prefersReducedMotion,
    onDepthUpdate,
  ]);

  useEffect(() => {
    const canScrollInternally = (
      target: EventTarget | null,
      deltaY: number
    ): boolean => {
      if (!(target instanceof HTMLElement)) return false;
      const scrollable = target.closest(
        ".custom-scrollbar"
      ) as HTMLElement | null;
      if (!scrollable) return false;

      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      if (scrollHeight <= clientHeight) return false;

      if (deltaY > 0 && scrollTop + clientHeight < scrollHeight - 2) {
        return true;
      }
      if (deltaY < 0 && scrollTop > 2) {
        return true;
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (isLocked) return;
      if (canScrollInternally(e.target, e.deltaY)) return;

      e.preventDefault();
      if (isAnimatingRef.current) return;

      wheelAccumulator.current += e.deltaY;
      const threshold = 45;

      if (
        wheelAccumulator.current > threshold &&
        activeIndex < totalScenes - 1
      ) {
        wheelAccumulator.current = 0;
        onChangeScene(activeIndex + 1);
      } else if (wheelAccumulator.current < -threshold && activeIndex > 0) {
        wheelAccumulator.current = 0;
        onChangeScene(activeIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked || isAnimatingRef.current) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (activeIndex < totalScenes - 1) onChangeScene(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (activeIndex > 0) onChangeScene(activeIndex - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isLocked || e.touches.length !== 1) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLocked || touchStartY.current === null || isAnimatingRef.current) {
        return;
      }
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      touchStartY.current = null;

      if (canScrollInternally(e.target, deltaY)) return;

      if (deltaY > 42 && activeIndex < totalScenes - 1) {
        onChangeScene(activeIndex + 1);
      } else if (deltaY < -42 && activeIndex > 0) {
        onChangeScene(activeIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, totalScenes, isLocked, onChangeScene]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {React.Children.map(children, (child, index) => (
        <section
          key={index}
          ref={(el) => {
            sceneRefs.current[index] = el;
          }}
          aria-hidden={activeIndex !== index}
          className="fixed inset-0 flex flex-col px-6 pt-24 pb-6 sm:px-12 xl:pl-44 xl:pr-16 will-change-transform"
        >
          {/* تمركز آمن بـ my-auto يمنع قص أعلى أو أسفل أي قسم نهائياً */}
          <div className="custom-scrollbar relative flex h-full w-full overflow-y-auto">
            <div className="my-auto mx-auto flex w-full max-w-5xl items-center justify-center py-2">
              {child}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ZAxisStage;