import React, { useState, useEffect ,useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  HvTableCell,
  HvTypography,
  HvHeader,
  HvHeaderBrand,
  HvTableRow,
  HvTableBody,
  HvTableHeader,
  HvTableHead,
  HvTableContainer,
  HvTable,
  HvButton,
  HvInput,
} from "@hitachivantara/uikit-react-core";
import logo from '../assets/MainPage assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 6.svg';
import group565 from '../assets/MainPage assets/Group 565.svg';
import ellipse11 from '../assets/MainPage assets/Ellipse 11.svg';
import ellipse12 from '../assets/MainPage assets/Ellipse 12.svg';
import { Search } from "@hitachivantara/uikit-react-icons";
import trash from '../assets/MainPage assets/trash.svg'
import { Close } from "@hitachivantara/uikit-react-icons";
import { Start ,End , Forwards , Backwards } from "@hitachivantara/uikit-react-icons";
import './EmpRoutes.css';

export default function SkillTable() {
 
  const {empId}=useParams();
  const empid=parseInt(empId);
  // console.log((empId));
  const [empname,setempname]=useState('');
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [newRating, setNewRating] = useState(''); 
  const [isEditing, setIsEditing] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [employee,setemployee]=useState('');
  const inputRef = useRef(null);
  const handleSearchIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setEditingSkillId(null); 
    setNewRating(''); 
  };
  const handleEditClick = (skillId, currentRating) => {
    setEditingSkillId(skillId);
    setNewRating(currentRating);
    setIsEditing(true);
  };
  const handleRatingChange = (event) => {
    let value = event.target.value;
    setNewRating(value);
    if (value < 1 || value > 5) {
      setRatingError('Rating must be between 1 and 5');
    } else {
      setRatingError('');
    }
    };
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    axios.get(`http://13.234.20.12:8080/api/v1/skillemp/${empid}`)
      .then(response => {
        setSkills(response.data);
        // console.log(response.data);
        setSearchResults(response.data.map((skill) => ({ ...skill, editing: false })));
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  useEffect(()=>{
    axios.get(`http://13.234.20.12:8080/api/v1/employee/${empid}`)
    .then(response=>{
      setemployee(response.data);
      setempname(response.data.empName)
     // console.log(response.data)
    })
    
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  },[]);
  

 const handleRatingSubmit = (skillId) => {
  const skill = skills.find((item) => item.id === skillId);

  skill.proficiencyLevel = newRating;

  axios
    .put(`http://13.234.20.12:8080/api/v1/skillemp/${skillId}`, skill)
    .then((response) => {
      console.log('Skill updated:', response.data);
      setSkills((prevSkills) =>
        prevSkills.map((prevSkill) =>
          prevSkill.id === skillId ? { ...prevSkill, proficiencyLevel: newRating } : prevSkill
        )
      );
      setEditingSkillId(null);
      setNewRating('');
    })
    .catch((error) => {
      console.error('Error updating skill:', error);
    });
};



  const handleDeleteClick = (skillId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this skill');
    if(confirmDelete)
    {
      axios
      .delete(`http://13.234.20.12:8080/api/v1/skillemp/${skillId}`)
      .then((response) => {
        console.log('Skill deleted:', response.data);
        setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
      })
      .catch((error) => {
        console.error('Error deleting skill:', error);
      });
    }
  };
  

  const handleCancelClick = () => {
    setEditingSkillId(null);
    setNewRating('');
    setIsEditing(false); 
  };
  

  useEffect(() => {
    const results = skills.filter((item) =>
      item.skillName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, skills]);

  const totalSkills = searchResults.length;
  const noRecordsFound = searchTerm !== '' && totalSkills === 0;


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(searchResults.length / rowsPerPage);
  // Calculate current page's data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = searchResults.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
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
    <div style={{ position:'fixed' }}>
      <HvHeader position="fixed" style={{ backgroundColor: '#B41B3A', overflow: 'hidden' }}>
        <HvHeaderBrand
          logo={
            <Link to ={`/empmainpage/${empid}`}>
            <img
              src={logo}
              alt="Hitachi Vantara Logo"
              style={{
                position: 'absolute',
                left: '-5px',
                right: '908px',
                top: '-10px',
                bottom: '1109px',
                width: '200px',
                height: '100px',
              }}
            />
            </Link>
          }
        />
        <Link to={`/empprofile`}>
        <HvTypography
          
          style={{
            width: '73px',
            height: '24px',
            position: 'absolute',
            left: '1154px',
            top: '18px',
            bottom: '1185px',
            fontFamily: 'Montserrat Regular 400',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '17px',
            lineHeight: '24px',
            color: '#FFFFFF',
          }}
        >
          Profile
        </HvTypography>
        </Link>
        <Link to={`/empcerttable/${empid}`}>
         
        <HvTypography
         
          style={{
            width: '194px',
            height: '24px',
            position: 'absolute',
            left: '970px',
            top: '18px',
            bottom: '1185px',
            fontFamily: 'Montserrat Regular 400',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '17px',
            lineHeight: '24px',
            color: '#FFFFFF',
          }}
        >
          Upload Certificates
        </HvTypography>
        </Link>
        <Link to={`/empaddskill/${empid}`}>
         
        <HvTypography
         
          style={{
            width: '102px',
            height: '24px',
            position: 'absolute',
            left: '850px',
            top: '18px',
            bottom: '1185px',
            fontFamily: 'Montserrat Regular 400',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '17px',
            lineHeight: '24px',
            color: '#FFFFFF',
          }}
        >
          Add Skills
        </HvTypography>
        </Link>
      </HvHeader>
      <div style={{ position: 'fixed', width: '100%', height: '100vh' }}>
        <img
          alt="Group 565"
          src={group565}
          style={{
            position: 'absolute',
            width: '100%',
            height: '539px',
            right: 0,
            top: 0,
            bottom: 0,
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            opacity: '0.6',
            left: '515px'
          }}
        />
      </div>
      <img
        alt='ellipse'
        src={ellipse11}
        style={{
          position: 'fixed',
          width: '281px',
          height: '281px',
          left: '-199px',
          top: '-66px',

          background: 'linear-gradient(204.17deg, #CF7D8A -36.08%, rgba(255, 255, 255, 0) 205.59%)',
          filter: 'blur(100px)'
        }}
      />
      <img
        alt='ellipse'
        src={ellipse12}
        style={{
          position: 'fixed',
          width: '281px',
          height: '281px',
          left: '-116px',
          top: '494px',

          background: 'linear-gradient(204.17deg, #CF7D8A -36.08%, rgba(255, 255, 255, 0) 205.59%)',
          filter: 'blur(100px)'
        }}
      />
      <HvTypography
        style={{
          position: 'absolute',
          width: '502px',
          height: '57px',
          left: '75px',
          top: '87px',
          fontFamily: 'Montserrat Thin 300',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '30px',
          lineHeight: '37px',
          textAlign: 'center',

          color: '#000000'

        }}
      >Hi {empname}, Your Current skills are
      </HvTypography>
      <HvTableContainer style={{
            position: 'absolute',
            width: '1010px',
            height: '455px',
            left: '105px',
            top: '136px',

          }}>
            
        <HvTable
          variant="default"
          style={{
            border: '1px solid #AC5B5E',
            borderRadius:'30px 30px 0px 0px',
            overflow:'hidden',
            borderCollapse:'unset'
          }}
        >
          
          <HvTableHead>
  <HvTableRow>
    <HvTableHeader style={{ paddingTop: '18px', background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}>
      {noRecordsFound ? (
        <h2 style={{ fontFamily: 'Monsterrat Regular 400', fontSize: '20px',position:'absolute',top:'-5px' }}>Total Skills: 0</h2>
      ) : (
        <h2 style={{ fontFamily: 'Monsterrat Regular 400', fontSize: '20px',position:'absolute',top:'-5px' }}>Total Skills: {totalSkills}</h2>
      )}
    </HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}></HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}></HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}></HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}></HvTableHeader>
  </HvTableRow>
  <HvTableRow>
    <HvTableHeader style={{ height: '50px', background: '#F3E2E3' }}>
      <Search style={{ cursor: 'pointer' }} onClick={handleSearchIconClick} />
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
          left: '80px',
          top: '62px',
          fontFamily: 'Montserrat Thin 100',
          fontStyle: 'normal',
          fontWeight: '250',
          fontSize: '20px',
          lineHeight: '36px',
          color: '#000000',
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
        }}
        placeholder="Search skills"
      />
      {searchTerm && (
        <Close
          style={{
            position: 'absolute',
            cursor: 'pointer',
            left: '210px',
            top: '62px',
          }}
          onClick={handleClearSearch}
        />
      )}
    </HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3' }}></HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3' }}></HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3' }}></HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3' }}></HvTableHeader>
    
  </HvTableRow>
  <HvTableRow hover striped style={{ height: '61px' }}>
    <HvTableHeader style={{ paddingTop: '20px', background: '#F3E2E3', borderTop: '1px solid #AC5B5E' }}>
      Skills
    </HvTableHeader>
    <HvTableHeader style={{ paddingTop: '20px', background: '#F3E2E3', borderTop: '1px solid #AC5B5E' }}>
      Rating
    </HvTableHeader>
    <HvTableHeader style={{ paddingTop: '20px', background: '#F3E2E3', borderTop: '1px solid #AC5B5E' }}>
      Experience
    </HvTableHeader>
    <HvTableHeader style={{ paddingTop: '20px', background: '#F3E2E3', borderTop: '1px solid #AC5B5E' }}>
      Last used
    </HvTableHeader>
    <HvTableHeader style={{ background: '#F3E2E3', borderTop: '1px solid #AC5B5E',paddingTop: '20px' }}>
    </HvTableHeader>
    
    
  </HvTableRow>
