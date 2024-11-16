import { Avatar } from "@material-tailwind/react";
import menu from '/src/assets/icons8-menu-64.png'
import React from "react";
 import { DrawerDefault } from "./Drawer";
import {
  Drawer
 
} from "@material-tailwind/react";
// import GenreDrawer from "./Drawer";
export default function Navbar() {
  const [open, setOpen] = React.useState(false);
 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
   <div className="flex items-center justify-between p-4 z-[100] w-full absolute bg-black shadow-sm shadow-blue-gray-900 ">
    <div className="flex items-center gap-2">
     <img onClick={openDrawer} src={menu} className="h-10 w-10" alt="" />
     <Drawer className=" bg-gray-900 opacity-80 p-4 " open={open} onClose={closeDrawer} >
      <DrawerDefault />
     </Drawer>
    <h1 className='text-pink-600 text-2xl font-bold cursor-pointer'>
          K-DRAMA ZONE
        </h1>
    </div>
        <div className="flex items-center gap-2" >
            <button className='bg-pink-600 px-6 rounded cursor-pointer text-white sm:px-1 py-2 sm:text-sm '>
             Log In
            </button>
            <Avatar  src="src/assets/logo.png" /> 
        </div>
   </div>
  );
}