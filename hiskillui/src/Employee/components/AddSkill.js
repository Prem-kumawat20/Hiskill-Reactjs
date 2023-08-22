import rectangle139 from '../assets/MainPage assets/Rectangle 139.svg';
import rectangle140 from '../assets/MainPage assets/Rectangle 140.svg';
import ellipse6 from '../assets/MainPage assets/Ellipse 6.svg';
import logo from '../assets/MainPage assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 6.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import axios  from 'axios';
import {HvTypography,HvHeader,HvHeaderBrand,HvDropdown,HvDatePicker,HvInput,HvButton,HvLoading,HvSlider,HvBanner}
  from '@hitachivantara/uikit-react-core';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import { useParams } from 'react-router-dom';
export default function AddSkillDemo({responseData}) {
    const {empId}=useParams();
    const empid=parseInt(empId);
    const [skillexist,setskillexist]=useState([]);
    const [proficiencyLevel, setProficiencyLevel] = useState();
    const [lastUsed, setlastused] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [yearsOfExperienceError, setYearsOfExperienceError] = useState('');
    const [SkillDropdownValue, setSkillDropdownValue] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentlyUsedError, setRecentlyUsedError] = useState('');
    const [showSuccessBanner,setShowSuccessBanner] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);

  
    useEffect(() => {
      fetchSkillOptions();
    }, []);
    
    const username = 'one';
    const password = 'one';
    const fetchSkillOptions = () => {
      axios
        .get('http://13.234.20.12:8080/api/v1/skillmaster',
        {
            headers:{
              auth : {
                username : username,
                password : password,  
            }
            }
        }
        )
        .then((response) => {
          console.log(response.data);
          const skillNames = response.data.map((skill) => ({
            label: skill.skillName,
            value: skill.skillId,
          }));
          setDropdownOptions(skillNames);
        })
        .catch((error) => {
          console.error('Error fetching skill options:', error);
        });
      }
     
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
      
    const navigate = useNavigate();

    const handleProficiencyChange = (value) => {
      const parsedValue = parseInt(value, 10);
      setProficiencyLevel(parsedValue);
      };

  
    const handleSkillDropdownChange = (event) => {
      setSkillDropdownValue(event.value);
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
      
    useEffect(()=>{
      axios
      .get(`http://13.234.20.12:8080/api/v1/skillemp/${empid}`)
       .then((response)=>{
        setskillexist(response.data);
       })
       .catch((error) => {
        console.error('Error submitting form:', error);
        
      });
    })
      const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
          setLoading(true);
          setProficiencyLevel(1);
          setlastused(null);
          setSkillDropdownValue(null);
          setYearsOfExperience('')
          console.log(responseData)
          const formData = {
            proficiencyLevel,
            lastUsed,
            empId: empid,
            createdby: null,
            createddate: null,
            updatedby: null,
            updateddate: null,
            skillId: SkillDropdownValue,
            yearsOfExperience,
          };
               
          const doesSkillExist = skillexist.some((skill) => skill.skillId === SkillDropdownValue);
          console.log(doesSkillExist)
          if (doesSkillExist) {
            alert('This skill is already present.'); // Show an alert message
            setLoading(false);
            
            return; // Stop form submission
          }
                  
          axios
            .post('http://13.234.20.12:8080/api/v1/skillemp', formData)
            .then((response) => {
              console.log('Form submitted:', response.data);
              setLoading(false);
              setShowSuccessBanner(true);
              
              setTimeout(() => {
                setShowSuccessBanner(false);
                navigate(`/empskilltable/${empid}`)
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
      return isValid;
    };
    // Inside the component, before the return statement
      

    const isFormValid = proficiencyLevel !== '' && lastUsed && SkillDropdownValue !== '' && yearsOfExperience !== '';

  return (
    <div style={{overflow:'hidden', width: '100%'}}>
      <div style={{ width: '100vw'}}>
        <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
          <HvHeader position="fixed" style={{ backgroundColor: '#B41B3A' }}>
            <HvHeaderBrand
              logo={
                <Link to={`/empmainpage/${empid}`}>
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
            <Link to = '/empprofile'>
            <HvTypography
              variant="body"
              className="hvtypo-profile"
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
            <Link to={`/empskilltable/${empid}`}>
           <HvTypography
              variant="body"
              style={{
                width: '133px',
                height: '24px',
                position: 'absolute',
                left: '1025px',
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
              Current Skills
            </HvTypography>
           </Link>
          </HvHeader>
          <img
            alt="rectangle"
            src={rectangle139}
            style={{width: '100%', height: 'calc(100vh + 100px)', objectFit: 'cover', objectPosition: 'center', }}
          />
          <img
            alt='rectangle'
            src={rectangle140}
            style={{ position: 'absolute', width: '800px', height: '550px', left: '250px', top: '110px' }}
          />
          <img
            alt='ellipse'
            src={ellipse6}
            style={{ position: 'absolute', width: '246px', height: '246px', left: '930px', top: '86px', background: '#D17A7C', filter: 'blur(100px)' }}
          />
          <h3 style={
        {
          position: 'absolute',
          width: '594px',
              height: '57px',
              left: '343px',
              top: '146px',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: '30px',
              lineHeight: '37px',
              textAlign: 'center',
              color: '#000000'
            }
          }>Enter details here </h3>
          <form onSubmit={handleSubmit}>
           <HvTypography
            variant="body"
            style={{
              position: 'absolute',
              width: '197px',
              height: '24px',
              left: '354px',
              top: '250px',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Skill Name :
        </HvTypography>
          <div style={{
            flex: '1',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            gap: '10px',
            position: 'absolute',
            width: '272px',
            height: '52px',
            left: '653px',
            top: '226px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
            <HvDropdown
              id="skill-name"
              aria-label="With max height"
              hasTooltips
              maxHeight={350}
              showSearch
              placeholder="Select skill here"
              values={dropdownOptions}
              value={SkillDropdownValue}
              onChange={(event)=>{handleSkillDropdownChange(event)}}
            />
          </div>
          <HvTypography
            variant="body"
            style={{
              position: 'absolute',
              width: '225px',
              height: '24px',
              left: '354px',
              top: '331px',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Proficiency :
          </HvTypography>
          <div style={{
            flex: '1',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            position: 'absolute',
            width: '272px',
            height: '52px',
            left: '653px',
            top: '320px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
          <HvSlider
                    id="proficiency"
                    markStep={1}
                    divisionQuantity={4}
                    maxPointValue={5}
                    minPointValue={1}
                    defaultValues={[0]}
                    value={proficiencyLevel}
                    onChange={handleProficiencyChange}
                    style={{ width: '104%',paddingTop:'10px',paddingBottom:'10px' }}
                    hideInput
                    required
                  />
          </div>
          <HvTypography
            variant="body"
            style={{
              position: 'absolute',
              width: '190px',
              height: '24px',
              left: '354px',
              top: '422px',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
            >Recently Used :
          </HvTypography>
          <div style={{
            flex: '1',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '14px 0px 14px 20px',
            gap: '40px',
            position: 'absolute',
            width: '272px',
            height: '52px',
            left: '653px',
            top: '416px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
            <HvDatePicker
              aria-label="Date"
              id="recentlyUsed"
              locale="en-US"
              placeholder="Select the date"
              status="standBy"
              placement="right"
              onChange={(date) => handleRecentlyUsedChange(date)}
              onCancel={() => setlastused(null)}
              onClear={() => setlastused(null)}
              style={{ width: '230px', top: '-5px' }}
            />
            {recentlyUsedError && (
            <div
            style={{
              width: 400,
              marginLeft:'-12px',
              position:'absolute',
              top:'55px'
            }}
          >
            <HvTypography
              variant="body"
              style={{
                color:'#B41B3A',
                fontWeight:500,
              }}
            >
              *** Select valid date
            </HvTypography>
          </div>
            )}
          </div>
          
          <label
            
            htmlFor='YoE'
            style={{
              position: 'absolute',
              width: '199px',
              height: '24px',
              left: '354px',
              top: '520px',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000',
              textDecoration: 'none' 
              
            }}
            >Years of Experience :
          </label>
          <div style={{
            position: 'absolute',
            flex:'1',
            top: '510px'
          }}>
          

            <input
            type='number'
            min="0"
            max="15"
            id="YoE"
            placeholder="Enter years of experience "
            style={{
                position:'absolute',
                width: '272px',
                height: '42px',
                border: '1px solid #000000',   
                borderRadius: '10px',
                left: '653px',
                padding: '14px 0px 14px 20px',
                backgroundColor: 'transparent'
            }}
            value={yearsOfExperience}
            onChange={handleYearsOfExperienceChange}
            />
            {yearsOfExperienceError && (
            <div
            style={{
              width: 400,
              marginLeft:'660px',
              marginTop:'5px'
            }}
          >
            <HvTypography
              variant="body"
              style={{
                color:'#B41B3A',
                fontWeight:500
              }}
            >
              *** Only numbers are accepted 
            </HvTypography>
          </div>
            )}
            </div>
          <HvButton 
          type='submit'
          style={{
            backgroundColor: isFormValid? '#FF8383' : '#ccc',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            position: 'absolute',
            width: '205px',
            height: '45px',
            left: '537px',
            top: '590px',
            borderRadius: '10px',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '20px',
            lineHeight: '24px',
            color: '#000000'
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
        </HvButton>
        </form>
        {showSuccessBanner && (
           <HvBanner
           label="New skill added successfully"
           offset={0}
           open
           showIcon
           variant="success"
           onClose={()=>setShowSuccessBanner(false)}
         />
          )}

      </div>
    </div>
    </div >
  )
}