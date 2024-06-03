import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ListRecord = ({ user,username }) => {
  const {data:session, loadingg} = useSession();
const record= user;

  return (
    <tr key={record.id} className={`${record.attendence_State =="abscent" ? "bg-pink-200":"bg-green-200"}`}>
    {(session?.user?.image =="employee_default" ||  session?.user?.image =="admin" ) ?(  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
    {record.attendence_day}
        </th>) : (<div> <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        {username.firstName}
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        {username.lastName}
        </th>
       </div>)}
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{record.morning_attendence}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{record.morning_leaving}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{record.mid_day_attendence}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{record.mid_day_leaving}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{record.attendence_State}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
     
      </td>
    </tr>
  );
};

export default ListRecord;
