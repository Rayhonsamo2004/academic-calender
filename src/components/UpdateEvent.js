
import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import {db,storage} from "../configuration/firebase-config";
import { getStorage,ref,getDownloadURL,uploadBytes,deleteObject } from 'firebase/storage';
import { getDoc } from 'firebase/firestore';

const UpdateEvent = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [changeName, setChangeName] = useState('');
  const [changeIncharge, setChangeIncharge] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [year, setyear] = useState('');
  const [changeDescription, setChangeDescription] = useState('');
  const [updateTime, setUpdateTime] = useState('');
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (selectedClub) {
          const eventsCollection = collection(db, 'events');
          const eventsSnapshot = await getDocs(eventsCollection);
          const eventList = eventsSnapshot.docs
            .filter(doc => doc.data().club === selectedClub)
            .map((doc) => ({ ...doc.data(), id: doc.id }));
          setEvents(eventList);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents();
  }, [selectedClub]);
  

  const handleUpdateEvent = async () => {
    try {
      if (selectedClub && selectedEvent && (changeName || changeIncharge || changeDescription || updateTime || brochure || year || phonenumber)) {
        const eventDocRef = doc(db, 'events', selectedEvent);
  
        const updateData = {};
  
        if (changeName) {
          updateData.eventName = changeName;
        }
  
        if (changeIncharge) {
          updateData.eventIncharge = changeIncharge;
        }
  
        if (changeDescription) {
          updateData.eventDescription = changeDescription;
        }
  
        if (updateTime) {
          updateData.eventDateTime = updateTime;
        }

        if(phonenumber){
          updateData.phonenumber= phonenumber;
        }

        if(year){
          updateData.year =year;
        }
  
        if (brochure !== null) {
      
           const collectionName = 'events'; 
          const documentRef = doc(db, collectionName, selectedEvent);
          const docSnapshot = await getDoc(documentRef);
          const documentData = docSnapshot.data(); 
          const existingBrochureRef = ref(storage, `brochures/${documentData.eventName}`);
          await deleteObject(existingBrochureRef);
  
            const newBrochureRef = ref(storage, `brochures/${documentData.eventName}`);
            await uploadBytes(newBrochureRef, brochure);
  
            const downloadURL = await getDownloadURL(newBrochureRef);
            console.log(downloadURL);
            // Update the brochure field in Firestore with the download URL
            updateData.brochureURL = downloadURL;
            // Update Firestore document with the dataURL
            await updateDoc(eventDocRef, updateData);
  
  
            // Reset the form fields
            setSelectedEvent('');
            setChangeName('');
            setChangeIncharge('');
            setChangeDescription('');
            setUpdateTime('');
            setyear('');
            setphonenumber('');
            setBrochure(null);
  
            alert('Event updated successfully!');
          
        } else {
          // Update Firestore document without brochure if it's null
          await updateDoc(eventDocRef, updateData);
  
          // Reset the form fields
          setSelectedEvent('');
          setChangeName('');
          setChangeIncharge('');
          setChangeDescription('');
          setUpdateTime('');
          setyear('');
          setphonenumber('');
          setBrochure(null);
  
          alert('Event updated successfully!');
        }
      } else {
        alert('Please select a club, an event, and provide at least one change field.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event. Please try again.');
    }
  };
  

  const handleBrochureChange = (e) => {
    const file = e.target.files[0];
    setBrochure(file);
  };
  
  return (
    <div className="updateeventcontainer">
      <h2>Update Event</h2>
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
        Event:
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
          <option value="" disabled>
            Select an Event
          </option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.eventName}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Change Name:
        <input type="text" placeholder="Change Event Name" value={changeName} onChange={(e) => setChangeName(e.target.value)} />
      </label>
      <br />
      <label>
        Change Incharge:
        <input type="text"  placeholder="Change Event Incharge" value={changeIncharge} onChange={(e) => setChangeIncharge(e.target.value)} />
      </label>
      <br />
      <label>
         Change Incharge Phone Number:
        <input type="text"  placeholder="Change Incharge Phone Number" value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} />
      </label>
      <br />
      <label>
   Change Incharge Year:
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
        Update Time:
        <input type="datetime-local"  placeholder="Change Event Timings" value={updateTime} onChange={(e) => setUpdateTime(e.target.value)} />
      </label>
      <br />
      <label>
        Change Description:
        <textarea type="text"  placeholder="Change Event Description" value={changeDescription} onChange={(e) => setChangeDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Brochure (PDF):
        <input type="file" accept=".pdf" onChange={handleBrochureChange} />
      </label><br></br>
      <button type="button" onClick={handleUpdateEvent}>
        Update Event
      </button>
    </div>
  );
};

export default UpdateEvent;
