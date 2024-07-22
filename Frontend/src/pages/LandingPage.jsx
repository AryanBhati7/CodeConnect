import React from "react";
import bggradient from "../assets/bg-gradient-img.png";
import heroImg from "../assets/hero-img.jpg";

function LandingPage() {
  return (
    <section className="w-full h-screen relative overflow-hidden">
      <img
        src={bggradient}
        alt="Background"
        className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
      />
      <div className="w-full h-full flex flex-col md:flex-row justify-between items-center px-4 md:px-[7rem]">
        <div className="z-10 text-center md:text-left space-y-4 max-w-md md:max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold">
            Connect with CodeCommunity
          </h1>
          <p className="text-base md:text-lg">
            Chat, Code, and have fun with your peers and enjoy this whole
            journey of coding
          </p>
        </div>
        <img
          src={heroImg}
          alt="Hero"
          className="w-3/4 md:w-1/2 lg:w-96 h-auto rounded-xl z-10 mt-8 md:mt-0"
        />
      </div>
      <div className="absolute inset-0 opacity-50"></div>{" "}
      {/*  Dark overlay to enhance text readability */}
    </section>
  );
}

export default LandingPage;
