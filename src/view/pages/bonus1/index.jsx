import { CiWarning } from "react-icons/ci";
import { IoMdPhonePortrait } from "react-icons/io";
import { TfiBackLeft } from "react-icons/tfi";
import { VscImportantCompact } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export function Bonus1() {
  const nav = useNavigate();
  return (
    <div className="">
      <div>
        <div className="p-4 py-1 mb-4">
          <div className="md:flex justify-center">
            <div className="flex items-center px-4 py-2 rounded-xl bg-white shadow-md mb-6 md:w-fit">
              <TfiBackLeft
                onClick={() => {
                  nav(-1);
                }}
                className="scale-y-[-1] w-fit text-gray-600 border-r pr-4 border-gray-400"
              />
              <div className="ml-4 py-2 w-full text-gray-700 text-sm">
                Conteúdo extra{" "}
                <div className="inline text-blue-400 font-bold">#001</div>
              </div>
            </div>
          </div>

          <h2 className=" font-bold text-slate-700 flex gap-2 text-2xl">
            Por que mais de um tipo de display?
          </h2>
          <p className="text-slate-800 text-sm my-2">
            Em busca de uma{" "}
            <strong className="text-bold">
              solução mais encômica para o usuário final
            </strong>
            , os fabricantes criam versões simplificadas das telas de fábrica. É
            importante atentar para os pós e contras na hora de escolher a
            qualidade de tela.
          </p>
        </div>

        <div>
          <div className="md:overflow-x-hidden overflow-x-auto overflow-y-hidden w-full">
            <div className="flex gap-4 md:mb-1 ">
              <div className="md:w-1/2 h-full w-[90%] pl-4 shrink-0 md:shrink index-40">
                <p className="border rounded-2xl p-4 pb-8 text-sm bg-blue-50 border-blue-300 text-blue-950">
                  <h2 className="mb-2 font-bold text-lg text-slate-700 flex gap-2 items-center ">
                    <IoMdPhonePortrait />
                    Parela/Incel
                  </h2>
                  <p className="leading-relaxed">
                    O termo paralela representa uma qualidade do display
                    diferente do display original. Por exemplo: Se a tela
                    original de um aparelho é Oled, todo display diferente de
                    Oled é paralela para esse aparelho. Sendo assim, uma tela
                    paralela não tem os mesmos recursos e qualidades da
                    original. Geralmente as telas paralelas são as de display
                    LCD.
                  </p>
                </p>
              </div>

              <div className="w-[90%] shrink-0 md:shrink md:w-1/2 pr-4 md:pr-0">
                <ul className=" leading-relaxed border rounded-2xl p-4 pb-8 text-sm bg-amber-50 border-amber-300 text-amber-900">
                  <h3 className="text-lg font-bold pb-2 text-amber-950 flex gap-2 items-center">
                    <CiWarning /> Principais observações:
                  </h3>
                  <li className="flex gap-2 items-center">
                    <div className="h-1 w-1 bg-amber-900 rounded-full" />
                    Diferença no acabamento da peça.
                  </li>
                  <li className="flex gap-2 items-center">
                    <div className="h-1 w-1 bg-amber-900 rounded-full" />
                    Cores menos saturadas.
                  </li>
                  <li className="flex gap-2 items-center">
                    <div className="h-1 w-1 bg-amber-900 rounded-full" />A
                    Biometria da tela não funciona.
                  </li>
                  <li className="flex gap-2 items-center">
                    <div className="h-1 w-1 bg-amber-900 rounded-full" />
                    Maior consumo de bateria.
                  </li>
                  <li className="flex gap-2 items-center">
                    <div className="h-1 w-1 bg-amber-900 rounded-full" />
                    Tela com bordas maiores.
                  </li>
                  <li className="flex gap-2 items-center">
                    <div className="h-1 w-1 bg-amber-900 rounded-full" />
                    Altura do aro da tela maior.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 text-sm border mx-4 rounded-xl border-gray-300 relative text-gray-800 md:w-1/3 mt-4">
            <div className="font-bold absolute -top-2.5 bg-background px-2 flex items-center">
              <VscImportantCompact /> Importante
            </div>
            Existem aparelhos como A07 e iPhone 11 em que a tela original é LCD.
            Celulares com tela LCD como sendo a original de fábrica tendem a ser
            aparelhos de entrada sendo os mais baratos do mercado, enquanto os
            de tela Oled ou superior tem uma teclogia de tela melhor.
          </div>
        </div>
      </div>
    </div>
  );
}
