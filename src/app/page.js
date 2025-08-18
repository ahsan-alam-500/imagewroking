"use client";

import { useState } from "react";

export default function EmployeeCreatePage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "12345678",
    department_id: "26",
    emplyeetype: "",
    dob: "",
    salary: "",
    nationalid: "",
    level: "",
    meritalstatus: "",
    phone: "",
    emergencycontactname: "",
    emergencycontactphone: "",
    address: "",
    designation: "",
    joindate: "",
    probitionprioed: "",
    reportingmanager: "",
    workshift: "",
    status: "active",
  });

  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData);


  const submitForm = async () => {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhcmRhcml0LmRldmVsb3BlcmFoc2FuLmNvbS9hcGkvdjEvbG9naW4iLCJpYXQiOjE3NTU0OTc2MTgsImV4cCI6MTc1NTUwMTIxOCwibmJmIjoxNzU1NDk3NjE4LCJqdGkiOiJ4VDJsaDVyUzRaTzdJa0tFIiwic3ViIjoiMjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.mggaHKW9fov1Tx3jhq1lUWl-sfZI5e3soRm_pE-Ntko"
    if (!token) return alert("No access token found. Please login.");

    // Required fields validation
    const requiredFields = ["fname", "lname", "email", "emplyeetype", "dob"];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        return alert(`Please fill the required field: ${field}`);
      }
    }

    if (!imageFile) return alert("Please select an image file.");

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) fd.append(key, value);
      });
      fd.append("image", imageFile);
      const res = await fetch("https://sardarit.developerahsan.com/api/v1/employees", {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setStatus(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setStatus("Error submitting form");
    }

    console.log(fd);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Employee</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="fname"
          placeholder="First Name*"
          value={formData.fname}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          name="lname"
          placeholder="Last Name*"
          value={formData.lname}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          name="email"
          type="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          name="department_id"
          placeholder="Department ID"
          value={formData.department_id}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          name="emplyeetype"
          placeholder="Employee Type*"
          value={formData.emplyeetype}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          name="dob"
          type="date"
          placeholder="Date of Birth*"
          value={formData.dob}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* File Upload */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2 text-gray-700">Upload Image</h2>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        onClick={submitForm}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Submit
      </button>

      {status && (
        <pre className="mt-6 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">{status}</pre>
      )}
    </div>
  );
}
