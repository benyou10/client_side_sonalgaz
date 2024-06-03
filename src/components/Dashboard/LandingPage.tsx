'use client'
import { useLayoutEffect, useState } from "react";
import Image from "../../../node_modules/next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Router, useRouter } from "next/router";
import { redirect } from "next/navigation";
export default   function LandingPage(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const { data: session, status } = useSession();

  if(session){
  
    redirect('/dashboard')
  
        
     
       
     }


const onsubmit =async (e:React.FormEvent)=>{
  toast.loading("loging in .....",{duration:1000})

e.preventDefault();
const login = await signIn('credentials',{
 redirect:false,
  email,password
})
if (login?.ok){
  
  toast.success("succesfull login ");
  
}else{
  if(login?.error =="CredentialsSignin")
  toast.error("ur id number or password are incorrect");
  else{
    toast.error("network problem, check ur problem");

  }
}

}
    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-sky-400 font-extrabold text-5xl text-center">Sonalgaz</h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onsubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                id number
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  minLength={8} 
                  required
                  onChange={(e) => setEmail(e.target.value)} 
                  className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  minLength={8} 
                  required
                  onChange={(e) => setPassword(e.target.value)} 
                  className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button 
              
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button >
            </div>
          </form>
         
        </div>
      </div>
      
    )
}