export default async function getpagedata(setresult) {
    try {
      const apiurl = "http://localhost:3000/dashboard/admin/sqlfetch"; // Make sure to include the protocol (e.g., http://)
      const response = await fetch(apiurl);
      const res = await response.json();
      setresult(res);
    } catch (error) {
      console.error('Error fetching data:', error);
      // You might want to handle errors or propagate them to the caller depending on your requirements
    }
  }
  