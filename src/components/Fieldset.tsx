import { Eye, EyeClosed, IconProps } from "phosphor-react";
import React, {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  useState,
} from "react";

interface FieldsetProps {
  id: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  label: string;
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  placeholder: string;
  required?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export function Fieldset({
  id,
  Icon,
  type,
  placeholder,
  label,
  value,
  required = false,
  setValue,
}: FieldsetProps) {
  const [newType, setNewType] = useState(type);

  function handleVisibilityChange() {
    if (newType === "password") return setNewType("text");
    return setNewType("password");
  }

  return (
    <fieldset className="w-full relative">
      <label
        className="bg-zinc-900 absolute -top-3 left-2 px-1 text-sm uppercase font-medium rounded"
        htmlFor={id}
      >
        {label}
      </label>

      {Icon ? (
        <div className="absolute top-3 left-3 text-zinc-400">
          <Icon size={22} weight="bold" />
        </div>
      ) : (
        ""
      )}

      <input
        className={`w-full ${Icon ? "px-10" : ""} p-2
          text-zinc-50 bg-zinc-900
          border-zinc-400 border-2
          hover:border-zinc-50 focus:border-zinc-50
          placeholder-zinc-400
          rounded-md transition-all`}
        id={id}
        type={newType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
      />

      {type === "password" ? (
        <button
          className="absolute right-2 top-3 text-zinc-400"
          type="button"
          onClick={handleVisibilityChange}
        >
          {newType === "password" ? <EyeClosed size={22} /> : <Eye size={22} />}
        </button>
      ) : (
        ""
      )}
    </fieldset>
  );
}
