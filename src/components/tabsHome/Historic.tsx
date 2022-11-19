import { FileSearch, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";
import { ListTransaction } from "./ListTransaction";

export function Historic() {
  const [transactions, setTransactions] = useState<{}[]>([]);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    getHistoric();
  }, []);

  async function getHistoric() {
    try {
      const { data } = await api.post("/transactions/me");

      setTransactions(data);
    } catch (error) {}
  }

  // function handleSearch() {
  //   if (dateFilter) {
  //     const dataFilter = transactions.filter((e: any) =>
  //       e.createdAt.includes(dateFilter)
  //     );
  //     console.log({ dataFilter });

  //     return setTransactionsFilter(dataFilter);
  //   }
  // }

  return (
    <section className="flex flex-col items-center gap-4 sm:p-6 p-0">
      <h2 className="max-w-[100%] font-medium text-xl text-center uppercase">
        Histórico de transações
      </h2>
      <div className="flex items-center gap-2">
        <Fieldset
          id="date"
          label="Filtrar por mês"
          placeholder="selecione o mês"
          type={"month"}
          value={dateFilter}
          setValue={setDateFilter}
        />
        <Button onClick={() => {}} text={<MagnifyingGlass />} />
      </div>

      <ul className="flex flex-col gap-4">
        {transactions.map((transaction: any) => (
          <ListTransaction key={transaction.id} data={transaction} />
        ))}
      </ul>
    </section>
  );
}
