import React, { useState } from 'react';
import '../styles/home.css';
import '../styles/sign.css';

const Message = ({ selectedClub }) => {
  const defaultHeading = 'Department of Information Technology';
  const defaultDescription = '...'; 
  const defaultGoals="...";
  const defaultSecretary =["Dhiyaneshwar A", "Hariharan V J","Harshini Lara A K","Sivanuja S"];
  const defaultTreasurer =["Arjun Prithvi V", "Gajalakshmi S","Gurucharan K S","Pooja Dharshini V B"];
  const defaultIncharge="Dr. S. Karthiga";

  const [heading, setHeading] = useState(defaultHeading);
  const [description, setDescription] = useState(defaultDescription);
  const[goals,setGoals] = useState(defaultGoals);
  const[secretary,setSecretary] = useState(defaultSecretary);
  const[treasurer,setTreasurer] = useState(defaultTreasurer);
  const[incharge,setIncharge] = useState(defaultIncharge);
 
  // Update heading and description when clubname and clubdescription props change
  const updateContent = () => {
    setHeading(selectedClub.clubname || defaultHeading);
    setDescription(selectedClub.clubdescription || defaultDescription);
    setGoals(selectedClub.clubgoals || defaultHeading);
    setSecretary(selectedClub.clubsecretary || defaultSecretary);
    setTreasurer(selectedClub.clubtreasurer || defaultTreasurer);
    setIncharge(selectedClub.clubincharge || defaultIncharge);
  };
  React.useEffect(() => {
    updateContent();
  }, [selectedClub]);

  return (
    <div className="additional-container" style={{ marginTop: '30px', width: '160%', display: 'flex', overflow: 'auto', marginLeft: '10px', minHeight:'650px' ,border:'3px solid'}}>
      <div className="row">
        <div className="col-md-8">
          <div><hr></hr><h1>{heading}</h1><hr></hr></div>
          <h5>Moto:</h5>
          <p>{description}</p><br></br>
          <div>
            <h5>Goals:</h5>
            {Array.isArray(goals) ? (
              <ul style={{ listStyleType: 'disc' }}>
                {goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            ) : (
              <p>No goals available</p>
            )}
          </div><br></br>
          <div>
            <p><h5>Faculty Incharge:</h5>{incharge}</p>
          </div><br></br>
          <div style={{ display: 'flex', marginLeft: '80px' ,paddingRight:'50px'}}>
          <div >
            <h5 style={{ display: 'inline-block', marginRight: '100px',marginLeft:'-20px' }}>General Secretaries:</h5>
            {Array.isArray(secretary) ? (
              <ul style={{ listStyleType: 'square', padding: '0' }}>
                {secretary.map((secretary, index) => (
                  <li key={index}>{secretary}</li>
                ))}
              </ul>
            ) : (
              <p>No secretary available</p>
            )}
          </div>
          <div>
            <h5 style={{ display: 'inline-block', marginRight: '50px',marginLeft:'-20px' }}>General Treasurers:</h5>
            {Array.isArray(treasurer) ? (
              <ul style={{ listStyleType: 'square', padding: '0' }}>
                {treasurer.map((treasurer, index) => (
                  <li key={index}>{treasurer}</li>
                ))}
              </ul>
            ) : (
              <p>No treasurer available</p>
            )}
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
  
  
};

export default Message;
