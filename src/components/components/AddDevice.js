import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment, useState } from "react";
import UserList from "./UserList";
import DevicesList from "./DevicesList"


const AddDevices = () => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/devices";

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    deviceName:"",
    ip_address:"",
    port:"",
    password:"",
    connection_State	:"NOT_CONNECTED",
 
  });
  const [responseUser, setResponseUser] = useState({
    id: "",
    deviceName:"",
    ip_address: "",
    port: "",
    password:"",
    connection_State	:"NOT_CONNECTED",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };
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
    setUser({
      id: "",
      deviceName:"",
        ip_address:"",
        port:"",
        password:"",
        connection_State	:"NOT_CONNECTED",

    });
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="h-12">
          <button
            onClick={openModal}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold">
            Add Device
          </button>
        </div>
      </div>
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
                  Add new User
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                  
                  <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        name the device
                      </label>
                      <input
                        type="text"
                        name="deviceName"
                        value={user.deviceName}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                  
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        ip_address
                      </label>
                      <input
                        type="text"
                        name="ip_address"
                        value={user.ip_address}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        port
                      </label>
                      <input
                        type="text"
                        name="port"
                        value={user.port}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        password
                      </label>
                      <input
                        type="text"
                        name="password"
                        value={user.password}
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
      <DevicesList user={responseUser} />
      
    </>
  );
};

export default AddDevices;
