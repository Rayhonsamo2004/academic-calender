import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../configuration/firebase-config";

const DeleteExam = () => {
  const [selectedYear, setSelectedYear] = useState(""); // State for selected year
  const [selectedExam, setSelectedExam] = useState(""); // State for selected exam
  const [years, setYears] = useState(["year1", "year2", "year3", "year4"]); // Options for year selection
  const [exams, setExams] = useState(["CAT1", "CAT2", "TERMINAL"]); // Options for exam selection

  useEffect(() => {
    
  }, []); 

  const handleDeleteExam = async () => {
    try {

  
      // Reference to the subcollection
      const subcollectionRef = collection(db, "exams", selectedYear, selectedExam);
  
      // Get all documents within the subcollection
      const querySnapshot = await getDocs(subcollectionRef);
  
      // Delete each document in the subcollection
      querySnapshot.forEach(async (doc) => {
        try {
          await deleteDoc(doc.ref);
          console.log(`Document ${doc.id} deleted successfully.`);
        } catch (deleteError) {
          console.error(`Error deleting document ${doc.id}:`, deleteError);
        }
      });
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };
  
  

  return (
    <div>
      <h2>Delete Exam</h2>
      <div style={{width:"100%"}}>
        <label>Select Year:</label>
        <select  className="input-field" value={selectedYear} style={{width:"100%"}} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="" disabled>Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div style={{width:"100%"}}>
        <label>Select Exam:</label>
        <select className="input-field" value={selectedExam} style={{width:"100%"}} onChange={(e) => setSelectedExam(e.target.value)}>
          <option value="" disabled>Select Exam</option>
          {exams.map((exam) => (
            <option key={exam} value={exam}>{exam}</option>
          ))}
        </select>
      </div>
      <button style={{ marginLeft: '90%', width: '100px' }}
              className="btn btn-primary" onClick={handleDeleteExam}>Delete</button>
    </div>
  );
};

export default DeleteExam;
