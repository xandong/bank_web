import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { PrivateRoute } from "./PrivateRouter";
import { NotFound } from "../pages/NotFound";
export function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login">
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
