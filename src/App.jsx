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

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  useEffect(()=>{
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [])
  return (
    <div>

     <Routes>
      <Route index element={<Home></Home>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/products" element={<Products></Products>}></Route>
      <Route path="/cart" element={<Cart></Cart>}></Route>
      {
        token && user && <>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route path="/orders" element={<Orders></Orders>}></Route>
        </>
      }
     </Routes>

    </div>
  );
}

export default App;
