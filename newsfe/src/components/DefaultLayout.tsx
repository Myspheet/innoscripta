import { Navigate, Outlet } from "react-router";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../helpers/axiosClient.ts";
import Navbar from "./Navbar.tsx";

export default function DefaultLayout({ isPublic }: any) {
  const { token, setUser, setToken } = useStateContext();

  if (!isPublic && !token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (token) {
      axiosClient
        .get("/auth/user")
        .then(({ data }) => {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
          });
        })
        .catch(() => {
          localStorage.removeItem("ACCESS_TOKEN");
          setToken("");
        });
    }
  }, []);

  return (
    <div id="defaultLayout">
      <div className="content">
        <main>
          <Navbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
