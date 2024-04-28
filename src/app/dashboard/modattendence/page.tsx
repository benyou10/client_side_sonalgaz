'use client'
import React from 'react'
import { useState } from "react";
import ModAttendenceRecords from'@/components/components/modAttendenceList'

export default function Page() {
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
  return(
    <div>
<ModAttendenceRecords  user={responseUser}/>

    </div>
  )
}
