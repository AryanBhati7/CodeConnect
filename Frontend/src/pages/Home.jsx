import React from "react";
import { useSelector } from "react-redux";
import { LandingPage } from ".";
import { Sidebar } from "@/components";
import { Outlet } from "react-router-dom";

function Home() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  // const authStatus = true;
  if (!authStatus) {
    return <LandingPage />;
  }
  return (
    <main className="flex justify-center items-center">
      <Sidebar />
      <div className="">
        <Outlet />
      </div>
    </main>
  );
}

export default Home;
