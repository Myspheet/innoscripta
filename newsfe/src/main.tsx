import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { ContextProvider } from "./context/ContextProvider.tsx";
import GuestLayout from "./components/GuestLayout.tsx";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";
import Preference from "./views/Preference.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<DefaultLayout isPublic={true} />}>
            <Route index element={<App />} />
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path="preference" element={<Preference />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>
);
