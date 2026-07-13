import { IoIosArrowForward } from "react-icons/io";

export function CarouselControl({ direction = "", callback }) {
  return (
    <div onClick={callback}>
      {direction == "prev" ? (
        <IoIosArrowForward className="w-12 rotate-180" />
      ) : (
        <IoIosArrowForward className="w-12" />
      )}
    </div>
  );
}
