import { AuthProvider } from "./context/AuthContext";
import { Router } from "./routes/Router";

export function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
