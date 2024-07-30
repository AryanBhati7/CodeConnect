import React from "react";
import { useSelector } from "react-redux";
import { LandingPage } from ".";
import { Sidebar } from "@/components";
import { Outlet } from "react-router-dom";
import bodybg from "../assets/body-background.png";

function Home() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  // const authStatus = true;
  if (!authStatus) {
    return <LandingPage />;
  }
  return (
    <main
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${bodybg})`,
        backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Sidebar />
      <div className="">
        <Outlet />
      </div>
    </main>
  );
}

export default Home;
