import React,{useEffect,useState,useRef} from 'react'
import logo from '../assets/login assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg'
import group626 from '../assets/login assets/Group 626.svg'
import group617 from '../assets/login assets/Group 617.svg'
import eclipse11 from '../assets/newassests/Ellipse 11.svg'
import group56511 from '../assets/newassests/Group 565 (1).svg'
import axios from 'axios';
import { Search } from '@hitachivantara/uikit-react-icons'
import { Close } from "@hitachivantara/uikit-react-icons";
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import { Start ,End , Forwards , Backwards } from "@hitachivantara/uikit-react-icons";
import { HvHeader,HvButton,HvHeaderBrand,HitachiLogo,HvHeaderActions,HvBadge,HvTypography,HvCard,HvCardContent,HvDatePicker,HvSlider,
  HvDropdown,HvLoading, HvTab} from '@hitachivantara/uikit-react-core'
  import {
    HvTableCell,
    HvTableRow,
    HvTableBody,
    HvTableHeader,
    HvTableHead,
    HvTableContainer,
    HvTable,
    HvGlobalActions,
    
  } from "@hitachivantara/uikit-react-core";
function Skillandcertification() {
  const [searchQuery, setSearchQuery] = useState('');
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [skillname, setskillname] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newRating, setNewRating] = useState();
  const [edibutton, seteditbutton] = useState(true);
  const location = useLocation();
  const [EmpName, setEmpName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const emp = useParams();
  const employeeId = parseInt(emp.empId);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchSkills();
    fetchskillName();
  }, []);

  useEffect(()=>{
    axios.get(`http://13.234.20.12:8080/api/v1/employee/${employeeId}`)
    .then(response=>{
      setEmpName(response.data.empName);
    })
  })
  const fetchskillName = () => {
    axios
      .get("http://13.234.20.12:8080/api/v1/skillmaster")
      .then((response) => {
        setskillname(response.data);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  
  const fetchSkills = () => {
    axios
      .get("http://13.234.20.12:8080/api/v1/skillemp")
      .then((response) => {
        const filteredSkills = response.data.filter(
          (skill) => skill.empId === employeeId
        );
        setSkills(filteredSkills);
        setFilteredSkills(filteredSkills);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };
  const navigate=useNavigate();
  const handlesubmitaddskill=()=>{
    navigate('/addskill',{ state: { empid: employeeId } })
  }
  
  const handleUpdateSkill = (skillId) => {
    const skillToUpdate = skills.find((skill) => skill.id === skillId);

    const updatedSkill = {
      ...skillToUpdate,
      proficiencyLevel: parseInt(newRating),
    };
    const updatedSkills = skills.map((skill) => (skill.id === skillId ? updatedSkill : skill));

    setSkills(updatedSkills);
  
   
    axios.put(`http://13.234.20.12:8080/api/v1/skillemp/${skillId}`, updatedSkill)
      .then((response) => {
        console.log('Skill updated:', response.data);
       fetchSkills();
      })
      .catch((error) => {
        console.error('Error updating skill:', error);
        
      });
    setSelectedSkill(null);
    setNewRating('');
  };
   console.log(skills)
  const handleSearchIconClick = () => {
    inputRef.current.focus();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterSkills(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredSkills(skills);
  };

  const filterSkills = (query) => {
    const filteredSkills = skills.filter((skill) =>
      skillname.find((item) => item.skillId === skill.skillId)?.skillName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSkills(filteredSkills);
  };
  const totalPages = Math.ceil((filteredSkills).length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSkills.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const goToFirstPage = () => {
    handlePageChange(1);
  };
  
  const goToLastPage = () => {
    handlePageChange(totalPages);
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          top: '160px',
          left: '165px',
          width: '750px'
        }}
      >
        <HvTable variant="default"
          style={{
            border: '1px solid #AC5B5E',
            borderRadius: '30px 30px 0px 0px',
            overflow: 'hidden',
            position: 'absolute',
            zIndex: 2,
            borderRadius: '25px 25px 0px 0px',
            overflow: 'hidden',
            borderCollapse: 'unset',
            // width:'900px',
            // left:'-100px'
          }}
        >
          <HvTableHead>
            <HvTableRow style={{ background: '#F3E2E3', border: '1px solid #AC5B5E' }}>
              <HvTableCell
                colSpan={3}
                style={{ position: 'relative', background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}
              >
                <Search
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={handleSearchIconClick}
                />
                <input
                  ref={inputRef}
                  autoFocus="autofocus"
                  type="text"
                  value={searchQuery}
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
                    backgroundColor: 'transparent'
                  }}
                  placeholder="Search Skill"
                />
                {searchQuery && (
                  <Close
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={handleClearSearch}
                  />
                )}
              </HvTableCell>
              <HvTableCell style={{
                border: '1px solid #AC5B5E',
                borderRight: 'none',
                borderLeft: 'none',
                borderTop: 'none',
                backgroundColor: '#F3E2E3'
              }}>
                <Link to={`/mngaddskill1/${employeeId} `}>
                  <HvButton
                    style={{
                      backgroundColor: '#FF8383',
                      borderRadius: '10px',
                      color: 'black',
                      width: '75px',
                      height: '25px',
                      opacity: '.9',
                      marginTop: '5px',
                      marginLeft: '-5px'
                    }}
                  >
                    Add Skill
                  </HvButton>
                </Link>
              </HvTableCell>
            </HvTableRow>
            <HvTableRow style={{
              height: '45px'
            }}>
              <HvTableHeader style={{
                background: '#F3E2E3',
                borderBottom: '1px solid #AC5B5E',
                borderTop: 'black'
              }}>
                Skill Name
              </HvTableHeader>
              <HvTableHeader style={{
                background: '#F3E2E3',
                borderBottom: '1px solid #AC5B5E'
              }}>last used</HvTableHeader>
              <HvTableHeader style={{
                background: '#F3E2E3',
                borderBottom: '1px solid #AC5B5E'
              }}>Proficiency</HvTableHeader>
              <HvTableHeader style={{
                background: '#F3E2E3',
                borderBottom: '1px solid #AC5B5E'
              }}>Actions</HvTableHeader>
            </HvTableRow>
          </HvTableHead>
          <HvTableBody>
            {currentRows.map((skill) => (
              <HvTableRow key={skill.id} style={{ background: '#F3E2E3', border: '1px solid #AC5B5E' }}>
                <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none' }}>
                  {skillname.find((item) => item.skillId === skill.skillId)?.skillName}
                </HvTableCell>
                <HvTableCell style={{
                         border:'1px solid #AC5B5E',
                         borderRight:'none', 
                        borderLeft:'none'}} >{new Date(skill.lastUsed).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}</HvTableCell>
                <HvTableCell style={{ border: '1px solid #AC5B5E', borderRight: 'none', borderLeft: 'none' }}>
                  {skill.proficiencyLevel}
                </HvTableCell>
                <HvTableCell style={{
                         border:'1px solid #AC5B5E',
                         borderRight:'none', 
                        borderLeft:'none'}}>
                   
                   {selectedSkill === skill.id ? (
                     <div>
                       <input
                         type="number"
                         value={newRating}
                         min='1'
                         max='5'
                         onChange={(e) => setNewRating((e.target.value))}
                         style={{width: '20%', border: '3px solid grey', padding: '4px', borderRadius: '2px'}}
                       />
                       <HvButton
                         variant="primary"
                         size="xs"
                         style={{marginLeft:'10px',marginBottom:'2px', cursor:'pointer',opacity:'.9'}} 
                         onClick={() => 
                         {
                           if(newRating >= 1 && newRating <= 5)
                           {
                             handleUpdateSkill(skill.id);
                           }
                           else
                           {
                             alert("Please select rating between 1 to 5");
                           }
                         }}> 
                       Update
                       </HvButton>
                       <HvButton
                         variant="secondary"
                         size="xs"
                         style={{ marginLeft: '10px', cursor: 'pointer', backgroundColor: '#CC0000', color: 'white',opacity:'.7'}}
                         onClick={() => setSelectedSkill(null)}
                       >
                         Cancel
                       </HvButton>
                     </div>
                   ) : (
                     <HvButton
                         variant="primary"

                         size="xs"
                         style={{cursor:'pointer',backgroundColor:'#FF8383'}} 
                         onClick={() => setSelectedSkill(skill.id)}
                       > 
                       Edit
                       </HvButton>
                   )}
                 </HvTableCell>
              </HvTableRow>
            ))}
          </HvTableBody>
        </HvTable>
        <div style={{
          position:'absolute',
          top:'348px',
          left:'230px',
          display:'flex',
          flexDirection:'row'
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
          height: '100vh'
        }}
      >
        <div
          style={{
            minHeight: 100
          }}
        >
          <HvHeader style={{
            position: 'relative',
            backgroundColor: '#B41B3A',
            height: '55px'
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
                    width: '200px',
                    height: '100px',
                    cursor: 'pointer'
                  }}
                />
              }
            />
            <HvTypography
              variant="body"
              style={{
                position: 'absolute',
                top: '100px',
                left: '170px',
                fontSize: '20px',
                fontWeight: '500'
              }}
            >
              {/* {console.log(emp)} */}
              Here are {EmpName} skills
            </HvTypography>
            <Link to='/mnghome'>
              <HvTypography
                variant="body"
                style={{
                  height: '24px',
                  position: 'absolute',
                  left: '1200px',
                  top: '16px',
                  bottom: '1185px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                Home
              </HvTypography>
            </Link>
          </HvHeader>
          <img
            src={group56511}
            alt="56511 not found"
            style={{
              position: 'absolute',
              zIndex: 1,
              top: '50px',
              left: '840px',
              height: '550px'
            }}
          />
          <img
            src={eclipse11}
            alt="eclipse11 not found"
            style={{
              position: 'absolute',
              zIndex: 3,
              top: '55px',
              width: '300px'
            }}
          />
          <img
            src={eclipse11}
            alt="eclipse11 not found"
            style={{
              position: 'absolute',
              zIndex: 3
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Skillandcertification;