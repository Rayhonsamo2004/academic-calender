import React from "react";
import { Helmet } from "react-helmet";
import { collection, getDocs } from 'firebase/firestore';
import  { useState, useEffect } from 'react';
import {db,storage} from "../configuration/firebase-config";
import '../styles/table.css'
import { getStorage,ref,getDownloadURL } from "firebase/storage";

const TableComponent = ({ clubname }) => {
  const [events, setEvents] = useState([]);
  const clubsCollectionRef = collection(db, 'clubs');
  const eventsCollectionRef = collection(db, 'events');

  useEffect(() => {
    console.log('Received clubname:', clubname);

    const fetchEvents = async () => {
      try {
        // Fetch clubId using the received clubname
        const clubId = await fetchClubId(clubname);

        if (clubId) {
          
          // Fetch all events
          const querySnapshot = await getDocs(eventsCollectionRef);
          const allEventsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          const eventsData = allEventsData.filter((event) => event.club === clubId);
          setEvents(eventsData);
          console.log('ClubId:', clubId);
          console.log('EventsData:', eventsData);
        } else {
          console.error('ClubId not found for clubname:', clubname);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [clubname]);

  const fetchClubId = async (clubName) => {
    try {
      const querySnapshot = await getDocs(clubsCollectionRef);

      for (const clubDoc of querySnapshot.docs) {
        const data = clubDoc.data();
        if (data.clubname === clubName) {
          console.log('Found Club:', data.clubname);
          return clubDoc.id;
        }
      }

      console.error('Club not found:', clubName);
      return null;
    } catch (error) {
      console.error('Error fetching club ID:', error);
      return null;
    }
  };
   
 
  const getfile = async (eventName) => {
    try {
  
      const brochureRef = ref(storage, `brochures/${eventName}`);

      const downloadURL = await getDownloadURL(brochureRef);
      console.log(downloadURL);

      window.open(downloadURL, '_blank');
    } catch (error) {
      console.error('Error opening PDF file:', error);
    }
  }

  
  return(
     <>

      <div className="wrapper rounded" style={{marginLeft:'-90px',width:'90%',border:'3px solid'}}>
        <div className="table-responsive mt-3">
          <table className="table table-dark table-borderless" >
            <thead>
              <tr style={{border:'2px solid'}}>
                <th scope="col" style={{border:'2px solid',fontSize:'16px'}}>S.no</th>
                <th scope="col" style={{border:'2px solid',fontSize:'16px'}}>Event name</th>
                <th scope="col" style={{border:'2px solid',fontSize:'16px'}}>Incharge</th>
                <th scope="col" style={{border:'2px solid',fontSize:'16px'}}>Phone Number</th>
                <th scope="col" style={{border:'2px solid',fontSize:'16px'}}>Year</th>
                <th scope="col" style={{border:'2px solid',fontSize:'16px'}}>Date</th>
                <th scope="col" style={{border:'2px solid',fontSize:'16px'}}>Brochure</th>
              </tr>
            </thead>
            <tbody>
              {events && events.map((event, index) => (
                <tr key={index} style={{border:'2px solid'}}>
                  <td scope="row" style={{border:'2px solid'}}>
                    <span></span> {index + 1}
                  </td>
                  <td style={{border:'2px solid'}}>
                    <span>{event.eventName}</span>
                  </td>
                  <td style={{border:'2px solid'}}>{event.eventIncharge}</td>
                  <td style={{border:'2px solid'}}>{event.phonenumber}</td>
                  <td style={{border:'2px solid'}}>{event.year}</td>
                  <td style={{border:'2px solid'}}>{event.eventDateTime}</td>
                  <td style={{border:'2px solid'}}>
                  <a href="#" onClick={()=>getfile(event.eventName)}>
                  <img src="https://imgs.search.brave.com/ffPswGvvh2PxSR2CSdfxayfAMydfLrNHlncY8kVK1Rk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg3L1BERl9maWxl/X2ljb24uc3Zn.svg" alt="PDF Logo" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                  </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center results">
        </div>
      </div>
      </>
  );
};

export default TableComponent;
