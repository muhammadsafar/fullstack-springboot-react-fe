import axios from "axios";

const DEPARTMENT_BASE_REST_API_URL = "http://localhost:8080/api/v1/departments";

class DepartmentService {

  getAllDepartment() {
    return axios.get(DEPARTMENT_BASE_REST_API_URL);
  }

  saveDepartment(department) {
    return axios.post(DEPARTMENT_BASE_REST_API_URL, department);
  }
}

const departmentServiceInstance = new DepartmentService(); // Assign instance to a variable

export default departmentServiceInstance; // Export the instance variabl