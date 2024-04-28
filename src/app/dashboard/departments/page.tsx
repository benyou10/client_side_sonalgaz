'use client'
import React from 'react'
import AddDepartment from "@/components/components/AddDepartment";
import { useSession } from 'next-auth/react';
const page = () => {
  const {data:session, loading:loadingg} = useSession();

  return (
    <div>
              {session  && session.user.image ==1 ? <AddDepartment/>:<div className='text-5xl text-center'>u dont have access to this page</div> }

        
    </div>
  )
}

export default page