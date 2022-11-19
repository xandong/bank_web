import { Eye, EyeClosed } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { Main } from "../components/Main";
import { Historic } from "../components/tabsHome/Historic";
import { Transfer } from "../components/tabsHome/Transfer";
import { AuthContext } from "../context/AuthContext";

export function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  const [overflowBalance, setOverflowBalance] = useState(true);
  const [selectSection, setSelectionSection] = useState<
    "transfer" | "historic"
  >("transfer");
  const [balanceReal, setBalanceReal] = useState("");

  useEffect(() => {
    const balance = user.account.balanceInCents / 100;
    setBalanceReal(
      balance.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })
    );
  }, [user.account.balanceInCents]);

  function handleOverflow() {
    setOverflowBalance(!overflowBalance);
  }

  return (
    <Main className="flex flex-col sm:items-end items-center gap-10">
      <section className="w-full flex sm:flex-row flex-col sm:justify-between justify-center items-center gap-10">
        <div className="font-bold">
          <h1 className="text-2xl">Bem vindo de volta a NG,</h1>
          <h2 className="text-6xl">{user.username}</h2>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2">
            SALDO
            <button onClick={handleOverflow}>
              {overflowBalance ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-4xl font-medium">
            <span>{overflowBalance ? "*****" : balanceReal}</span>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="flex sm:justify-end justify-center gap-4">
          <button
            className={`${
              selectSection === "transfer"
                ? "bg-zinc-50 text-zinc-900"
                : "bg-none hover:bg-zinc-800"
            } px-4 py-2 rounded border-2 border-zinc-700`}
            onClick={() => setSelectionSection("transfer")}
          >
            Transferências
          </button>

          <button
            className={`${
              selectSection === "historic"
                ? "bg-zinc-50 text-zinc-900"
                : "bg-none hover:bg-zinc-800"
            } px-4 py-2 rounded border-2 border-zinc-700`}
            onClick={() => setSelectionSection("historic")}
          >
            Histórico
          </button>
        </div>
        <div className="p-6 flex justify-center gap-6">
          {selectSection === "transfer" ? <Transfer /> : <Historic />}
        </div>
      </section>
    </Main>
  );
}
