import React, { useEffect, useState } from "react";
import DepartmentService from "../services/DepartmentService";
import EmployeeService from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../helper/ErrorModal";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fetchDept, setFetchDept] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [messageError, setMessageError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    DepartmentService.getAllDepartment()
      .then((res) => {
        setFetchDept(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const selectDept = (e) => {
    setDepartmentId(e.target.value);
  };

  const convertErrorData = (errorData) => {
    // Memeriksa apakah errorData.details tidak null
    if (errorData.details !== null) {
      // Mengonversi errorData.details menjadi array [key, value]
      return Object.entries(errorData.details).reduce((acc, [key, value]) => {
        // Menyimpan pasangan key dan value yang diubah
        acc[key] = value;
        return acc;
      }, {});
    } else {
      // Jika errorData.details === null, mengembalikan objek dengan pesan error
      return { error: errorData.message };
    }
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    const department = {
      departmentId: departmentId,
    };

    const employee = { firstName, lastName, email, department };

    if (id) { //edit
      EmployeeService.updateEmployee(id, employee)
        .then((res) => {
          console.log(res.data);
          navigate("/employees");
        })
        .catch((err) => {
          console.error(err);

          const errorDetails = err.response?.data?.details;
          const errorMessage = err.response?.data?.message;

          const myJSON = JSON.stringify(
            errorDetails !== null
              ? convertErrorData(err.response.data)
              : { error: errorMessage }
          );

          setMessageError(JSON.parse(myJSON));
        });
    } else { //add
      EmployeeService.saveEmployee(employee)
        .then((res) => {
          console.log(res.data);
          navigate("/employees");
        })
        .catch((err) => {
          console.error(err);

          const errorDetails = err.response?.data?.details;
          const errorMessage = err.response?.data?.message;

          const myJSON = JSON.stringify(
            errorDetails !== null
              ? convertErrorData(err.response.data)
              : { error: errorMessage }
          );

          setMessageError(JSON.parse(myJSON));
        });
    }
  };

  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
          setDepartmentId(res.data.department.departmentId);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const errorHandler = () => {
    setMessageError(null);
  };

  const title = () => {
    return id ? <h2 className="text-center">Update Employee</h2> : <h2 className="text-center">Add Employee</h2>;
  };

  return (
    <div>
      {messageError && (
        <ErrorModal message={messageError} onConfirm={errorHandler} />
      )}

      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <br />
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label" style={{ fontSize: "18px" }}>
                    First Name :{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="enter first name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label" style={{ fontSize: "18px" }}>
                    Last Name :{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="enter last name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label" style={{ fontSize: "18px" }}>
                    Email :{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="enter email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label" style={{ fontSize: "18px" }}>
                    Department:{" "}
                  </label>
                  <select
                    style={{ fontSize: "18px" }}
                    className="form-control"
                    value={departmentId}
                    onChange={selectDept}
                  >
                    <option value={null}>{`Please Choose`}</option>
                    {fetchDept.map((option, index) => (
                      <option key={index} value={option.departmentId}>
                        {`${option.departmentName} (${option.departmentCode})`}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateEmployee(e)}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
