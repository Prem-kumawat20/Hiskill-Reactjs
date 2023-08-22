import React from 'react'
import './EmpRoutes.css'
import AddSkill from './AddSkill';
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Profile from './Profile';
import SkillTable from './SkillTable';
import CertTable from './CertTable';
import LoginPage from './LoginPage';
import CertificationViews from './CertificationView';

export default function EmpRoutes() {
  return ( 
      <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path='/empcertification' element={<CertificationViews/>} />
            <Route path="/empmainpage" element={<MainPage />} />
            <Route path="/empprofile" element={<Profile />} />
            <Route path="/empaddskill" element={<AddSkill />} />
            <Route path="/empskilltable" element={<SkillTable/>} />
            <Route path="/empcerttable" element={<CertTable/>} />
          </Routes>
      </div>
  )
}
