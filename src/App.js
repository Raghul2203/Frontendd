import Home from "./app/Home";
import Products from "./app/Products"
import { BrowserRouter as Router, Routes, Route , useNavigate } from "react-router-dom";
import Product from "./app/Product";
import Cart from "./app/Cart";
import Wishlist from "./app/Wishlist";
import Header from "./app/Header";
import Footer from "./app/Footer";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoutes from "./auth/components/ProtectedRoutes";
import { useEffect } from "react";
let Logout = ()=>{
  localStorage.clear()
  let navigate = useNavigate()
  useEffect(()=>{
    navigate("/")
    window.location.reload()
  })
}
function App() {
  return (
      <Router>
        <div className="flex flex-col justify-between h-dvh">
        <div><Header/></div>
       <div>
       <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="category/products/:name/" element={<Products/>}></Route>
          <Route path="/:id" element={<Product/>}></Route>
          <Route path="/cart/" element={<ProtectedRoutes><Cart/></ProtectedRoutes>}></Route>
          <Route path="wishlist/" element={<ProtectedRoutes><Wishlist/></ProtectedRoutes>}></Route>
          <Route path="login/" element={<Login/>}></Route>
          <Route path="register/" element={<Register/>}></Route>
          <Route path="/logout/" element={<Logout/>}></Route>
        </Routes>
       </div>
        <div><Footer/></div>
        </div>
      </Router>
  );
}

export default App;
