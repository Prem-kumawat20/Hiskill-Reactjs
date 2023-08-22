import React, { useState, useEffect } from 'react';
import '../../App.css';

function Certifications() {
  const [employees, setEmployees] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const employeesResponse = await fetch('http://localhost:3030/employee');
      const employeesData = await employeesResponse.json();

      const skillsResponse = await fetch('http://localhost:3032/skillmaster');
      const skillsData = await skillsResponse.json();

      const mappingResponse = await fetch('http://localhost:3031/skills');
      const mappingData = await mappingResponse.json();

      const filteredEmployees = filterEmployees(employeesData, skillsData, mappingData);
      setEmployees(filteredEmployees);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const filterEmployees = (employeesData, skillsData, mappingData) => {
    if (!skillsData || !mappingData || !selectedSkill) {
      return [];
    }

    const filteredEmployees = employeesData.filter((employee) => {
      const employeeHasSkill = mappingData.some(
        (mapping) =>
          mapping.certId === selectedSkill.certId &&
          mapping.empId === employee.empId
      );
      return employeeHasSkill;
    });

    return filteredEmployees.map((employee) => {
      return {
        empId: employee.empId,
        empName: employee.empName,
      };
    });
  };

  const handleSkillSelection = (event) => {
    const selectedOption = event.target.value;
    setSelectedSkill(selectedOption);
  };

  const handleSearch = async () => {
    if (selectedSkill) {
      setSearchPerformed(true);
      setIsLoading(true);

      try {
        const employeesResponse = await fetch('http://localhost:3030/employee');
        const employeesData = await employeesResponse.json();

        const skillsResponse = await fetch('http://localhost:3032/skillmaster');
        const skillsData = await skillsResponse.json();

        const mappingResponse = await fetch('http://localhost:3031/skills');
        const mappingData = await mappingResponse.json();

        const filteredEmployees = filterEmployees(employeesData, skillsData, mappingData);
        setEmployees(filteredEmployees);
      } catch (error) {
        console.log('Error fetching data:', error);
      }

      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedSkill('');
    setSearchPerformed(false);
    setEmployees([]);
  };

  const renderEmployees = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (employees.length === 0 && searchPerformed) {
      return <p>No employees found with the specified certification.</p>;
    }

    if (employees.length > 0) {
      return (
        <table className="employee-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Employee ID</th>
              <th style={{ textAlign: 'center' }}>Employee Name</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empId}>
                <td style={{textAlign: 'center'}}>{employee.empId}</td>
                <td style={{textAlign: 'center'}}>{employee.empName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  return (
    <div className="employee-list-container">
      <h2 className="heading"><strong>Search for Resources!</strong></h2>
      <div>
        <label htmlFor="skillSelection">Select Certifications:</label>
        <select id="skillSelection" value={selectedSkill} onChange={handleSkillSelection}>
          <option value="">Select a Certification</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value=".net">.NET</option>
          <option value="reactjs">React JS</option>
          <option value="springboot">Spring Boot</option>
          <option value="python">Python</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <button onClick={handleClear} className="clear-button">
        Clear
      </button>
      {renderEmployees()}
    </div>
  );
}

export default Certifications;

















