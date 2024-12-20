import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeID: '',
    email: '',
    phoneNumber: '',
    department: '',
    dateOfJoining: '',
    role: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.employeeID || formData.employeeID.length > 10)
      newErrors.employeeID = 'Employee ID must be up to 10 characters';
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date())
      newErrors.dateOfJoining = 'Date of Joining cannot be in the future';
    if (!formData.role) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/employees/add-employee`, formData)
      .then(() => alert('Employee added successfully'))
      .catch((err) => alert(err.response?.data?.message || 'Submission failed'));
    setFormData({
      name: '',
      employeeID: '',
      email: '',
      phoneNumber: '',
      department: '',
      dateOfJoining: '',
      role: '',
    });
    setErrors({});
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-lg" style={{ width: '400px' }}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>
        <div className="mb-3">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            className="form-control"
          />
          {errors.employeeID && <small className="text-danger">{errors.employeeID}</small>}
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="mb-3">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-control"
          />
          {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
        </div>
        <div className="mb-3">
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.department && <small className="text-danger">{errors.department}</small>}
        </div>
        <div className="mb-3">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className="form-control"
          />
          {errors.dateOfJoining && <small className="text-danger">{errors.dateOfJoining}</small>}
        </div>
        <div className="mb-3">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-control"
          />
          {errors.role && <small className="text-danger">{errors.role}</small>}
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
        <button
          type="reset"
          onClick={() => setFormData({
            name: '',
            employeeID: '',
            email: '',
            phoneNumber: '',
            department: '',
            dateOfJoining: '',
            role: '',
          })}
          className="btn btn-secondary w-100 mt-2"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
