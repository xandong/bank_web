import { useContext, useState } from "react";
import { User } from "phosphor-react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export function Header() {
  const { logout, authenticated } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleClickMenu() {
    setToggleMenu(!toggleMenu);
  }

  function handleLogout() {
    handleClickMenu();

    setTimeout(() => {
      const confirmation = confirm("Tem certeza que deseja sair?");
      if (confirmation) return logout();
    }, 100);
  }

  return (
    <header className="flex justify-between items-center sm:px-6 px-2  py-2 shadow-md shadow-gray-800 relative">
      <div className="w-20">
        <img src="/logo_ng_cash.gif" />
      </div>

      {authenticated ? (
        <button
          onClick={handleClickMenu}
          className="flex place-items-center rounded-full hover:bg-white p-1 hover:text-zinc-900 hover:shadow-md hover:shadow-zinc-700 hover:scale-110 transition-all duration-300"
        >
          <User size={24} />
        </button>
      ) : (
        <Link to="/login">Entrar</Link>
      )}
      {toggleMenu ? (
        <div
          className="absolute bg-zinc-50 text-zinc-500 py-6 px-10 top-[74px] right-6 rounded"
          onMouseLeave={handleClickMenu}
        >
          <ul className="font-medium flex flex-col gap-1">
            <li>
              <a href="https://ng.cash/beneficios" target="_blank">
                Benefícios
              </a>
            </li>
            <li>
              <a href="https://ng.cash/tarifas" target="_blank">
                Tarifas
              </a>
            </li>
            <li>
              <a href="https://help.ng.cash/pt-BR/" target="_blank">
                Ajuda
              </a>
            </li>
            <li>
              <a href="https://ng.cash/seguranca" target="_blank">
                Segurança
              </a>
            </li>
            <li>
              <a href="https://careers.ng.cash/" target="_blank">
                Carreiras
              </a>
            </li>
            <li>
              <a href="https://ng.cash/parcerias" target="_blank">
                Parcerias
              </a>
            </li>
            <hr />
            <li className="text-zinc-900 font-bold hover:scale-110 transition-all hover:translate-x-1">
              <button onClick={handleLogout}>Sair</button>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
