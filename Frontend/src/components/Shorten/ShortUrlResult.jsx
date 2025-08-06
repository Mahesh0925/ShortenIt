import React from "react";
import { toast } from "react-toastify";


const ShortUrlResult = ({ mainUrl, shortId }) => {
  const shortUrl = `${import.meta.env.VITE_BACKEND_URL}/${shortId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy.");
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="my-4 p-4 rounded-lg bg-[#f0f2f5] border border-[#dbe0e6] shadow-sm">
      <h2 className="text-lg font-semibold text-[#111418] mb-2">
        Short URL Created
      </h2>

      <p className="text-sm text-[#60758a] mb-1">
        <span className="font-medium text-[#111418]">Original:</span> {mainUrl}
      </p>
      <p className="text-sm text-[#60758a] mb-2">
        <span className="font-medium text-[#111418]">Short:</span>{" "}
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#196ec4] hover:underline"
        >
          {shortUrl}
        </a>
      </p>

      <button
        onClick={copyToClipboard}
        className="mt-2 px-3 py-1 bg-[#248bf3] text-white rounded-md text-sm hover:bg-[#1b6ed6] active:scale-95 transition"
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default ShortUrlResult;
