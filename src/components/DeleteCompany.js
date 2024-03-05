import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from "../configuration/firebase-config";

const DeleteCompany = () => {
    const [years, setYears] = useState([]);
    const [year, setYear] = useState("");
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const [selectedStudentData, setSelectedStudentData] = useState(null);

    useEffect(() => {
        const fetchYears = async () => {
            const querySnapshot = await getDocs(collection(db, "placement"));
            const yearOptions = querySnapshot.docs.map((doc) => doc.id);
            setYears(yearOptions);
        };

        fetchYears();
    }, []);

    // Fetch students when year is selected
    useEffect(() => {
        const fetchStudents = async () => {
            if (year) {
                const docRef = doc(db, "placement", year);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const docData = docSnapshot.data();
                    const studentData = docData;
                    if (studentData) {
                        const studentOptions = Object.keys(studentData);
                        setStudents(studentOptions);
                        // Set the student state to the currently selected option if it exists in the student options
                        if (student && studentOptions.includes(student)) {
                            setStudent(student);
                            console.log(student);
                        } else {
                            setStudent("");
                        }
                    } else {
                        setStudents([]);
                    }
                } else {
                    setStudents([]);
                }
            }
        };

        fetchStudents();
    }, [year]);

    const handleDelete = async () => {
        if (!year || !student) return;
        try {
            const docRef = doc(db, 'placement', year);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const docData = docSnapshot.data();

                // Check if the student exists in the document
                if (docData[student]) {
                    // Delete the student field from the document
                    delete docData[student];

                    // Update the document with the modified data
                    await setDoc(docRef, docData);

                    alert('Record deleted successfully!');

                    // Clear the student selection
                    setStudent("");
                    setSelectedStudentData(null);
                } else {
                    alert('Student data not found!');
                }
            } else {
                alert('Year data not found!');
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    useEffect(() => {
        if (year && student) {
            const docRef = doc(db, 'placement', year);
            getDoc(docRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const docData = docSnapshot.data();
                    if (docData[student]) {
                        setSelectedStudentData(docData[student]);
                    } else {
                        setSelectedStudentData(null);
                    }
                }
            }).catch((error) => {
                console.error('Error getting document:', error);
            });
        } else {
            setSelectedStudentData(null);
        }
    }, [year, student]);

    return (
        <div>
            <div style={{ width: "100%", padding: "20px" }}>
                <label style={{ marginLeft: "-20px" }}>Year:</label>
                <select
                    id="selectOption"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="input-field"
                    style={{ width: "50%", marginLeft: "30px" }}
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
                    style={{ width: "50%", marginLeft: "5px" }}
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
                <button onClick={handleDelete} class="btn btn-primary" style={{ marginLeft: "20px" }}>Delete</button>
            </div>
            <div style={{ width: "100%", padding: "20px" }}>
                <textarea
                    readOnly
                    value={selectedStudentData ? JSON.stringify(selectedStudentData, null, 2) : ""}
                    className="input-field"
                    style={{ width: "80%", height: "200px", marginLeft: "5px" }}
                />
            </div>
        </div>
    );
};

export default DeleteCompany;
