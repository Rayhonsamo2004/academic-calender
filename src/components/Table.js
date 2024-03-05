import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from "../configuration/firebase-config";
import '../styles/table.css';
import '../styles/home.css';
import '../styles/sign.css'
const Table=({examsData,name})=>{
    return(
        <>
        <div className="wrapper rounded" style={{ marginLeft: '0px', width: '90%', border: '3px solid' }}>
        <div className="table-responsive mt-3">
        <h4 style={{marginLeft:'4px',background:'#800404',width:'100%',color:'white'}}>{name}</h4>
          <table className="table table-dark table-borderless">
            <thead>
              <tr style={{ border: '2px solid' }}>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>date</th>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>faculty</th>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>subject code</th>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>subject name</th>
              </tr>
            </thead>
            <tbody>
              
            {
      examsData.map((exams,index)=>(
        <tr key={index}>
         
        <td>{exams.date}</td>
        <td>{exams.faculty}</td>
        <td>{exams.subjectCode}</td>
        <td>{exams.subjectName}</td>
      </tr>
      ))
     }
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center results">
        </div>
      </div>
        </>
    )
}

export default Table;