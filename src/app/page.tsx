"use client";

import LoginPopUp from "@/component/PopUp/loginPopUp";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function Home() {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const appElement = document.getElementById("__next") || document.body;
    Modal.setAppElement(appElement);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={() => setShowLogin(true)}>Login</button>

      {/* Login Modal */}
      <LoginPopUp open={showLogin} setClose={() => setShowLogin(false)} />
    </div>
  );
}
