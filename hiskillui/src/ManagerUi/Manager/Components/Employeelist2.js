  import React from 'react'
  import logo from '../assets/login assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg'
  import Rectangle1841 from '../assets/login assets/Rectangle 184 (1).svg'
  import { HvHeader,HvHeaderBrand,HvTypography} from '@hitachivantara/uikit-react-core'
  import Rectangle1851 from '../assets/login assets/Rectangle 185 (1).svg'
  import { Search } from '@hitachivantara/uikit-react-icons'
  import { Close } from "@hitachivantara/uikit-react-icons";
  import group6261 from '../assets/login assets/Group 626 (1).svg'
  import { Link } from 'react-router-dom'
  import { useParams } from 'react-router-dom'
  import axios from 'axios'
  import { Start ,End , Forwards , Backwards } from "@hitachivantara/uikit-react-icons";
  import  { useState, useEffect,useRef } from 'react';
  import {
      HvTable,
      HvTableHead,
      HvTableBody,
      HvTableRow,
      HvTableHeader,
      HvTableCell,
    } from "@hitachivantara/uikit-react-core";
   
    const EmployeeTable = ({ columns }) => {
        const { mngId } = useParams(); 
        const mngid=parseInt(mngId);
         console.log((mngid))
         const [Mngname,setMngname]=useState('');
        const [EmpName,setEmpName]=useState('');
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
        const [employeeCount, setEmployeeCount] = useState(0);   
        const [EmployeeAttributes,setEmployeeAttributes]=useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const rowsPerPage = 3

        const inputRef = useRef(null);
        const handleSearchIconClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    const totalPages = Math.ceil((searchTerm ? searchResults : EmployeeAttributes).length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = (searchTerm ? searchResults : EmployeeAttributes).slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
    const goToFirstPage = () => {
      handlePageChange(1);
    };
    
    const goToLastPage = () => {
      handlePageChange(totalPages);
    };
    
    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      const filteredResults = EmployeeAttributes.filter((employee) =>
        employee.empName.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    };

    const handleClearSearch = () => {
      setSearchTerm('');
    };

    useEffect(()=>{
      axios.get(`http://13.234.20.12:8080/api/v1/employee/${mngid}`)
      .then(response=>{
        setMngname(response.data.empName);
      })
    })
 
   useEffect(() => {
    fetch(`http://13.234.20.12:8080/api/v1/manager/${mngid}`)
      .then(response => response.json() )
      .then(data => {

        const extractedEmpIdsSet = new Set(data.map(item => item.empId));
        const extractedEmpIds = Array.from(extractedEmpIdsSet);
        Promise.all([
          Promise.all(
            extractedEmpIds.map(empId =>
              fetch(`http://13.234.20.12:8080/api/v1/employee/${empId}`)
                .then(response => response.json())
            )
          ),
          Promise.all(
            extractedEmpIds.map(empId =>
              fetch(`http://13.234.20.12:8080/api/v1/certification/${empId}`)
                .then(response => response.json())
            )
          ),
          Promise.all(
            extractedEmpIds.map(empId =>
              fetch(`http://13.234.20.12:8080/api/v1/skillemp/${empId}`)
                .then(response => response.json())
            )
          )
        ])
          .then(([employeeData, certificationData, skillsData]) => {
            const employeeAttributes = employeeData.map((employee, index) => ({
              ...employee,
              certifications: certificationData[index].map(certification => certification.certificationName),
              topSkills: skillsData[index].sort((a, b) => b.proficiencyLevel - a.proficiencyLevel)
                .slice(0, 3).map(skill => skill.skillName)
            }));
            setEmployeeAttributes(employeeAttributes);
            setEmployeeCount(employeeAttributes.length)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [mngid]);
 



    return (
      <> 
      <div
      style={{
          position:'absolute',
          zIndex:5,
          top:'180px',
          left:'150px', 
      }}
      >
        <HvTable  
                variant="default" 
                style={{ 
                border: '1px solid #AC5B5E',
                borderRadius:'30px 30px 0px 0px',
                overflow:'hidden',
                borderCollapse: 'unset',
            
                }}>
           <HvTableHead>   
              <HvTableRow>
                <HvTableHeader style={{
                  paddingTop:'18px',
                  background: '#F3E2E3',
                  borderBottom:'1px solid #AC5B5E',
                 
                  fontSize:'25px'
                  }}>
                    <h2 style={{
                      fontSize:'19px',
                      paddingBottom:'10px',                     
                      opacity:'.9px',

                    }}>Total Employees under you : {employeeCount}</h2>
                </HvTableHeader>
                <HvTableHeader  style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                  }}>
                </HvTableHeader>
                <HvTableHeader  style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                  }}>
                </HvTableHeader>
                <HvTableHeader  style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                  }}>
                </HvTableHeader>
                <HvTableHeader  style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                  }}>
                </HvTableHeader>
                <HvTableHeader  style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                  }}> 
                </HvTableHeader>
                <HvTableHeader  style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                  }}> 
                </HvTableHeader>  
              </HvTableRow>
              <HvTableRow style={{ background: '#F3E2E3', border: '1px solid #AC5B5E' }}>
                  <HvTableCell
                    colSpan={7}
                    style={{ position: 'relative', background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}
                  >
                    <Search
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={handleSearchIconClick}
                    />
                    <input
                      ref={inputRef}
                      autoFocus="autofocus"
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{
                        position: 'absolute',
                        width: '134px',
                        height: '26px',
                        left: '40px',
                        top: '9px',
                        fontFamily: 'Montserrat Thin 100',
                      
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '19px',
                        lineHeight: '36px',
                        color: '#000000',
                        border: 'none',
                        outline: 'none',
                        // fontWeight:'bold',
                        backgroundColor: 'transparent',
                      }}
                      placeholder="Search Name"
                    />
                    {searchTerm && (
                      <Close
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          cursor: 'pointer',
                        }}
                        onClick={handleClearSearch}
                      />
                    )}
                  </HvTableCell>
                </HvTableRow>
              <HvTableRow style={{
                height:'40px'
              }}>
                <HvTableHeader style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                    // padding:'px'
                    }}>
                    Name
                </HvTableHeader>
                <HvTableHeader style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                    }} >
                      Employee ID
                </HvTableHeader>
                <HvTableHeader style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                    }}>
                      Employee Role
                </HvTableHeader>
              <HvTableHeader style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                    }}>
                      
                </HvTableHeader>
                <HvTableHeader style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                    }}>
                      Primary certificates
                </HvTableHeader>
              <HvTableHeader style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                    }}>
                      Primary skills

                </HvTableHeader>
                <HvTableHeader style={{
                    background: '#F3E2E3',
                    borderBottom:'1px solid #AC5B5E',
                    }}>
                      

                </HvTableHeader>
              </HvTableRow>    
            </HvTableHead>

            <HvTableBody>
        {currentRows.map((employee) => (
          <HvTableRow key={employee.empId} style={{ background: '#F3E2E3', border: '1px solid #AC5B5E', padding: '0px' }}>

            <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none', height: '30px' }}>
              <Link to={`/mngskillandcertification/${employee.empId}`}>
                {employee.empName}
              </Link>
            </HvTableCell>

            <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none' }}>
              {employee.empId}
            </HvTableCell>

            <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none' }}>
              {employee.role}
            </HvTableCell>

            <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none' }}>
            </HvTableCell>
      
              <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none' }}>
              {employee.certifications && employee.certifications.length > 0 ? (
                employee.certifications.slice(0, 3).map((certification, index, array) => (
                  <React.Fragment key={index}>
                    <span>{certification}</span>
                    {index !== array.length - 1 && <span>, </span>}
                  </React.Fragment>
                ))
              ) : (
                <span>No certifications</span>
              )}

              </HvTableCell>

            
            <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none' }}>
             {employee.topSkills && employee.topSkills.length > 0 ? (
              employee.topSkills.slice(0, 3).map((skill, index, array) => (
                <React.Fragment key={index}>
                  <span>{skill}</span>
                  {index !== array.length - 1 && <span>, </span>}
                </React.Fragment>
              ))
            ) : (
              <span>No top skills</span>
            )}

                </HvTableCell>
            <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none' }}>
            </HvTableCell>
          </HvTableRow>
        ))}
      </HvTableBody>

        </HvTable>
        <div style={{
          marginTop:'30px',
          marginLeft:'360px',
          display:'flex',
          flexDirection:'row',
          
        }
        }>
        <button onClick={goToFirstPage} disabled={currentPage === 1} style={{
          
        }}>
          <Start />
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} >
          <Backwards />
        </button>
        <div style={{
       marginTop:'7px'
        }}>
          <span className='current'>{currentPage}</span> / <span>{totalPages}</span>
        </div>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="gt">
          <Forwards />
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages} className="last-page-btn">
          <End />
        </button>
