import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import {db,storage} from "../configuration/firebase-config";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const AddEvent = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventIncharge, setEventIncharge] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [year, setyear] = useState('');
  const [eventDateTime, setEventDateTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [brochure, setBrochure] = useState(null);
  useEffect(() => {
    const fetchClubs = async () => {
      const clubsCollection = collection(db, 'clubs');
      const clubsSnapshot = await getDocs(clubsCollection);
      const clubList = clubsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setClubs(clubList);
    };

    fetchClubs();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBrochure(file);
  };

  const handleAddEvent = async () => {
    try {
      if (selectedClub && eventName && eventIncharge && eventDateTime && eventDescription && brochure) {
        const eventsCollection = collection(db, 'events');
  
        // Create a storage reference with the event name in the path
      const storageRef = ref(storage, `brochures/${eventName}`);

        await uploadBytes(storageRef, brochure);
  
        const brochureUrl = await getDownloadURL(storageRef);
        console.log(brochureUrl)

        // Add the event to the database
        await addDoc(eventsCollection, {
          club: selectedClub,
          eventName: eventName,
          eventIncharge: eventIncharge,
          phonenumber:phonenumber,
          year:year,
          eventDateTime: eventDateTime,
          eventDescription: eventDescription,
          brochure: brochureUrl, // Store the download URL of the brochure
        });
  
        setSelectedClub('');
        setEventName('');
        setEventIncharge('');
        setphonenumber('');
        setyear('');
        setEventDateTime('');
        setEventDescription('');
        setBrochure(null);
  
        alert('Event added successfully!');
      } else {
        alert('Please fill in all the fields including the brochure.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event. Please try again.');
    }
  };
  

  return (
    <div className="eventcontainer">
      <h2>Add Event</h2>
      <label>
        Club:
        <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)}>
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
        Event Name:
        <input type="text" value={eventName} placeholder="Event Name" onChange={(e) => setEventName(e.target.value)} />
      </label>
      <br />
      <label>
        Event Incharge:
        <input type="text" value={eventIncharge} placeholder="Event Incharge" onChange={(e) => setEventIncharge(e.target.value)} />
      </label>
      <br />
      <label>
        Incharge Phone Number:
        <input type="text" value={phonenumber} placeholder="Incharge Phone Number" onChange={(e) => setphonenumber(e.target.value)} />
      </label>
      <br />
      <label>
  Incharge Year:
  <select value={year} onChange={(e) => setyear(e.target.value)}>
    <option value="" disabled>Select Year</option>
    <option value="1st Year">1st Year</option>
    <option value="2nd Year">2nd Year</option>
    <option value="3rd Year">3rd Year</option>
    <option value="4th Year">4th Year</option>
  </select>
</label>

      <br />
      <label>
        Date & Time:
        <input type="datetime-local" placeholder="Event Date & Time" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} />
      </label>
      <br />
      <label>
        Event Description:
        <textarea value={eventDescription} placeholder="Event Description in short" onChange={(e) => setEventDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Brochure (PDF):
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </label>
      <br />
      <button type="button" onClick={handleAddEvent}>
        Add Event
      </button>
    </div>
  );
};

export default AddEvent;
