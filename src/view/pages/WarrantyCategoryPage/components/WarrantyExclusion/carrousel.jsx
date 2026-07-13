import { CarouselControl } from "./carouselControl";
import { useRef } from "react";
export function Carrousel({ pathImages }) {
  const carouselRef = useRef(null);

  function handleNext() {
    const carousel = carouselRef.current;
    carousel.scrollBy({
      left: carousel.clientWidth,
      behavior: "smooth",
    });
  }

  function handlePrev() {
    const carousel = carouselRef.current;
    carousel.scrollBy({
      left: -carousel.clientWidth,
      behavior: "smooth",
    });
  }
  return (
    <div className="flex items-center justify-center">
      <CarouselControl direction={"prev"} callback={handlePrev} />
      <div
        ref={carouselRef}
        className=" w-[70%] overflow-x-auto rounded-2xl mt-2"
      >
        <div className="flex">
          {pathImages.map((path) => (
            <img key={path} className="w-full" src={path} alt="" />
          ))}
        </div>
      </div>
      <CarouselControl callback={handleNext} />
    </div>
  );
}