</div>

      </div>

        <div
      style={{
        height: 150
      }}
    >
  
          <div
            style={{
              minHeight: 100,
              
            }}
          >
      <HvHeader style={{
          position:'relative',
          backgroundColor:'#B41B3A',
          height:'55px'
          }}>
       <HvHeaderBrand
            logo={ 
            <img
            src={logo}
            alt="Hitachi Vantara Logo"
            style={{
              position: 'absolute',
              left: '-5px',
              right: '908px',
              top: '-5px',
              bottom: '1109px',
              width:'200px',
              height:'100px',
              cursor:'pointer',
            }}
          />
        }
      />
      <Link to={'/mnghome'}>
      <HvTypography
      variant="body"
      style={{
        height: '24px',
        position: 'absolute',
        left: '1200px',
        top: '16px',
        bottom: '1200px',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#FFFFFF',
        cursor:'pointer',
      }}>
    
      Home
     </HvTypography>
    </Link>
      </HvHeader>
      <HvTypography
      variant="body"
      style={{
        position:'absolute',
        zIndex:'4',
        top:'130px',
        left:'420px',
        fontSize:'20px',
        fontWeight:'700'

      }}>
        Hey {Mngname}  this are the  employees under you
      </HvTypography>
      <img 
        src={Rectangle1841}
        alt="Rectangle1841  not found"
        style={{
            position:'absolute',
            zIndex:1,
            top:'0px',
        }}
          />
        <img 
        src={Rectangle1851}
        alt="Rectangle1851  not found"
        style={{
            position:'absolute',
            zIndex:2,
            top:'15px',
      }}
        />
        <img 
      src={group6261}
      alt="Rectangle1853  not found"
      style={{
        
          position:'absolute',
          zIndex:3,
          top:'152px',
          left:'914px',
      }}  
        />
      </div>
      </div>
      </>
    )
  }
  export default EmployeeTable;


