import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Revela elementos com [data-reveal] dentro do container ao entrarem na tela.
 * Também observa elementos adicionados depois (troca de aba, troca de serviço),
 * para que nenhum card fique invisível.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reveal = (el) => el.classList.add("is-visible");

    // Sem suporte: mostra tudo
    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0 },
    );

    const watch = (scope) => {
      if (scope.matches?.("[data-reveal]:not(.is-visible)")) io.observe(scope);
      scope.querySelectorAll?.("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    };
    watch(root);

    // Elementos inseridos depois da montagem
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && watch(n)));
    });
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return ref;
}

/**
 * Progresso de rolagem (0 → 1) enquanto o elemento sai da tela.
 * Escreve em uma CSS var (--p) e em um ref mutável, sem re-render.
 */
export function useScrollProgress(enabled = true) {
  const ref = useRef(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = el.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      progress.current = p;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return { ref, progress };
}
