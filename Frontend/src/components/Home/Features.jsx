import React from "react";

const features = [
  {
    title: "Shorten your links",
    desc: "Shorten long URLs into memorable short links.",
    icon: "🔗",
  },
  {
    title: "Track your clicks",
    desc: "Track the number of clicks on your short links.",
    icon: "📈",
  },
  {
    title: "Manage your links",
    desc: "Manage all your short links in one place.",
    icon: "👥",
  },
];

export default function Features() {
  return (
    <section className="flex flex-col gap-10 px-4 py-10 @container">
      <div className="text-center">
        <h1 className="text-[32px] font-bold ">Why ShortenIt?</h1>
        <p className="text-base">
          ShortenIt is more than just a link shortener. It's a powerful tool to optimize your marketing.
        </p>
      </div>
      <div className="w-full max-w-6xl mx-auto px-4">
  <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 grid-cols-[repeat(auto-fit,minmax(158px,1fr))]">
    {features.map((feature, index) => (
      <div
        key={index}
        className="flex flex-col gap-3 p-4 border border-[#dbe0e6] bg-white rounded-xl shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md"
      >
        <div className="text-3xl text-[#248bf3]">{feature.icon}</div>
        <h2 className="text-lg font-bold text-gray-800">{feature.title}</h2>
        <p className="text-sm text-[#60758a] leading-relaxed">{feature.desc}</p>
      </div>
        ))}
      </div>
      </div>
    </section>
  );
}
