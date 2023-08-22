import React from 'react';
import logo from '../assets/MainPage assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 6.svg';
import photo from '../assets/MainPage assets/istockphoto-1150089946-612x612-removebg-preview 1.svg';
import eclipse from '../assets/MainPage assets/Ellipse 5.svg';
import { Params, useParams } from 'react-router-dom';
import rectangle from '../assets/MainPage assets/Rectangle 147.svg';
import cardrect1 from '../assets/MainPage assets/Cards rect.svg';
import cardaccessory from '../assets/MainPage assets/Card accesory.svg';
import cardaccessory2 from '../assets/MainPage assets/Card accessory 2.svg'
import updatecertfn from '../assets/MainPage assets/Group 763.svg'
import { HvTypography, HvButton, HvHeader, HvHeaderBrand } from '@hitachivantara/uikit-react-core';
import { Next } from "@hitachivantara/uikit-react-icons";
import { Link } from 'react-router-dom';

const Header = () => {
  const {empId}=useParams();
  const empid=parseInt(empId)
 
  return (
    <div
      style={{
        height: 150,
        position: 'relative',
      }}
    >
      <div
        style={{
          minHeight: 100,
          position: 'relative',
        }}
      >
        <HvHeader position="relative" style={{ backgroundColor: 'transparent' }}>
          <HvHeaderBrand
            logo={
              <img
                src={logo}
                href='/'
                alt="Hitachi Vantara Logo"
                style={{
                  position: 'absolute',
                  left: '-5px',
                  right: '908px',
                  top: '-10px',
                  bottom: '1109px',
                  width:'200px',
                  height:'100px',
                  cursor:'pointer',
                }}
              />
            }
          />
          
          <Link to='/empprofile'>      
          <HvTypography
            variant="body"
            style={{
              width: '73px',
              height: '24px',
              position: 'absolute',
              left: '1190px',
              top: '20px',
              bottom: '1185px',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '17px',
              lineHeight: '24px',
              color: '#FFFFFF',
              cursor:'pointer',
            }}
          >
            Profile
          </HvTypography>
          </Link>
          </HvHeader>
          <img
          alt="rectangle"
          src={rectangle}
          style={{
            position: 'absolute',
            width: '1280px',
            height: '667px',
            top: '-260px',
            bottom: '1000px',
            zIndex: 1,
            filter: 'brightness(0.8) saturate(1.6) contrast(1.5)',
            transform:'rotate(0deg),scale(100)'
          }}
        />
        <HvTypography
            variant="body"
            style={{
              position: 'absolute',
              width: '594px',
              height: '46px',
              left: '50px',
              right:'897px',
              top: '109px',
              bottom:'927px',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '40px',
              lineHeight: '49px',
              textAlign: 'center',
              color: '#FFFFFF',
              zIndex:5,
            }}
          >Lorem ipsum dolor sit amet
          </HvTypography>
          <HvTypography
            variant="body"
            style={{
              position: 'absolute',
              width: '550px',
              height: '46px',
              left: '98px',
              top: '167px',
              right:'632',
              bottom:'849',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '29px',
              color: '#FFFFFF',
              zIndex:4,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </HvTypography>
        <img
          alt="eclipse"
          src={eclipse}
          style={{
            position: 'absolute',
            width: '350px',
            height: '180px',
            left: '790px',
            top: '84px',
            right: '89px',
            bottom: '768px',
            zIndex: 2,
            opacity:0.8,
            filter: 'brightness(0.8) saturate(1.7) contrast(2.5)',
            transform:'rotate(9deg)'
          }}
        />
        <img
          alt="pic"
          src={photo}
          style={{
            position: 'absolute',
            width: '408px',
            height: '186px',
            left: '753px',
            top: '064px',
            right: '89px',
            bottom: '802px',
            zIndex: 3,
          }}
        />
        <div style={{ position: 'relative', zIndex: 4 }}>
          <HvButton
            overrideIconColors
            radius="base"
            variant="primary"
            endIcon={<Next />}
            style={{
              background: '#DB7E7E',
              borderRadius: '50px',
              width: '150px',
              position: 'absolute',
              left: '98px',
              right: '914px',
              top: '189px',
              bottom: '2158px',
            }}
          >
            Learn More
          </HvButton>
        </div>
        <div className='carddescription'>
          <HvTypography
          style={{
            position: "absolute",
            width: "204px",
            height: "40px",
            left: "40px",
            top: "435px",
            right: '100px',
            bottom: '100px',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "28px",
            lineHeight: "34px",
            color: "#000000"
          }}>
            Lorem ispum
          </HvTypography>
          <HvTypography style={{
            position: "absolute",
            width: "200px",
            height: "96px",
            left: "40px",
            top: "475px",
            right: '100px',
            bottom: '100px',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#000000",
            textAlign:'justify',
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, se eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </HvTypography>
        </div>
        <div className='addskill-card' 
        >
        <Link to={`/empaddskill/${empid}`}>
              <img
              alt="cardrect1"
              src={cardrect1}
              style={{
                position: 'absolute',
                width: '150px',
                height: '106px',
                left: '280px',
                top: '450px',
                right: '100px',
                bottom: '100px',
              }}
            />
            <img
              alt="cardaccessory"
              src={cardaccessory}
              style={{
                position: 'absolute',
                width: '98px',
                height: '30px',
                left: '330px',
                top: '450px',
                right: '100px',
                bottom: '100px',
              }}
            />
            <img
              alt="cardaccessory2"
              src={cardaccessory2}
              style={{
                position: 'absolute',
                width: '98px',
                height: '30px',
                left: '260px',
                top: '455px',
                right: '100px',
                bottom: '100px',
                // cursor:'pointer'
              }}
            />
            <HvTypography
            style = {{
              position: 'absolute',
              left: '295px',
              right: '100px',
              top: '485px',
              bottom: '100px',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '15px',
              lineHeight: '27px',
              color: '#000000',
            }}
            >
              Add Skills
            </HvTypography>
            <HvTypography
            style={{
              position: "absolute",
              width:'134px',
              height:'27px',
              left: "295px",
              right: "100px",
              top: "510px",
              bottom: "100px",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "9px",
              lineHeight: "12px",
              color: "#000000",
            }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </HvTypography>
            </Link>
        </div>
        <Link to={`/empcertification/${empid}`}>
        <div className='updateskills-card'  >
            <img
            alt="cardrect1"
            src={cardrect1}
            style={{
              position: 'absolute',
              width: '150px',
              height: '106px',
              left: '475px',
              top: '450px',
              right: '100px',
              bottom: '100px',
            }}
          />
          <img
            alt="cardaccessory"
            src={cardaccessory}
            style={{
              position: 'absolute',
              width: '98px',
              height: '30px',
              left: '530px',
              top: '450px',
              right: '1000px',
              bottom: '100px',
            }}
          />
          <img
            alt="cardaccessory2"
            src={cardaccessory2}
            style={{
              position: 'absolute',
              width: '98px',
              height: '30px',
              left: '455px',
              top: '455px',
              right: '1000px',
              bottom: '100px',
            }}
          />
          <HvTypography
          style = {{
            position: 'absolute',
            left: '489px',
            right: '100px',
            top: '485px',
            bottom: '100px',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '15px',
            lineHeight: '27px',
            color: '#000000',
          }}
          >
         View Certification
          </HvTypography>
          <HvTypography
          style={{
            position: "absolute",
            width:'134px',
            height:'27px',
            left: "490px",
            right: "100px",
            top: "510px",
            bottom: "100px",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "9px",
            lineHeight: "12px",
            color: "#000000",
          }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </HvTypography>
        </div>
        </Link>
      
        <div className='addcert-card'>
        <Link to={`/empcerttable/${empid}`}>
          <img
              alt="cardrect1"
              src={cardrect1}
              style={{
                position: 'absolute',
                width: '150px',
                height: '106px',
                left: '675px',
                top: '450px',
                right: '100px',
                bottom: '100px',
              }}
            />
            <img
              alt="cardaccessory"
              src={cardaccessory}
              style={{
                position: 'absolute',
                width: '98px',
                height: '30px',
                left: '730px',
                top: '450px',
                right: '1000px',
                bottom: '100px',
              }}
            />
            <img
              alt="cardaccessory2"
              src={cardaccessory2}
              style={{
                position: 'absolute',
                width: '98px',
                height: '30px',
                left: '655px',
                top: '455px',
                right: '1000px',
                bottom: '100px',
              }}
            />
            <HvTypography
            style = {{
              position: 'absolute',
              left: '695px',
              right: '100px',
              top: '485px',
              bottom: '100px',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '15px',
              lineHeight: '27px',
              color: '#000000',
            }}
            >
              Add Certification
            </HvTypography>
            <HvTypography
            style={{
              position: "absolute",
              width:'134px',
              height:'27px',
              left: "695px",
              right: "100px",
              top: "510px",
              bottom: "100px",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "9px",
              lineHeight: "12px",
              color: "#000000",
            }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </HvTypography>
            </Link>
        </div>
        <div className='currentskill-card'>
        <Link to={`/empskilltable/${empid}`}>
          <img
                alt="cardrect1"
                src={cardrect1}
                style={{
                  position: 'absolute',
                  width: '150px',
                  height: '106px',
                  left: '875px',
                  top: '450px',
                  right: '100px',
                  bottom: '100px',
                }}
              />
              <img
                alt="cardaccessory"
                src={cardaccessory}
                style={{
                  position: 'absolute',
                  width: '98px',
                  height: '30px',
                  left: '930px',
                  top: '450px',
                  right: '1000px',
                  bottom: '100px',
                }}
              />
              <img
                alt="cardaccessory2"
                src={cardaccessory2}
                style={{
                  position: 'absolute',
                  width: '98px',
                  height: '30px',
                  left: '855px',
                  top: '455px',
                  right: '1000px',
                  bottom: '100px',
                }}
              />
              <HvTypography
              style = {{
                position: 'absolute',
                left: '895px',
                right: '100px',
                top: '485px',
                bottom: '100px',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '15px',
                lineHeight: '27px',
                color: '#000000',
              }}
              >
                Current Skills
              </HvTypography>
              <HvTypography
              style={{
                position: "absolute",
                width:'134px',
                height:'27px',
                left: "895px",
                right: "100px",
                top: "510px",
                bottom: "100px",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "9px",
                lineHeight: "12px",
                color: "#000000",
              }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </HvTypography>
              </Link>
        </div>
        <div className='learnewskill-card' >
           <img
                alt="cardrect1"
                src={cardrect1}
                style={{
                  position: 'absolute',
                  width: '150px',
                  height: '106px',
                  left: '1075px',
                  top: '450px',
                  right: '100px',
                  bottom: '100px',
                }}
              />
              <img
                alt="cardaccessory"
                src={cardaccessory}
                style={{
                  position: 'absolute',
                  width: '98px',
                  height: '30px',
                  left: '1130px',
                  top: '450px',
                  right: '1000px',
                  bottom: '100px',
                }}
              />
              <img
                alt="cardaccessory2"
                src={cardaccessory2}
                style={{
                  position: 'absolute',
                  width: '98px',
                  height: '30px',
                  left: '1055px',
                  top: '455px',
                  right: '1000px',
                  bottom: '100px',
                }}
              />
              <HvTypography
              style = {{
                position: 'absolute',
                left: '1095px',
                right: '10px',
                top: '485px',
                bottom: '100px',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '15px',
                lineHeight: '27px',
                color: '#000000',
              }}
              >
                Learn New Skills
              </HvTypography>
              <HvTypography
              style={{
                position: "absolute",
                width:'134px',
                height:'27px',
                left: "1095px",
                right: "100px",
                top: "510px",
                bottom: "100px",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "9px",
                lineHeight: "12px",
                color: "#000000",
              }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </HvTypography>
        </div>
      </div>
    </div>
  );
};

export default Header;
