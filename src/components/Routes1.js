import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import PredictModel from './PredictModel';
import Complaints from './Complaints';
import Tools from './Tools';

const Routes1 = () => {
  return (
    <Routes>
      <Route exact path="/about-us" element={<About />} />
      <Route exact path="/tools" element={<Tools />} />
      <Route exact path="/predict-model" element={<PredictModel />} />
      <Route exact path="/complaints" element={<Complaints />} />
    </Routes>
  );
};

export default Routes1;
