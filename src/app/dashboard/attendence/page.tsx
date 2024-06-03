"use client";
import AddUser from "@/components/components/AddUser";
import Navbar from "@/components/components/Navbar";
import AttendenceRecords from "@/components/components/attendenceList";

import UserList from "@/components/components/attendenceList";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function Home() {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    matricule: "",
    birthday:"",
    role:"",
    department:""
  });
  const [responseUser, setResponseUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    matricule: "",
    birthday:"",
    role:"",
    department:""
  });
  const {data:session, loadingg} = useSession();

  return (
   
    
    
      <main >
        
     
        {session  && session.user.image != "employee_default" ? <AttendenceRecords user={responseUser} /> :<div className='text-5xl text-center'>u dont have access to this page</div> }

      
      
      
     </main>
  
  );
}
