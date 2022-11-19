import { Circle } from "phosphor-react";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  text: string | ReactNode;
  type?: "button" | "submit" | "reset";
}

export function Button({ type, text, loading, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="px-6 py-2 bg-transparent border-2 border-zinc-50 hover:bg-zinc-50 focus:bg-zinc-50 text-zinc-50 hover:text-zinc-900 focus:text-zinc-900 uppercase font-semibold rounded transition-all duration-200 shadow-md hover:shadow-zinc-500 focus:shadow-zinc-500"
      type={type}
    >
      {loading ? <Circle className="animate-spin" /> : text}
    </button>
  );
}
