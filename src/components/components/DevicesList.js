import { React } from "react";
import { useState } from "react";
import { useEffect } from "react";
import User from "./devices";
import EditUser from "./EditUser";
import Devices from "./devices";

const DevicesList = ({ user }) => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/devices";
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);
    
    
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
            const users = await response.json();
            setUsers(users);
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      },[user,responseUser]);
      const deleteUser = (e, id) => {
        e.preventDefault();
        fetch(USER_API_BASE_URL + "/" + id, {
          method: "DELETE",
        }).then((res) => {
          if (users) {
            setUsers((prevElement) => {
              return prevElement.filter((user) => user.id !== id);
            });
          }
        });
      };
      const editUser = (e, id) => {
        e.preventDefault();
        setUserId(id);
      };
  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
            
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                device name
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  password
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                ip_address
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  port
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Connection_state
                </th>
               
               
                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
          
            {!loading && (
              <tbody className="bg-white">
                {users?.map((user) => (
                  <Devices
                    user={user}
                    key={user.id}
                    deleteUser={deleteUser}
                    editUser={editUser}
                  
                  />
                ))}
              </tbody>
            )}
      
          </table>
        </div>
      </div>
      <EditUser userId={userId} setResponseUser={setResponseUser} />
      
    </>
  );
};

export default DevicesList;