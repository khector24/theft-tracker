import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ReportsPage from './Pages/ReportsPages';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/reportsPage' element={<ReportsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
