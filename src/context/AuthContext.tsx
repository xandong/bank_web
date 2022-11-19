import { createContext, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Circle } from "phosphor-react";

import { api } from "../services/api";
import { notify } from "../services/notify";
import { UserModel } from "../models/userModel";

interface AuthProviderProps {
  children: ReactNode;
}

interface InitialValues {
  user: UserModel;
  setUser: (newState: any) => void;
  signIn: (username: string, password: string) => void;
  authenticated: boolean;
  loading: boolean;
  logout: () => void;
}

const initialValue = {
  user: {
    id: "",
    username: "",
    account: {
      balanceInCents: 0,
      debitedAccounts: [],
      creditedAccounts: [],
    },
  },
  setUser: (newState: UserModel) => {},
  signIn: (username: string, password: string) => {},
  authenticated: false,
  loading: false,
  logout: () => {},
};

export const AuthContext = createContext<InitialValues>(initialValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserModel>({
    id: "",
    username: "",
    account: {
      balanceInCents: 0,
      debitedAccounts: [],
      creditedAccounts: [],
    },
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common["authorization"] = `Bearer ${JSON.parse(
        token
      )}`;

      const ID = localStorage.getItem("ID");

      if (ID) {
        (async () => {
          try {
            const { data }: any = await api.get(`users/revalidate`);
            setUser(data.user);
            setAuthenticated(true);
          } catch (error: any) {
            notify.error("Ops... Algo de errado aconteceu");
            return logout();
          }
        })();
      }
    }
    setLoading(false);
  }, []);

  async function signIn(username: string, password: string) {
    setLoading(true);

    try {
      const { data } = await api.post("/auth", { username, password });

      const token = data.token;

      if (!token) return notify.error("Usuário não autenticado");

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("ID", data.user.id);

      api.defaults.headers.common["authorization"] = `Bearer ${token}`;

      setUser(data.user);

      notify.success("Login efetuado com sucesso");

      setAuthenticated(true);
    } catch (error: any) {
      notify.error(error.response.data.message);
    }
    return setLoading(false);
  }

  function logout() {
    api.defaults.headers.common["authorization"] = "";

    localStorage.removeItem("token");
    localStorage.removeItem("ID");

    setUser({
      id: "",
      username: "",
      account: {
        balanceInCents: 0,
        debitedAccounts: [],
        creditedAccounts: [],
      },
    });
    setAuthenticated(false);
    notify.error("Você foi desconectado");
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center animate-spin">
        <Circle size={32} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, authenticated, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
