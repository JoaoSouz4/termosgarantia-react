import { Title } from "./title";
import { Tags } from "./tags";
import { Carrousel } from "./carrousel";
import { Description } from "./description";

export function WarrantyExclusion({ tags, title, index, description, images }) {
  return (
    <section className="my-10 mb-13 flex flex-col md:h-[50dvh] gap-5">
      <div>
        <Title index={index} text={title} />
        <Tags tags={tags} />
      </div>

      <div className="grow min-h-0">
        <div className="h-full flex flex-col gap-4 md:flex-row">
          <div className="flex-1 min-w-0 min-h-0">
            <Carrousel pathImages={images} />
          </div>

          <div className="md:w-1/2">
            <Description text={description} />
          </div>
        </div>
      </div>
    </section>
  );
}
