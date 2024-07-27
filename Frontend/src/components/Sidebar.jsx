import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Folder, Home, Users } from "lucide-react";
import { Logo } from ".";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white text-black px-4 ${
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

      <Link to="/profile" className="flex items-center hover:bg-gray-400">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {isExpanded && <span className="ml-2">Profile</span>}
      </Link>
    </div>
  );
}

export default Sidebar;
