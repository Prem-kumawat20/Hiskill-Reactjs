import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
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
  HvPagination
} from "@hitachivantara/uikit-react-core";
import logo from '../assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg';
import group565 from '../assets/Group 565 (1).svg';
import ellipse11 from '../assets/Ellipse 11.svg';
import ellipse12 from '../assets/Ellipse 12.svg';
import { Search } from "@hitachivantara/uikit-react-icons";
import { Close } from "@hitachivantara/uikit-react-icons";
import { useNavigate } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import { Start ,End , Forwards , Backwards } from "@hitachivantara/uikit-react-icons";
export default function SkillTable1() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const inputRef = useRef(null);
  const handleSearchIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
  };
  useEffect(() => {
    axios.get('http://13.234.20.12:8080/api/v1/skillmaster')
      .then(response => {
        setSkills(response.data);
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);
  useEffect(() => {
    const results = skills.filter((item) =>
      item.skillName && item.skillName.toLowerCase().includes((searchTerm || '').toLowerCase())
    );
    
    let sortedSkills;
    if (sortOrder === "asc") {
      sortedSkills = sortSkillsAscending(results);
    } else if (sortOrder === "desc") {
      sortedSkills = sortSkillsDescending(results);
    } else {
      sortedSkills = [...results]; // No sorting
    }
  
    setSearchResults(sortedSkills);
  }, [searchTerm, skills, sortOrder]);
  const sortSkillsAscending = (skills) => {
    return [...skills].sort((a, b) => a.skillName.localeCompare(b.skillName));
  };
  
  const sortSkillsDescending = (skills) => {
    return [...skills].sort((a, b) => b.skillName.localeCompare(a.skillName));
  };
  
  const handleSortAscending = () => {
    let sortedSkills;
    if (sortOrder === "asc") {
      sortedSkills = [...searchResults].reverse(); 
    } else {
      sortedSkills = sortSkillsAscending(searchResults);
    }
    setSearchResults(sortedSkills);
    setSortOrder("asc");
  };
  const handleSortDescending = () => {
    let sortedSkills;
    if (sortOrder === "desc") {
      sortedSkills = [...searchResults].reverse();
    } else {
      sortedSkills = sortSkillsDescending(searchResults);
    }
    setSearchResults(sortedSkills);
    setSortOrder("desc");
  };
  
  
  useEffect(() => {
    const bodyElement = document.body;
    const initialOverflowStyle = bodyElement.style.overflow;
    bodyElement.style.overflow = 'hidden';
  
    return () => {
      bodyElement.style.overflow = initialOverflowStyle;
    };
  }, []);
  const totalSkills = searchResults.length;
  const noRecordsFound = searchTerm !== '' && totalSkills === 0;
const handleAddSkillsClick = () => {
    navigate('/admAddNewSkill'); 
  };
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6;

  const totalPages = Math.ceil(searchResults.length / rowsPerPage);

  // Calculate current page's data

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
    <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
      <HvHeader position="relative" style={{ backgroundColor: '#B41B3A', overflow: 'hidden' }}>
        <HvHeaderBrand
          logo={
            <Link to='/admHome'>
            <img
              src={logo}
              alt="Hitachi Vantara Logo"
              style={{
                position: 'absolute',
                left: '-5px',
                right: '908px',
                top: '-6px',
                bottom: '1109px',
                width: '200px',
                height: '100px',
              }}
            />
            </Link>
          }
        />
       
      </HvHeader>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <img
          alt="Group 565"
          src={group565}
          style={{
            position: 'absolute',
            width: '50%',
            height: '539px',
            right: 0,
            top: 0,
            bottom: 0,
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            opacity: '0.6',
            left: '655px'
          }}
        />
      </div>
      <img
        alt='ellipse'
        src={ellipse11}
        style={{
          position: 'absolute',
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
          position: 'absolute',
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
          width: '600px',
          height: '57px',
          left: '70px',
          top: '100px',
          fontFamily: 'Montserrat Thin 300',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '30px',
          lineHeight: '37px',
          // textAlign: 'center',
          color: '#000000'
        }}

      >Hi, Current skills in the organisation are
      </HvTypography>
      <div style={{ width: '1010px', overflowX: 'auto' }}>
      <HvTableContainer style={{
            position: 'absolute',
            width: '1010px',
            height: '455px',
            left: '105px',
            top: '155px',
            overflowX: 'hidden',
            paddingBottom: '8px',
          }}>
        <HvTable 
          variant="default"
          style={{
         border: '1px solid #',
      
       
          }}
        >
          <HvTableHead >
          
          <HvTableRow >
          <HvTableHeader style={{
            paddingTop:'0px',
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E',
            borderTop:'1px solid #AC5B5E',
            borderLeft:'1px solid #AC5B5E',

          }}>
    {noRecordsFound ? (
  <h2 style={{
    fontFamily:'Monsterrat Regular 400',
    fontSize:'20px'
  }}>Total Skills: 0</h2>
) : (
  <h2 style={{
    fontFamily:'Monsterrat Regular 400',
    fontSize:'20px',
  }}>Total Skills: {totalSkills}</h2>
)}
  </HvTableHeader>
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E',
            borderTop:'1px solid #AC5B5E',
            
          }}></HvTableHeader>
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E',
            borderTop:'1px solid #AC5B5E'
          }}></HvTableHeader>
              <HvTableHeader style={{
            background: '#F3E2E3',
            width:'100px',
            borderBottom:'1px solid #AC5B5E',
            borderTop:'1px solid #AC5B5E',
           
          }}></HvTableHeader>
          <HvTableHeader style={{
          background: '#F3E2E3',
          borderBottom:'1px solid #AC5B5E',
          borderTop:'1px solid #AC5B5E',
         borderRight:'1px solid #AC5B5E',
          justifyContent: 'flex-end',
          width:'50px',
          }}>
