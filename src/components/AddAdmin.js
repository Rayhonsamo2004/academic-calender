import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import {db,storage} from "../configuration/firebase-config";

const AddAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddAdmin = async () => {
    try {
      // Ensure email and password are not empty
      if (email && password) {
        const usersCollection = collection(db, 'users');

        // Add user to the users collection with admin set to true
        await addDoc(usersCollection, {
          mail: email,
          password: password,
          admin: true,
        });

        // Reset form fields
        setEmail('');
        setPassword('');

        alert('Admin added successfully!');
      } else {
        alert('Please fill in all the fields.');
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Error adding admin. Please try again.');
    }
  };

  return (
    <div className="admincontainer">
      <h2>Add Admin</h2>
      <label>
        Username:
        <input type="username" placeholder= "Username" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" placeholder= "Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="button" onClick={handleAddAdmin}>
        Add Admin
      </button>
    </div>
  );
};

export default AddAdmin;
