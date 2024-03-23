'use client'
import { SessionProvider } from 'next-auth/react'
import React, { Children } from 'react'

const NextAuthSessionprovider = ({Children}) => {
  return (
    
   <SessionProvider>
    {Children}
   </SessionProvider>
 
  )
}

export default NextAuthSessionprovider