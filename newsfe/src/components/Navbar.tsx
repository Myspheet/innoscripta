import React, { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router";
import axiosClient from "../helpers/axiosClient";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { user, setToken, setUser } = useStateContext();

  const logout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    axiosClient.post("/auth/logout").then(() => {
      setUser(null);
      setToken("");
    });
  };

  return (
    <header className="shadow mb-2">
      <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a
          href="#"
          className="flex items-center whitespace-nowrap text-2xl font-black"
        >
          <span className="text-black">
            Hello, {user ? user.name : "Guest"}
          </span>
        </a>
        {/* <input type="checkbox" className="peer hidden" id="navbar-open" /> */}
        <label className="absolute top-5 right-7 cursor-pointer md:hidden">
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={() => setShowNav(!showNav)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className={`${
            showNav ? "mt-8 max-h-56" : ""
          } flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start`}
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="text-gray-600 md:mr-12 hover:text-blue-600">
              <Link to="/">Home</Link>
            </li>
            {/* Check if the user is logged in and show the logout button and preference page */}
            {user ? (
              <>
                <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                  <Link to="/preference">Preference</Link>
                </li>
                <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                  <button
                    onClick={logout}
                    className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* <div>
        {user.name} &nbsp; &nbsp;
        <a onClick={onLogout} className="btn-logout" href="#">
          Logout
        </a>
      </div> */}
      <hr />
    </header>
  );
}

export default Navbar;
