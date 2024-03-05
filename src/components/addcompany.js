import React, { useState } from "react";
import {  collection,doc,getDoc,setDoc,updateDoc } from "firebase/firestore";
import { db } from "../configuration/firebase-config";

const AddCompany = () => {
  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [regno, setRegNo] = useState("");
  const [salary, setSalary] = useState("");

  // Manually create an array of years
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

  const placementCollectionRef = collection(db, "placement");

  const submit = async (e) => {
    e.preventDefault();

    // Check if the document for the chosen year exists
    if (!year) {
      console.error("Year cannot be empty");
      return;
    }

    const docRef = doc(placementCollectionRef, year);

    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // Check if any other student in the document has the same regno
      const data = docSnapshot.data();
      const regnos = Object.values(data).map((student) => student.regno);
      if (regnos.includes(regno)) {
        alert("The Student Already Exists");
        return;
      }
      
        // Document exists, update the existing document
        await updateDoc(docRef, {
          [regno]: {
            name,
            regno,
            company,
            package: salary,
          },
        });
      } else {
        // Document doesn't exist, create a new document
        await setDoc(docRef, {
          [regno]: {
            name,
            regno,
            company,
            package: salary,
          },
        });
      }

      // Clear the form fields after submission
      setYear("");
      setName("");
      setRegNo("");
      setCompany("");
      setSalary("");
      alert("Student added Successfully");
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error appropriately
    }
  };


  return (
    <>
      <form onSubmit={submit}>
        <div className="input-container">
        <div style={{ width: '100%', padding: '20px' }}>
  <label style={{marginLeft:"-20px"}}>Year:</label>
  <select
    id="selectOption"
    value={year}
    onChange={(e) => setYear(e.target.value)}
    className="input-field"
    style={{width: '50%'}}
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



          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label>Reg No:</label>
            <input
              type="text"
              placeholder="Reg No"
              value={regno}
              onChange={(e) => setRegNo(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label>Company:</label>
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label>Package:</label>
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
              value="Add"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCompany;
