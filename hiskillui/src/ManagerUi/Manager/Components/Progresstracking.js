import React from 'react'
import logo from '../assets/login assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg'
import Rectangle185 from '../assets/login assets/Rectangle 185.svg'
import Rectangle184 from '../assets/login assets/Rectangle 184.svg'
import Rectangle186 from '../assets/login assets/Rectangle 186.svg'
import Group621 from '../assets/login assets/Group 621.svg'
import Group6131 from '../assets/login assets/Group 613 (1).svg'
import Group622 from '../assets/login assets/Group 622.svg'
import Rectangle187 from '../assets/login assets/Rectangle 187.svg'
import Downloadremove from '../assets/login assets/download-removebg-preview 1.svg'
import Frame564 from '../assets/login assets/Frame 564.svg'
import Group623 from '../assets/login assets/Group 623.svg'
import Frame565 from '../assets/login assets/Frame 565.svg'
import Group611 from '../assets/login assets/Group 611.svg'
import Group612 from '../assets/login assets/Group 612.svg'
import Group613 from '../assets/login assets/Group 613.svg'
import Group6111 from '../assets/login assets/Group 611 (1).svg'
import { Link } from 'react-router-dom'
import { HvHeader,HvButton,HvHeaderBrand,HitachiLogo,HvHeaderActions,HvBadge,HvTypography} from '@hitachivantara/uikit-react-core'
export default function Login() {
  return (
    <div
  style={{
    height: 150
  }}
>
  <div
    style={{
      minHeight: 100
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
    
    <HvTypography
    variant="normalText"
    style={{
     
      height: '24px',
      position: 'absolute',
      left: '780px',
      top: '16px',
      bottom: '1185px',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      color: '#FFFFFF',
      cursor:'pointer',
    }}>
  
    Update Skills
  </HvTypography>
  <HvTypography
    variant="normalText"
    style={{
     
      height: '24px',
      position: 'absolute',
      left: '910px',
      top: '16px',
      bottom: '1185px',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      color: '#FFFFFF',
      cursor:'pointer',
    }}>
  
    Upload Certificates
  </HvTypography>
  <HvTypography
    variant="normalText"
    style={{
     
      height: '24px',
      position: 'absolute',
      left: '1075px',
      top: '16px',
      bottom: '1185px',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      color: '#FFFFFF',
      cursor:'pointer',
    }}>
  
    Current Skills
  </HvTypography>
  <HvTypography
    variant="normalText"
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
  
    Profile
  </HvTypography>
     
    </HvHeader>
    {/* <img 
    src={Rectangle185}
    alt="Rectangle 185 not found"
    style={{
        position:'absolute',
        top:'-236px',
        height:'700px',
        width:'100%',
        zIndex:1   
     }}
    /> */}
    <img 
    
    src={Rectangle184} 
    alt="Rectangle 184 not found"
    style={{
        position:'absolute',
        zIndex:2,
        width:'100%',
        top:'-239px',
    }} />
    <img     
    src={Downloadremove} 
    alt='Group02 not found'
    style={{
        position:'absolute',
        zIndex:3,
        width:'180px',
        top:'100px',
        left:'46px'
    }}
    />
    {/* <img  
    src={Rectangle186}
     alt="Rectangle186 not found "
     style={{
        position:'absolute',
        zIndex:'5',
        top:'-196px'
     }}
      /> */}
      <img        
        src={Group623} 
        alt="Rectangle187 not found"
        style={{
            position:'absolute',
            zIndex:'7',
            top:'385px',
            left:'1055px',
            width:'165px',
            cursor:'pointer'
        }}
         />
       
      <img    
       src={Group622}
       alt="Group621 not found"
        style={{
            position:'absolute',
            zIndex:'6',
            top:'385px',
            left:'870px',
            width:'165px',
            cursor:'pointer'
        }} />
        <Link to='/mngskillandcertificate'>
         <img      
         src={Frame564}
         alt="Frame564 not found"
          style={{
            position:'absolute',
            top:'308px',
            left:'1013px',
            cursor: 'pointer',
            width:'54px',
            zIndex:'9',
          }}
           />
           </Link>
         <img 
         src={Frame565}
         alt="Frame565 not found" 
        style={{
            position:'absolute',
            top:'308px',
            left:'1081px',
            width:'54px',
           // On click
// Navigate to: "MacBook Air - 45";
// Animate: Smart animate;
// Spring: { mass: 1, stiffness: 300, damping: 20 };
            

          }}
        />
        <img 
        src={Group6111} 
        alt="Group611 not found"
        style={{
            position:'absolute',
            top:'418px',
            width:'250px',
            left:'15px',
            cursor:'pointer'
        }}
         />
        <img 
        src={Group612} 
        alt="Group 612 not found"
        style={{
            position:'absolute',
            top:'463px',
            width:'250px',
            left:'15px',
            cursor:'pointer'
        }}
         />
        <img 
        src={Group6131} 
        alt="Group 613 not found" 
        style={{
            position:'absolute',
            top:'507px',
            width:'250px',
            left:'15px',
            cursor:'pointer'
        }}
        />
    {/* <HvTypography
    variant="normalText"
    style={{
     
      height: '24px',
      position: 'absolute',
      left: '848px',
      top: '126px',
      fontWeight:'bold',
      bottom: '1185px',
      width:'324px',
      zIndex:4,
      fontFamily: 'Montserrat',
      fontSize: '30px',
      lineHeight: '49px',
      letterSpacing:'0em',
      textAlign: 'left',
        color:'white'

  
      
    }}>
  
    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
  </HvTypography> */}
  </div>
</div>
  )
}
