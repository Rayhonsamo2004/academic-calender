import React, { useState, useEffect } from "react";
import {db,storage} from "../configuration/firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const DeleteClub = () => {
  const [selectedClub, setSelectedClub] = useState("");
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
    setSelectedClub(event.target.value);
  };

  const handleDeleteClub = async () => {
    try {
      if (selectedClub) {
        const confirmed = window.confirm("Are you sure you want to delete this club?");
        if (confirmed) {
          const clubDocRef = doc(db, "clubs", selectedClub);
          await deleteDoc(clubDocRef);
          alert("Club Deleted!");
          // Refresh the list of clubs after deletion
          fetchClubs();
        }
      } else {
        alert("Please select a club to delete.");
      }
    } catch (error) {
      console.error("Error deleting club:", error);
      alert("Error deleting club. Please try again.");
    }
  };

  return (
    <div className="clubcontainer">
      <h2>Delete Club</h2>
      <label>
        Select Club:
        <select value={selectedClub} onChange={handleClubChange}>
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
      <button onClick={handleDeleteClub}>Delete</button>
    </div>
  );
};

export default DeleteClub;
