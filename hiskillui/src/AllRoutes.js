import React, { useEffect,useRef } from 'react'

import './Employee/components/EmpRoutes.css'
import { Route, Routes } from 'react-router-dom';
import EmpMainPage from './Employee/components/MainPage';
import EmpAddSkill from './Employee/components/AddSkill';
import EmpProfile from './Employee/components/Profile';
import EmpSkillTable from './Employee/components/SkillTable';
import EmpCertTable from './Employee/components/CertTable';
import LoginPage from './Employee/components/LoginPage';
import AdmHomepage from './Admin/Components/Homepage';
import AdmSkillTable1 from './Admin/Components/SkillTable1';
import AdmCertificateTable from './Admin/Components/CertificateTable';
import AdmAddNewSkill from './Admin/Components/AddNewSkill';
import AdmAddCertificate from './Admin/Components/AddCertificate';
import MngLogin from './ManagerUi/Manager/Components/Login';
import MngProgresstacking from './ManagerUi/Manager/Components/Progresstracking';
import MngSkillandCertificate from './ManagerUi/Manager/Components/SkillandCertificate';
import MngEmployeelist2 from './ManagerUi/Manager/Components/Employeelist2';
import MngAddskill1 from './ManagerUi/Manager/Components/AddSkill1';
import MngSkillandcertification from './ManagerUi/Manager/Components/Skillandcertification';
import CopDashboard from './COP/components/CopDashboard';
import RMGHomePage from './RMG/components/HomePage';
import Treemap from './COP/components/Treemap';
import CertificationView from './Employee/components/CertificationView'
export default function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/empmainpage/:empId" element={<EmpMainPage />} />
            <Route path="/empcertification/:empId" element={<CertificationView/>}/>
            <Route path="/empprofile" element={<EmpProfile />} />
            <Route path="/empaddskill/:empId" element={<EmpAddSkill />} />
            <Route path="/empskilltable/:empId" element={<EmpSkillTable/>} />
            <Route path="/empcerttable/:empId" element={<EmpCertTable/>} />
            <Route path="/admHome" element={<AdmHomepage />} />
            <Route path="/admSkills" element={<AdmSkillTable1 />} />
            <Route path="/admCertificates" element={<AdmCertificateTable />} />
            <Route path="/admAddNewSkill" element={<AdmAddNewSkill  />} />
            <Route path="/admAddCertificate" element={<AdmAddCertificate />} />
            <Route path="/admAddCertificate" element={<AdmAddCertificate />} />
            <Route path='/mnghome/:mngId' element={<MngLogin/>}/>
            <Route path='mngprogresstacking'element={<MngProgresstacking/>}/>
            <Route path='mngskillandcertificate' element={<MngSkillandCertificate/>}/>
            <Route path='mngemployeelist2/:mngId' element={<MngEmployeelist2/>}/>
            <Route path='mngaddskill1/:empId' element={<MngAddskill1/>}/>
            <Route path='mngskillandcertification/:empId' element={<MngSkillandcertification/>}/>
            <Route path='copDashboard' element={<Treemap height={500} width={500} />}/>
            {/* <Route path='copdashboard' element={<Treemap/> }/> */}
            <Route path='RMGHomepage' element={<RMGHomePage/>}/>
          </Routes>
    </div>
  )
}
