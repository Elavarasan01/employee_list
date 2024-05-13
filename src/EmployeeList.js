import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const getApiUrl ='https://carxier-dev.tahrtech.in/api/v1/employee/all/0/20/';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(corsProxyUrl+getApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("employee list",Object.values(response.data)[0].map(info=>info.str1));
        if (Array.isArray(response.data)) {
            setEmployees(response.data);
          } else {
            let differentRes =Object.values(response.data)[0];
            setEmployees(differentRes);
            console.error('Invalid data format received:', response.data);
          }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('An error occurred while fetching employee data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="employee-list-container">
    <h2>Employee List</h2>
    {error ? (
      <div className="error-message">Error: {error}</div>
    ) : (
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active Status</th>
            <th>Designation</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} className="employee-row">
              <td>{employee.str1 || 'NA'}</td>
              <td>{employee.str2 || 'NA'}</td>
              <td>{employee.str6 || 'NA'}</td>
              <td>NA</td>
              <td>{employee.str4 || 'NA'}</td>
              <td>NA</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
};

export default EmployeeList;