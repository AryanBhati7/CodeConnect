import React from "react";
import { useSelector } from "react-redux";
import { LandingPage } from ".";

function Home() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  if (!authStatus) {
    return <LandingPage />;
  }
  return <div>Home</div>;
}

export default Home;
