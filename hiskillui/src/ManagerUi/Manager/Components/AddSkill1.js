import React, { useEffect } from 'react'
import logo from '../assets/login assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg'
import group626 from '../assets/login assets/Group 626.svg'
import group617 from '../assets/login assets/Group 617.svg'
import axios from 'axios';
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { HvHeader,HvHeaderBrand,HvTypography,HvCard,HvCardContent,HvDatePicker,HvSlider,HvGlobalActions,
         HvDropdown,HvLoading, HvBanner} from '@hitachivantara/uikit-react-core'
import { useParams } from 'react-router-dom';

function Addskill() {
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [yearsofexperienceError, setYearsOfExperienceError] = useState('');
  const [successBannerVisible, setSuccessBannerVisible] = useState(false);
  const [proficiencyLevel, setProficiencyLevel] = useState(1);
  const [proficiencyLevelError, setProficiencyLevelError] = useState('');
  const [lastUsed, setlastused] = useState('');
  const [lastusedError, setlastusedError] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownError, setDropdownError] = useState('');
  const [recentlyUsedError, setRecentlyUsedError] = useState('');
  const [EmpName,setEmpName]=useState([]);
  const [loading, setLoading] = useState(false);
  const emp=useParams();
  const employeeId=parseInt(emp.empId)
  const navigate = useNavigate();
  useEffect(() => {
    fetchSkillOptions();
  }, []);

  const fetchSkillOptions = () => {
    axios
      .get('http://13.234.20.12:8080/api/v1/skillmaster')
      .then((response) => {  
        const skillNames = response.data.map((skill) => ({
          label: skill.skillName,
          value: skill.skillId,
        }));
        setDropdownOptions(skillNames);
      })
      .catch((error) => {
        console.error('Error fetching skill options:', error);
      });
  };

  useEffect(() => {
    fetch('http://13.234.20.12:8080/api/v1/employee')
      .then(response => response.json())
      .then(data => {
        const empname = data.filter(employee => employee.empId === employeeId);
        setEmpName(empname);    
      })
      .catch(error => console.error('Error:', error));
  }, []);

 
  const handleProficiencyChange = (value) => {
    const parsedValue = parseInt(value, 10);
    setProficiencyLevel(parsedValue);
    };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.value);
  };
   
  const handleRecentlyUsedChange = (date) => {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); 
    if (date > currentDate) {
      setlastused(null);
      setRecentlyUsedError('Please select a valid date'); 
    } else {
      setlastused(date);
      setRecentlyUsedError('');
    }
  };

  const handleYearsOfExperienceChange = (event) => {
    const value = event.target.value;
    if (!Number.isInteger(Number(value))) {
      setYearsOfExperienceError('Only integers are accepted');
    } else {
      setYearsOfExperienceError('');
    }
    setYearsOfExperience(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      
        setLoading(true);
        
        
        const formData = {
        proficiencyLevel,
        lastUsed,
        yearsOfExperience,
        empId:employeeId,
        createdby:null,
        createddate:null,
        updatedby:null,
        updateddate:null,
        skillId: dropdownValue,
      };
      
      axios
        .post('http://13.234.20.12:8080/api/v1/skillemp', formData)
        .then((response) => {
          console.log('Form submitted:', response.data);
          setLoading(false);
          setSuccessBannerVisible(true);
          setTimeout(() => {
            setSuccessBannerVisible(false);
            navigate(`/mngskillandcertification/${employeeId}`)
          }, 2000);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          setLoading(false);
        });
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (yearsOfExperience === '') {
      setYearsOfExperienceError('Years of Experience is required');
      isValid = false;
    } else if (!Number.isInteger(Number(yearsOfExperience))) {
      setYearsOfExperienceError('Only integers are accepted');
      isValid = false;
    } else {
      setYearsOfExperienceError('');
    }
    if (!dropdownValue) {
      setDropdownError('Skill selection is required');
      isValid = false;
    } else {
      setDropdownError('');
    }

    if (!lastUsed) {
      setRecentlyUsedError('Last Used date is required');
      isValid = false;
    } else {
      setRecentlyUsedError('');
    }

    return isValid;
  };
  

     const isFormValid = proficiencyLevel !== '' && dropdownValue !=='' && lastUsed !=='' && yearsOfExperience!=='';
  return (
   
    <>
    
    <div
    style={{
      height: '100vh',
      background: 'linear-gradient(134.23deg, #CF7D8A -28.22%, rgba(252, 233, 236, 0.35) 92.52%)'
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
        bottom: '1185px',
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
          zIndex:3,
          height:'34px',
          top:'53px',
          left:'15px',
          width:'800px',
          fontFamily:'Montserrat',
          fontWeight:'700',
          fontSize:'25px',
          lineHeight:'48px'
          }}
          
          >
          Add Skill of {EmpName.length > 0 ? EmpName[0].empName : 'Employee'} Here
          </HvTypography>
                <img 
                src={group626} 
                alt="group626 not found"
                style={{
                  position:'absolute',
                  zIndex:1,
                  width:'500px',
                  top:'253px'

                }}   
                />
            <img 
            src={group617}
            alt="group 617  not found"
            style={{
              position:'absolute',
              zIndex:2,
              left:'729px',
              width: '551px'
            }}
              />
            
        
      </div>
      </div>
      
      <div
        style={{
          margin: 20,
          marginTop: 20,
          marginLeft: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: '10px',
          position: 'absolute',
          zIndex:'5',
          top:'50px',
          left:'260px',
          
        }}
      >
        <HvCard
          bgcolor="atmo1"
          selectable
          selected
          statusColor="none"
          style={{
            width: 600,
            padding: '20px',
            height: '65vh',
            borderRadius: '70px',
            background: 'radial-gradient(48.05% 48.05% at 25.6% 82.98%, rgba(209, 122, 124, 0.2) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(48.09% 48.36% at 79.19% 22.99%, rgba(209, 122, 124, 0.2) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(46.23% 66.1% at 5.88% 11.01%, #F3E2E3 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(34.16% 52.84% at 96.68% 94.34%, rgba(243, 226, 227, 0.2) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            height:'80%',
          }}
        >
          <HvCardContent>
            <form onSubmit={handleSubmit}>
              <div style={{ marginTop: '50px', marginBottom: '40px', display: 'flex', alignItems: 'center' }}>
                <label
                  htmlFor="dropdown"
                  style={{
                    fontWeight: 'bold',
                    minWidth: '120px',
                  }}
                >
                   Select Skill: 
                </label>
                <div style={{ flex: '1' }}>
                  <HvDropdown
                    id="dropdown"
                    aria-label="With max height"
                    hasTooltips
                    maxHeight={350}
                    showSearch
                    placeholder="Select skill here"
                    values={dropdownOptions}
                    value={dropdownValue}
                    onChange={(event)=>{handleDropdownChange(event)}}
                  />
                </div>
              </div>
              {dropdownError && (
                <div style={{ color: 'red', marginLeft: '10px' }}>{dropdownError}</div>
              )}
              <div
                style={{
                  marginTop: '60px',
                  marginBottom: '50px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <label
                  htmlFor="proficiency"
                  style={{
                    marginRight: '10px',
                    fontWeight: 'bold',
                    minWidth: '120px',
                  }}
                >
                  Rate Skill:
                </label>
                <div style={{ flex: '1' }}>
                  <HvSlider
                    id="proficiency"
                    markStep={1}
                    divisionQuantity={4}
                    maxPointValue={5}
                    minPointValue={1}
                    defaultValues={[1]}
                    value={proficiencyLevel}
                    onChange={handleProficiencyChange}
                    style={{ width: '104%' }}
                    hideInput
                    required
                  />
                </div>
              </div>
              {proficiencyLevelError && (
                <div style={{ color: 'red', marginLeft: '10px' }}>{proficiencyLevelError}</div>
              )}
              <div   style={{
                  marginTop: '70px',
                  marginBottom: '60px',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                   <label
                  htmlFor="lastUsed"
                  style={{
                    marginRight: '10px',
                    fontWeight: 'bold',
                    minWidth: '120px',
                  }}
                >
                  Last Used
                </label>
                <div style={{ flex: '1' }}>
                 <HvDatePicker
                  id='lastUsed'
                  selected={lastUsed}
                  onChange={(date) => handleRecentlyUsedChange(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select date"
                  required
                
                 >
                 
                 </HvDatePicker>
                </div>

              </div>
             
      <div style={{ marginTop: '70px', marginBottom: '60px', display: 'flex', alignItems: 'center' }}>
        <label
          htmlFor="yearsOfExperience"
          style={{
            marginRight: '10px',
            fontWeight: 'bold',
            minWidth: '120px',
          }}
        >
          Years of Experience
        </label>
        <div style={{ flex: '1' }}>
          <input
             type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={yearsOfExperience}
            onChange={handleYearsOfExperienceChange}
            required
            style={{ width: '100%', padding: '5px 10px' }}
          />
        </div>
      </div>
      {yearsofexperienceError && <div style={{ color: 'red', marginLeft: '10px' }}>{yearsofexperienceError}
      </div>}
              <button
                type="submit"
                style={{
                  marginLeft:'230px',
                  backgroundColor: isFormValid ? '#FF8383' : 'grey',
                  color: 'black',
                   padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  position: 'relative',
                }}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <HvLoading label="Loading" />
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
            {successBannerVisible && (
            <HvBanner
              label="New Skill Added Successfully."
              offset={0}
              open
              showIcon
              variant="success"
              style={{
                position: 'fixed',
                top: '58px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
              }}
            />
          )}
          </HvCardContent>
        </HvCard>
      </div>
      </>
  )
}

export default Addskill
