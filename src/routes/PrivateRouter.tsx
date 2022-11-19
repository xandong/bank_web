import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo: string;
}

export function PrivateRoute({ children, redirectTo }: PrivateRouteProps) {
  const { authenticated } = useContext(AuthContext);

  return <>{authenticated ? children : <Navigate to={redirectTo} />}</>;
}
