import React, { useState, useEffect } from 'react';
import { useNavigate ,NavLink} from 'react-router-dom';
import { allstudents, editListing, deleteListing } from '../../firebase/db';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({
    ID: "",
    name: "",
    class: "",
    section: "",
    rollNo: "",
  });
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const Allstudents = async () => {
      try {
        const studentSnapshot = await allstudents();
        setStudents(
          studentSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        toast.error("Error fetching students!");
      }
    };

    Allstudents();
  }, []);

  const Delete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteListing(id);
        setStudents(students.filter((student) => student.id !== id));
        toast.success("Student deleted successfully!");
      } catch (error) {
        toast.error("Error deleting student!");
      }
    }
  };

  const Edit = (student) => {
    setIsEditing(student.id);
    setEditData({
      ID: student.ID,
      name: student.name,
      class: student.class,
      section: student.section,
      rollNo: student.rollNo,
    });
  };

  const SaveEdit = async () => {
    try {
      await editListing(isEditing, editData);
      setStudents(
        students.map((student) =>
          student.id === isEditing ? { ...student, ...editData } : student
        )
      );
      setIsEditing(null);
      toast.success("Student updated successfully!");
    } catch (error) {
      toast.error("Error updating student!");
    }
  };


  const handleView = (studentId) => {
    navigate(`/student/${studentId}`); 
  };

  return (
    <div className="container mx-auto mt-6 p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8 text-center">
        Student Management
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Class</th>
              <th className="border px-4 py-2 text-left">Section</th>
              <th className="border px-4 py-2 text-left">Roll No</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-200`}
              >
                {isEditing === student.id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.ID}
                        onChange={(e) =>
                          setEditData({ ...editData, ID: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.class}
                        onChange={(e) =>
                          setEditData({ ...editData, class: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.section}
                        onChange={(e) =>
                          setEditData({ ...editData, section: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.rollNo}
                        onChange={(e) =>
                          setEditData({ ...editData, rollNo: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-4 py-2 flex gap-2">
                      <button
                        onClick={SaveEdit}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded shadow-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded shadow-md"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{student.ID}</td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.class}</td>
                    <td className="border px-4 py-2">{student.section}</td>
                    <td className="border px-4 py-2">{student.rollNo}</td>
                    <td className="border px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleView(student.id)}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded shadow-md"
                      >
                        
                        View
                      </button>
                      <button
                        onClick={() => Edit(student)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => Delete(student.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
