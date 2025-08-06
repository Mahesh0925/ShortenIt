import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero({homeLink, setHomeLink}) {
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/shorten')
  }


  return (
    <div>
      <div
        className="flex  min-w-[200px] min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4 rounded-4xl lg:mx-80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8mABuJH9DD_rXIuPG7BayX3LYOwbtoKBcjwxW_BqObquB4yEhpMP6kpnOVKfFT7nMh_ENOgUeM2nY9DZI6OEXhzuYanKhrDk6vJiNXxhU2L5HRen6ckZQ0o5e2usUKMwEx7ej_X2DZoY6WCYw6yM7V9izYTUe-MBKYGlshM366qQK2GeugzkiQmkLRTtsPgkvt9doEy_3RVnpghnqTRGxBK10f-8y6o7v1Z62MtHBddBJDWwg4S7MaBpUXXDNCrNzTJYJHlTriDen')",
        }}
      >
        <div className="text-center flex flex-col gap-2 sm:px-6 md:px-8 lg:px-20">
          <h1 className="text-white sm:text-4xl md:text-5xl text-4xl font-black @[480px]:text-5xl">
            Shorten your links
          </h1>
          <h2 className="text-white text-sm @[480px]:text-base sm:text-lg">
            ShortenIt allows you to shorten long links into memorable short URLs.
          </h2>
        </div>

        <form onSubmit={handleSubmit} action={"/shorten"}>
        <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
          <div className="flex w-full items-stretch rounded-lg h-full sm:flex-row ">
            <input
              placeholder="Paste a long link here"
              value={homeLink}
              onChange={(e)=>setHomeLink(e.target.value)}
              className="form-input flex-1 h-full  px-2 border-y border-[#dbe0e6] placeholder:text-[#60758a] bg-white rounded-l-md sm:text-base"
            />
            <button type="submit" className="h-full px-4 bg-[#248bf3] text-white text-sm font-bold rounded-r-lg">
              Shorten It!
            </button>
          </div>
        </label>
        </form>
      </div>
    </div>
  );  
}
