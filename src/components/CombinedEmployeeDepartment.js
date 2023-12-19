import React from "react";
import ListEmployee from "./ListEmployee";
import ListDepartment from "./ListDepartment";

const CombinedEmployeeDepartment = () => {
  return (
    <div>
      <ListEmployee />
      <ListDepartment />
    </div>
  );
};

export default CombinedEmployeeDepartment;
