"use client";

// Library Imports
import { useEffect, useState } from "react";

// Custom Imports
import LoginPopUp from "@/component/PopUp/loginPopUp";

const Home = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center bg-black">
      <button
        className="bg-[#2bb8a4] text-4xl py-4 px-6 rounded-lg text-white font-semibold hover:bg-[#2bb8a4] hover:shadow-lg hover:scale-105 hover:shadow-black/20 transition-colors duration-200 disabled:bg-[#7A7676] disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>

      {/* Login Modal */}
      <LoginPopUp open={showLogin} setClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Home;