</HvTableHead>

          {searchResults.length > 0 && (
             <HvTableBody>
             {currentRows.map((item, index) => (
               <HvTableRow key={index} hover striped style={{ background: '#F3E2E3' }}>
                <HvTableCell style={{ borderTop: '1px solid #AC5B5E' }}>
                  {item.skillName}
                </HvTableCell>
                 <HvTableCell style={{ borderTop: '1px solid #AC5B5E' }}>
                   {item.id === editingSkillId ? (
                    <>
                     <HvInput
                       type="text"
                       autoFocus={true}
                       value={newRating}
                       onChange={handleRatingChange}
                       style={{ width: '50%' }}
                     />
                    {ratingError && <p style={{ color: 'red', margin: '5px 0' }}>{ratingError}</p>}
                    </>
                   ) : 
                   (
                    <span>{item.proficiencyLevel}</span>
                    )
                   }
                 </HvTableCell>
                 <HvTableCell style={{ borderTop: '1px solid #AC5B5E' }}>
                   {item.yearsOfExperience}
                 </HvTableCell>
                 <HvTableCell style={{ borderTop: '1px solid #AC5B5E' }}>
                   {item.lastUsed}
                 </HvTableCell>
                 <HvTableCell style={{ borderTop: '1px solid #AC5B5E', background: '#F3E2E3' }}>
                  {item.id === editingSkillId ? (
                    <div>
                      <HvButton
                        variant="default"
                        onClick={() => handleRatingSubmit(item.id)}
                        style={{ color: 'black', borderRadius: '10px', backgroundColor: '#FF8383' }}
                      >
                        Submit
                      </HvButton>
                      <HvButton
                        variant="default"
                        onClick={() => handleCancelClick()}
                        style={{ color: 'black', borderRadius: '10px', backgroundColor: '#FF8383', marginLeft: '10px' }}
                      >
                        Cancel
                      </HvButton>
                    </div>
                  ) : (
                    <div>
                      <HvButton
                        variant="default"
                        onClick={() => handleEditClick(item.id, item.proficiencyLevel)}
                        style={{ color: 'black', borderRadius: '10px', backgroundColor: '#FF8383' }}
                      >
                        Update
                      </HvButton>
                      <HvButton
                        variant="default"
                        onClick={() => handleDeleteClick(item.id)}
                        style={{ color: 'black', borderRadius: '10px', backgroundColor: '#FF8383', marginLeft: '10px' }}
                      >
                        Delete
                      </HvButton>
                      {/* <img src={trash} alt="not found" 
                      onClick={()=>handleDeleteClick(item.id)}
                      style={{ color: 'black', borderRadius: '10px', backgroundColor: '#FF8383',cursor:'pointer'}}
                      
                      /> */}
                    </div>
                  )}
                </HvTableCell>
               </HvTableRow>
             ))}
           </HvTableBody>
          )}
          {!searchResults.length && (
            <HvTableBody>
              {noRecordsFound ? (
                <HvTableRow>
                  <HvTableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No records found
                  </HvTableCell>
                </HvTableRow>
              ) : (
                <HvTableRow>
                  <HvTableCell colSpan={6} style={{ textAlign: 'center' }}>
                    Total skills: {totalSkills}
                  </HvTableCell>
                </HvTableRow>
              )}
            </HvTableBody>
          )}
        </HvTable>
      </HvTableContainer>
      <div className='table-pagination-pages' style={{
        display:'flex',
        position:'fixed',
        left:'415px',
        top:'540px'
      }}>
        <button onClick={goToFirstPage}
          disabled={currentPage === 1}
          className="first-page-btn">
          <Start />
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="lt">
          <Backwards />
        </button>
        <div className="table-pagination-page-numbers" >
          <span className='current'>{currentPage}</span> / <span>{totalPages}</span>
        </div>
        <button  onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gt">
          <Forwards />
        </button>
        <button  onClick={goToLastPage}
          disabled={currentPage === totalPages}
          className="last-page-btn">
          <End />
        </button>
      </div>
    </div >
  );
}