import { Item } from "./item";
import { LuTableOfContents } from "react-icons/lu";

export function BonusContent() {
  return (
    <div className="px-6 my-6">
      <h2 className="flex gap-2 items-center text-sm mb-2">
        <LuTableOfContents className="text-blue-800" /> Conteúdo bônus:
      </h2>
      <ul className="bg-blue-100">
        <Item text={"Diferença entre as qualidades de tela"} href="/bonus1" />
      </ul>
    </div>
  );
}
