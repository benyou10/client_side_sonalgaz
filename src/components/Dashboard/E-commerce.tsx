"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";
import { useSession } from "next-auth/react";
import Calendar from "../Calender";
import * as Frigade from '@frigade/react';
import Record from "../components/record";
import ListRecord from "../components/ModRecord";


const ECommerce: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const USER2_API_BASE_URL = `http://localhost:8080/api/v1/users/bydepartment/${session?.user?.name?.id}`;
  const USER_API_BASE_URL = `http://localhost:8080/api/v1/users/${session?.user?.name?.id}`;
  const USER2_API_timeoff_URL = `http://localhost:8080/api/v1/users/timeoff`;
  const USER_API_timeoff_URL = `http://localhost:8080/api/v1/users/${session?.user?.name?.id}/timeoff`;

  const [tardinessData, setTardinessData] = useState({});

const [numberOfEmployees,setnumberOfEmployees] = useState(0);
  const [timeOff, setTimeOff] = useState({
    id: "",
    startDate: "",
    experationDate: "",
    name: "",
    employee: ""
  });

  const [totalTardiness, setTotalTardiness] = useState(0);
  const [totalAbscents, settotalAbscents] = useState(0);

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    matricule: "",
    birthday: "",
    role: "",
    department: "",
    archives: []
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let userData ;
      try {
        const response = await fetch((session?.user?.image === "admin" || session?.user?.image === "employee_default") 
        ? USER_API_BASE_URL 
        : USER2_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
       userData = await response.json();
        setUser(userData);
        calculateTardiness(userData);
        calculateAbsenceDays(userData);
        calculateNumberOfEmployees(userData);
        calculateAttendence(userData);
        if (Array.isArray(userData)) {
          filterTodaysAttendance(userData);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    
    };
  
    const fetchTimeOffData = async () => {
      setLoading(true);
      try {
        const response = await fetch((session?.user?.image === "admin" || session?.user?.image === "employee_default") 
        ? USER_API_timeoff_URL 
        : USER2_API_timeoff_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();
        const user = await fetchData();
        setTimeOff(userData);
     
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    
      fetchData();
      fetchTimeOffData();
    
  }, [session?.user?.name?.id]);


  const calculateTardiness = (userData) => {
    const expectedTimes = {
        morningArrival: '08:00:00',
        morningLeaving: '12:00:00',
        afternoonArrival: '13:00:00',
        midDayLeaving: '16:00:00'
    };

    let totalTardiness = 0;
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    if (Array.isArray(userData.archives)) {
        userData.archives.forEach(record => {
          if(record.attendence_State =="attended"){
            const [year, month, day] = record.attendence_day.split('-').map(Number);
            const recordDate = new Date(year, month - 1, day); // Month is 0-indexed in JS Date

            if (recordDate >= thirtyDaysAgo) {
                const times = {
                    morningArrival: record.morning_attendence,
                    morningLeaving: record.morning_leaving,
                    afternoonArrival: record.mid_day_attendence,
                    midDayLeaving: record.mid_day_leaving
                };

                Object.keys(expectedTimes).forEach(timeKey => {
                    const expectedTime = expectedTimes[timeKey];
                    const actualTime = times[timeKey];
                    if (actualTime) {
                        const [expectedHours, expectedMinutes, expectedSeconds] = expectedTime.split(':').map(Number);
                        const [arrivalHours, arrivalMinutes, arrivalSeconds] = actualTime.split(':').map(Number);

                        const expectedTimeInSeconds = expectedHours * 3600 + expectedMinutes * 60 + expectedSeconds;
                        const actualTimeInSeconds = arrivalHours * 3600 + arrivalMinutes * 60 + arrivalSeconds;

                        // Calculate tardiness if arriving late
                        if (timeKey.includes("Arrival")) {
                            const lateSeconds = Math.max(0, actualTimeInSeconds - expectedTimeInSeconds);
                            totalTardiness += lateSeconds;
                        }
                        // Calculate leaving early
                        else if (timeKey.includes("Leaving")) {
                            const earlyDepartureSeconds = Math.max(0, expectedTimeInSeconds - actualTimeInSeconds);
                            totalTardiness += earlyDepartureSeconds;
                        }
                    }
                });
            }
        }});
    }

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    setTotalTardiness(formatTime(totalTardiness));
};
const [numberOfattendence, setNumberOfattendence] = useState(0);

const calculateAttendence = (userData) => {
  let absenceDays = 0;
  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format

  // If userData is an array, calculate absences for today
  if (Array.isArray(userData)) {
    userData.forEach(user => {
      // Check if the user's archives is an array
      if (Array.isArray(user.archives)) {
        // Iterate over each record in the user's archives
        user.archives.forEach(record => {
          // Check if the record date is today and the attendance state is not "attended"
          if (record.attendence_day === todayDateString && record.attendence_State == "attended") {
            absenceDays++;
          }
        });
      }
    });
  } 

  // Update the total absents state
  setNumberOfattendence(absenceDays);

  return absenceDays;
};
  

const calculateAbsenceDays = (userData) => {
  let absenceDays = 0;
  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format

  // If userData is an array, calculate absences for today
  if (Array.isArray(userData)) {
    userData.forEach(user => {
      // Check if the user's archives is an array
      if (Array.isArray(user.archives)) {
        // Iterate over each record in the user's archives
        user.archives.forEach(record => {
          // Check if the record date is today and the attendance state is not "attended"
          if (record.attendence_day === todayDateString && record.attendence_State !== "attended") {
            absenceDays++;
          }
        });
      }
    });
  } else {
    // If userData is not an array (i.e., single user data), calculate absences for the last 30 days
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (Array.isArray(userData.archives)) {
      userData.archives.forEach(record => {
        const [year, month, day] = record.attendence_day.split('-').map(Number);
        const recordDate = new Date(year, month - 1, day); // Month is 0-indexed in JS Date

        if (recordDate >= thirtyDaysAgo && record.attendence_State !== "attended") {
          absenceDays++;
        }
      });
    }
  }

  // Update the total absents state
  settotalAbscents(absenceDays);

  return absenceDays;
};

const calculateNumberOfEmployees = (userData) => {
  let numberOfEmployees = 0;

  if (Array.isArray(userData)) {
    // Calculate the number of unique employees directly from the userData array
    const uniqueEmployeeIds = new Set();
    userData.forEach(user => {
      uniqueEmployeeIds.add(user.id); // Assuming each user has a unique ID
    });
    numberOfEmployees = uniqueEmployeeIds.size;
  } else {
    // If userData is not an array, assume it's a single user object
    numberOfEmployees = 1;
  }

  // Update the state with the number of employees
  setnumberOfEmployees(numberOfEmployees);
};

const [todaysAttendance, setTodaysAttendance] = useState([]);

const filterTodaysAttendance = (usersData) => {
  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format

  // Initialize an array to hold all today's records
  const todaysRecords = [];

  // Iterate over each user
  usersData.forEach(user => {
    // Filter the user's archives for today's date
    const userTodaysRecords = user.archives.filter(record => {
      const recordDate = record.attendence_day;
      return recordDate === todayDateString;
    });

    // Add the user's today's records to the main array
    todaysRecords.push(...userTodaysRecords);
  });

  // Set the combined records as today's attendance
  setTodaysAttendance(todaysRecords);
};




// Example usage




  return (
    <>
     
      <div className="rounded-xl border flex justify-between   border-stroke bg-white px-7.5 py-2 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark-2">
        <div>
          <h1>good morning</h1>
          <div className="font-extrabold text-xl"></div>
          <h1 className="font-semibold" >{session && !loading && `${session.user.image} : ${session.user.name.user}    ${session.user.email} `}</h1>
{(session?.user?.image =="admin"  ) &&  (<div>
  <h1>{session && !loading && `   RC : ${user?.rc},  CP : ${user?.cp},  `}</h1>
{timeOff.name ? (<div><h1 >conge :{timeOff.name}</h1><h1 >experation date : {timeOff.experationDate}</h1></div>): ("")}
   
   <h1 >Email :{user?.email }</h1>
   <h1 >phone number :{user?.phoneNumber}</h1>
   <h1 >total tardiness over the last 30 days : {totalTardiness}</h1>
   <h1 >total abscnetns over the last 30 days : {totalAbscents}</h1>


</div>)}
{(session?.user?.image =="employee_default"  ) &&  (<div>
  <h1>{session && !loading && `   RC : ${user?.rc},  CP : ${user?.cp},  `}</h1>
{timeOff.name ? (<div><h1 >conge :{timeOff.name}</h1><h1 >experation date : {timeOff.experationDate}</h1></div>): ("")}
   
   <h1 >Email : {user?.email }</h1>
   <h1 >phone number : {user?.phoneNumber}</h1>
   <h1 >total tardiness over the last 30 days : {totalTardiness}</h1>
   <h1 >total abscnetns over the last 30 days : {totalAbscents}</h1>


</div>)}
           </div>
       
        </div> 
        <Frigade.Announcement
      flowId="my-flow-id"
    />
    {(session?.user?.image !="employee_default" &&  session?.user?.image !="admin" ) && (
  <div>
     <div className="flex justify-center ">
      <div className="grid grid-cols-1 gap-5 justify-center md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
     
        <CardDataStats title="Total Attendence" total={`${numberOfattendence}`} rate="0.43%" levelUp>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </CardDataStats>
       
        <CardDataStats title="Total employees in timeOff" total={`${numberOfEmployees-(numberOfattendence+totalAbscents)}`} rate="2.59%" levelUp>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </CardDataStats>
        <CardDataStats title="Total employees" total={`${numberOfEmployees}`} rate="0.95%" levelDown>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </CardDataStats>
      
        <CardDataStats title="Total abscents today" total={`${totalAbscents}`} rate="0.95%" levelDown>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </CardDataStats>
      </div>
      </div>
  </div>
)}
        <div className="container mx-auto my-8">

<div className="flex shadow border-b">
  <table className="min-w-full">
    <thead className="bg-gray-50">
      <tr>{(session?.user?.image =="employee_default" ||  session?.user?.image =="admin" ) ?(  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        Attendence Day
        </th>) : (<div> <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        first Name
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        last name
        </th></div>)}
       
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
          morning attendence
        </th>
        
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        morning leaving time
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        mid day attendence
        </th>
        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
        mid day leaving time
        </th>
       
        <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
          
        </th>
      </tr>
    </thead>

    {!loading && (
  <tbody className="bg-white">
    {(session?.user?.image === "admin" || session?.user?.image === "employee_default") ? (
      Array.isArray(user.archives) && user.archives.map((userItem, index) => (
        <ListRecord
        user={userItem}
        key={userItem.id}
        username={user[index]} 
        />
      ))
    ) : (
      Array.isArray(todaysAttendance) && todaysAttendance.map((attendanceItem, index) => (
        <ListRecord
          user={attendanceItem}
          key={attendanceItem.id}
          username={user[index]} 
        />
      ))
    )}
  </tbody>
)}


  </table>
</div>
</div>
 
 




      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      
        
    
          
 
        
      
      </div>
    </>
  );
};

export default ECommerce;
