import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import SignupChooser from "./pages/SignupChooser";
import Signup from "./pages/Signup";
import KidSignup from "./pages/KidSignup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Partner from "./pages/Partner";
import Shop from "./pages/Shop";
import About from "./pages/About";

export default function App() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-slate-950">
        <span className="material-symbols-outlined text-primary text-6xl animate-spin">
          donut_large
        </span>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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
