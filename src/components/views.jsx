
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
        <div className="text-2xl font-bold text-gray-600 animate-pulse">
          Loading Student Details...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-4 lg:mt-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center font-serif">
          Student Profile
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem label="Student ID" value={student.ID} />
                <DetailItem label="Full Name" value={student.name} />
                <DetailItem label="Class" value={student.class} />
                <DetailItem label="Section" value={student.section} />
                <DetailItem label="Roll Number" value={student.rollNo} />
                <DetailItem label="Email" value={student.email} />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Additional Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem label="Date of Birth" value={student.DateOfBirth} />
                <DetailItem label="Address" value={student.Address} />
                <DetailItem 
                  label="Parent/Guardian" 
                  value={student.ParentGuardianName} 
                />
                <DetailItem 
                  label="Emergency Contact" 
                  value={student.EmergenctContact} 
                />
                <DetailItem 
                  label="Enrollment Date" 
                  value={student.EnrollmentDate} 
                  fullWidth 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, fullWidth = false }) => (
  <div className={`flex flex-col ${fullWidth ? 'md:col-span-2' : ''}`}>
    <span className="text-sm font-medium text-gray-500 mb-1">{label}</span>
    <span className="text-lg text-gray-800 font-normal break-words">
      {value || 'N/A'}
    </span>
  </div>
);

export default StudentDetail;
