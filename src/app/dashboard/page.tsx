
import AddUser from "@/components/components/AddUser";
import Navbar from "@/components/components/Navbar";

import UserList from "@/components/components/UserList";
import ECommerce from "@/components/Dashboard/E-commerce";
import { getServerSession } from "next-auth";
import { Console } from "console";
import { authOptions } from "../api/auth/[...nextauth]/route";
import * as Frigade from '@frigade/react';


export default function Home() {
 
  return (
    

      <main >
          <Frigade.Announcement
      flowId="flow_3KSQcjwW"
      dismissible={true} 
    />
     <ECommerce/>
     
      
     </main>
  
  );
}
