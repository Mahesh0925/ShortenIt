import React from "react";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";


const Home = ({homeLink, setHomeLink}) => {
  return (
    <>
          <div className="mx-5 my-2">
          <Hero homeLink={homeLink} setHomeLink={setHomeLink} />
          <Features />
          </div>

    </>
  );
};

export default Home;
