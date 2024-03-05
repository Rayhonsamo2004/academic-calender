// RemoveAdmin.js

import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import {db,storage} from "../configuration/firebase-config";

const RemoveAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const adminList = usersSnapshot.docs
          .filter(doc => doc.data().admin === true)
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setAdmins(adminList);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
  
    fetchAdmins();
  }, []);

  const handleRemoveAdmin = async () => {
    try {
      if (selectedAdmin) {
        const adminDocRef = doc(db, 'users', selectedAdmin);
        await deleteDoc(adminDocRef);

        // Reset the form fields
        setSelectedAdmin('');

        alert('Admin removed successfully!');
      } else {
        alert('Please select an admin to remove.');
      }
    } catch (error) {
      console.error('Error removing admin:', error);
      alert('Error removing admin. Please try again.');
    }
  };

  return (
    <div className="admincontainer">
      <h2>Remove Admin</h2>
      <label>
        Select Admin:
        <select value={selectedAdmin} onChange={(e) => setSelectedAdmin(e.target.value)}>
          <option value="" disabled>
            Select an Admin
          </option>
          {admins.map((admin) => (
            <option key={admin.id} value={admin.id}>
              {admin.mail}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="button" onClick={handleRemoveAdmin}>
        Remove Admin
      </button>
    </div>
  );
};

export default RemoveAdmin;
