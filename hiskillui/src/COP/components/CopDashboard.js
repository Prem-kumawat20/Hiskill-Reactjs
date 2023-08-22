import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useRef } from 'react';

export default function CopDashboard({ width = '500px', height = '700px' }) {
  const svgRef = useRef(null);
  const [skillname, setSkillname] = useState([]);
  const [data, setData] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [employeeNames, setEmployeeNames] = useState([]);

  useEffect(() => {
    fetch('http://13.234.20.12:8080/api/v1/skillmaster')
      .then(response => response.json())
      .then(data => {
        const skills = data.map(item => item.skillName);
        setSkillname(skills);
      })
      .catch(error => {
        console.error('Error fetching skill data:', error);
      });
  }, []);

  useEffect(() => {
    if (skillname.length === 0) {
      return;
    }

    Promise.all(
      skillname.map(skill =>
        fetch(`http://13.234.20.12:8080/api/v1/skillemp/EmpSkill/${skill}`)
          .then(response => response.json())
          .then(employeeData => {
            const skillCount = employeeData.length;
            return { skillname: skill, value: skillCount };
          })
          .catch(error => {
            console.error(`Error fetching employee count for ${skill}:`, error);
            return { skillname: skill, value: 0 };
          })
      )
    ).then(skillCounts => {
      const nonZeroSkillCounts = skillCounts.filter(skill => skill.value > 0);
      setData(nonZeroSkillCounts);
    });
  }, [skillname]);

  useEffect(() => {
    if (!data || !data.length) {
      return;
    }

    const root = d3.hierarchy({
      children: data
    })
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    const treemapRoot = d3
      .treemap()
      .size([width, height])
      .padding(1)(root);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const cell = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`)
      .on('click', function(d) {
        const clickedElement = d3.select(this);
        const skillname = d.data.skillname;
        setSelectedSkill(skillname);
        fetch(`http://13.234.20.12:8080/api/v1/skillemp/EmpSkill/${skillname}`)
          .then(response => response.json())
          .then(employeeData => {
            setEmployeeNames(employeeData);
          })
          .catch(error => {
            console.error(`Error fetching employee names for ${skillname}:`, error);
            setEmployeeNames([]);
          });
      });

    // Rest of your treemap rendering logic

  }, [data, width, height]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height} />
      <div style={{
        position: 'absolute',
        left: '800px',
        top: '0px'
      }}>
        {employeeNames.length > 0 && (
          <div>
            <h3>Employees under {selectedSkill} skill:</h3>
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Proficiency Level</th>
                </tr>
              </thead>
              <tbody>
                {employeeNames.map(employee => (
                  <tr key={employee.SkillId}>
                    <td>{employee.empName}</td>
                    <td>{employee.proficiencyLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <style>
              {`
                table {
                  border-collapse: collapse;
                  width: 100%;
                }
                
                th, td {
                  padding: 14px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                }
                
                th {
                  background-color: #f2f2f2;
                }
                
                tr:hover {
                  background-color: #f5f5f5;
                }
              `}
            </style>
          </div>
        )}
      </div>
    </div>
  );
}
