'use client'
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import  { SidebarWithBurgerMenu } from "../Sidebar/index";
import {  signOut } from "next-auth/react";
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { BarsArrowDownIcon, TvIcon } from "@heroicons/react/24/solid";
import { CogIcon } from "@heroicons/react/16/solid";
 function Header(){
  const [sidebarOpen,setSidebarOpen]=useState(false)

  return (<div className="bg-white shadow">
  <div className="container mx-auto px-4  z-index-999999999  ">
    <div className="flex items-center justify-between py-4  ">
      <div>
        <button className="w-10 h-10" onClick={()=> setSidebarOpen(!sidebarOpen)}><BarsArrowDownIcon/></button>
        <SidebarWithBurgerMenu setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
      </div>
      <div>
        <Image width={70} height={0} src='/sonelgaz.png' alt="logo" />
      </div>
      <div className=" sm:flex sm:items-center">
       <Link href='/api/auth/signout'
                 className="text-black text-sm font-bold border mr-2 px-4 py-2 rounded-lg hover:text-orange-600 hover:border-orange-600"

        onClick={e => {e.preventDefault()
          
       signOut()}}
      > SignOut
       </Link>
        <Link
          href="#"
          className="text-black text-sm font-bold border px-4 py-2 rounded-lg hover:text-orange-600 hover:border-orange-600"
        >
          Contact us
        </Link>
      </div>
  
    </div>
   
  </div>
</div>

  );
};

export default Header;
