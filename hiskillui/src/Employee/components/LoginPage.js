import React from 'react';
import axios from 'axios';
import {HvBanner,HvInput,HvButton,HvTypography,HvCard,HvCardContent,HvHeader,HvHeaderBrand} from '@hitachivantara/uikit-react-core';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/MainPage assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 6.svg';
import group565 from '../assets/MainPage assets/Group 565.svg';
import ellipse12 from '../assets/MainPage assets/Ellipse 12.svg';
import { User } from "@hitachivantara/uikit-react-icons";
import { useState } from 'react';

export default function LoginPage() {

const [error, setError] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [bannerOpen, setBannerOpen] = useState(false);
const [bannerMessage, setBannerMessage] = useState("");


const navigate = useNavigate();


const handleSubmit = async (event) => {
  event.preventDefault();
  try{
      const response = await axios.post("http://13.234.20.12:8080/api/auth/signin",
      {
      empName:username,
      password:password
      }
      );
      if (response.data.roles.includes('ROLE_MANAGER'))
      {
        console.log(response.data.empId);
        const ans=response.data.empId;
        navigate(`/mngHome/${ans}`);
      }
      else if (response.data.roles.includes('ROLE_EMPLOYEE') && !response.data.roles.includes('ROLE_ADMIN') && !response.data.roles.includes('ROLE_MANAGER') && !response.data.roles.includes('ROLE_COPLEAD'))
      {
        console.log(response.data);
        const ans=response.data.empId;
        navigate(`/empmainpage/${ans}`);
      }
      else if (response.data.roles.includes('ROLE_ADMIN'))
      {
        navigate('/admHome');
      }
      else if (response.data.roles.includes('ROLE_COPLEAD'))
      {
        navigate('/copDashboard');
      }
      else if (response.data.error)
      {
        setBannerMessage(response.data.error);
        setBannerOpen(true);

        setTimeout(() => {
          setBannerOpen(false);
        }, 3000);
      }
  }
  catch{
    setBannerMessage("Incorrect username or password.");
      setBannerOpen(true);
      console.error('Login error:', error);
  }
}


  return (
    <div>
      {bannerOpen && (
        <HvBanner
          label={bannerMessage}
          offset={0}
          open={bannerOpen}
          showIcon
          variant="error"
          onClose={() => setBannerOpen(false)}
        />
      )}
    <div
    style={{
        height: 80,
    }}
    >
    <div
        style={{
        minHeight: 100
        }}
    >
        <HvHeader position="relative" style={{ backgroundColor: '#B41B3A', overflow: 'hidden' }}>
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
      </HvHeader>
    </div>
    </div>
           <img
          alt="Group 565"
          src={group565}
          style={{
            position: 'fixed',
            width: '50%',
            height: '539px',
            top: 0,
            bottom: 0,
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            opacity: '0.6',
            left: '655px'
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
          top: '194px',

          background: 'linear-gradient(204.17deg, #CF7D8A -36.08%, rgba(255, 255, 255, 0) 205.59%)',
          filter: 'blur(100px)'
        }}
      />
    <div
        style={{
            marginLeft:400
        }}
        >
        <HvCard
            statusColor="negative"
            style={{
            background:'#F3E2E3',
            borderRadius:'5%',
            width: 400,
            height: '100%',
            maxHeight: 1000,
            marginLeft:'50px',
            marginTop:50,
            paddingLeft:60,
            paddingRight:40,
            border: '1px solid #AC5B5E',
            }}
        >
            <div
                style={{
                    width: 420,
                    paddingTop: 30,
                }}
                >
                <User
                iconSize="M"
                inverted
                color='#414141'
                style={{
                    marginLeft: '115px',
                    marginBottom: '10px',
                    borderRadius: '100%',
                    border: '3px solid #414141',
                    display: 'flex',
                   
                }}
                />

                <HvTypography
                    variant="title2"
                    style={{
                        marginLeft: '105px',
                        color:'#414141'
                    }}
                >
                LOGIN
                </HvTypography>
            </div>
            <HvCardContent>
            <form onSubmit={handleSubmit}>
            <div
                style={{
                paddingTop: '20px'
                }}
            >
            <HvInput
            label="Username"
            name="username"
            placeholder="Enter username here"
            required
            style={{
                width:'250px',
                height:'30px',                
            }}
            value = {username}
            onChange={(event) => setUsername(event.target.value)}
            />

            </div>
            <div
                style={{
                marginTop: '20px'
                }}
            >
            <HvInput
                id="password-input"
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
                type="password"
                style={{
                    width:'250px',
                    height:'30px'
                }}
                value = {password}
            onChange={(event) => setPassword(event.target.value)}
            />
            </div>
            <div
                style={{
                marginTop: '30px',
                marginBottom: '30px',
                }}
            >
            <HvButton
                overrideIconColors
                radius="base"
                type="submit"
                variant="primary"
                style={{
                    backgroundColor:'#FF8383',
                    color:'black',
                    width:'250px',
                }}
                >
                Submit
            </HvButton>
            </div>
            </form>
            </HvCardContent>
        </HvCard>
    </div> 
    </div>    
  )
}
