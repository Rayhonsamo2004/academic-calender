import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import {db,storage} from "../configuration/firebase-config";

const UpdateAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [changeMail, setChangeMail] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");


  useEffect(() => {
    // Fetch all users from the database
    const fetchUsers = async () => {
      const userCollectionRef = collection(db, "users");
      const querySnapshot = await getDocs(userCollectionRef);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,   // Include the document ID in the user object
        ...doc.data(),
      }));
      setUsers(userData);
    };
    

    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleUpdate = async () => {
    // Find the selected user in the database
    const userToUpdate = users.find((user) => user.mail === selectedUser);
  
    if (userToUpdate) {
      // Check if the old password matches
      if (userToUpdate.password === oldPassword) {
        // Update user details
        const userDocRef = doc(db, "users", userToUpdate.id);
  
        await updateDoc(userDocRef, {
          mail: changeMail || userToUpdate.mail,
          password: changePassword || userToUpdate.password,
        });
  
        alert("User details updated successfully!");
      } else {
        alert("Incorrect old password");
      }
    } else {
      alert("Selected user not found!");
    }
  };
  return (
    <div className="admincontainer">
      <h2 >Update Admin</h2>
      <label>Select User:</label>
      <select onChange={handleUserChange} value={selectedUser}>
        <option value="">Select a user</option>
        {users.map((user, index) => (
          <option key={index} value={user.mail}>
            {user.mail}
          </option>
        ))}
      </select>
      <br />
      <label>Change UserName:</label>
      <input type="text" value={changeMail} placeholder= "Change Username" onChange={(e) => setChangeMail(e.target.value)} />
      <br />
      <label>Old Password:</label>
      <input type="password" value={oldPassword} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
      <br />
      <label>Change Password:</label>
      <input type="text" value={changePassword} placeholder= "Change Password" onChange={(e) => setChangePassword(e.target.value)} />
      <br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateAdmin;
