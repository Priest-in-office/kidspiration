import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Home from "./pages/Home";
import SignupChooser from "./pages/SignupChooser";
import Signup from "./pages/Signup";
import KidSignup from "./pages/KidSignup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Partner from "./pages/Partner";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Live from "./pages/Live";
import FourPs from "./pages/FourPs";
import { useImagePreloader } from "./hooks/useImagePreloader";

// Local assets to preload
import heroImg from "./assets/kidspiration-1.png";
import healingImg from "./assets/HSLHS_MARCH_2026.jpg";
import logoImg from "./assets/kidspiration-logo.png";

// Critical above-the-fold images (local + external)
const CRITICAL_IMAGES = [
  heroImg,
  healingImg,
  logoImg,
  // Partner hero
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3NwV8y3TqaArywz6n-MLB5czAFfD5_Gm3PunJODY_VWzd582IsnjE424fjxnM4HEe-z0yOPzUu6pWZntPpAgckbyrVtxPP__H4WF8Zf7nF62n4mtF54xq5hhdIOa7YRuvzmMp6OA9a2TkuxMZF7KQcOT_qpXDUNrdOHZRfaKkvnHDofaBgZ_bDKh_qOGZbNgzZy0JcaFsTrziSVNZpuBymotul7OP06PF8P6Y1fzV24TgvBQ2icE_zvlb4ytzWR9g0jCf2Vjv5TFw",
  // AuthLayout default images
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwzM2E0NPaDruD5nBcsQwdYwwCp4P4ljeorYwLU3A-5fHVXnazbjjp4vhsdvUE9eHvbjSYfIrPHHlyllT98QX9czMZ9o_3P3ednJ2UhDdaWzKY9QS_CxphhyanBBWgqwfeaKK6WQfcMaqjEpxsH_2KV02hH3cBo3lmA6Ewq14mj-7xMChIkY-0wOtoZx5hcuDqv0TYGWCHw6gPgqhJdQMz96IPducISeH38O1nKDfoC4xZXiET2W2y7N2OE2iITtfEQT9cX-7Bk6dV",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDNDQ7YPazIUD5AzN3KgHZPRFct_CFs2rMvsFchcCqMPxX2QkAim53iqt8tukvmTzVMMRCeClPTtFThk660ukFmiYg7hHC3tNBwPCk19fPpx24yrZL-1eiBkZIto7jBkGWosKxfFh3lux9olUQuUwnqkxJN5aJHYWcJPnUZIFCYzjbBffUtjP6Q_XSjoQ_X0yatZoVi4wNflk9VwNeFM3qcgJ9i9kh9NT3JWCVvbCttgoxMEyHBfE2ZdF35M4Rj3ItioBEWc2tDZ1_2",
];

export default function App() {
  const stableUrls = useMemo(() => CRITICAL_IMAGES, []);
  const imagesReady = useImagePreloader(stableUrls);

  // Ensure minimum 1s display so the spinner doesn't flash
  const [minTimePassed, setMinTimePassed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const pageLoading = !imagesReady || !minTimePassed;

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
        <Route path="/live" element={<Live />} />
        <Route path="/4ps" element={<FourPs />} />
        <Route path="/about" element={<About />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/partner/donate" element={<Donate />} />
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
