import React, { useState } from "react";
import toast from "react-hot-toast";

const Record = ({ user, id }) => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/archive/" +user.id+ "/changestate/" +id;

  const [selectedOption, setSelectedOption] = useState("RC"); // Default selected option

  const saveUser = async (e) => {
    e.preventDefault();
     // Log user data for debugging
    const response = await fetch(USER_API_BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedOption), // Send selected option as the request body
    });const data = await response.json();
    if (data == false) {
      toast.error("you can't perform this acction , check RC and CP");;
    }else{
    
  
    window.location.reload();}
  };

  return (
    <tr key={user.id} className={`${user.attendence_State =="abscent" ? "bg-pink-200":"bg-green-200"}`}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.attendence_day}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.morning_attendence}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.morning_leaving}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.mid_day_attendence}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.mid_day_leaving}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.attendence_State}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)} // Update selected option state
          >
            <option value="rc">RC</option>
            <option value="cp">CP</option>
            <option value="attende">attended</option>
            <option value="abscent">abscent</option>
          </select>
          <button onClick={saveUser} className="rounded bg-slate-600 text-white p-2 my-3 mx-3 font-semibold">Save</button>
        </div>
      </td>
    </tr>
  );
};

export default Record;
