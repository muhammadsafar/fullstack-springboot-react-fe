import React, { useState } from "react";
import DepartmentService from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../helper/ErrorModal";

const AddDepartment = () => {
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState();

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

  const saveOrUpdateDepartment = (e) => {
    e.preventDefault();

    const department = { departmentCode, departmentName };
    console.log(department);

    DepartmentService.saveDepartment(department)
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
  };

  const errorHandler = () => {
    setMessageError(null);
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
            <h2 className="text-center">Add Department</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label" style={{ fontSize: "18px" }}>
                    Department Code :
                  </label>
                  <input
                    type="text"
                    placeholder="enter department code"
                    name="departmentCode"
                    className="form-control"
                    value={departmentCode}
                    onChange={(e) => setDepartmentCode(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label" style={{ fontSize: "18px" }}>
                    Department Name :{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="enter department name"
                    name="departmentName"
                    className="form-control"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateDepartment(e)}
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

export default AddDepartment;
