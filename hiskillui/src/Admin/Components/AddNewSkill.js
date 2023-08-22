import React from 'react';
import rectangle139 from '../assets/Rectangle 139 (1).svg';
import rectangle140 from '../assets/Rectangle 140 (1).svg';
import ellipse6 from '../assets/Ellipse 6 (1).svg';
import ellipse7 from '../assets/Ellipse 7.svg';
import logo from '../assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Previous} from "@hitachivantara/uikit-react-icons";
import {
  HvTypography,
  HvHeader,
  HvHeaderBrand,
  HvInput,
  HvButton,
  HvLoading,
  Styled,
  HvBanner,
} from '@hitachivantara/uikit-react-core';

export default function AddNewSkill() {
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const navigate = useNavigate();
  const [skillName, setSkillName] = useState('');
  const [SkillNameError, setSkillNameError] = useState('');
  const [skillVersion, setSkillVersion] = useState('');
  const [SkillVersionError, setSkillVersionError] = useState('');
  const [cop, setCOP] = useState('');
  const [COPError, setCOPError] = useState('');
  const [subCop, setSubCop] = useState('');
  const [SubCopError, setSubCopError] = useState('');

  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleButtonClick = () => {
    navigate('/admSkills');
  };

  const handleAddSkillSuccess = () => {
    setShowSuccessBanner(true);

    setTimeout(() => {
      setShowSuccessBanner(false);
    }, 2000);
  };

  const handleAddSkillAlert = () => {
    setShowAlertBanner(true);

    setTimeout(() => {
      setShowAlertBanner(false);
    }, 2000);
  };

  const handleSkillNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleSkillVersionChange = (event) => {
    setSkillVersion(event.target.value);
  };

  const handleCOPChange = (event) => {
    setCOP(event.target.value);
  };

  const handleSubCopChange = (event) => {
    setSubCop(event.target.value);
  };
  useEffect(() => {
    const bodyElement = document.body;
    const initialOverflowStyle = bodyElement.style.overflow;
    bodyElement.style.overflow = 'hidden';
  
    return () => {
      bodyElement.style.overflow = initialOverflowStyle;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = {
        skillName,
        skillVersion,
        cop,
        subCop,
      };
      try {
        // Check if skill already exists
        const response = await axios.get(
          'http://13.234.20.12:8080/api/v1/skillmaster'
        );
        const skills = response.data;
        const skillExists = skills.some(
          (skill) => skill.skillName === skillName
        );
        if (skillExists) {
          handleAddSkillAlert();
          return;
        }

        await axios.post(
          'http://13.234.20.12:8080/api/v1/skillmaster',
          formData
        );
        handleAddSkillSuccess();
        setSkillName('');
        setSkillVersion('');
        setCOP('');
        setSubCop('');
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!skillName) {
      setSkillNameError('Skill Name is required');
      isValid = false;
    } else {
      setSkillNameError('');
    }

    if (!skillVersion) {
      setSkillVersionError('Version is required');
      isValid = false;
    } else {
      setSkillVersionError('');
    }

    if (!cop) {
      setCOPError('COP is required');
      isValid = false;
    } else {
      setCOPError('');
    }

    if (!subCop) {
      setSubCopError('SubCop is required');
      isValid = false;
    } else {
      setSubCopError('');
    }
    return isValid;
  };

  const isFormValid = skillName && skillVersion && cop && subCop;

  return (
    <div style={{ overflow: 'hidden', width: '100vw' }}>
      <div style={{ width: '100vw' }}>
        <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
          <HvHeader position="relative" style={{ backgroundColor: '#B41B3A' }}>
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
                    top: '0px',
                    bottom: '1109px',
                    width: '200px',
                    height: '100px',
                  }}
                />
                </Link>
              }
            />
          </HvHeader>

          <img
            alt="rectangle"
            src={rectangle139}
            style={{
              width: '1280px',
              height: '8px',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <img
            alt="rectangle"
            src={rectangle140}
            style={{
              position: 'absolute',
              width: '550px',
              height: '650px',
              left: '390px',
              top: '30px',
            }}
          />

          <img
            alt="ellipse"
            src={ellipse6}
            style={{
              position: 'absolute',
              width: '246px',
              height: '246px',
              left: '930px',
              top: '86px',
              background: '#D17A7C',
              filter: 'blur(100px)',
            }}
          />
          <img
            alt="ellipse7"
            src={ellipse7}
            style={{
              position: 'absolute',
              width: '246px',
              height: '246px',
              left: '125px',
              top: '450px',
              background: '#D17A7C',
              filter: 'blur(100px)',
            }}
          />
          <h3
            style={{
              position: 'absolute',
              width: '594px',
              height: '57px',
              left: '350px',
              top: '140px',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: '30px',
              lineHeight: '37px',
              textAlign: 'center',
              color: '#000000',
            }}
          >
            Enter details here{' '}
          </h3>
          <form onSubmit={handleSubmit}>
            <HvTypography
              variant="body"
              style={{
                position: 'absolute',
                width: '197px',
                height: '24px',
                left: '450px',
                top: '210px',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '20px',
                lineHeight: '24px',
                color: '#000000',
              }}
            >
              Skill Name :
            </HvTypography>
            <div
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                width: '272px',
                height: '52px',
                left: '600px',
                top: '200px',
                border: '1px solid #000000',
                borderRadius: '10px',
              }}
            >
              <HvInput
                type="text"
                style={{
                  width: '272px',
                  height: '52px',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px 0px 14px 20px',
                  backgroundColor: 'transparent',
                }}
                value={skillName}
                onChange={handleSkillNameChange}
              />
              {SkillNameError && (
                <div
                  style={{
                    width: 400,
                    marginLeft: '660px',
                    marginTop: '5px',
                  }}
                ></div>
              )}
            </div>
            <HvTypography
              variant="body"
              style={{
                position: 'absolute',
                width: '225px',
                height: '24px',
                left: '450px',
                top: '290px',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '20px',
                lineHeight: '24px',
                color: '#000000',
              }}
            >
              Skill Version:
            </HvTypography>
            <div
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                width: '272px',
                height: '52px',
                left: '600px',
                top: '280px',
                border: '1px solid #000000',
                borderRadius: '10px',
              }}
            >
              <HvInput
                type="text"
                style={{
                  width: '272px',
                  height: '52px',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px 0px 14px 20px',
                  backgroundColor: 'transparent',
                }}
                value={skillVersion}
                onChange={handleSkillVersionChange}
              />
              {SkillVersionError && (
                <div
                  style={{
                    width: 400,
                    marginLeft: '660px',
                    marginTop: '5px',
                  }}
                ></div>
              )}
            </div>
            <HvTypography
              variant="body"
              style={{
                position: 'absolute',
                width: '190px',
                height: '24px',
                left: '450px',
                top: '370px',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '20px',
                lineHeight: '24px',
                color: '#000000',
              }}
            >
              Cop:
            </HvTypography>
            <div
              style={{
                boxSizing: 'border-box',
                position: 'absolute',
                width: '272px',
                height: '52px',
                left: '600px',
                top: '360px',
                border: '1px solid #000000',
                borderRadius: '10px',
              }}
            >
              <HvInput
                type="text"
                style={{
                  width: '272px',
                  height: '52px',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px 0px 14px 20px',
                  backgroundColor: 'transparent',
                }}
                value={cop}
                onChange={handleCOPChange}
              />
              {COPError && (
                <div
                  style={{
                    width: 400,
                    marginLeft: '660px',
                    marginTop: '5px',
                  }}
                ></div>
              )}
            </div>
            <HvTypography
              variant="body"
              style={{
                position: 'absolute',
                width: '199px',
                height: '24px',
                left: '450px',
                top: '453px',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '20px',
                lineHeight: '24px',
                color: '#000000',
              }}
            >
              SubCop :
            </HvTypography>
            <div
              style={{
                position: 'absolute',
                top: '440px',
              }}
            >
              <HvInput
                id="sc"
                style={{
                  width: '272px',
                  height: '52px',
                  border: '1px solid #000000',
                  borderRadius: '10px',
                  left: '600px',
                  padding: '14px 0px 14px 20px',
                  backgroundColor: 'transparent',
                }}
                value={subCop}
                onChange={handleSubCopChange}
              />
              {SubCopError && (
                <div
                  style={{
                    width: 400,
                    marginLeft: '660px',
                    marginTop: '5px',
                  }}
                ></div>
              )}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '90px',
                right: '1190px',
                height:'10px',
                 marginBottom:'10px',
              }}
            >
              <Link to="/admSkills">
              <Previous
        style={{
  
          size:'50px',
          width:'60px',
         backgroundColor:'#ccc',
          fontSize:'40px',
          color: '#000000',
          paddingBottom:'6px',
          paddingTop:'6px',
          iconSize:'S',
          
          }}
          
          onClick={handleButtonClick} 
        />
        </Link>
            </div>
          
            <HvButton
              type="submit"
              style={{
                backgroundColor: isFormValid ? '#FF8383' : '#ccc',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                position: 'absolute',
                width: '205px',
                height: '45px',
                left: '560px',
                top: '520px',
                borderRadius: '10px',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '20px',
                lineHeight: '24px',
                color: '#000000',
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
              label="New Skill Added Successfully."
              offset={0}
              open
              showIcon
              variant="success"
              style={{
                width: '300px',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
               
              }}
            />
          )}
          {showAlertBanner && (
            <HvBanner
              label="This Skill Already Exists."
              offset={0}
              open
              showIcon
              variant="error"
              style={{
                position: 'fixed',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
