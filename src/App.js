import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductCard from "./components/ProductCard";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import CheckOut from "./components/CheckOut";
import History from "./components/History";

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/productCard" element={<ProductCard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
