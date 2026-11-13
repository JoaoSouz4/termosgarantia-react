import { Title } from "./title";
import { Tags } from "./tags";
import { Carrousel } from "./carrousel";
import { Description } from "./description";

export function WarrantyExclusion({ tags, title, description, art, covered, accent, flip = false }) {
  return (
    <article
      className={`grid gap-4 rounded-3xl border border-line bg-panel p-2.5 md:grid-cols-2 md:gap-10 md:p-4 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Carrousel art={art} alt={title} accent={accent} />

      <div className="flex flex-col px-3 pb-5 pt-1 md:px-2 md:py-8 md:pr-8">
        <Title text={title} covered={covered} />
        <Description text={description} />
        <Tags tags={tags} />
      </div>
    </article>
  );
}
