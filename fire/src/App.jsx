import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/registration/Login"
import SignUp from "./pages/registration/SignUp";
import ProductInfo from "./pages/productInfo/ProductInfo";
import NoPage from "./pages/noPage/NoPage";
import { ContextDataProvider } from "./context/data/ContextData";

function App() {
  return (
    <>
      <ContextDataProvider>
        <BrowserRouter>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="*" element={<NoPage />} />
           </Routes>
        </BrowserRouter>
      </ContextDataProvider>
    </>
  );
}

export default App;
