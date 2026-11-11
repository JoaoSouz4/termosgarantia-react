import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import normalScreen3 from "../../../../assets/normalScreen3.webp";

const Workshop = lazy(() => import("./Workshop"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Alternativa visual sem WebGL (ou se a cena falhar). */
function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <img
        src={normalScreen3}
        alt=""
        className="max-h-[70%] w-auto max-w-full rounded-[28px] object-cover shadow-2xl ring-1 ring-white/10"
      />
    </div>
  );
}

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-brand/25 blur-3xl" />
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
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {supported ? (
        <SceneBoundary>
          <Suspense fallback={<Loading />}>
            <Workshop
              progress={progress}
              active={inView}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </SceneBoundary>
      ) : (
        <Fallback />
      )}
    </div>
  );
}
