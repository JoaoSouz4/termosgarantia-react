import { Toogle } from "./components/toogle";
import { useState } from "react";
import { WarrantyExclusion } from "./components/WarrantyExclusion";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

export function WarrantyCategoryPage({ warrantyExclusions, warrantyCoverage }) {
  let navigate = useNavigate();
  const [content, setContent] = useState({
    type: "exclusions",
    data: warrantyExclusions,
  });

  function handleToogle() {
    if (content.type == "exclusions") {
      setContent({ type: "coverage", data: warrantyCoverage });
    } else {
      setContent({ type: "exclusions", data: warrantyExclusions });
    }
  }

  return (
    <div className="m-5">
      <div className="flex gap-2">
        <div
          onClick={() => navigate(-1)}
          className="border rounded-2xl border-gray-200 text-gray-500 w-14 flex items-center justify-center text-xs"
        >
          <IoArrowBackOutline />
        </div>

        <Toogle onToogle={handleToogle} />
      </div>

      {content.data.map(({ id, title, description, tags, images }) => (
        <WarrantyExclusion
          key={id}
          index={id}
          title={title}
          description={description}
          tags={tags}
          images={images}
        />
      ))}
    </div>
  );
}
