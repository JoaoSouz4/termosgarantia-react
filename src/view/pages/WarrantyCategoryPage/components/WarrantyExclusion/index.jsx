import { Title } from "./title";
import { Tags } from "./tags";
import { Carrousel } from "./carrousel";
import { Description } from "./description";

export function WarrantyExclusion({ tags, title, index, description, images }) {
  return (
    <section className="my-10 mb-13">
      <Title index={index} text={title} />
      <Tags tags={tags} />

      <div className="flex justify-center flex-col w-full">
        <Carrousel pathImages={images} />
        <Description text={description} />
      </div>
    </section>
  );
}
