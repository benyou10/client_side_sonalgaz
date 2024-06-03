import { React } from "react";
import { useState } from "react";
import { useEffect } from "react";
import User from "./User";
import EditUser from "./EditUser";
import { useSession } from "next-auth/react";

const UserList = ({ user }) => {
  
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);
  const { data: session, status } = useSession();
  console.log(session?.user?.name?.department.id)
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users/bydepartment/" +session?.user?.name?.id ;

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
      },[user,responseUser,session?.user?.name?.id]);
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
                  id number
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  First Name
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Last Name
                </th>
              
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  birthday
                </th>
                
                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {!loading && Array.isArray(users) && (
              <tbody className="bg-w hite">
           {users?.map((user) => (
                  <User
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

export default UserList;