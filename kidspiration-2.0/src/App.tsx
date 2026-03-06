import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { KidsProvider } from "./context/KidsContext";
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
import ReadHttn from "./pages/ReadHttn";
import ImpactStories from "./pages/ImpactStories";
import KidsDashboard from "./pages/KidsDashboard";
import GameShell from "./components/kids-page/games/GameShell";
import RewardShopPage from "./components/kids-page/RewardShopPage";

// Local assets to preload
import heroImg from "./assets/kidspiration-1.png";
import healingImg from "./assets/HSLHS_MARCH_2026.jpg";
import logoImg from "./assets/kidspiration-logo.png";
import partner from "./assets/real-images/live-11.jpg";
import mentor from "./assets/real-images/live-6.jpg";
import community from "./assets/real-images/live-4.jpg";

// Critical above-the-fold images (local + external)
const CRITICAL_IMAGES = [
  heroImg,
  healingImg,
  logoImg,
  // Partner hero
  partner,
  // AuthLayout default images
  mentor,
  community,
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
        <Route path="/read-httn4kids" element={<ReadHttn />} />
        <Route path="/live" element={<Live />} />
        <Route path="/4ps" element={<FourPs />} />
        <Route path="/stories" element={<ImpactStories />} />
        <Route
          path="/kids"
          element={
            <KidsProvider>
              <KidsDashboard />
            </KidsProvider>
          }
        />
        <Route
          path="/kids/game/:gameId"
          element={
            <KidsProvider>
              <GameShell />
            </KidsProvider>
          }
        />
        <Route
          path="/kids/rewards"
          element={
            <KidsProvider>
              <RewardShopPage />
            </KidsProvider>
          }
        />
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
