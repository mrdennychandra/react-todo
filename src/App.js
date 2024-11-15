import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Add from './Add.js';

function App() {
  return (
    <Router>
    <div className="container">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addTodo" element={<Add />} />
      <Route path="/edit/:id" element={<Add />} />
    </Routes>
    </div>
  </Router>
  );
}

export default App;