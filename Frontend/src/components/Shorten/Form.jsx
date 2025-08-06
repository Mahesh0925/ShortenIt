import React, { useContext, useState } from "react";
import api from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const Form = ({ homeLink, setMainUrl,setShortId }) => {
  const {user} = useContext(AuthContext);

  const [originalUrl, setOriginalUrl] = useState(homeLink);
  const [customUrl, setCustomUrl] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      if(user){
      const res = await api.post("/short-url",{
        originalUrl,
        customUrl,
      });
      toast.success(res.data.message)
      setShortId(res.data.shortId);
      setMainUrl(originalUrl);
      setOriginalUrl("");
      setCustomUrl("")
    }else{
      toast.error("Login Required")
    }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center md:mx-24  lg:mx-30 w-3xl">
          <h1 className="text-[#111418] font-bold text-[28px] leading-tight pb-3 pt-5 ">
            Shorten your Link
          </h1>

          <input
            type="text"
            value={originalUrl}
            onChange={(e)=>setOriginalUrl(e.target.value)}
            required
            placeholder="Paste the link here"
            className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60758a] p-4 text-base font-normal leading-normal my-3"
          />
          <input
            type="text"
            value={customUrl}
            onChange={(e)=>setCustomUrl(e.target.value)}
            placeholder="Custom alias(optional)"
            className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60758a] p-4 text-base font-normal leading-normal my-3"
          />

          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#248bf3] text-white text-sm font-bold leading-normal tracking-[0.015em] active:scale-95 transition">
            <span className="truncate">Shorten</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
