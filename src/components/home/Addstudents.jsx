import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { handleCreateNewListing } from "../../firebase/db";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
  const { currentUser } = useAuth(); 
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [parentGuardianName, setParentGuardianName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!ID || !name || !studentClass || !section || !rollNo || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {

      await handleCreateNewListing(
        ID,name,studentClass,section,rollNo,email,phoneNumber,
        dateOfBirth,
        address,
        parentGuardianName,
        emergencyContact,
        enrollmentDate
      );
      toast.success("Student added successfully!");
      setID("");
      setName("");
      setStudentClass("");
      setSection("");
      setRollNo("");
      setEmail("");
      setPhoneNumber("");
      setDateOfBirth("");
      setAddress("");
      setParentGuardianName("");
      setEmergencyContact("");
      setEnrollmentDate("");
    } catch (error) {
      toast.error("Error adding student: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add Student
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[70vh] overflow-y-auto"
        >
          <div>
            <label htmlFor="studentID" className="block text-sm font-medium text-gray-600">
              Student ID *
            </label>
            <input
              id="studentID"
              type="text"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              placeholder="Enter student ID"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Student Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="studentClass" className="block text-sm font-medium text-gray-600">
                Class *
              </label>
              <input
                id="studentClass"
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="Enter class"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-600">
                Section *
              </label>
              <input
                id="section"
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="Enter section"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-600">
                Roll Number *
              </label>
              <input
                id="rollNo"
                type="number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter roll number"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddStudent;
