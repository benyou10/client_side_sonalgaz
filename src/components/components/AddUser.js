import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import UserList from "./UserList";
import DepartmentOptions from "./departmentOptions"
import { userInfo } from "os";
const AddUser = () => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
  const saveindevice = "http://localhost:8080/api/v1/users/saveindevice";

  const [departments, setDepartments] = useState(null);
  const [device, setDevice] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDevice, setIsOpenDevice] = useState(false);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    matricule: "",
    birthday:"",
    role_id:"",
    department_id:"",
    email:"",
    phoneNumber:""
  });
  const [responseUser, setResponseUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    matricule: "",
    birthday:"",
    role_id:"",
    DepartmentEntity:"",
    email:"",
    phoneNumber:""
  });
  const [userInDeviceInfo, setuserInDeviceInfo] = useState({
    uid:"",
    role:0,
    password:"",
    name: "",
    cardno:"",
    userid: "",
    groupNumber:"",
    userTimeZoneFlag:"",
    timeZone1:"",
    timeZone2:"",
    timeZone3:"",
    enabled:""
    
    
  
  });
  const [responseUserInfo, setResponseUserInfo] = useState({
    uid:"",
    role:0,
    password:"",
    name: "",
    cardno:"",
    userid: "",
    groupNumber:"",
    userTimeZoneFlag:"",
    timeZone1:"",
    timeZone2:"",
    timeZone3:"",
    enabled:""
    
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModalDevice() {
    setIsOpenDevice(false);
  }

  function openModalDevice() {
    setIsOpenDevice(true);
  }
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setUser(user => ({
      ...user,
      [name]: name === 'department_id' ? JSON.parse(value) : value
    }));
  };
  const handleDeviceChange = (event) => {
    const { name, value } = event.target;
    setuserInDeviceInfo((userInDeviceInfo) => ({
      ...userInDeviceInfo,
      [name]: value,
    }));
  };

  const saveUser = async (e) => {
    console.log(user)
    e.preventDefault();
    console.log(user)
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
  const saveUserinDevice = async (e) => {
    console.log(userInDeviceInfo)
    e.preventDefault();
    console.log(userInDeviceInfo)
    const response = await fetch(saveindevice, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInDeviceInfo),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    
    reset(e);
  };

  const reset = (e) => {
    e.preventDefault();
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      matricule: "",
      birthday:"",
      role_id:"",
      department_id:"",
      email:"",
      phoneNumber:""

    });
    setIsOpen(false);
    setIsOpenDevice(false);
  };
  const resetDeviceInfo = (e) => {
    e.preventDefault();
    setUser({
      user_id: "",
      name: "",
      UserRoleEnum: "",
    });
    setIsOpen(false);
    setIsOpenDevice(false);
  };
  const department_API_BASE_URL = "http://localhost:8080/api/v1/department";
  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(department_API_BASE_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const departments = await response.json();
          setDepartments(departments);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    },[user,responseUser]);
    const device_API_BASE_URL = "http://localhost:8080/api/v1/devices";
  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(device_API_BASE_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const device = await response.json();
          setDevice(device);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    },[user,responseUser]);
    const [isDisabled, setIsDisabled] = useState(true);

    // Function to toggle the disabled state
    const toggleDisabled = () => {
      setIsDisabled(!isDisabled);
    };
  return (
    <>
      <div className="container mx-auto my-8">
        <div className="h-12">
          <button
            onClick={openModal}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold">
            Add Employee  to DataBase
          </button>
          <button
            onClick={openModalDevice}
            className="rounded mx-5 bg-slate-600 text-white px-6 py-2 font-semibold">
            Add Employee device
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
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        id number
                      </label>
                      <input
                        type="password"
                        name="matricule"
                        value={user.matricule}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        birthday
                      </label>
                      <input
                        type="date"
                        name="birthday"
                        value={user.birthday}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        phone number
                      </label>
                      <input
                        type="number"
                        required
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Role
                      </label>
                     <select required value={user.role_id} onChange={(e) => handleChange(e)}  className="h-10 w-96 border mt-2 px-2 py-2" name='role_id' >
                      <option value='chef_structure'>
                      chef_structure
                      </option>
                      <option value='admin'>
                      admin
                      </option>
                      <option value='employee_default'>
                      employee_default
                      </option>
                      <option>
                      hr
                      </option>
                     </select>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Department
                      </label>
                      <select required
  onChange={(e) => handleChange(e)}
  value={JSON.stringify(user.department_id)}
  className="h-10 w-96 border mt-2 px-2 py-2"
  name="department_id"
>
  {departments?.map((department) => (
    <option
      value={JSON.stringify({
        id: department.id,
        department_name: department.department_name
      })}
      key={department.id}
    >
      {department.department_name}
    </option>
  ))}
</select>


      
                    </div>
                    
               
                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={saveUser}
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                        Save
                      </button>
                   
                    </div>
                  
                    
                    <div className="h-14 my-4">
                   
                   {//   <select className="h-10 w-96 border mt-2 px-2 py-2" name="device" >
      //      
       //     {device?.map((user) => (
       //         <option value={user.id}className={`${isDisabled ? ' opacity-30 cursor-not-allowed' : ''}`}  key={user.id}>{user.deviceName}</option>
       //         ))}
            
     //   </select>
    }
      
                    </div>
                  
                    <button
                        onClick={reset}
                        className="rounded text-white font-semibold bg-red hover:bg-red-700 py-2 px-6">
                        Close
                      </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isOpenDevice} as={Fragment}>
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
                        name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userInDeviceInfo.name}
                        onChange={(e) => handleDeviceChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>

                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                       user id 
                      </label>
                      <input
                        type="password"
                        name="userid"
                        value={userInDeviceInfo.userid}
                        onChange={(e) => handleDeviceChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div>

                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Role
                      </label>
                     <select value={userInDeviceInfo.UserRoleEnum} onChange={(e) => handleDeviceChange(e)}  className="h-10 w-96 border mt-2 px-2 py-2" name='Role' >
                      <option value='USER_DEFAULT'>
                      USER_DEFAULT
                      </option>
                      <option value='USER_ENROLLER'>
                      USER_ENROLLER
                      </option>
                      <option value='USER_ADMIN'>
                      USER_MANAGER
                      </option>
                      <option>
                      USER_ADMIN
                      </option>
                     </select>
                    </div>
                   


                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={saveUserinDevice}
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                        Save
                      </button>

                    </div>




                    <button
                        onClick={resetDeviceInfo}

                        className="rounded text-white font-semibold bg-red hover:bg-red-700 py-2 px-6">
                        Close
                      </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <UserList user={responseUser} />
    </>
  );
};

export default AddUser;
