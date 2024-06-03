import { React } from "react";
import { useState } from "react";
import { useEffect } from "react";
import User from "./record";
import EditUser from "./EditUser";
import Record from "./record";

const AttendenceRecords = ({ user }) => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/archive";
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    
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
      const FetchingDataFromDevice = async () => {
        setIsLoading(true); // Set loading state to true when starting the request
        try {
          const response = await fetch("http://localhost:8080/api/v1/devices/AttendanceRecord/1", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setResponse(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false); // Set loading state back to false after request completes
        }
      };
  return (
    <>
      <div className="container mx-auto my-8">

        <button disabled={isLoading} onClick={FetchingDataFromDevice} className="bg-green-500 p-2 font-extrabold text-white rounded-lg mb-3">{isLoading ? "fetching data from device..." : "Download new  Records"}</button>
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Attendence day 
                </th>
               
               
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  morning_attendece
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  morning_leave
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                mid_day_attendence
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                mid_day_leave
                </th>
               
                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  attendence_state
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {users?.map((user) => (
                  <Record
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
      
    </>
  );
};

export default AttendenceRecords;