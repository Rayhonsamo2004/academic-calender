import React, { useState, useEffect } from "react";
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from "../configuration/firebase-config";
import '../styles/table.css';
import Table from "./Table";
import '../styles/home.css';
import '../styles/sign.css'

const ExamsTable = ({ year }) => {
  const [examsData, setExamsData] = useState({});

  const examTypes = ['CAT1', 'CAT2', 'Terminal'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataObject = {};

        for (let i = 0; i < examTypes.length; i++) {
          const examType = examTypes[i];
          const q = query(collection(db, 'exams', year, examType));
          const querySnapshot = await getDocs(q);

          const data = [];

          querySnapshot.forEach((doc) => {
            const examData = doc.data();
            const examId = doc.id;

            data.push({
              examId: examId,
              date: examData.date,
              examName: examData.examName,
              faculty: examData.faculty,
              subjectCode: examData.subjectCode,
              subjectName: examData.subjectName
            });
          });

          dataObject[examType] = data;
        }

        setExamsData(dataObject);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [year]);

  useEffect(() => {
    // Log the updated state after it has been set
    console.log(examsData);
  }, [examsData]);

  return (
    <>
      {Object.keys(examsData).map((examType) => (
        examsData[examType].length !== 0 && (
          <div key={examType}>
            {console.log(examType)}
            <Table examsData={examsData[examType]} name={examType} />
          </div>
        )
      ))}
    </>
  );
};

export default ExamsTable;
