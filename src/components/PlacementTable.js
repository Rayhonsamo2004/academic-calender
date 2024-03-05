import React, { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../configuration/firebase-config";
import '../styles/table.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

const PlacementTableComponent = ({ year }) => {
  const [placementsData, setPlacementsData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const datas = [];
  let sum = 0;
  let cnt = 0;
  let maxSalary = 0;
  let maxSalaryStudent = "";

  useEffect(() => {
    const fetchData = async () => {
      sum = 0;
      cnt = 0;
      maxSalary = 0;
      maxSalaryStudent = "";

      try {
        const placementDocRef = doc(db, 'placement', year);
        const docSnapshot = await getDoc(placementDocRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPlacementsData([data]);
        } else {
          console.log("No such document!");
          setPlacementsData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [year]);

  useEffect(() => {
    const newData = [];
    placementsData.forEach((placement) => {
      Object.keys(placement).forEach((studentKey) => {
        const salary = parseFloat(placement[studentKey].package);
        const company = placement[studentKey].company;
        if (!datas[company]) {
          datas[company] = 1;
        } else {
          datas[company] += 1;
        }
        sum += salary;
        cnt += 1;

        if (salary > maxSalary) {
          maxSalary = salary;
          maxSalaryStudent = placement[studentKey].name;
        }
      });
    });

    newData.push(...Object.entries(datas).map(([company, count], index) => ({
      id: index,
      value: count,
      label: company,
    })));

    setChartData(newData);
    console.log(newData);
  }, [placementsData, year]);

  useEffect(() => {
    console.log(placementsData);
  }, [placementsData]);

  const calculateAverageSalary = () => {
    const totalPlacements = placementsData.reduce(
      (total, placement) => total + Object.keys(placement).length,
      0
    );

    const averageSalary = totalPlacements === 0 ? 0 : sum / totalPlacements;

    return averageSalary.toFixed(2);
  };
  const findMaxSalary = () => {
    
    placementsData.forEach((placement) => {
      Object.keys(placement).forEach((studentKey) => {
        const salary = parseFloat(placement[studentKey].package);
        const company = placement[studentKey].company;
        if (!datas[company]) {
          datas[company] = 1;
        } else {
          datas[company] += 1;
        }
        sum += salary;
        cnt += 1;

        if (salary > maxSalary) {
          maxSalary = salary;
          maxSalaryStudent = placement[studentKey].name;
        }
      });
    });
  };

  findMaxSalary();

  return (
    <>
      <div className="wrapper rounded" style={{ marginLeft: '0px', width: '100%', border: '3px solid' }}>
        <div className="table-responsive mt-3">
        <h4 style={{marginLeft:'4px',backgroundColor:'#800404',width:'100%',height:'30px',color:'white'}}>Academic Year:{year}</h4>
          <table className="table table-dark table-borderless" style={{width:'100%'}}>
            <thead>
              <tr style={{ border: '2px solid' }}>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>S.No</th>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>Company Name</th>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>Student Name</th>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>Registration Number</th>
                <th scope="col" style={{ border: '2px solid', fontSize: '16px' }}>Salary</th>
              </tr>
            </thead>
            <tbody>
              {placementsData.map((placement, index) => (
                Object.keys(placement).map((studentKey, index) => {
                  const salary = parseFloat(placement[studentKey].package);
                  sum += salary;
                  cnt += 1;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{placement[studentKey].company}</td>
                      <td>{placement[studentKey].name}</td>
                      <td>{placement[studentKey].regno}</td>
                      <td>{salary}</td>
                    </tr>
                  );
                })
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {
        chartData.length!=0 &&
        <>
      <div className="wrapper rounded" style={{ fontSize: '14px',width:'100%', backgroundColor: 'white',border: '3px solid' , marginLeft: '0px', marginRight: '110px', padding: '10px' ,borderColor:'black'}}>
        <h1 style={{fontSize:'30px',fontFamily:'sans-serif'}}>Placement Statistics</h1>
        <br/>
        <h2 style={{ fontSize: '20px' }}>Average Salary: {calculateAverageSalary()}</h2>
        <hr style={{border:'2px solid black'}} />
        <h2 style={{ fontSize: '20px' }}>Total No of Students: {cnt / 2}</h2>
        <hr style={{border:'2px solid black'}} />
        <h2 style={{ fontSize: '20px' }}>Maximum Package: {maxSalary}</h2>
        <hr style={{border:'2px solid black'}} />
        <h2 style={{ fontSize: '20px' }}>Student with Maximum Package: {maxSalaryStudent}</h2>
      </div>
      <div style={{background:'white',height:'300px',border:'3px solid'}}>
        <PieChart series={[{ data: chartData, innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 150,
          cy: 150, }]} width={400} height={200} />
      </div></>}
    </>

  );
};

export default PlacementTableComponent;
