"use client";
import React, { useEffect, useState } from "react";



import { useSession } from "next-auth/react";
import * as Frigade from '@frigade/react';
import Record from "@/components/components/record";
import ListRecord from "@/components/components/ModRecord";



const ECommerce: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {data:session, loadingg} = useSession();
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users/" +session?.user?.name?.id;
  const USER2_API_BASE_URL = "http://localhost:8080/api/v1/users/" + session?.user?.name?.id+ "/timeoff";

  const [timeOff, setTimeOff] = useState({
    id: "",
    startDate:"",
    experationDate: "",
    name:"",
    employee:""
    
  });
  const [responseTimeOff, setResponseTimeOff] = useState({
    id: "",
    startDate:"",
    experationDate: "",
    name:"",
    employee:""
  
  });
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(USER2_API_BASE_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const userData = await response.json();
            setTimeOff(userData);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    fetchData();
}, [session?.user?.name?.id]); 
    
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        matricule: "",
        birthday:"",
        role:"",
        department:"",
        archives:""
      });
      const [responseUser, setResponseUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        matricule: "",
        birthday:"",
        role:"",
        department:"",
        archives:""
      
      });

  
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(USER_API_BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [session?.user?.name?.id]); 
  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array means this effect runs only once, after the initial render

  return (
    <>
     
      <div className="rounded-xl border flex justify-between   border-stroke bg-white px-7.5 py-2 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark-2">
        <div>
          <h1>good morning</h1>
          <div className="font-extrabold text-xl"></div>
          <h1 className="font-semibold" >{session && !loading && `${session.user.image} : ${session.user.name.user}    ${session.user.email} `}</h1>
<h1>{session && !loading && `   RC : ${user?.rc},  CP : ${user?.cp},  `}</h1>
{timeOff.name ? (<div><h1 >conge :{timeOff.name}</h1><h1 >experation date : {timeOff.experationDate}</h1></div>): ("")}
   
   <h1 >Email :{user?.email}</h1>
   <h1 >phone number :{user?.phoneNumber}</h1>
   <h1 >total tardiness over the last 30 days : 00:00:00</h1>
   <h1 >total abscnetns over the last 30 days : 1</h1>

           </div>
       
        </div> 
        <Frigade.Announcement
      flowId="my-flow-id"
    />
 
        <div className="container mx-auto my-8">

<div className="flex shadow border-b">
  <table className="min-w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        Attendence day 
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
          morning attendence
        </th>
        
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        morning leaving
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        mid day attendence
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        mid day leaving
        </th>
       
        <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
          attendence_state
        </th>
      </tr>
    </thead>
    {!loading && (
      <tbody className="bg-white">
         {Array.isArray(user.archives) && user.archives?.map((user) => (
          <ListRecord
            user={user}
            key={user.id}
         
          
          />
        ))}
      </tbody>
    )}

  </table>
</div>
</div>
 
 




      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      
        
    
          
 
        
      
      </div>
    </>
  );
};

export default ECommerce;
