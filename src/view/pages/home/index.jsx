import { FaCheckSquare } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { ServiceCard } from "./card";
import normalScreen3 from "../../../assets/normalScreen3.png";
import battery from "../../../assets/battery.png";

export function Home() {
  return (
    <div className="mb-8">
      <section>
        <div className="flex flex-col gap-2 rounded-2xl p-4 shadow-xl bg-white mx-6">
          <h1 className="text-xl font-bold flex items-center gap-2 mt-2">
            <FaCheckSquare className="text-blue-400" />
            Guia da garantia BH
          </h1>
          <p className="text-sm  text-gray-600 mt-2 mb-4">
            Saiba o que passa e o que <strong>não passa</strong> na garantia de
            3(três) meses que oferecemos aos nossos clientes que fazem serviços
            conosco.
          </p>
        </div>

        <div className="mt-6">
          <div className="text-4xl gap-2 flex justify-center">
            <h2 className="flex items-center gap-2"></h2>
          </div>

          <div className="overflow-x-auto">
            <div className="flex pb-2 pl-6 ">
              <ServiceCard
                path={"/screen"}
                serviceName={"Troca do display"}
                imagePath={normalScreen3}
              />
              <ServiceCard
                path={"/screen"}
                serviceName={"Troca da bateria"}
                imagePath={battery}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
