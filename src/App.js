// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import RestaurantList from "./components/RestaurantList";
import RestaurantForm from "./components/RestaurantForm";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/add" element={<RestaurantForm />} />
          <Route path="/edit/:id" element={<RestaurantForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
