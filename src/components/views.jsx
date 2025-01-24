import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { allstudents } from '../firebase/db';

const StudentDetail = () => {
  const { studentId } = useParams(); 
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const snapshot = await allstudents();
        const studentDoc = snapshot.docs.find((doc) => doc.id === studentId);
        if (studentDoc) {
          setStudent({ id: studentDoc.id, ...studentDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  if (!student) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-15 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-4xl">
        Student Details
      </h1>
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">ID:</span>
              <span>{student.ID}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Name:</span>
              <span>{student.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Class:</span>
              <span>{student.class}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Section:</span>
              <span>{student.section}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Roll No:</span>
              <span>{student.rollNo}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Email:</span>
              <span>{student.email}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Date of Birth:</span>
              <span>{student.DateOfBirth}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Address:</span>
              <span>{student.Address}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Parent/Guardian Name:</span>
              <span>{student.ParentGuardianName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Emergency Contact:</span>
              <span>{student.EmergenctContacth}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Enrollment Date:</span>
            <span>{student.EnrollmentDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
