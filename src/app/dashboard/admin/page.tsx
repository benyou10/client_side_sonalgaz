"use client"
import DevicesList from '@/components/components/AddUser'
import AttendenceRecords from '@/components/components/AddDevice'
import React, { useEffect, useState } from 'react'
import AddDevices from '@/components/components/AddDevice'
import { useSession } from 'next-auth/react'
import { error } from 'console'

const page = () => {
  
  const {data:session, loading:loadingg} = useSession();

  return (
    <div>
{session  && session?.user?.image !="employee_default" ? <AddDevices /> :<div className='text-5xl text-center'>you dont have access to this page</div> }


    </div>
  )
}

export default page