
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { NavBar } from "./components/navigation-bar/NavBar";
import { Authentication } from "./pages/authentication/Authentication"
import { Shop } from "./pages/shop/Shop";
import { Checkout } from "./pages/checkout/Checkout";

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/shop" element={ <Shop />} />
        <Route path="/auth" element={ <Authentication />} />
        <Route path="/checkout" element={ <Checkout />} />
      </Routes>
    </>
  );
}

export default App;
