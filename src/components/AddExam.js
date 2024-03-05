import React, { useState } from "react";
import { db } from "../configuration/firebase-config";
import { collection, doc, addDoc } from "firebase/firestore";


const AddExam = () => {
  const [selectedYear, setSelectedYear] = useState(""); // New state for selected year
  const [selectedExam, setSelectedExam] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [faculty, setFaculty] = useState("");
  const [date, setDate] = useState("");
  const [timings, setTimings] = useState("");

  const years = ["year1", "year2", "year3", "year4"];

  const handleAddExam = async () => {
    try {
      if (!selectedYear || !selectedExam || !subjectName || !subjectCode || !faculty || !date || !timings) {
        alert("Please fill in all fields.");
        return;
      }

      const examData = {
        examName: selectedExam,
        subjectName,
        subjectCode,
        faculty,
        date,
        timings,
      };

      const examRef = doc(db, "exams", selectedYear);

      const subcollectionRef = collection(examRef, selectedExam);
      await addDoc(subcollectionRef, examData, { id: subjectCode });
      
      alert("Exam details added successfully!");

      // Clear input fields after adding exam
      setSubjectName("");
      setSubjectCode("");
      setFaculty("");
      setDate("");
      setTimings("");
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  return (
    <div className="add-exam-container">
      <h2 className="add-exam-heading">Add Exam</h2>
      <div className="select-year" style={{width:"100%"}}>
        <label className="input-label">Select Year:</label>
        <select className="input-field" value={selectedYear} style={{width:"100%"}} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="" disabled>Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="select-exam" style={{width:"100%"}}>
        <label className="input-label">Select Exam:</label>
        <select className="input-field" value={selectedExam} style={{width:"100%"}} onChange={(e) => setSelectedExam(e.target.value)}>
          <option value="" disabled>Select Exam</option>
          <option value="CAT1">CAT1</option>
          <option value="CAT2">CAT2</option>
          <option value="Terminal">Terminal</option>
        </select>
      </div>
      <div className="subject-name" style={{width:"100%"}}>
        <label className="input-label">Subject Name:</label>
        <input className="input-field" type="text" style={{width:"100%"}} value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
      </div>
      <div className="subject-code" style={{width:"100%"}}>
        <label className="input-label">Subject Code:</label>
        <input className="input-field" type="text" style={{width:"100%"}} value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} />
      </div>
      <div className="faculty" style={{width:"100%"}}>
        <label className="input-label">Faculty:</label>
        <input className="input-field" type="text" value={faculty} style={{width:"100%"}} onChange={(e) => setFaculty(e.target.value)} />
      </div>
      <div className="date" style={{width:"100%"}}>
        <label className="input-label">Date:</label>
        <input className="input-field" type="date" value={date} style={{width:"100%"}} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="timings" style={{width:"100%"}}>
        <label className="input-label">Timings:</label>
        <input className="input-field" type="text" value={timings} style={{width:"100%"}} onChange={(e) => setTimings(e.target.value)} />
      </div>
      <button style={{ marginLeft: '90%', width: '100px' }}
              className="btn btn-primary" onClick={handleAddExam}>Add</button>
    </div>
  );
};

export default AddExam;
