
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
  HvButton
} from "@hitachivantara/uikit-react-core";
import logo from '../assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg';
import group565 from '../assets/Group 565 (1).svg';
import ellipse11 from '../assets/Ellipse 11.svg';
import ellipse12 from '../assets/Ellipse 12.svg';
import { Search } from "@hitachivantara/uikit-react-icons";
import { Close } from "@hitachivantara/uikit-react-icons";
import { Start ,End , Forwards , Backwards } from "@hitachivantara/uikit-react-icons";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function CertificateTable() {  
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedRows, setExpandedRows] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  

  
  
  const handleToggleDescription = (index) => {
    const newExpandedRows = [...expandedRows];
    if (newExpandedRows.includes(index)) {
      const indexToRemove = newExpandedRows.indexOf(index);
      newExpandedRows.splice(indexToRemove, 1);
    } else {
      newExpandedRows.push(index);
    }
    setExpandedRows(newExpandedRows);
  };
  

const navigate=useNavigate();
  const inputRef = useRef(null);
  const handleSearchIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleSearchChange = (e) => {
    const value = e?.target?.value??'';
    setSearchTerm(value);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
  };
  

  useEffect(() => {
    axios.get('http://13.234.20.12:8080/api/v1/CertificationSet')
      .then(response => {
       setCertificates(response.data);
      })
      .catch(error => {
         console.error('Error fetching certificates:', error);
         });
        }, []);
  useEffect(() => {
    const results = certificates.filter((item) =>
        item.certificateName && item.certificateName.toLowerCase().includes((searchTerm || '').toLowerCase())
        );
setSearchResults(results);

const sortedCertificates = results.sort((a, b) => {
  if (sortOrder === "asc") {
    return a.certificateName.localeCompare(b.certificateName);
  } else {
    return b.certificateName.localeCompare(a.certificateName);
  }
});
}, [searchTerm, certificates,sortOrder]);
useEffect(() => {
  const bodyElement = document.body;
  const initialOverflowStyle = bodyElement.style.overflow;
  bodyElement.style.overflow = 'hidden';

  return () => {
    bodyElement.style.overflow = initialOverflowStyle;
  };
}, []);

const handleSortToggle = () => {
  if (sortOrder === "asc") {
    setSortOrder("desc");
  } else {
    setSortOrder("asc");
  }
};

  const totalCertificates = searchResults.length;
  const noRecordsFound = searchTerm !== '' && totalCertificates === 0;
  const handleAddCertificatesClick = () => {
    navigate('/admAddCertificate'); 
  };
   

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const totalPages = Math.ceil(searchResults.length / rowsPerPage);

  // Calculate current page's data

 // Calculate current page's data
const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;
const currentRows = searchResults.slice(indexOfFirstRow, indexOfLastRow);

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
                top: '-10px',
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
          width: '700px',
          height: '57px',
          left: '82px',
          top: '100px',
          fontFamily: 'Montserrat Thin 300',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '30px',
          lineHeight: '37px',
          textAlign: 'center',
          color: '#000000'
        }}
      >Hi, Current certifications in the organisation are
      </HvTypography>
      <div style={{ height: 'calc(100vh - 350px)', overflow: 'auto' }}>
      
      <HvTableContainer style={{
            position: 'absolute',
            width: '1000px',
            height: '455px',
            left: '105px',
            top: '138px',
            overflowX: 'hidden',
            paddingBottom: '60px',
           
          }}>
        <HvTable
          variant="default"
          style={{
        border: '1px solid #AC5B5E',
        borderBottom:'1px solid #AC5B5E'
          }}
        >
          <HvTableHead >
          <HvTableRow >
          <HvTableHeader style={{
            
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E',
            borderTop:'1px solid #AC5B5E',
            paddingBottom:'9px'
          }}>
    {noRecordsFound ? (
  <h2 style={{
    fontFamily:'Monsterrat Regular 400',
    fontSize:'15px'
  }}>Total Certificates: 0</h2>
) : (
  <h2 style={{
    fontFamily:'Monsterrat Regular 400',
    fontSize:'20px',
    width : '200px'
  }}>Total Certificates: {totalCertificates}</h2>
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
            borderBottom:'1px solid #AC5B5E',
            borderTop:'1px solid #AC5B5E'
          }}></HvTableHeader>
          
          
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E',
            borderTop:'1px solid #AC5B5E',
            width:'700px'
          }}>           
            <HvButton
  style={{
    marginTop: '8px',
    marginLeft: '130px',
    width: '130px',
    height: '30px',
    borderRadius: '10px',
    background: '#FF8383',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom:'0px'
  }}
