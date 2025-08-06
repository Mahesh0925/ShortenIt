import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center">
      <div className="max-w-[960px] w-full flex flex-col gap-6 px-5 py-10 text-center">
        <div className="flex flex-wrap justify-center gap-6 @[480px]:justify-around">
          {["About", "Contact", "Terms of Service", "Privacy Policy"].map((item) => (
            <a key={item} href="#" className="text-[#60758a] text-base">
              {item}
            </a>
          ))}
        </div>
        <p className="text-[#60758a] text-base">@2024 ShortenIt. All rights reserved.</p>
      </div>
    </footer>
  );
}
