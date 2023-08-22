import React from 'react';
import rectangle139 from '../assets/Rectangle 139 (1).svg';
import rectangle140 from '../assets/Rectangle 140 (1).svg';
import ellipse6 from '../assets/Ellipse 6 (1).svg';
import logo from '../assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg';
import ellipse7 from '../assets/Ellipse 7.svg'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { Link } from 'react-router-dom';
import {Previous} from "@hitachivantara/uikit-react-icons";
import {HvTypography,HvHeader,HvHeaderBrand,HvInput,HvButton,HvLoading,HvBanner} from '@hitachivantara/uikit-react-core';

export default function AddCertificate() {
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const navigate = useNavigate();
  const [certificateName, setCertificateName] = useState('');
  const [CertificateNameError, setCertificateNameError] = useState('');
  const [description, setDescription] = useState();
  const [DescriptionError, setDescriptionError] = useState('');
  const [cop, setCOP] = useState();
  const [COPError, setCOPError] = useState('');
  const [subCop, setSubCop] = useState();
  const [SubCopError, setSubCopError] = useState('');
  const [vendor, setVendor] = useState();
  const [VendorError, setVendorError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleButtonClick = () => {
    navigate('/admCertificates');
  }
  const handleAddCertificateSuccess = () => {
    setShowSuccessBanner(true);

    setTimeout(() => {
      setShowSuccessBanner(false);
    }, 2000);
  };

  const handleAddCertificateAlert = () => {
    setShowAlertBanner(true);

    setTimeout(() => {
      setShowAlertBanner(false);
    }, 2000);
  };

  const handleCertificateNameChange = (event) => {
    setCertificateName(event.target.value);
  };
  
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  
  const handleCOPChange = (event) => {
    setCOP(event.target.value);
  };

  const handleSubCopChange = (event) => {
    setSubCop(event.target.value);
  };
  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };
  useEffect(() => {
    const bodyElement = document.body;
    const initialOverflowStyle = bodyElement.style.overflow;
    bodyElement.style.overflow = 'hidden';
  
    return () => {
      bodyElement.style.overflow = initialOverflowStyle;
    };
  }, []);
  
  const handleSubmit =async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = {
       certificateName,
        description,
        cop,
        subCop,
        vendor
      };
   
      try {
        const response = await axios.get(
          'http://13.234.20.12:8080/api/v1/CertificationSet'
        );
        const certificates = response.data;
        const certificateExists = certificates.some(
          (certificate) => certificate.certificateName === certificateName
        );
        if (certificateExists) {
          handleAddCertificateAlert();
          return;
        }

        await axios.post(
          'http://13.234.20.12:8080/api/v1/CertificationSet',
          formData
        );
        handleAddCertificateSuccess();
        setShowSuccessBanner(true);
        setCertificateName('');
        setDescription('');
        setCOP('');
        setSubCop('');
        setVendor('');
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  const validateForm = () => {
    let isValid = true;

    if (!certificateName) {
      setCertificateNameError('Certificate Name is required');
      isValid = false;
    } else {
      setCertificateNameError('');
    }

    if (!description) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!cop) {
      setCOPError('COPis required');
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

    if (!vendor) {
        setVendorError('Vendor is required');
        isValid = false;
      } else {
        setVendorError('');
      }
    return isValid;
  };
  const isFormValid = certificateName && description && cop && subCop && vendor;
  return (
    <div style={{overflow:'hidden', width: '100vw'}}>
      <div style={{ width: '100vw'}}>
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
            <img
            alt="rectangle"
            src={rectangle139}
            style={{ width: '1280px', height: '8px',objectFit: 'cover', objectPosition: 'center', }}
          />
          <img
            alt='rectangle'
            src={rectangle140}
            style={{ position: 'absolute', width: '600px', height: '630px',left :'338px', top: '50px',bottom :'20px'}}
          />

          <img
            alt='ellipse'
            src={ellipse6}
            style={{ position: 'absolute', width: '246px', height: '246px', left: '930px', top: '86px', background: '#D17A7C', filter: 'blur(100px)' }}
          />
          <img
            alt='ellipse7'
            src={ellipse7}
            style={{ position: 'absolute', width: '246px', height: '246px', left: '125px', top: '450px', background: '#D17A7C', filter: 'blur(100px)' }}
          />
          <h3 style={
        {
          position: 'absolute',
          width: '594px',
              height: '57px',
              left: '343px',
              top: '130px',
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
              left: '400px',
              top: '200px',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Certificate Name  :
        </HvTypography>
          <div style={{
            boxSizing: 'border-box',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            width: '272px',
            height: '45px',
            left: '610px',
            top: '190px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
            <HvInput
    type="text"
    style={{
      width: '272px', 
      height: '45px', 
      border: 'none',
      borderRadius: '10px',
      padding: '14px 0px 14px 20px',
      backgroundColor: 'transparent',
      }}
      value={certificateName}
            onChange={handleCertificateNameChange}
  />
  {CertificateNameError && (
            <div
            style={{
              width: 400,
              marginLeft:'660px',
              marginTop:'5px'
            }}
           >  
          </div>
            )} 
            
          </div>
          <HvTypography
            variant="body"
            style={{
              position: 'absolute',
              width: '225px',
              height: '24px',
              left: '400px',
              top: '270px',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Description :
          </HvTypography>
          <div style={{
            flex: '1',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            width: '272px',
            height: '45px',
            left: '610px',
            top: '260px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
            <HvInput
    type="text"
    style={{
      width: '272px', 
      height: '45px', 
      border: 'none',
      borderRadius: '10px',
      padding: '14px 0px 14px 20px',
      backgroundColor: 'transparent',
      }}
      value={description}
            onChange={handleDescriptionChange}
  />
  {DescriptionError && (
            <div
            style={{
              width: 400,
              marginLeft:'660px',
              marginTop:'5px'
            }}
           >  
          </div>
            )} 
       
          </div>

        
          <HvTypography
  variant="body"
  style={{
    position: 'absolute',
    width: '190px',
    height: '24px',
    left: '400px',
    top: '345px',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#000000'
  }}
>
  Cop :
</HvTypography>

<div
  style={{
    boxSizing: 'border-box',
    position: 'absolute',
    width: '272px',
    height: '45px',
    left: '610px',
    top: '330px',
    border: '1px solid #000000',
    borderRadius: '10px'
  }}
>
  <HvInput
    type="text"
    style={{
      width: '272px', 
      height: '45px', 
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
              marginLeft:'660px',
              marginTop:'5px'
            }}
           >  
          </div>
            )} 
</div>

          
          <HvTypography
            variant="body"
            style={{
              position: 'absolute',
              width: '199px',
              height: '24px',
              left: '400px',
              top: '420px',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
            >SubCop :
          </HvTypography>
          <div style={{
            position: 'absolute',
            top: '405px'
          }}>
            <HvInput
            id="sc"
                style={{
                width: '272px',
                height: '45px',
                border: '1px solid #000000',
                borderRadius: '10px',
                left: '610px',
                padding: '14px 0px 14px 20px',
                backgroundColor: 'transparent'
            }}
            value={subCop}
            onChange={handleSubCopChange}
            />
            {SubCopError && (
            <div
            style={{
              width: 400,
              marginLeft:'660px',
              marginTop:'5px'
            }}
           >  
          </div>
            )} 
            </div>
            <HvTypography
  variant="body"
  style={{
    position: 'absolute',
    width: '190px',
    height: '24px',
    left: '400px',
    top: '490px',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#000000'
  }}
>
  Vendor :
</HvTypography>

<div
  style={{
    boxSizing: 'border-box',
    position: 'absolute',
    width: '272px',
    height: '45px',
    left: '610px',
    top: '475px',
    border: '1px solid #000000',
    borderRadius: '10px'
  }}
>
  <HvInput
    type="text"
    style={{
      width: '272px', 
      height: '45px', 
      border: 'none',
      borderRadius: '10px',
      padding: '14px 0px 14px 20px',
      backgroundColor: 'transparent',
      }}
      value={vendor}
            onChange={handleVendorChange}
  />
  {VendorError && (
            <div
            style={{
              width: 400,
              marginLeft:'660px',
              marginTop:'5px'
            }}
           >  
          </div>
            )} 
</div>
<div
              style={{
                position: 'absolute',
                top: '90px',
                right: '1180px',
                //backgroundColor:'#000000',
                height:'10px',
                 marginBottom:'10px',
              }}
            >
              <Link to="/admCertificates">
              <Previous
        style={{
          color:'#000000',
          size:'50px',
          backgroundColor:'#ccc',
          fontSize:'40px',
          color: '#000000',
          paddingBottom:'2px',
          iconSize:'L',
          width:'60px'
          }}
          
          
          
      />
        </Link>
            </div>

          <HvButton 
          type='submit'
          style={{
            backgroundColor: isFormValid ? '#FF8383' : '#ccc',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            position: 'absolute',
            width: '205px',
            height: '45px',
            left: '520px',
            top: '540px',
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
              label="New Certificate Added Successfully."
              offset={0}
              open
              showIcon
              variant="success"
              style={{
                position: 'fixed',
                top: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
              }}
            />
          )}
          {showAlertBanner && (
            <HvBanner
              label="This Certificate Already Exists."
              offset={0}
              open
              showIcon
              variant="error"
              style={{
                position: 'fixed',
                top: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
              }}
            />
          )}
      </div>
    </div>
    </div >
  )
}

