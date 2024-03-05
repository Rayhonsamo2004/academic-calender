import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import {db,storage} from "../configuration/firebase-config";
import { deleteObject,ref } from 'firebase/storage';
import { getDoc } from 'firebase/firestore';
const DeleteEvent = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

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

  const handleDeleteEvent = async () => {
    try {
      if (selectedEvent) {
        const collectionName = 'events'; 
        const documentRef = doc(db, collectionName, selectedEvent);
        const docSnapshot = await getDoc(documentRef);
        const documentData = docSnapshot.data(); 
        const existingBrochureRef = ref(storage, `brochures/${documentData.eventName}`);
        await deleteObject(existingBrochureRef);
        const eventDocRef = doc(db, 'events', selectedEvent);
        await deleteDoc(eventDocRef);
        // Reset the form fields
        setSelectedEvent('');

        alert('Event deleted successfully!');
      } else {
        alert('Please select an event to delete.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  return (
    <div className="delete-event-container">
      <h2>Delete Event</h2>
      <label>
        Select Club:
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
        Select Event:
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
      <button type="button" onClick={handleDeleteEvent}>
        Delete Event
      </button>
    </div>
  );
};

export default DeleteEvent;
