import { FaCheckSquare } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { ServiceCard } from "./card";
import normalScreen from "../../../assets/normalScreen.png";

export function Home() {
  return (
    <div>
      <section>
        <div className="flex items-center justify-center flex-col gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaCheckSquare className="text-green-500" />
            Guia da garantia BH
          </h1>
          <p className="text-md text-center text-gray-600">
            Saiba o que passa e o que <strong>não passa</strong> na garantia de
            3(três) meses que oferecemos aos nossos clientes que fazem serviços
            conosco.
          </p>
        </div>

        <hr className="mt-8 mb-10 text-slate-300" />
        <div>
          <div className="text-2xl  gap-2 my-4 flex justify-center">
            <h2 className="flex items-center gap-2">
              <IoMdSettings className="animate-spin" /> Galeria de{" "}
              <strong className="text-blue-800">serviços</strong>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <ServiceCard
              path={"/screen"}
              serviceName={"Troca de tela"}
              imagePath={normalScreen}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
