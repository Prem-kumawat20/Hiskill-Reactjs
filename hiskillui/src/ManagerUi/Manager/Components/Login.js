import React, { useState } from 'react'
import logo from '../assets/login assets/HV-Bug-Logo-RedBox-20230228-removebg-preview 1.svg'
import Rectangle185 from '../assets/login assets/Rectangle 185.svg'
import Rectangle184 from '../assets/login assets/Rectangle 184.svg'
import Rectangle186 from '../assets/login assets/Rectangle 186.svg'
import Group621 from '../assets/login assets/Group 621.svg'
import Group622 from '../assets/login assets/Group 622.svg'
import Rectangle187 from '../assets/login assets/Rectangle 187.svg'
import Downloadremove from '../assets/login assets/download-removebg-preview 1.svg'
import Frame564 from '../assets/login assets/Frame 564.svg'
import Frame565 from '../assets/login assets/Frame 565.svg'
import Group611 from '../assets/login assets/Group 611.svg'
import Group612 from '../assets/login assets/Group 612.svg'
import Group613 from '../assets/login assets/Group 613.svg'
import { Link } from 'react-router-dom'
import skillandcertificate from './SkillandCertificate'
import { useParams } from 'react-router-dom'
import { HvHeader,HvButton,HvHeaderBrand,HitachiLogo,HvHeaderActions,HvBadge,HvTypography} from '@hitachivantara/uikit-react-core'
export default function Login() {
  //const [empId,setempId]=useState('');
  const { mngId } = useParams();
  // console.log(mngId)
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
  
    Profile
  </HvTypography>
     
    </HvHeader>

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
   
      <Link to={`/mngemployeelist2/${mngId}`}>
      <img    
       src={Group621}
       alt="Group621 not found"
        style={{
            position:'absolute',
            zIndex:'6',
            top:'385px',
            left:'870px',
            width:'165px',
            cursor:'pointer'
        }} />
        </Link>
        <img        
        src={Group622} 
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
         src={Frame564}
         alt="Frame564 not found"
          style={{
            position:'absolute',
            top:'308px',
            left:'1013px',
            cursor: 'pointer',
            width:'54px',
            zIndex:'8',
           
          }}
           />
            <Link to='/mngskillandcertificate'>
         <img 
         src={Frame565}
         alt="Frame565 not found" 
        style={{
            position:'absolute',
            top:'308px',
            left:'1081px',
            width:'54px',
            zIndex:'9',
          }}
        />
        </Link>
        <Link to='/mngemployeelist2'>
        <img 
        src={Group611} 
        alt="Group611 not found"
        style={{
            position:'absolute',
            top:'418px',
            width:'250px',
            left:'15px',
            cursor:'pointer'
        }}
         />
         </Link>
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
        src={Group613} 
        alt="Group 613 not found" 
        style={{
            position:'absolute',
            top:'507px',
            width:'250px',
            left:'15px',
            cursor:'pointer'
        }}
        />
  </div>
</div>
  )
}
