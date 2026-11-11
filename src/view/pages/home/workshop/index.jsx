import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Illustration } from "../../../../illustrations";
import { deviceTier, hasWebGL } from "../../../../utils/device";

const Workshop = lazy(() => import("./Workshop"));

/** Alternativa sem WebGL (ou se a cena falhar). */
function Fallback() {
  return (
    <div className="flex h-full w-full items-end justify-center p-4 md:items-center md:p-8">
      <Illustration id="cover-screen" className="max-h-full w-full max-w-md rounded-[28px] shadow-2xl ring-1 ring-white/10" />
    </div>
  );
}

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-brand/25 blur-3xl" />
    </div>
  );
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

export function WorkshopStage({ progress, reducedMotion }) {
  const ref = useRef(null);
  const [supported] = useState(hasWebGL);
  const [tier] = useState(deviceTier);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {supported ? (
        <SceneBoundary>
          <Suspense fallback={<Loading />}>
            <Workshop progress={progress} active={inView} reducedMotion={reducedMotion} tier={tier} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <Fallback />
      )}
    </div>
  );
}
