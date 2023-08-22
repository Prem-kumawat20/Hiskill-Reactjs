import React, { useEffect, useState,useRef} from 'react'
import axios from 'axios';
import ellipse11 from '../assets/MainPage assets/Ellipse 11.svg';
import ellipse12 from '../assets/MainPage assets/Ellipse 12.svg';
import group565 from '../assets/MainPage assets/Group 565.svg'
import { Search } from "@hitachivantara/uikit-react-icons";
import { Close } from "@hitachivantara/uikit-react-icons";
import { Start ,End , Forwards , Backwards } from "@hitachivantara/uikit-react-icons";
import { Link } from 'react-router-dom'
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
import { useParams } from 'react-router-dom';
function CertificationView() {
  const {empId}=useParams();
  const empid=parseInt(empId);
  console.log((empId));

  const [certfn,setcertfn]=useState([]);
  const [totalcertfn,settotalcertn]=useState('');
  const [empname,setempname]=useState('');
  const inputRef = useRef(null);
  const handleSearchIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(()=>{
   axios.get(`http://13.234.20.12:8080/api/v1/certification/${empid}`)
    .then(response=>{
      const lengths=response.data.length;
      setcertfn(response.data);
      settotalcertn(lengths);
      console.log(response.data);
      
    })
    .catch(error=>{
      console.log('Error fetching skills:',error);
    })
  },[]);

  useEffect(()=>{
    axios.get(`http://13.234.20.12:8080/api/v1/employee/${empid}`)
    .then(response=>{

      setempname(response.data.empName)
      console.log(response.data)
    })
    
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  },[]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
 
  const filteredCertifications = certfn.filter((cert) => {
    const nameMatches = cert.certificationName.toLowerCase().startsWith(searchTerm.toLowerCase());
    const urlMatches = cert.certificationUrl.toLowerCase().startsWith(searchTerm.toLowerCase());
    const dateMatches = cert.expiredDate.toLowerCase().startsWith(searchTerm.toLowerCase());
    return nameMatches || urlMatches || dateMatches;
  });
  
  

  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredCertifications.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentCertifications = filteredCertifications.slice(indexOfFirstRow, indexOfLastRow);
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
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  
  return (
    <div style={{ position:'fixed'  }}>
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
        <Link to='/empprofile'>
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
          width: '602px',
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
      >Hi {empname} Your Current Certification are
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
            border:'1px solid #AC5B5E',
            // borderRadius:'30px 30px 0px 0px',
            // overflow:'hiddden',
            borderCollapse:'unset'
          }}
        >
          <HvTableHead>
              <HvTableRow>
                   <HvTableHeader style={{ paddingTop: '18px', background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}>
                 {!totalcertfn ? (
                 <h2 style={{ fontFamily: 'Monsterrat Regular 400', fontSize: '20px',position:'absolute',top:'-5px' }}>Total Certifications:0</h2>
                 ):(
                  <h2 style={{ fontFamily: 'Monsterrat Regular 400', fontSize: '20px',position:'absolute',top:'-5px' }}>Total Certifications : {totalcertfn}</h2>
                  )}
                  </HvTableHeader>
                  <HvTableHeader style={{ background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}></HvTableHeader>
                  <HvTableHeader style={{ background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}></HvTableHeader>
                  <HvTableHeader style={{ background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}></HvTableHeader>
                  {/* <HvTableHeader style={{ background: '#F3E2E3', borderBottom: '1px solid #AC5B5E' }}></HvTableHeader> */}
                  
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
                        placeholder="Search "
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
                    {/* <HvTableHeader style={{ background: '#F3E2E3' }}></HvTableHeader> */}
                    
                  </HvTableRow>
                    <HvTableRow hover striped style={{ height: '61px' }}>
                    <HvTableHeader style={{ paddingTop: '20px', background: '#F3E2E3', borderTop: '1px solid #AC5B5E' }}>
                      Certification Name
                    </HvTableHeader>
                    <HvTableHeader style={{ paddingTop: '20px', background: '#F3E2E3', borderTop: '1px solid #AC5B5E' }}>
                      Certification Url
                    </HvTableHeader>
                    <HvTableHeader style={{ paddingTop: '20px', background: '#F3E2E3', borderTop: '1px solid #AC5B5E' }}>
                      expired Date
                    </HvTableHeader>
                    <HvTableHeader style={{ paddingTop: '20px', background: '#F3E2E3', borderTop: '1px solid #AC5B5E' }}></HvTableHeader>              
              </HvTableRow>

               </HvTableHead>     
         
          {totalcertfn > 0 && (
            <HvTableBody>
            {currentCertifications.map((cert,index)=>(
               <HvTableRow key={index} hover striped style={{ background: '#F3E2E3',height:'45px' }}>
                 <HvTableCell style={{ borderTop: '1px solid #AC5B5E' }}> {cert.certificationName} </HvTableCell>
                 <HvTableCell style={{ borderTop: '1px solid #AC5B5E' }}> {cert.certificationUrl} </HvTableCell>
                 <HvTableCell style={{ borderTop: '1px solid #AC5B5E' }}> {cert.expiredDate} </HvTableCell>
                 <HvTableCell style={{ borderTop: '1px solid #AC5B5E' }}> </HvTableCell>
                 </HvTableRow>
            ))

          }
             
            </HvTableBody>
          )
        }    
         

        </HvTable> 

      </HvTableContainer>
      <div style={{
        display:'flex',
        position:'fixed',
        left:'405px',
        top:'550px'
      }}>
        <button onClick={goToFirstPage}
          disabled={currentPage === 1}
         >
          <Start />
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          >
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
    </div>
  )
}

export default CertificationView

