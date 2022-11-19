import { formatRelative, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface ListTransactionProps {
  [x: string]: any;
  data: {
    id?: string;
    valueInCents?: number;
    createdAt?: string;
    creditedAccount?: {
      user: {
        username: string;
      };
    };
  };
}

export function ListTransaction({ data }: ListTransactionProps) {
  const date = `${data.createdAt}`;
  const dateFormatted = formatRelative(parseISO(date), new Date(), {
    locale: ptBR,
  });

  const balance = data.valueInCents! / 100;
  const balanceReal = balance.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <ul className="flex flex-col gap-4 bg-green-500/10 p-4 rounded">
      <span>
        <li className="flex justify-between items-center flex-wrap">
          <h3>
            Destinatário:{" "}
            <span className="font-bold text-lg">
              {data.creditedAccount!.user.username}
            </span>
          </h3>
          <span className="text-zinc-50/60 text-xs font-bold">
            {dateFormatted}
          </span>
        </li>
      </span>

      <li className="text-center text-2xl font-bold">Valor: {balanceReal}</li>

      <li className="flex flex-col items-center">
        <small className="font-medium uppercase">Código da transação</small>
        <small>{data.id}</small>
      </li>
    </ul>
  );
}
