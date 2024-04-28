import React, { useEffect } from 'react'

const DepartmentOptions = ({name,value,onChange}) => {
    
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/department";
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
  return (
    <div>
     
    </div>
  )
}

export default DepartmentOptions