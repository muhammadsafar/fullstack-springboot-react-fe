import React from "react";
import "./App.css";
import AddDepartment from "./components/AddDepartment";
import AddEmployee from "./components/AddEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CombinedEmployeeDepartment from "./components/CombinedEmployeeDepartment";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <div className="container content" >
          <Routes>
            <Route
              exact
              path="/"
              Component={CombinedEmployeeDepartment}
            ></Route>
            <Route path="/employees" Component={CombinedEmployeeDepartment}></Route>
            <Route path="/add-employee" Component={AddEmployee}></Route>
            <Route path="/edit-employee/:id" Component={AddEmployee}></Route>

            {/* //department */}
            <Route path="/add-department" Component={AddDepartment}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
