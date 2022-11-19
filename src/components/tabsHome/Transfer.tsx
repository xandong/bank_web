import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserModel } from "../../models/userModel";
import { api } from "../../services/api";
import { notify } from "../../services/notify";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";

export function Transfer() {
  function handleValue(e: ChangeEvent<HTMLInputElement>) {
    setTransferValue(e.target.value);
  }
  const { setUser } = useContext(AuthContext);

  const [transferTo, setTransferTo] = useState("");
  const [transferValue, setTransferValue] = useState("");
  const [awaitingTransfer, setAwaitingTransfer] = useState(false);

  async function handleTransfer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAwaitingTransfer(true);
    try {
      const valueInCents = +transferValue * 100;

      const { data } = await api.post("/transactions", {
        to: transferTo,
        valueInCents,
      });

      const balanceInCents = data.newBalanceInCents;

      setUser((prevState: UserModel) => ({
        ...prevState,
        account: { balanceInCents },
      }));

      return notify.success("Transferência efetuado com sucesso");
    } catch (error: any) {
      return notify.error(error.response.data.message);
    } finally {
      setAwaitingTransfer(false);
      setTransferTo("");
      setTransferValue("");
    }
  }

  return (
    <section>
      <form onSubmit={handleTransfer} className="p-6 flex flex-col gap-6">
        <h2 className="max-w-[100%] font-medium text-xl uppercase">
          Faça uma transferência interna
        </h2>
        {awaitingTransfer ? (
          <div className="w-full flex justify-center items-center">
            Aguarde, estamos processando sua transação...
          </div>
        ) : (
          <>
            <Fieldset
              id="to"
              label="Transferir para:"
              placeholder="username do destinatário"
              value={transferTo}
              setValue={setTransferTo}
              required
            />
            <div className="flex items-center gap-6">
              <fieldset className="flex items-center gap-2">
                <label
                  htmlFor="transferValue"
                  className="font-medium text-lg uppercase"
                >
                  Valor:
                </label>
                <input
                  className="p-2 w-28 text-zinc-50 bg-zinc-900
          border-zinc-400 border-2
          hover:border-zinc-50 focus:border-zinc-50
          placeholder-zinc-400
          rounded-md transition-all"
                  type="number"
                  name="transferValue"
                  id="transferValue"
                  value={transferValue}
                  onChange={(e) => handleValue(e)}
                  required
                />
              </fieldset>
              <Button text="Transferir" />
            </div>
          </>
        )}
      </form>
    </section>
  );
}
