import React, { useState } from "react";
import Header from "./components/Header/Header";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Shorten from "./Page/Shorten";
import Dashboard from "./Page/Dashboard";
import Footer from "./components/Header/Footer";
import AuthModal from "./components/Authmodal/Authmodal";
import { ToastContainer, Slide } from "react-toastify";

function App() {
  const [homeLink, setHomeLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col"
        style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
      >
        <Header openAuthModal={openAuthModal} />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<Home homeLink={homeLink} setHomeLink={setHomeLink} />}
            />
            <Route path="/shorten" element={<Shorten homeLink={homeLink} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <AuthModal
          isOpen={isModalOpen}
          onClose={closeAuthModal}
          mode={authMode}
        />

        {/* Toastify */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
      </div>
    </>
  );
}

export default App;
