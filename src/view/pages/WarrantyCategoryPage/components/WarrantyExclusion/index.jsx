import { Title } from "./title";
import { Tags } from "./tags";
import { Carrousel } from "./carrousel";
import { Description } from "./description";

export function WarrantyExclusion({
  tags,
  title,
  index,
  description,
  images,
  covered,
  accent,
  flip = false,
}) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${Math.min(index - 1, 2) * 80}ms` }}
      className={`grid gap-6 rounded-[28px] border border-line bg-panel p-3 md:grid-cols-2 md:gap-10 md:p-4 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Carrousel pathImages={images} alt={title} index={index} accent={accent} covered={covered} />

      <div className="flex flex-col px-3 pb-5 md:px-2 md:py-8 md:pr-8">
        <Title index={index} text={title} covered={covered} />
        <Tags tags={tags} />
        <Description text={description} />
      </div>
    </article>
  );
}
