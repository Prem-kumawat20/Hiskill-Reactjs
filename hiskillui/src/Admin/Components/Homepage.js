import React from 'react';
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
import { Link } from 'react-router-dom';
import logo from '../assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 6 (1).svg';
import group704 from '../assets/Group 704.svg';
import card1 from '../assets/Rectangle 205.svg';
import arrow from '../assets/Arrow 5.svg';


const Header = () => (
  <div style={{ position: 'relative', width: '100%', height: '100vh' ,overflow: 'hidden'}}>
    <HvHeader position="relative" style={{ backgroundColor: '#B41B3A', overflow: 'hidden' }}>
      <HvHeaderBrand
        logo={<Link to='/admHome'>
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
            }} />
        </Link>
      } 
      />
    </HvHeader>
    <div style={{ flex: 1, position: 'relative', width: '100%', height: '100vh', background: 'url(file:///C:/Users/sthipparapu/Admin%20Hiskill/HiSkill-UI/hiskillui/src/Admin/assets/istockphoto-1316574108-612x612%201.svg), lightgray 50% / cover no-repeat', }}>
      <img
        alt="Group 704"
        src={group704}
        style={{
          position: 'absolute',
          width: '1300px',
          height: '750px',
          flexShrink: '0',
          background: 'linear-gradient(144deg, rgba(0, 0, 0, 0.84) 0%, rgba(207, 125, 138, 0.61) 100%)'
        }} />
    </div>

    <HvTypography
      variant='normalText'
      style={{
        position: 'absolute',
        top: '150px',
        left: '330px',
        textAlign: 'center',
        width: '617px',
        height: '96px',
        flexshrink: '0',
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal'
      }}
    > Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </HvTypography>
    <HvTypography
      variant='normalText'
      style={{
        position: 'absolute',
        top: '270px',
        left: '330px',
        textAlign: 'center',
        width: '575px',
        height: '71px',
        flexshrink: '0',
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal'
      }}
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </HvTypography>
    <div className='skill-card'>
      <Link to="/admSkills">
        <img
          alt="card1"
          src={card1}
          style={{
            position: 'absolute',
            width: '374px',
            height: '200px',
            top: '360px',
            left: '200px',
            flexshrink: '0',
            borderRadius: '9px',
            background: 'rgba(0, 0, 0, 0.47)',
            filter: 'blur(2px)'
          }} />
        <HvTypography
          variant='normalText'
          style={{
            position: 'relative',
            width: '187px',
            height: '42px',
            left: '235px',
            top: '-280px',
            flexshrink: '0',
            color: '#FFFFFF',
            fontFamily: 'Montserrat',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal'
          }}
        >
          Check All Skills/Add Skills
        </HvTypography>
        <img
          alt="arrow"
          src={arrow}
          style={{
            position: 'absolute',
            width: '55px',
            height: '20px',
            left: '450px',
            top: '395px',
            flexShrink: '0',
            stroke: '#FFFFFF',
            strokeWidth: '3px'
          }} />
        <HvTypography
          variant='normalText'
          style={{
            position: 'relative',
            width: '239.484px',
            height: '36px',
            flexshrink: '0',
            color: '#FFFFFF',
            fontFamily: 'Montserrat',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            left: '235px',
            top: '-250px',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit

        </HvTypography>

      </Link>

    </div>
    <div className='certificate-card'>
      <Link to="/admCertificates">
        <img
          alt="card1"
          src={card1}
          style={{
            position: 'absolute',
            width: '374px',
            height: '200px',
            top: '360px',
            left: '650px',
            flexshrink: '0',
            borderRadius: '9px',
            background: 'rgba(0, 0, 0, 0.47)',
            filter: 'blur(2px)'
          }} />
        <HvTypography
          variant='normalText'
          style={{
            position: 'relative',
            width: '300px',
            height: '42px',
            left: '685px',
            top: '-357px',
            flexshrink: '0',
            color: '#FFFFFF',
            fontFamily: 'Montserrat',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal'
          }}
        >
          Check All Certifications/Add Certifications
        </HvTypography>
        <img
          alt="arrow"
          src={arrow}
          style={{
            position: 'absolute',
            width: '55px',
            height: '20px',
            left: '950px',
            top: '395px',
            flexShrink: '0',
            stroke: '#FFFFFF',
            strokeWidth: '3px'
          }} />
          <HvTypography
          variant='normalText'
          style={{
            position: 'relative',
            width: '239.484px',
            height: '36px',
            flexshrink: '0',
            color: '#FFFFFF',
            fontFamily: 'Montserrat',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            left: '685px',
            top: '-327px',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit

        </HvTypography>
      </Link>
    </div>

  </div>

);

export default Header;