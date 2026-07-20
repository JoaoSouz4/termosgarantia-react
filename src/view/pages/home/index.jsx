import { FaCheckSquare } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { ServiceCard } from "./card";
import normalScreen3 from "../../../assets/normalScreen3.png";
import battery from "../../../assets/battery.png";
import conector from "../../../assets/conector.png";
import placa from "../../../assets/placa.png";

export function Home() {
  return (
    <div className="mb-8">
      <section>
        <div className="md:flex">
          <div className="flex flex-col gap-2 rounded-2xl p-4 shadow-xl bg-white mx-6 md:w-1/2">
            <h1 className="text-xl font-bold flex items-center gap-2 mt-2">
              <FaCheckSquare className="text-blue-400" />
              Guia da garantia BH
            </h1>
            <p className="text-sm  text-gray-600 mt-2 mb-4">
              Saiba o que passa e o que <strong>não passa</strong> na garantia
              de 3(três) meses que oferecemos aos nossos clientes que fazem
              serviços conosco.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-4xl gap-2 flex justify-center">
            <h2 className="flex items-center gap-2"></h2>
          </div>

          <div className="overflow-x-auto scrollbar-none">
            <div className="flex pb-2 pl-6 md:grid grid-cols-3">
              <ServiceCard
                path={"/screen"}
                serviceName={"Troca do display"}
                description={
                  "Entenda quando a garantia da troca de tela é válida e quais situações caracterizam danos externos, não cobertos pela garantia"
                }
                imagePath={normalScreen3}
              />
              <ServiceCard
                path={"/screen"}
                serviceName={"Troca da bateria"}
                imagePath={battery}
                description={
                  "Confira quais falhas relacionadas à bateria são consideradas defeitos da peça e quais decorrem do uso ou de agentes externos."
                }
              />

              <ServiceCard
                path={"/screen"}
                serviceName={"Troca do conector"}
                imagePath={conector}
                description={
                  "Descubra quais falhas no conector de carga são cobertas pela garantia e em quais situações o dano é causado por fatores externos."
                }
              />
              <ServiceCard
                path={"/screen"}
                serviceName={"Reparos na placa"}
                imagePath={placa}
                description={
                  "Entenda quais reparos na placa eletrônica são cobertos pela garantia e quais defeitos decorrem de fatores externos ou novas avarias."
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="p-6">
        <div className="">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-800">
              Observações importantes*
            </h1>
            <span className="w-1/2 h-0.5 mt-1 bg-amber-300" />
          </div>
        </div>
        <p className="text-gray-700 mt-4">
          A garantia cobre exclusivamente defeitos de fabricação das peças
          utilizadas no serviço e eventuais falhas relacionadas à mão de obra.
          Ela não deve ser confundida com um seguro. Danos causados por quedas,
          impactos, pressão, contato com líquidos, mau uso, desgaste natural ou
          defeitos preexistentes não fazem parte da cobertura da garantia
          oferecida pela loja.
        </p>
      </section>

      <section className="p-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-800">
            Meu aparelho não passa na garantia. E agora?
          </h1>
          <span className="w-1/3 h-0.5 mt-1 bg-amber-300" />
        </div>
        <p className="text-gray-700 mt-4">
          Nem todo defeito é coberto pela garantia, mas isso não significa que
          você ficará sem suporte. Fale com a nossa equipe. Sempre analisamos
          cada caso com transparência e buscamos a solução mais econômica
          possível para os nossos clientes. A honestidade e a confiança fazem
          toda a diferença nesse processo.
        </p>
      </section>
    </div>
  );
}
