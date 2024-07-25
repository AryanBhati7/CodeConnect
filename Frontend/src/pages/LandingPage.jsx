import React from "react";
import bggradient from "../assets/bg-gradient-img.png";
import heroImg from "../assets/hero-img.jpg";
import Header from "@/components/Header";

function LandingPage() {
  return (
    <div className="flex flex-col gap-0">
      <Header />

      <section className="w-full h-screen relative overflow-hidden flex items-center">
        {/* <img
          src={bggradient}
          alt="Background"
          className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
        /> */}
        <div className="w-full h-full flex flex-col md:flex-row flex-wrap justify-center items-center px-6 md:px-12 lg:px-24 py-12">
          <div className="z-10 w-full flex flex-col justify-center items-center md:w-1/2 text-center md:text-left space-y-6 max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold">
              Connect with CodeCommunity
            </h1>
            <p className="text-base md:text-lg">
              Chat, Code, and have fun with your peers and enjoy this whole
              journey of coding
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
            <img
              src={heroImg}
              alt="Hero"
              className="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
        {/* <div className="absolute inset-0 opacity-50"></div>{" "} */}
        {/*  Dark overlay to enhance text readability */}
      </section>
    </div>
  );
}

export default LandingPage;
