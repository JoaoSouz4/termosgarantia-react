import { FaCheckSquare } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { ServiceCard } from "./card";
import normalScreen3 from "../../../assets/normalScreen3.png";
import battery from "../../../assets/battery.png";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
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

      <footer className="m-4 mt-8 border-t border-slate-200 pt-6">
        <div className="text-center  text-slate-400 mb-2 text-sm">
          BH Assistência técnica - PVH (RO)
        </div>
        <div className="text-slate-400 text-sm text-center">
          <div>Avenida calama 5863</div>
          <div>Avenida José Amador dos reis 3110</div>
        </div>
        <div className="text-center mt-4 flex justify-center">
          <div className="flex gap-4 text-slate-500 text-xl ">
            <FaInstagram />
            <FaFacebook />
          </div>
        </div>
      </footer>
    </div>
  );
}
