import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './AllRoutes';
// import SklUpgRoutes from './SkillUpgrade/components/SklUpgRoutes';

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
      {/* <SklUpgRoutes/> */}
    </BrowserRouter>
  )
}

export default App;
