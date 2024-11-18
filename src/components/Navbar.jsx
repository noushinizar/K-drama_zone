import { Avatar } from "@material-tailwind/react";
import menu from "/src/assets/icons8-menu-64.png";
import React from "react";
import { DrawerDefault } from "./Drawer";
import { Drawer } from "@material-tailwind/react";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute bg-black shadow-sm shadow-blue-gray-900">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <img
          onClick={openDrawer}
          src={menu}
          className="h-8 w-8 cursor-pointer sm:h-10 sm:w-10"
          alt="Menu Icon"
        />
        <Drawer
          className="bg-gray-900 opacity-80 p-4"
          open={open}
          onClose={closeDrawer}
        >
          <DrawerDefault />
        </Drawer>
        <h1 className="text-pink-600 text-xm sm:text-2xl font-bold cursor-pointer">
          K-DRAMA ZONE
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="bg-pink-600 text-sm text-white px-2 py-1 rounded-md hover:bg-pink-700 sm:text-base">
          Log In
        </button>
        <Avatar src="src/assets/logo.png" className="h-8 w-8 sm:h-10 sm:w-10" />
      </div>
    </div>
  );
}
