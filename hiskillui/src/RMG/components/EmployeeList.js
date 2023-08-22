import React, { useState, useEffect } from 'react';
import '../../App.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [minRating, setMinRating] = useState('');
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
    if (!skillsData || !mappingData || (selectedSkills.length === 0 && minRating === '')) {
      return [];
    }
  
    const filteredEmployees = employeesData.filter((employee) => {
      if (selectedSkills.length === 0) {
        const employeeHasRating = mappingData.some(
          (mapping) =>
            mapping.proficiencylevel >= parseInt(minRating) && // Minimum rating condition
            mapping.empId === employee.empId
        );
        return employeeHasRating;
      } else {
        return selectedSkills.every((selectedSkill) => {
          const selectedSkillData = skillsData.find((skill) => skill.skillname === selectedSkill);
          if (!selectedSkillData) {
            return false;
          }
          const employeeHasSkillAndRating = mappingData.some(
            (mapping) =>
              mapping.skillid === selectedSkillData.skillid &&
              mapping.proficiencylevel >= parseInt(minRating) && // Minimum rating condition
              mapping.empId === employee.empId
          );
          return employeeHasSkillAndRating;
        });
      }
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
    setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, selectedOption]);
  };

  const handleRatingChange = (event) => {
    setMinRating(event.target.value);
  };

  const handleSearch = async () => {
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
  };

  const handleClear = () => {
    setSelectedSkills([]);
    setMinRating('');
    setSearchPerformed(false);
    setEmployees([]);
  };

  const renderEmployees = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (employees.length === 0 && searchPerformed) {
      return <p>No employees found with the specified skills and rating.</p>;
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
      <h2 className='heading'><strong>Search for Resources!</strong></h2>
      <div>
        <label htmlFor="skillSelection1">Select Skill 1:</label>
        <select id="skillSelection1" value={selectedSkills[0] || ''} onChange={handleSkillSelection}>
          <option value="">Select a Skill</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value=".net">.NET</option>
          <option value="reactjs">React JS</option>
          <option value="springboot">Spring Boot</option>
          <option value="python">Python</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="skillSelection2">Select Skill 2:</label>
        <select id="skillSelection2" value={selectedSkills[1] || ''} onChange={handleSkillSelection}>
          <option value="">Select a Skill</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value=".net">.NET</option>
          <option value="reactjs">React JS</option>
          <option value="springboot">Spring Boot</option>
          <option value="python">Python</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="minRating">Minimum Rating:</label>
        <select id="minRating" value={minRating} onChange={handleRatingChange}>
          <option value="">Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button onClick={handleSearch} className="search-button">Search</button>
      <button onClick={handleClear} className="clear-button">Clear</button>
      {renderEmployees()}
    </div>
  );
}

export default EmployeeList;
