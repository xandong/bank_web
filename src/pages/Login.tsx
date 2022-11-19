import { LockSimple, User } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Fieldset } from "../components/Fieldset";
import { Main } from "../components/Main";
import { AuthContext } from "../context/AuthContext";
import { notify } from "../services/notify";

export function Login() {
  const { authenticated, signIn } = useContext(AuthContext);

  if (authenticated) return <Navigate to="/" />;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username || !password) return notify.error("Campos obrigatórios");

    signIn(username, password);
  }

  return (
    <Main className="items-center justify-between flex-col gap-10">
      <h1 className="sm:text-4xl text-3xl font-bold text-center">
        Faça login na NG 🤑
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-full w-[360px] flex flex-col items-center gap-8 relative"
      >
        {error ? (
          <small className="-mb-4 -mt-2 font-bold text-red-500 uppercase">
            Erro: {error}
          </small>
        ) : (
          ""
        )}

        <Fieldset
          id="username"
          type="text"
          label="Usuário"
          Icon={User}
          placeholder="Seu username"
          value={username}
          setValue={setUsername}
        />
        <Fieldset
          id="password"
          type={"password"}
          label="Senha"
          Icon={LockSimple}
          placeholder="********"
          value={password}
          setValue={setPassword}
        />

        <p>
          Não possui conta? <Link to="/register">Clique aqui!</Link>
        </p>
        <div>
          <Button text="Entrar" type={"submit"} />
        </div>
      </form>
    </Main>
  );
}
