import axios from "axios";

const EMPLOYEE_BASE_REST_API_URL = "http://localhost:8080/api/v1/employees";

const EmployeeService = {
  getAllEmployee() {
    return axios.get(EMPLOYEE_BASE_REST_API_URL);
  },

  saveEmployee(employee) {
    return axios.post(EMPLOYEE_BASE_REST_API_URL, employee);
  },

  getEmployeeById(emplId) {
    return axios.get(EMPLOYEE_BASE_REST_API_URL + "/" + emplId);
  },

  updateEmployee(employeeId, employee) {
    return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId, employee);
  },

  deleteEmployee(emplId) {
    return axios.delete(EMPLOYEE_BASE_REST_API_URL + "/" + emplId);
  },

  getEmployeeByNameOrEmail(key) {
    return axios.get(EMPLOYEE_BASE_REST_API_URL + "/find?keyword=" + key);
  },
};

export default EmployeeService;
