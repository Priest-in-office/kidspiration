import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignupChooser from "./pages/SignupChooser";
import Signup from "./pages/Signup";
import KidSignup from "./pages/KidSignup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Partner from "./pages/Partner";
import Shop from "./pages/Shop";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signup" element={<SignupChooser />} />
        <Route path="/signup/adult" element={<Signup />} />
        <Route path="/signup/kid" element={<KidSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}
