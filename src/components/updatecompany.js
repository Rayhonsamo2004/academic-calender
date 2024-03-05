import React, { useState , useEffect} from "react";
import {  collection,doc,getDocs,setDoc,updateDoc,getDoc } from "firebase/firestore";
import { db } from "../configuration/firebase-config";

const UpdateCompany=()=>{
    const [years, setYears] = useState([]);
    const [year, setYear] = useState("");
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const [company, setCompany] = useState("");
    const [name, setName] = useState("");
    const [regno, setRegNo] = useState("");
    const [salary, setSalary] = useState("");
  
    useEffect(() => {
      const fetchYears = async () => {
        const querySnapshot = await getDocs(collection(db, "placements"));
        const yearOptions = querySnapshot.docs.map((doc) => doc.id);
        setYears(yearOptions);
      };
  
      fetchYears();
    }, []);
  
    // Fetch students when year is selected
    useEffect(() => {
      const fetchStudents = async () => {
        if (year) {
          const docRef = doc(db, "placements", year);
          const docSnapshot = await getDoc(docRef);
  
          if (docSnapshot.exists()) {
            const studentOptions = Object.keys(docSnapshot.data().students);
            setStudents(studentOptions);
          }
        }
      };
  
      fetchStudents();
    }, [year]);
  
    const submit = async (e) => {
      e.preventDefault();
  
      if (!year || !student) {
        console.error("Please select a year and a student.");
        return;
      }
  
      const docRef = doc(db, "placements", year);
  
      try {
        const docSnapshot = await getDoc(docRef);
  
        if (docSnapshot.exists()) {
          const studentData = docSnapshot.data().students[student];
          const updatedStudentData = {
            name: name || studentData.name,
            regno: regno || studentData.regno,
            company: company || studentData.company,
            package: salary || studentData.package,
          };
  
          await updateDoc(docRef, {
            [`students.${student}`]: updatedStudentData,
          });
  
          // Clear the form fields after submission
          setYear("");
          setStudent("");
          setName("");
          setRegNo("");
          setCompany("");
          setSalary("");
        } else {
          console.error("Selected document does not exist.");
        }
      } catch (error) {
        console.error("Error updating data:", error);
        // Handle error appropriately
      }
    };
  

    return(
        <>
        <form onSubmit={submit}>
            <div className="input-container">
            <div style={{ width: "100%", padding: "20px" }}>
            <label style={{ marginLeft: "-20px" }}>Year:</label>
            <select
              id="selectOption"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="input-field"
              style={{ width: "50%" }}
            >
              <option value="" disabled hidden>
                Select Year
              </option>
              {years.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>
          <div style={{ width: "100%", padding: "20px" }}>
            <label style={{ marginLeft: "-20px" }}>Student:</label>
            <select
              id="selectOption"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="input-field"
              style={{ width: "50%" }}
            >
              <option value="" disabled hidden>
                Select Student
              </option>
              {students.map((studentOption) => (
                <option key={studentOption} value={studentOption}>
                  {studentOption}
                </option>
              ))}
            </select>
          </div>
<div>
            <label>Change Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label>Change Reg No:</label>
            <input
              type="text"
              placeholder="Reg No"
              value={regno}
              onChange={(e) => setRegNo(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label>Change Company:</label>
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label>Change Package:</label>
            <input
              type="text"
              placeholder="Package"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <input
              style={{ marginLeft: '90%', width: '100px' }}
              className="btn btn-outline-primary INFINIX"
              type="submit"
              value="update"
            />
          </div>
            </div>
        </form>
        </>
    );

};
export default UpdateCompany;