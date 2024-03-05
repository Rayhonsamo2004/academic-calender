import React, { useState, useEffect } from "react";
import {db,storage} from "../configuration/firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import '../styles/club.css';

const UpdateClub = () => {
  const [selectedclub, setselectedclub] = useState("");
  const [newclubname, setnewclubname] = useState("");
  const [newclubincharge, setNewclubincharge] = useState("");
  const [newclubdescription, setNewclubdescription] = useState("");
  const [clubs, setClubs] = useState([]);

  const userCollectionRef = collection(db, "clubs");

  const fetchClubs = async () => {
    const clubsData = await getDocs(userCollectionRef);
    setClubs(clubsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleClubChange = (event) => {
    setselectedclub(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (selectedclub && (newclubname || newclubincharge || newclubdescription)) {
        const clubDocRef = doc(db, "clubs", selectedclub);
        const updateData = {};

        if (newclubname) {
          updateData["clubname"] = newclubname;
        }

        if (newclubincharge) {
          updateData["clubincharge"] = newclubincharge;
        }

        if (newclubdescription) {
          updateData["clubdescription"] = newclubdescription;
        }

        await updateDoc(clubDocRef, updateData);
        alert("Club Details Updated!");
        fetchClubs();

        // Reset all fields
        setnewclubname("");
        setNewclubincharge("");
        setNewclubdescription("");
      } else {
        alert("Please select a club and provide at least one field to update.");
      }
    } catch (error) {
      console.error("Error updating club details:", error);
      alert("Error updating club details. Please try again.");
    }
  };

  return (
    <form className="clubcontainer">
      <h2>Update Club</h2>
      <label>
        Select Club:
        <select value={selectedclub} onChange={handleClubChange}>
          <option value="" disabled>
            Select a Club
          </option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.clubname}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Change Name:
        <input
          type="text"
          value={newclubname}
          onChange={(e) => setnewclubname(e.target.value)}
        />
      </label>
      <br />
      <label>
        Change Incharge:
        <input
          type="text"
          value={newclubincharge}
          onChange={(e) => setNewclubincharge(e.target.value)}
        />
      </label>
      <br />
      <label>
        Change Moto:
        <textarea
          value={newclubdescription}
          onChange={(e) => setNewclubdescription(e.target.value)}
        />
      </label>
      <br />
      <button type="button" onClick={handleSubmit}>
        Update
      </button>
    </form>
  );
};

export default UpdateClub;
