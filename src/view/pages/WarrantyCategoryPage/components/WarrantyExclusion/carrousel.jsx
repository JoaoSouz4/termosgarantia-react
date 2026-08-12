import { useRef } from "react";
import { CarouselControl } from "./carouselControl";

export function Carrousel({ pathImages }) {
  const carouselRef = useRef(null);

  function handleNext() {
    carouselRef.current?.scrollBy({
      left: carouselRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  function handlePrev() {
    carouselRef.current?.scrollBy({
      left: -carouselRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex h-full min-h-0 items-center gap-2">
      <CarouselControl direction="prev" callback={handlePrev} />

      <div
        ref={carouselRef}
        className="flex-1 h-full overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth scrollbar-none"
      >
        {pathImages.map((path) => (
          <div
            key={path}
            className="w-full h-full shrink-0 flex items-center justify-center snap-center"
          >
            <img
              src={path}
              alt=""
              loading="lazy"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>

      <CarouselControl direction="next" callback={handleNext} />
    </div>
  );
}
