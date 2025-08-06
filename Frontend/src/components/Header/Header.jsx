import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AuthModal from "../Authmodal/AuthModal";
import { useContext } from "react";
import { useRef } from "react";

export default function Header({ openAuthModal }) {
  const [isSticky, setIsSticky] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [authType, setAuthType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`flex items-center justify-between border-b border-[#f0f2f5] px-10 py-3 ${
        isSticky ? "fixed top-0 w-full bg-white z-50 shadow" : ""
      }`}
    >
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold tracking-[-0.015em]">ShortenIt</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          <Link className="text-sm font-medium" to="/">
            Home
          </Link>
          <Link className="text-sm font-medium" to="/shorten">
            Shorten
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex gap-2 items-center">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-[#f0f2f5] px-4 py-2 rounded-lg text-sm font-semibold text-[#111418]"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center uppercase">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
                {user?.username}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  openAuthModal("signup");
                  setAuthType("signup");
                }}
                className="h-10 px-4 bg-[#248bf3] text-white text-sm font-bold rounded-lg"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  openAuthModal("login");
                  setAuthType("login");
                }}
                className="h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold rounded-lg"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Auth modal */}
        {authType && (
          <AuthModal type={authType} closeModal={() => setAuthType(null)} />
        )}
      </div>
    </header>
  );
}
