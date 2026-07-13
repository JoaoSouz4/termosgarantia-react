import { WarrantyExclusion } from "./components/WarrantyExclusion";

export function WarrantyCategoryPage({ warrantyExclusions }) {
  return (
    <div>
      {warrantyExclusions.map(({ id, title, description, tags, images }) => (
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
