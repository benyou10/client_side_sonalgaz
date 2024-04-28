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
{session  && session.user.image ==1 ? <AddDevices /> :<div className='text-5xl text-center'>u dont have access to this page</div> }


    </div>
  )
}

export default page