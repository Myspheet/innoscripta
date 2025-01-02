import React, { useContext, useState } from "react";
import { IUser, IUserPreference, UserContextType } from "../@types/user";

const initialPreference: IUserPreference = {
  authorIds: [],
  categoryIds: [],
  sourceIds: [],
};

const StateContext = React.createContext<UserContextType>({
  user: null,
  token: "",
  preference: initialPreference,
  baseNewsUrl: "news",
  notification: "",

  setUser: () => {},
  setToken: () => {},
  setPreference: () => {},
  setBaseNewsUrl: () => {},
  setNotification: () => {},
});

export const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState("");
  const [baseNewsUrl, setBaseNewsUrl] = useState("news");
  const [preference, setPreference] = useState(initialPreference);

  const setToken = (token: string) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message: string) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        preference,
        setPreference,
        baseNewsUrl,
        setBaseNewsUrl,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
