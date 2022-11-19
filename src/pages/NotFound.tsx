import { Link } from "react-router-dom";
import { Main } from "../components/Main";

export function NotFound() {
  return (
    <Main>
      <div className="py-20 w-full h-full flex flex-col items-center">
        <h1 className="text-5xl text-center font-semibold">
          Ops... Página não encontrada!
        </h1>
        <span className="pt-10 text-xl font-semibold">
          Voltar para a{" "}
          <Link to="/" className="a font-bold text-2xl">
            HOME
          </Link>
        </span>
      </div>
    </Main>
  );
}
