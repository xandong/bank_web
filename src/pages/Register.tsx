import { Circle, LockSimple, User } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Fieldset } from "../components/Fieldset";
import { Main } from "../components/Main";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { notify } from "../services/notify";

export function Register() {
  const { authenticated } = useContext(AuthContext);

  if (authenticated) return <Navigate to="/login" />;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      setLoading(true);
      const { data } = await api.post("/users", { username, password });

      notify.success(data.message);
      setLoading(false);

      return navigate("/login");
    } catch (error: any) {
      notify.error(error.response.data.message);
      setLoading(false);
    }
  }

  function validateInputs() {
    if (!username || !password || !passwordCheck) {
      setError("Campos obrigatórios");
      return false;
    }

    if (username.length < 3) {
      setError("Usuário deve ter no mínimo 3 caracteres");
      return false;
    }

    if (password.length < 8) {
      setError("Senha deve ter no mínimo 8 caracteres");
      return false;
    }

    if (!(password === passwordCheck)) {
      setError("As senhas não coincidem");
      return false;
    }
    setError("");

    return true;
  }

  return (
    <Main className="items-center flex-col gap-10">
      <h1 className="sm:text-4xl text-3xl font-bold text-center">
        Crie sua conta NG 🤑
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
        <Fieldset
          id="passwordCheck"
          type={"password"}
          label="Confirme a senha"
          Icon={LockSimple}
          placeholder="********"
          value={passwordCheck}
          setValue={setPasswordCheck}
        />
        <div>
          <Button text={"Cadastrar"} loading={loading} type={"submit"} />
        </div>
      </form>
    </Main>
  );
}
