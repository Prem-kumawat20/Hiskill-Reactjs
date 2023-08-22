import React from 'react';
import '../../App.css';
import Sidebar from './Sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Coursedetails from './CourseDetails';

function SkillUpgradeRoutes() {
    return (
        <div className="App">
            <div className="Sidebar">
                <Sidebar />
            </div >
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/Coursedetails/:id" element={<Coursedetails />} />
                </Routes>
            </div>
        </div>
    )
}

export default SkillUpgradeRoutes;
