import { Toogle } from "./components/toogle";
import { useState } from "react";
import { WarrantyExclusion } from "./components/WarrantyExclusion";

export function WarrantyCategoryPage({ warrantyExclusions, warrantyCoverage }) {
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
      <Toogle onToogle={handleToogle} />
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
