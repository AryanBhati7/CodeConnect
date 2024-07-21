import React from "react";
import bggradient from "../assets/bg-gradient-img.png";

function LandingPage() {
  return (
    <img
      src={bggradient}
      alt="bg-img"
      className="absolute left-0 top-0 w-84 h-84 z-[-15]"
    />
  );
}

export default LandingPage;
