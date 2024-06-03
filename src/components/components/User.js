import Link from "next/link";
import React from "react";

const User = ({ user, deleteUser,editUser}) => {
  
  return (
    
    <tr key={user.id} className="hover:bg-slate-200  " >
      
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.matricule}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.birthday}</div>
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
        <Link href={`/dashboard/employees/${user.id}`} className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4" >Attendence</Link>
      </td>
   
    </tr>
  );
};

export default User;