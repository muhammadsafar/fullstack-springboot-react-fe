import React, { useEffect, useState } from "react";
import DepartmentService from "../services/DepartmentService";
import { Link } from "react-router-dom";

const ListDepartment = () => {
  const [departments, setDepartments] = useState([]);

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
    getAllDepartment();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center" style={{ width: "40%" }}>
        List Department
      </h3>

      <Link to={"/add-department"} className="btn btn-primary mb-2">
        Add Department
      </Link>
      <table
        className="table table-bordered table-striped"
        style={{ width: "40%" }}
      >
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Code</th>
            <th>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep) => (
            <tr key={dep.departmentId}>
              <td>{dep.departmentId}</td>
              <td>{dep.departmentCode}</td>
              <td>{dep.departmentName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartment;
