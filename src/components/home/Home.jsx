// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { allstudents, editListing, deleteListing } from '../../firebase/db';
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';

// const Home = () => {
//   const [students, setStudents] = useState([]);
//   const [isEditing, setIsEditing] = useState(null);
//   const [editData, setEditData] = useState({
//     ID: "",
//     name: "",
//     class: "",
//     section: "",
//     rollNo: "",
//   });
  
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const Allstudents = async () => {
//       try {
//         const studentSnapshot = await allstudents();
//         setStudents(
//           studentSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//         );
//       } catch (error) {
//         toast.error("Error fetching students!");
//       }
//     };

//     Allstudents();
//   }, []);
  

//   const Delete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       try {
//         await deleteListing(id);
//         setStudents(students.filter((student) => student.id !== id));
//         toast.success("Student deleted successfully!");
//       } catch (error) {
//         toast.error("Error deleting student!");
//       }
//     }
//   };

//   const Edit = (student) => {
//     setIsEditing(student.id);
//     setEditData({
//       ID: student.ID,
//       name: student.name,
//       class: student.class,
//       section: student.section,
//       rollNo: student.rollNo,
//     });
//   };

//   const SaveEdit = async () => {
//     try {
//       await editListing(isEditing, editData);
//       setStudents(
//         students.map((student) =>
//           student.id === isEditing ? { ...student, ...editData } : student
//         )
//       );
//       setIsEditing(null);
//       toast.success("Student updated successfully!");
//     } catch (error) {
//       toast.error("Error updating student!");
//     }
//   };

//   const handleView = (studentId) => {
//     navigate(`/student/${studentId}`); 
//   };

//   return (
//     <div className="container mx-auto mt-10 p-4">
//       <ToastContainer />
//       <div className="flex items-center justify-between mb-12">
//         <img 
//           src="https://e7.pngegg.com/pngimages/787/202/png-clipart-student-information-system-education-management-student-angle-text-thumbnail.png"
//           alt="Logo" 
//           className="h-15 w-20 transition-transform duration-300 hover:scale-110" 
//         />
//         <h1 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide flex-1 mt-8">Student Management</h1>
//       </div>

//       <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
//         <table className="table-auto w-full border-collapse text-sm">
//           <thead className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
//             <tr>
//               <th className="border px-4 py-2 text-left">ID</th>
//               <th className="border px-4 py-2 text-left">Name</th>
//               <th className="border px-4 py-2 text-left">Class</th>
//               <th className="border px-4 py-2 text-left">Section</th>
//               <th className="border px-4 py-2 text-left">Roll No</th>
//               <th className="border px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student, index) => (
//               <tr
//                 key={student.id}
//                 className={`${
//                   index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
//                 } hover:bg-teal-50 transition duration-200`}
//               >
//                 {isEditing === student.id ? (
//                   <>
//                     <td className="border px-4 py-2">
//                       <input
//                         type="text"
//                         value={editData.ID}
//                         onChange={(e) =>
//                           setEditData({ ...editData, ID: e.target.value })
//                         }
//                         className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       />
//                     </td>
//                     <td className="border px-4 py-2">
//                       <input
//                         type="text"
//                         value={editData.name}
//                         onChange={(e) =>
//                           setEditData({ ...editData, name: e.target.value })
//                         }
//                         className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       />
//                     </td>
//                     <td className="border px-4 py-2">
//                       <input
//                         type="text"
//                         value={editData.class}
//                         onChange={(e) =>
//                           setEditData({ ...editData, class: e.target.value })
//                         }
//                         className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       />
//                     </td>
//                     <td className="border px-4 py-2">
//                       <input
//                         type="text"
//                         value={editData.section}
//                         onChange={(e) =>
//                           setEditData({ ...editData, section: e.target.value })
//                         }
//                         className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       />
//                     </td>
//                     <td className="border px-4 py-2">
//                       <input
//                         type="text"
//                         value={editData.rollNo}
//                         onChange={(e) =>
//                           setEditData({ ...editData, rollNo: e.target.value })
//                         }
//                         className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       />
//                     </td>
//                     <td className="border px-4 py-2 flex gap-4">
//                       <button
//                         onClick={SaveEdit}
//                         className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setIsEditing(null)}
//                         className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="border px-4 py-2">{student.ID}</td>
//                     <td className="border px-4 py-2">{student.name}</td>
//                     <td className="border px-4 py-2">{student.class}</td>
//                     <td className="border px-4 py-2">{student.section}</td>
//                     <td className="border px-4 py-2">{student.rollNo}</td>
//                     <td className="border px-4 py-2 flex gap-4">
//                       <button
//                         onClick={() => handleView(student.id)}
//                         className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => Edit(student)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => Delete(student.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="container mx-auto mt-10 p-4">
      <ToastContainer />
      <div className="flex items-center justify-between mb-12">
        <img 
          src="https://e7.pngegg.com/pngimages/787/202/png-clipart-student-information-system-education-management-student-angle-text-thumbnail.png"
          alt="Logo" 
          className="h-15 w-20 transition-transform duration-300 hover:scale-110" 
        />
        <h1 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide flex-1 mt-8">Student Management</h1>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
            <tr>
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
                } hover:bg-teal-50 transition duration-200`}
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
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.class}
                        onChange={(e) =>
                          setEditData({ ...editData, class: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.section}
                        onChange={(e) =>
                          setEditData({ ...editData, section: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editData.rollNo}
                        onChange={(e) =>
                          setEditData({ ...editData, rollNo: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </td>
                    <td className="border px-4 py-2 flex gap-4">
                      <button
                        onClick={SaveEdit}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
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
                    <td className="border px-4 py-2 flex gap-4">
                      <button
                        onClick={() => handleView(student.id)}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
                      >
                        View
                      </button>
                      <button
                        onClick={() => Edit(student)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => Delete(student.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
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

      
      <a
        href="https://github.com/anurag-chandra9/student-management" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 p-2  rounded-full shadow-lg hover:scale-110 transition transform"
      >
        <img
          src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png" 
          alt="GitHub Logo"
          className="h-12 w-15"
        />
      </a>
    </div>
  );
};

export default Home;
