import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("userLogged");

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
