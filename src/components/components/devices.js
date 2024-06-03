import { button } from "@material-tailwind/react";
import React, { useState } from "react";

const Devices = ({ user, deleteUser,editUser}) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const connectionRequest = async () => {
        setIsLoading(true); // Set loading state to true when starting the request
        try {
          const response = await fetch("http://localhost:8080/api/v1/devices/connect/2", {
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
      const disconnectionRequest = async () => {
        setIsLoading(true); // Set loading state to true when starting the request
        try {
          const response = await fetch("http://localhost:8080/api/v1/devices/disconnect/2", {
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
    <tr key={user.id}>
   
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.deviceName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.password}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.ip_address}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.port}</div>
      </td>
     
      <td className="text-left px-6 py-4 text-white font-extrabold whitespace-nowrap">
      {user.connection_State === 'CONNECTED' ? (
  <button disabled={isLoading} onClick={disconnectionRequest} className="bg-green-500 p-12 rounded-xl  "> {isLoading ? "DISCONNECTING..." : "CONNECTED"}</button>
) : (
    <button disabled={isLoading}  onClick={connectionRequest}  className="bg-red p-2 rounded-xl  "> {isLoading ? "CONNECTING..." : "NOT_CONNECTED"}</button>
)}
      </td>
      
      <td className="text-right px-6 py-4 whitespace-nowrap">
        <a
          onClick={(e, id) => editUser(e, user.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4">
          Edit
        </a>
        <a
          onClick={(e, id) => deleteUser(e, user.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Devices;