import React from 'react';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import rectangle139 from '../assets/MainPage assets/Rectangle 139.svg';
import rectangle140 from '../assets/MainPage assets/Rectangle 140.svg';
import ellipse6 from '../assets/MainPage assets/Ellipse 6.svg';
import ellipse7 from '../assets/MainPage assets/Ellipse 7.svg';
import logo from '../assets/MainPage assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 6.svg';
import { useParams } from 'react-router-dom';
import {
  HvTypography,
  HvHeader,
  HvHeaderBrand,
  HvDropdown,
  HvDatePicker,
  HvInput,
  HvButton,
  HvLoading,
  HvBanner
}
  from '@hitachivantara/uikit-react-core';

export default function CertTable() {
  const {empId}=useParams();
  const empid=parseInt(empId);
  console.log((empId));
  const [selectedIssueDate, setSelectedIssueDate] = useState('');
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);
  const [namedropdownValue, setnameDropdownValue] = useState('');
  const [orgdropdownValue, setorgDropdownValue] = useState('');
  const [certNameDropdown, setcertNameDropdown] = useState([]);
  const [certOrgDropdown, setcertOrgDropdown] = useState([]);
  const [dateError, setDateError] = useState('');
  const [enteredId,setEnteredId]=useState('');
  const [enteredUrl,setEnteredUrl]=useState('');
  const [loading, setLoading] = useState(false);
  const [enteredIdError, setEnteredIdError] = useState('');

  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    
    fetch('http://13.234.20.12:8080/api/v1/CertificationSet')
      .then(response => response.json())
      .then(data => {
        // Extract certification names and organizations from the API response
        const uniqueCertNames = [...new Set(data.map(cert => cert.certificateName))].filter(Boolean);
        const uniqueCertOrgs = [...new Set(data.map(cert => cert.vendor))].filter(Boolean);
  
        // Create dropdown options using the unique values
        const certNameOptions = uniqueCertNames.map(name => ({
          label: name,
          value: name,
        }));
        const certOrgOptions = uniqueCertOrgs.map(org => ({
          label: org,
          value: org,
        }));

        // Set the dropdown values with the fetched data
        setcertNameDropdown(certNameOptions);
        setcertOrgDropdown(certOrgOptions);
      })
      .catch(error => {
        console.error('Error fetching certification data:', error);
      });
  }, []);
  const handleNameDropdownChange = (value) => {
    const selectedValue = value?.label || "";
  setnameDropdownValue(selectedValue);
  };
  const handleOrgDropdownChange = (value) => {
    const selectedValue = value?.label || "";
    setorgDropdownValue(selectedValue);
  };

  const handleIssueDateChange = (date) => {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); 
    if (date > currentDate) {
      setSelectedIssueDate(null);
      setDateError('Please select a valid date'); 
    } else {
      setSelectedIssueDate(date);
      setDateError('');
    }
  };
  const handleExpiryDateChange = (date) => {
    setSelectedExpiryDate(date);
  };
  const handleEnteredIdChange = (event) => {
    const value = event.target.value;
    if (!Number.isInteger(Number(value))) {
      setEnteredIdError('Only integers are accepted');
    } else {
      setEnteredIdError('');
    }
    setEnteredId(value);
  };
  const handleEnteredUrlChange = (event) => {
    setEnteredUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
  
      // Retrieve the cert_id based on the namedropdownValue
      fetch('http://13.234.20.12:8080/api/v1/CertificationSet')
        .then(response => {
          if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          // Find the certification object with the selected certificate name
          const certification = data.find(item => item.certificateName === namedropdownValue);
  
          if (certification) {
            // Create the payload with the form data including the cert_id
            const payload = {
              empId: empid,
              certificationName: namedropdownValue,
              issuedOrganization: orgdropdownValue,
              acquiredDate: selectedIssueDate,
              expiredDate: selectedExpiryDate,
              certId: certification.id, // Include the cert_id here
              certificationUrl: enteredUrl,
              credId:enteredId
            };
  
            // Make a POST request to the API endpoint
            fetch('http://13.234.20.12:8080/api/v1/certification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Request failed with status ' + response.status);
                }
                return response.json();
              })
              .then(data => {
                // Handle the response from the API if needed
                console.log('Success:', data);
                setSubmitSuccessful(true);
                setLoading(false);
              })
              .catch(error => {
                console.error('Error submitting certification data:', error);
                setSubmitError(true);
                setLoading(false);
              });
          } else {
            console.log('Certificate not found.');
          }
        })
        .catch(error => {
          console.error('Error retrieving certification data:', error);
        });
    }
  };
  const hideSuccessBanner = () => {
    setSubmitSuccessful(false);
  };

  // Function to hide the error banner after 3 seconds
  const hideErrorBanner = () => {
    setSubmitError(false);
  };
    const validateForm = () => {
      let isValid = true;
      if (enteredId === '') {
        setEnteredIdError('Credential Id is required');
        isValid = false;
      } else if (!Number.isInteger(Number(enteredId))) {
        setEnteredIdError('Only integers are accepted');
        isValid = false;
      } else {
        setEnteredIdError('');
      }
      return isValid;
    };

    const isFormValid = namedropdownValue && orgdropdownValue !== '' && selectedIssueDate && selectedExpiryDate !== '' && enteredId  && enteredUrl !== '';
  return (
    <div style={{overflow:'hidden', width: '100%'}}>
{submitSuccessful && (
        <HvBanner
          label="Submit Success"
          offset={0}
          open
          showIcon
          variant="success"
          onClose={hideSuccessBanner}
        />
      )}

      {submitError && (
        <HvBanner
          label="Submit Error"
          offset={0}
          open
          showIcon
          variant="error"
          onClose={hideErrorBanner}
        />
      )}
      <div style={{ width: '100vw'}}>
        <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
          <HvHeader position="fixed" style={{ backgroundColor: '#B41B3A' }}>
            <HvHeaderBrand
              logo={
                <Link to ='/'>
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
                cursor:'pointer'
              }}
            >
              Profile
            </HvTypography>
            </Link>
            <Link to={`/empskilltable/${empid}`}>
            <HvTypography
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
                cursor:'pointer'
              }}
            >
              Current Skills
            </HvTypography>
            </Link>
            <Link to={`/empaddskill/${empid}`}>
            <HvTypography
              style={{
                width: '133px',
                height: '24px',
                position: 'absolute',
                left: '910px',
                top: '18px',
                bottom: '1185px',
                fontFamily: 'Montserrat Regular 400',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '17px',
                lineHeight: '24px',
                color: '#FFFFFF',
                cursor:'pointer'
              }}
            >
              Add Skills
            </HvTypography>
            </Link>
          </HvHeader>
          <img
            alt="rectangle"
            src={rectangle139}
            style={{ width: '100%', height: 'auto' }}
          />
          <img
            alt='rectangle'
            src={rectangle140}
            style={{ position: 'absolute', width: '918px', height: '824px', left: '181px', top: '108px' }}
          />
          <img
            alt='ellipse'
            src={ellipse6}
            style={{ position: 'absolute', width: '246px', height: '246px', left: '930px', top: '86px', background: '#D17A7C', filter: 'blur(100px)' }}
          />
          <img
            alt='ellipse'
            src={ellipse7}
            style={{ position: 'absolute', width: '336px', height: '312px', left: '177px', top: '600px' }}
          />
          <h3 style={
            {
              position: 'absolute',
              width: '594px',
              height: '57px',
              left: '343px',
              top: '170px',
              fontFamily: 'Montserrat light 300',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: '30px',
              lineHeight: '37px',
              textAlign: 'center',
              color: '#000000'
            }
          }>Add Certification </h3>
          <form onSubmit={handleSubmit}>
          <HvTypography
            style={{
              position: 'absolute',
              width: '197px',
              height: '24px',
              left: '354px',
              top: '260px',
              fontFamily: 'Montserrat Thin 100 italic',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Certification Name:
          </HvTypography>
          <HvTypography
            style={{
              position: 'absolute',
              width: '225px',
              height: '24px',
              left: '354px',
              top: '351px',
              fontFamily: 'Montserrat Regular 400',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Issuing Organization:
          </HvTypography>
          <HvTypography
            style={{
              position: 'absolute',
              width: '118px',
              height: '24px',
              left: '354px',
              top: '442px',
              fontFamily: 'Montserrat Thin 100',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Issue date:
          </HvTypography>
          <HvTypography
            style={{
              position: 'absolute',
              width: '138px',
              height: '24px',
              left: '354px',
              top: '533px',
              fontFamily: 'Montserrat Thin 100',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Expiry date:
          </HvTypography>
          <HvTypography
            style={{
              position: 'absolute',
              width: '159px',
              height: '24px',
              left: '354px',
              top: '622px',
              fontFamily: 'Montserrat Thin 100',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Credential ID:
          </HvTypography>
          <HvTypography
            style={{
              position: 'absolute',
              width: '177px',
              height: '24px',
              left: '354px',
              top: '709px',
              fontFamily: 'Montserrat Thin 100',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000'
            }}
          >Credential URL:
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
            top: '246px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
            <HvDropdown
              id="dropdown"
              aria-label="With max height"
              hasTooltips
              maxHeight={350}
              showSearch
              placeholder="Select an option"
              values={certNameDropdown}
              value={namedropdownValue}
              onChange={(event) => { handleNameDropdownChange(event) }}
              style={{
                backgroundColor:'black'
              }}
            />
          </div>
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
            top: '340px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
            <HvDropdown
              id="dropdown"
              aria-label="With max height"
              hasTooltips
              maxHeight={350}
              showSearch
              placeholder="Select an option"
              values={certOrgDropdown}
              value={orgdropdownValue}
              onChange={(event) => { handleOrgDropdownChange(event) }}
            />
          </div>
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
            top: '432px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
            <HvDatePicker
              aria-label="Date"
              id="issuedDate"
              locale="en-US"
              status="standBy"
              onChange={(date) => handleIssueDateChange(date)}
              onCancel={() => setSelectedIssueDate(null)}
              onClear={() => setSelectedIssueDate(null)}
              placeholder="Select the date"
              placement="right"
              style={{ width: '230px', top: '-5px'}}
            />
            {dateError && (
              <div
              style={{
                width: '180px',
                marginLeft:'-198px',
                marginTop:'40px'
              }}
            >
              <HvTypography  
                variant="body"
                style={{
                  color:'#B41B3A',
                  fontWeight:500,
                  width:'272px',
                  // marginTop:'40px',
                  left:'53px',
                  marginLeft:'-82px'
                }}
              >
                *** Select valid date
              </HvTypography>
            </div>
              )}
          </div>
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
            top: '526px',
            border: '1px solid #000000',
            borderRadius: '10px'
          }}>
            <HvDatePicker
              aria-label="Date"
              id="expiryDate"
              locale="en-US"
              value={selectedExpiryDate}
              onChange={handleExpiryDateChange}
              onCancel={() => setSelectedExpiryDate(null)}
              onClear={() => setSelectedExpiryDate(null)}
              placeholder="Select the date"
              status="standBy"
              placement="right"
              style={{ width: '230px', top: '-5px' }}
            />
          </div>
          <div style={{
            position: 'absolute',
            top: '611px'
          }}>
            <HvInput
              id="YoE"
              placeholder="Enter text here..."
              value={enteredId}
              onChange={handleEnteredIdChange}
              style={{ width: '272px',
              height: '52px',
              border: '1px solid #000000',
              borderRadius: '10px',
              left: '653px',
              padding: '14px 0px 14px 20px',
              backgroundColor:'transparent'
  }}
            />{enteredIdError && (
              <div
              style={{
                width: 400,
                marginLeft:'660px',
                marginTop:'5px'
              }}>
              <HvTypography
                variant="body"
                style={{
                  color:'#B41B3A',
                  fontWeight:500
                }}>
                *** Only numbers are accepted
              </HvTypography>
            </div>
              )}
            </div>
            <div style={{
              position: 'absolute',
              top: '682px'
            }}>
            <HvInput
              placeholder="Enter text here..."
              value={enteredUrl}
              onChange={handleEnteredUrlChange}
              style={{ width: '272px',border: '1px solid #000000',
              borderRadius: '10px' ,height: '52px',
              padding: '14px 0px 14px 20px',
              position: 'absolute',
              left: '653px',
              backgroundColor:'transparent'
            }}
            />
            </div>
          <HvButton 
          type='submit'
          style={{
            position: 'absolute',
            width: '205px',
            height: '45px',
            left: '537px',
            top: '816px',
            background: isFormValid ? '#FF8383' : '#ccc',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            borderRadius: '10px',
            fontFamily: 'Montserrat Regular 400',
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
      </div>
    </div>
    </div >
  );
}