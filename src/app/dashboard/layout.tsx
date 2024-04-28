import Header from "@/components/Header"
import nextAuth, { getServerSession } from "next-auth"
import nextAppLoader from "next/dist/build/webpack/loaders/next-app-loader"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"

 
export default function Layout({ children }:any) {
  return (

    <>
     <Header/>
     <div className="dark:bg-black-2 dark:text-bodydark">
      <main>{children}</main></div>
      
    </>
  )
}