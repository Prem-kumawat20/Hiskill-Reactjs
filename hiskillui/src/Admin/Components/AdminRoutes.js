import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import SkillTable1 from './SkillTable1';
import CertificateTable from './CertificateTable';
import AddNewSkill from './AddNewSkill';
import AddCertificate from './AddCertificate';
import Homepage from './Homepage';
export default function AdminRoutes()
{
    return(
          
            <Routes>
                <Route path="/admHome" element={<Homepage />} />
                <Route path="/admSkills" element={<SkillTable1 />} />
                <Route path="/admCertificates" element={<CertificateTable />} />
                <Route path="/admAddNewSkill" element={<AddNewSkill  />} />
                <Route path="/admAddCertificate" element={<AddCertificate />} />
                </Routes>
           
          
    )
}