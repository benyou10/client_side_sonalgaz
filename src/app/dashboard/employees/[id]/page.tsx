'use client'
import Calendar from '@/components/Calender'
import AttendenceRecords from '@/components/components/attendenceList';
import Record from '@/components/components/record';
import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState,Fragment } from 'react'
import { redirect } from 'next/navigation'
import { Dialog, Transition } from "@headlessui/react";
import { Toaster } from 'react-hot-toast';

const Page = ({ params }) => {
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users/" + params.id;
    const USER2_API_BASE_URL = "http://localhost:8080/api/v1/users/" + params.id+ "/timeoff";

    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
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
      function closeModal() {
        setIsOpen(false);
      }
    
      function openModal() {
        setIsOpen(true);
      }
      const saveUser = async (e) => {
        e.preventDefault();
        console.log("User Data:", user); // Log user data for debugging
        const response = await fetch(USER_API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const _user = await response.json();
        setResponseUser(_user);
        reset(e);
      };
      const reset = (e) => {
        e.preventDefault();
        setTimeOff({
          id: "",
          startDate:"",
          experationDate: "",
          name:"",
          employee:""
    
        });
        setIsOpen(false);
      };    
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
    }, [params.id]); 
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
  }, [params.id]); 
    // Fetch data when params.id changes
    const handleClick = async () => {
      setLoading(true);
     
  
      try {
        const response = await fetch("http://localhost:8080/api/v1/users/" +params.id+ "/rc", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
          
        });
  
        if (!response.ok) {
          throw new Error('Failed to update RC');
        }
 
        const data = await response.json();
        console.log('New RC:', data.newRc);
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
       // Handle the new RC value as needed
      } catch (err) {
       
      } finally {
        setLoading(false);
      }
     
    };
     
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
          <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  Add a time off 
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                  
                  <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        time off
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={timeOff.name}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                  
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                       start day
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={timeOff.startDate}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                       experation date
                      </label>
                      <input
                        type="date"
                        name="experationDate"
                        value={timeOff.experationDate}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                   
                   
                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={saveUser}
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                        Save
                      </button>
                      <button
                        onClick={reset}
                        className="rounded text-white font-semibold bg-red hover:bg-red-700 py-2 px-6">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
          <div className='bg-white m-4'>
            <table>
              <th></th>
              <th></th>
              <th></th>
              <td className='px-10'>
              <h1 className='p-4'>Name: {user.firstName} {user.lastName}</h1>
    <h1 className='p-4'>Role: {user?.role_id}</h1>
    <h1 className='p-4'>RC: {user?.rc} </h1>
    <h1 >Email :{user?.email}</h1>
   <h1 >phone number :{user?.phoneNumber}</h1>
   <h1 >id number :{user?.matricule}</h1>

              </td>
              <td className='px-10'>
              <h1 className='p-4'>CP: {user?.cp} </h1>
              {timeOff.name ? (<div><h1 className='p-4'>conge :{timeOff.name}</h1><h1 className='p-4'>experation date : {timeOff.experationDate}</h1></div>): (<h1 className='p-4'>Conge: none </h1>)}
   
    <h1 className='p-4'>total tardiness over the last 30 days : 00:00:00</h1>
    <h1 className='p-4'>total abscents over the last 30 days : 0</h1>

              </td>
              <td className='px-10'>
              <button onClick={handleClick} className="rounded bg-slate-600 text-white p-2 my-3  font-semibold">Add <span> RC</span></button>
              <h1></h1>
   {timeOff.name ? (<h1></h1>) :(<button   onClick={openModal} className="rounded bg-slate-600 text-white p-2  font-semibold">Add Time Off</button>)}
   <h1></h1>
   
              </td>
              
            </table>
    
  
</div>

            
            <div className="container mx-auto my-8">

<div className="flex shadow border-b">
  <table className="min-w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        Attendence day 
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        Morning Arrival
        </th>
        
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        Morning Departure
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        Midday Arrival
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        day Departure
        </th>
       
        <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
          attendence_state
        </th>
        <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
          change attendence_state
        </th>
      </tr>
    </thead>
    <Toaster position="top-center" />
    {!loading && (
      <tbody className="bg-white">
        {Array.isArray(user.archives) ? (
    user.archives.map((archive) => (
      <Record
        user={archive}
        key={archive.id}
        id={params.id}
      />
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center">No records found</td>
    </tr>
  )}
      </tbody>
    )}

  </table>
</div>
</div>
        </div>
    );
}

export default Page;
