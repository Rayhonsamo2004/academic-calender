import { useState, useEffect } from "react";
import {db,storage} from "../configuration/firebase-config";
import '../styles/club.css';
import { collection, getDocs, addDoc } from "firebase/firestore";

const CreateClub = () => {
  const [clubname, setclubname] = useState("");
  const [clubincharge, setclubincharge] = useState("");
  const [clubdescription, setclubdescription] = useState("");
  const [clubgoals, setClubGoals] = useState("");
  const [clubSecretary, setClubSecretary] = useState("");
  const [clubTreasurer, setClubTreasurer] = useState("");
  const [goalsList, setGoalsList] = useState([]);
  const [secretaryList, setSecretaryList] = useState([]);
  const [treasurerList, setTreasurersList] = useState([]);
  const [clubs, setClubs] = useState([]);

  const usercollectionref = collection(db, "clubs");

  const getEvents = async () => {
    const data = await getDocs(usercollectionref);
    setClubs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleClubNameChange = (event) => {
    setclubname(event.target.value);
  };

  const handleClubInchargeChange = (event) => {
    setclubincharge(event.target.value);
  };

  const handleClubDescriptionChange = (event) => {
    setclubdescription(event.target.value);
  };

  const handleClubGoalsChange = (event) => {
    setClubGoals(event.target.value);
  };

  const handleClubSecretaryChange = (event) => {
    setClubSecretary(event.target.value);
  };

  const handleClubTreasurerChange = (event) => {
    setClubTreasurer(event.target.value);
  };

  const handleAddGoal = () => {
    if (clubgoals) {
      setGoalsList([...goalsList, clubgoals]);
      setClubGoals("");
    }
  };

  const handleRemoveGoal = () => {
    if (goalsList.length > 0) {
      const updatedList = [...goalsList];
      updatedList.pop();
      setGoalsList(updatedList);
    }
  };

  const handleAddSecretary = () => {
    if (clubSecretary) {
      setSecretaryList([...secretaryList, clubSecretary]);
      setClubSecretary("");
    }
  };

  const handleRemoveSecretary = () => {
    if (secretaryList.length > 0) {
      const updatedList = [...secretaryList];
      updatedList.pop();
      setSecretaryList(updatedList);
    }
  };
  
  
  const handleAddTreasurer = () => {
    if (clubTreasurer) {
      setTreasurersList([...treasurerList, clubTreasurer]);
      setClubTreasurer("");
    }
  };

  const handleRemoveTreasurer = () => {
    if (treasurerList.length > 0) {
      const updatedList = [...treasurerList];
      updatedList.pop();
      setTreasurersList(updatedList);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!clubname || !clubincharge || !clubdescription || goalsList.length === 0 || secretaryList.length === 0 ) {
      alert("Please fill out all fields and add at least one goal.");
      return;
    }

    const lowercaseClubName = clubname.toLowerCase();
    const clubNameExists = clubs.some(
      (club) => club.clubname.toLowerCase() === lowercaseClubName
    );

    if (clubNameExists) {
      alert("Club Already Exists");
    } else {
      const confirmed = window.confirm("Are you sure you want to add this club?");
      if (confirmed) {

      await addDoc(usercollectionref, {
        clubname: clubname,
        clubincharge: clubincharge,
        clubdescription: clubdescription,
        clubgoals: goalsList,
        clubsecretary: secretaryList,
        clubtreasurer: treasurerList
      });
      getEvents();
      setclubname("");
      setclubincharge("");
      setclubdescription("");
      setClubGoals("");
      setGoalsList([]);
      setClubSecretary("");
      setSecretaryList([]);
      setClubTreasurer("");
      setTreasurersList([]);
    }}
  };

  return (
    <form className="clubcontainer" onSubmit={handleSubmit}>
      <h2>Create Club</h2>
      <label>
        Club Name:
        <input
          type="text"
          value={clubname}
          onChange={handleClubNameChange}
          placeholder="Club Name"
        />
      </label>
      <br />
      <label>
        Club Incharge:
        <input
          type="text"
          value={clubincharge}
          onChange={handleClubInchargeChange}
          placeholder="Club Incharge"
        />
      </label>
      <br />
      <label>
        Club Moto:
        <textarea
          value={clubdescription}
          onChange={handleClubDescriptionChange}
          placeholder="Moto of the Club!!!!"
        />
      </label>
      <br />
      <label>
  Club Goals:
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
      type="text"
      value={clubgoals}
      onChange={handleClubGoalsChange}
      placeholder="Add Goal"
    />
    <button type="button" onClick={handleAddGoal} style={{ marginLeft: '5px' ,height: '65px'}}>+</button>
    <button type="button" onClick={handleRemoveGoal} style={{ marginLeft: '5px' ,height: '65px'}}>-</button>
  </div>
  <br />
        <label>Goals List:</label>
        <div style={{width:'100%',border:'1px solid'}}>
        <ul>
          {goalsList.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
        </div>
      </label>
      <br />
      <label>
        Club Secretaries:
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={clubSecretary}
            onChange={handleClubSecretaryChange}
            placeholder="Add Student Secretaries"
          />
          <button type="button" onClick={handleAddSecretary} style={{ marginLeft: '5px', height: '65px' }}>+</button>
          <button type="button" onClick={handleRemoveSecretary} style={{ marginLeft: '5px', height: '65px' }}>-</button>
        </div>
        <br />
        <label>Student Secretary List:</label>
        <div style={{ width: '100%', border: '1px solid' }}>
          <ol>
            {secretaryList.map((Secretary, index) => (
              <li key={index}>{Secretary}</li>
            ))}
          </ol>
        </div>
      </label>
      <label>
        Club Treasurers:
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={clubTreasurer}
            onChange={handleClubTreasurerChange}
            placeholder="Add Student Treasurers"
          />
          <button type="button" onClick={handleAddTreasurer} style={{ marginLeft: '5px', height: '65px' }}>+</button>
          <button type="button" onClick={handleRemoveTreasurer} style={{ marginLeft: '5px', height: '65px' }}>-</button>
        </div>
        <br />
        <label>Student Treasurer List:</label>
        <div style={{ width: '100%', border: '1px solid' }}>
          <ol>
            {treasurerList.map((treasurer, index) => (
              <li key={index}>{treasurer}</li>
            ))}
          </ol>
        </div>
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateClub;
