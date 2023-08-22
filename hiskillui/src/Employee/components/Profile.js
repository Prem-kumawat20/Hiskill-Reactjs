import React from 'react';
import profilepic from '../assets/Profile assests/Profile photo.svg';
import biorect from '../assets/Profile assests/Bio rect.svg';
import vector from '../assets/Profile assests/Vector.svg';
import vector4 from '../assets/Profile assests/Vector4.svg';
import vector6 from '../assets/Profile assests/Vector6.svg';
import eclipse1 from '../assets/Profile assests//Ellipse 8.svg';
import eclipse2 from '../assets/Profile assests/Ellipse 10.svg';
import { HvTypography } from '@hitachivantara/uikit-react-core';

export default function Profile() {
  return (
    <div>
      <div className='profile pic'>
        <img
          src={profilepic}
          alt="Hitachi Vantara Logo"
          style={{
            position: "absolute",
            width: "200px",
            height: "250px",
            left: "200px",
            top: "100px",
            zIndex: 1,
          }}
        />
      </div>
      <div className='bio rectangle'>
        <img
          src={biorect}
          alt="Hitachi Vantara Logo"
          style={{
            boxSizing: "border-box",
            position: "absolute",
            width: "800px",
            height: "256px",
            left: "400px",
            top: "320px",
            backdropFilter: "blur(75px)",
            borderRadius: "50px",
          }}
        />
      </div>
      <div className='vector'>
        <img
          src={vector}
          alt="Hitachi Vantara Logo"
          style={{
            position: "absolute",
            width: "700px",
            height: "600px",
            left: "0px",
            top: "-150px",
          }}
        />
      </div>
      <div className='vector6'>
        <img
          src={vector6}
          alt="Hitachi Vantara Logo"
          style={{
            position: "absolute",
            width: "700px",
            height: "600px",
            left: "0px",
            top: "-150px",
          }}
        />
      </div>
      <div className='vector4'>
        <img
          src={vector4}
          alt="Hitachi Vantara Logo"
          style={{
            position: "absolute",
            width: "600px",
            height: "540px",
            left: "0px",
            top: "-150px",
            filter: 'brightness(0.8) saturate(1.6) contrast(1.5)',
          }}
        />
      </div>
      <div className='eclipse1'>
        <img
          src={eclipse1}
          alt="Hitachi Vantara Logo"
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            left: "261px",
            top: "205px",
            filter: 'brightness(0.8) saturate(1.7) contrast(2.5)',
          }}
        />
      </div>
      <div className='eclipse2'>
        <img
          src={eclipse2}
          alt="Hitachi Vantara Logo"
          style={{
            position: "absolute",
            width: "250px",
            height: "300px",
            left: "1070px",
            top: "50px",
            opacity:100,
            filter: 'brightness(0.6) saturate(1.7) contrast(2.5)',
          }}
        />
      </div>
      <div className='emp details'
      style={{
        left:'900px',
      }}>
        <HvTypography
          variant="normalText"
          style={{
            position: "absolute",
            width: "254px",
            height: "53px",
            left: "510px",
            top: "140px",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "49px",
            color: "#000000",
          }}
        >
          Employee Name
        </HvTypography>
        <HvTypography
          variant="normalText"
          style={{
            position: "absolute",
            width: "133px",
            height: "24px",
            left: "510px",
            top: "190px",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#000000",
          }}
        >
          Employee ID:
        </HvTypography>
        <HvTypography
          variant="normalText"
          style={{
            position: "absolute",
            width: "133px",
            height: "24px",
            left: "510px",
            top: "220px",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#000000",
          }}
        >
          Location:
        </HvTypography>
        <HvTypography
          variant="normalText"
          style={{
            position: "absolute",
            width: "198px",
            height: "24px",
            left: "510px",
            top: "250px",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#000000",
          }}
        >
          Reporting Manager:
        </HvTypography>
      </div>
      <div className='emp bio'>
        <HvTypography
          variant="normalText"
          style={{
            position: "absolute",
            width: "600px",
            height: "100px",
            left: "500px",
            top: "360px",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#000000",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </HvTypography>
      </div>
    </div>
  );
}
