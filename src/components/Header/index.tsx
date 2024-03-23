import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import Sidebar, { SidebarWithBurgerMenu } from "../Sidebar/index";

const Header = () => {
  return (<div className="bg-white shadow">
  <div className="container mx-auto px-4  z-index-999999999  ">
    <div className="flex items-center justify-between py-4  ">
      <div>
      </div>
      <div></div>
      <div className=" sm:flex sm:items-center">
       
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
