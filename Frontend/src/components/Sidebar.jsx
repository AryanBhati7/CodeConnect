import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Folder,
  Home,
  LogOutIcon,
  Users,
} from "lucide-react";
import { Logo } from ".";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/auth.hook.js";
import { logout as logoutSlice } from "@/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { mutateAsync: logout, isPending } = useLogout();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.user);

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <Folder />,
    },
    {
      name: "Spaces",
      path: "/spaces",
      icon: <Users />,
    },
  ];

  const closeSidebar = () => {
    setIsExpanded(false);
  };

  const openSidebar = () => {
    setIsExpanded(true);
  };

  const handleLogout = async () => {
    const res = await logout();
    console.log(res, "Logout response");
    if (res?.success) {
      dispatch(logoutSlice());
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen py-3 bg-white text-black px-4 ${
        isExpanded ? "w-64" : "w-[4.5rem]"
      } transition-all duration-300 flex flex-col justify-between`}
      onMouseLeave={closeSidebar}
      onMouseEnter={openSidebar}
    >
      <div>
        <div className="w-full flex justify-between items-center gap-4">
          {isExpanded && <Logo />}

          <button className="p-2 focus:outline-none hover:bg-gray-400">
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <ul className="mt-4">
          {sidebarItems.map((item) => (
            <li key={item.name} className="p-2 hover:bg-gray-400 w-full">
              <Link to={item.path} className="flex items-center">
                <span className="mr-2">{item.icon}</span>
                {isExpanded && <span className="flex-1">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Link to="/profile" className="flex items-center hover:bg-gray-400">
          <Avatar>
            <AvatarImage src={userData?.avatar?.url} />
            <AvatarFallback>{userData?.name}</AvatarFallback>
          </Avatar>
          {isExpanded && <span className="ml-2">{userData?.name}</span>}
        </Link>
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={handleLogout}
        >
          <LogOutIcon />
          {isExpanded && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
