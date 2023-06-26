import './App.css';
import Home from './components/Home';
import Admin from './components/Admin';
import versus from './image/versus.png';
import Firestore from './components/Firestore';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (<>
    {/*<Firestore/><Home vs={versus} db={db}/>*/}
    <Router>
      <Routes>
        <Route exact path="/" element={<Home vs={versus} />} />
        <Route exact path='/admin/dashboard' element={<Dashboard />} />
        <Route exact path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