<HvButton
style={{
      marginRight: '300px',
      width: '50px',
      height: '35px',
      borderRadius: '10px',
      background: '#FF8383',
      padding: '0',
}}

>
<div style={{ color: '#FFFFFF', fontSize: '13px', marginLeft: '13px',marginRight: '20px', marginTop: '7.5px' }}>
  <Link to='/admAddNewSkill'>
  Add Skills
  </Link>
  </div>

</HvButton>
</HvTableHeader>
            </HvTableRow>
            <HvTableRow >
              <HvTableHeader style={{
                height:'50px',
                background: '#F3E2E3',
                 borderBottom:'1px solid #AC5B5E',
                 borderLeft:'1px solid #AC5B5E'
              }}>
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
      top: '65px',
      fontFamily: 'Montserrat Thin 100',
      fontStyle: 'normal',
      fontWeight: '250',
      fontSize: '20px',
      lineHeight: '36px',
      color: '#000000',
     border:'none',
      outline:'none',
      backgroundColor:'transparent'
    }}
    placeholder="Search skills"
  />
  {searchTerm && (
          <Close style={{
            position: 'absolute',
            cursor:'pointer',
            left: '210px',
            top: '62px',
          }}
            onClick={handleClearSearch}
          />
          )}
</HvTableHeader>
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E'
          }}></HvTableHeader>
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E'
          }}></HvTableHeader>
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E'
          }}></HvTableHeader>
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E'
          }}></HvTableHeader>
            </HvTableRow>
            <HvTableRow
            hover
            striped
            style={{
              height:'61px',
            }}
            >
              <HvTableHeader style={{
                paddingTop:'20px',
                background: '#F3E2E3',
                border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'100px',
                position:'relative',
                borderLeft:'1px solid #AC5B5E',
              }}>
                
                SkillName 
                <button
                    style={{ fontSize: '9px', cursor: 'pointer', border: 'none', background: 'transparent', color: '#000000', outline: 'none',marginLeft:'0px',marginBottom:'30px',position:'absolute' }}
                    onClick={handleSortAscending}
                  >
                    &#9650;
                  </button>
                  <button
    style={{ fontSize: '9px', marginBottom: '0px', marginLeft: '0px',marginTop:'10px', cursor: 'pointer', border: 'none', background: 'transparent', color: '#00000', outline: 'none',position:'absolute' }}
    onClick={handleSortDescending}
  >
    &#9660;
  </button>
              </HvTableHeader>
              <HvTableHeader style={{
                paddingTop:'20px',
                background: '#F3E2E3',
                border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'180px'
              }}>
                SkillVersion
              </HvTableHeader>
              <HvTableHeader style={{
                paddingTop:'20px',
                background: '#F3E2E3',
                border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'180px'  

              }}>
                COP
              </HvTableHeader>
              <HvTableHeader style={{
                paddingTop:'20px',
                background: '#F3E2E3',
                border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'180px'
              }}>
                SubCop
              </HvTableHeader>
              <HvTableHeader style={{
                background: '#F3E2E3',
                border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none'
              }}>
               </HvTableHeader>
             
            </HvTableRow>

          </HvTableHead>
          {searchResults.length > 0 && (
            <HvTableBody >
            
            {currentRows.map((item, index) => (
                <HvTableRow key={index} hover striped style={{ background: '#F3E2E3', border: '1px solid #AC5B5E' }}>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'100px'}}>{item.skillName}</HvTableCell>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'180px'}}>{item.skillVersion}</HvTableCell>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'180px'}}>{item.cop}</HvTableCell>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'180px'}}>{item.subCop}</HvTableCell>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                }}>
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

top:'550px'



}}>

<button onClick={goToFirstPage} disabled={currentPage === 1} className="first-page-btn">
  <Start />
</button>
<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="lt">
  <Backwards />
</button>
<div className="table-pagination-page-numbers">
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
      
    </div >
  );
}

