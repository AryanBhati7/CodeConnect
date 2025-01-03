import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../components/ModeToggle.jsx";

function Header() {
  return (
    <div className="container sticky top-0 z-sticky z-[24] ">
      <div className="flex flex-wrap ">
        <div className="w-full max-w-full px-3 flex-0">
          <nav className="z-30 flex flex-wrap items-center px-4 py-2 m-6 mb-0 shadow-sm rounded-xl  backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start">
            <div className="flex items-center w-full p-0 px-6 mx-auto flex-wrap-inherit">
              <Link
                to="/"
                className="py-1.75 flex-1 text-3xl mr-4 ml-4 flex justify-center items-center whitespace-nowrap font-bold lg:ml-0"
              >
                CodeConnect
              </Link>

              <div className="items-center  transition-all duration-500 lg-max:overflow-hidden ease lg-max:max-h-0 basis-full lg:flex lg:basis-auto">
                <ul className="flex pl-0 mb-0 list-none">
                  <li>
                    <Link
                      to="/auth/check-email"
                      className="inline-block px-8 py-3 mb-0 mr-1 font-bold leading-normal text-center align-middle transition-all ease-in bg-purple-800 border-0 rounded-lg shadow-md cursor-pointer hover:-translate-y-px hover:shadow-xs active:opacity-85 text-xs tracking-tight-rem"
                    >
                      Join Now
                    </Link>
                  </li>
                  <li>
                    <ModeToggle />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