>
  
  <div style={{ color: '#FFFFFF', fontSize: '15px', marginLeft: '2px', marginTop: '9px',marginbottom:'1px' }}>
    <Link to='/admAddCertificate'>
    Add Certificates
    </Link>
    </div>
</HvButton>
{certificates.map((certificate) => (
        <div key={certificate.name}>{certificate.name}</div>
      ))}      
          </HvTableHeader>
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E',
          }}>
          </HvTableHeader>
          <HvTableHeader style={{
background: '#F3E2E3',
borderBottom:'1px solid #AC5B5E',
}}></HvTableHeader>
            </HvTableRow>
            <HvTableRow >
              <HvTableHeader style={{
                height:'50px',
                background: '#F3E2E3',
               borderBottom:'1px solid #AC5B5E'
                
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
      width: '300px',
      height: '26px',
      left: '70px',
      top: '68px',
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
    placeholder="Search certificates"
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
              <HvTableHeader style={{
            background: '#F3E2E3',
            borderBottom:'1px solid #AC5B5E'
          }}></HvTableHeader>
                    <HvTableHeader style={{
           background: '#F3E2E3',
           borderBottom:'1px solid #AC5B5E',
           borderRadius:'1px solid #AC5B5E'
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
                 paddingLeft:'40px',
                 position:'relative'
              }}>
                CertificateName
                <button
                    style={{ fontSize: '9px', cursor: 'pointer', border: 'none', background: 'transparent', color: ' #000000', outline: 'none',marginLeft:'-3px',marginBottom:'30px',position:'absolute' }}
                    onClick={handleSortToggle}
                  >
                    &#9650;
                  </button>
                  <button
    style={{ fontSize: '9px', marginBottom: '0px', marginLeft: '-3px',marginTop:'10px', cursor: 'pointer', border: 'none', background: 'transparent', color: ' #000000', outline: 'none',position:'absolute' }}
    onClick={handleSortToggle}
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
                paddingLeft:'50px'
              }}>
                Description
              </HvTableHeader>
              <HvTableHeader style={{
                paddingTop:'20px',
                background: '#F3E2E3',
                border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'100px'
              }}>
                COP
              </HvTableHeader>
              <HvTableHeader style={{
                paddingTop:'20px',
                background: '#F3E2E3',
                border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'100px'
              }}>
                SubCop
              </HvTableHeader>
              <HvTableHeader style={{
paddingTop:'20px',
background: '#F3E2E3',
border:'1px solid #AC5B5E',
borderRight:'none',
borderLeft:'none',
paddingLeft:'100px'
}}>
Vendor
</HvTableHeader>
<HvTableHeader style={{
background: '#F3E2E3',
border:'1px solid #AC5B5E',
borderRight:'none',
borderLeft:'none'
}}>
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
            <HvTableBody>
              {currentRows.map((item, index) => (
                <HvTableRow key={index} hover striped style={{ background: '#F3E2E3', border: '1px solid #AC5B5E' }}>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'50px'}}>{item.certificateName}</HvTableCell>
                  <HvTableCell style={{border:'1px solid #AC5B5E', borderRight:'none',borderLeft:'none'}}>
                  {expandedRows.includes(index) ? (
              item.description
            ) : (
              <>
                {item.description && item.description.split(' ').slice(0, 3).join(' ')}
                {item.description && item.description.split(' ').length > 3 ? (
                  <button onClick={() => handleToggleDescription(index)} style={{ cursor: 'pointer', border: 'none', background: 'transparent', outline: 'none' }}>
                    ...
                  </button>
                ) : null}
              </>
            )}
                </HvTableCell>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'100px'}}>{item.cop}</HvTableCell>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'100px'}}>{item.subCop}</HvTableCell>
                <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none',
                paddingLeft:'100px'}}>{item.vendor}</HvTableCell>
                  <HvTableCell style={{border:'1px solid #AC5B5E',
                borderRight:'none',
                borderLeft:'none'}}>
                  </HvTableCell>
                  <HvTableCell style={{
                    border:'1px solid #AC5B5E',
                    borderRight:'none',
                    borderLeft:'none'
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
                    Total certificates: {totalCertificates}
                  </HvTableCell>
                </HvTableRow>
              )}
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
                      Total certificates: {totalCertificates}
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
      </div>
   
  );
}





