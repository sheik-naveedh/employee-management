import React, { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";


const App = () => {
  return (
    <>
    <h1>Employee Management System</h1>
      <EmployeeForm/>
      <EmployeeTable />

    </>
  );
};

export default App;
