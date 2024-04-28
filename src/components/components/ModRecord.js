import React from "react";

const ModRecord = ({ user, deleteUser,editUser}) => {
  return (
    <tr key={user.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.id}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.attendence_time}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.attendence_record}</div>
      </td>

      <td className="text-left px-6 py-4 whitespace-nowrap">
      <div className="text-sm  text-gray-500">{user.attendence_record}</div>

      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.role_id}</div>
      </td>
      
      <td className="text-right p-6 py-4 whitespace-nowrap">
      <td className="text-left p-6 py-4 whitespace-nowrap">
        <select className="text-lg p-2 pr-12 text-gray-500">
          <option>
Attende
          </option>
          <option>
Conge
          </option>
          <option>
retare
          </option>
        </select>
      </td>
      </td>
    </tr>
  );
};

export default ModRecord;