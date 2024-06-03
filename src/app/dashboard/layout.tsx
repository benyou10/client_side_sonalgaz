import Header from "@/components/Header"
import nextAuth, { getServerSession } from "next-auth"
import nextAppLoader from "next/dist/build/webpack/loaders/next-app-loader"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
import * as Frigade from '@frigade/react';
 
export default function Layout({ children }:any) {
  return (

    <>
    <Frigade.Provider
      apiKey="api_public_ORa4Q2PtCoG8oD689Am8nmh0BmKFEF6nypre8D25RF2n72GYKh4zrwrVndrYlasJ"
      userId="my-user-id">
    
     <Header/>
     <div className="dark:bg-black-2 dark:text-bodydark">
      <main>{children}</main></div>
      </Frigade.Provider>
    </>
  )
}