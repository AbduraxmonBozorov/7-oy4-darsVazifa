import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";

export const TokenContext = createContext("");
export const UserContext = createContext("");
export const ThemeContext = createContext("");

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
      document
        .querySelector("html")
        .setAttribute("data-theme", localStorage.getItem("theme"));
    } else {
      document.querySelector("html").setAttribute("data-theme", theme);
    }
  }, []);

  useEffect(() => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <TokenContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout theme={{ theme, setTheme }}>
                    <Home></Home>
                  </MainLayout>
                }
              ></Route>
              <Route
                path="/about"
                element={
                  <MainLayout theme={{ theme, setTheme }}>
                    <About></About>
                  </MainLayout>
                }
              ></Route>
              <Route
                path="/products"
                element={
                  <MainLayout theme={{ theme, setTheme }}>
                    <Products></Products>
                  </MainLayout>
                }
              ></Route>
              <Route
                path="/cart"
                element={
                  <MainLayout theme={{ theme, setTheme }}>
                    <Cart></Cart>
                  </MainLayout>
                }
              ></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/register" element={<Register></Register>}></Route>
              {token && user && (
                <>
                  <Route
                    path="/checkout"
                    element={
                      <MainLayout theme={{ theme, setTheme }}>
                        <Checkout></Checkout>
                      </MainLayout>
                    }
                  ></Route>
                  <Route
                    path="/orders"
                    element={
                      <MainLayout theme={{ theme, setTheme }}>
                        <Orders></Orders>
                      </MainLayout>
                    }
                  ></Route>
                </>
              )}
              <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
            </Routes>
          </ThemeContext.Provider>
        </UserContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
