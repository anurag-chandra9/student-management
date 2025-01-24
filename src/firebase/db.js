import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc,getDoc, getDocs } from "firebase/firestore";
import { app } from "./firebase";

const firestore = getFirestore(app);

const handleCreateNewListing = async (ID, name, studentClass, section, rollNo,email,PhoneNumber,DateOfBirth,Address,ParentGuardianName,EmergenctContact,EnrollmentDate) => {
  try {
    const studentsCollection = collection(firestore, "students");

    const docRef = await addDoc(studentsCollection, {
      ID: ID,
      name: name,
      class: studentClass,
      section: section,
      rollNo: rollNo,
      email:email,
      PhoneNumber:PhoneNumber,
      DateOfBirth:DateOfBirth,
      Address:Address,
      ParentGuardianName:ParentGuardianName,
      EmergenctContact:EmergenctContact,
      EnrollmentDate:EnrollmentDate,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const editListing = async (docId, updatedData) => {
  try {
    const docRef = doc(firestore, "students", docId);

    await updateDoc(docRef, updatedData);

    console.log(`Document with ID ${docId} has been updated.`);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const deleteListing = async (docId) => {
  try {
    const docRef = doc(firestore, "students", docId);

    await deleteDoc(docRef);

    console.log(`Document with ID ${docId} has been deleted.`);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
const allstudents=()=>{
    return getDocs(collection(firestore,"students"));
};

export { handleCreateNewListing, editListing, deleteListing,allstudents };
