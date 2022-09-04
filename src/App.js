
import Navbar from "./Content/Nav/Navbar";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Content/Home/Home";
import Dashboard from "./Content/Graphics/Dashboard";

const App = () => {


  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
        
          <Route index element={<Home /> }/>
          <Route path="dashboard" element={<Dashboard />} />
      
      </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;