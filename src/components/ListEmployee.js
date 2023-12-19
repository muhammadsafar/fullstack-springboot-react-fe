import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import DepartmentService from "../services/DepartmentService";
import { Link } from "react-router-dom";
import ErrorModal from "../helper/ErrorModal";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [messageError, setMessageError] = useState();

  const getAllEmployee = () => {
    EmployeeService.getAllEmployee()
      .then((res) => {
        setEmployees(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const getAllDepartment = () => {
    DepartmentService.getAllDepartment()
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllEmployee();
    getAllDepartment();
  }, []);

  const deleteEmployee = (emplId) => {
    console.log(emplId);
    EmployeeService.deleteEmployee(emplId)
      .then((res) => {
        getAllEmployee();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorHandler = () => {
    setMessageError(null);
  };

  const checkDepartment = (event) => {
    if (departments.length === 0) {
      event.preventDefault();
      console.log(departments.length);
      setMessageError("Please add Department first...");
    }
  };

  const searchEmployee = (key) => {
    console.log(key);
    EmployeeService.getEmployeeByNameOrEmail(key)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {messageError && (
        <ErrorModal message={messageError} onConfirm={errorHandler} />
      )}


      <div className="container">
        <h2 className="text-center">List Employee</h2>

        <Link
          to={"/add-employee"}
          className="btn btn-primary mb-2"
          onClick={checkDepartment}
        >
          Add Employee
        </Link>

        <input
          type="text"
          className="form-control"
          onChange={(e) => searchEmployee(e.target.value)}
          placeholder="search by name or email"
        />

        <br />

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email</th>
              <th>Department Code - Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{`[${emp.department.departmentCode}] - ${emp.department.departmentName}`}</td>
                <td></td>
                <td>
                  <Link
                    className="btn btn-info"
                    to={`/edit-employee/${emp.id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteEmployee(emp.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListEmployee;
