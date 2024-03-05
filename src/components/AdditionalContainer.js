import '../styles/home.css';
import '../styles/sign.css';
import '../styles/message.css';
import React, { useState} from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import necessary functions and objects
import {db,storage} from "../configuration/firebase-config";
import ClubsListComponent from './ClubListComponent';
import SectionHeading from './SectionHeading';
import MessageComponent from './MessageComponent';

const AdditionalContainer = () => {
  const [content, setContent] = useState({
    heading: 'Department of Information Technology',
    paragraph: '...',
  });

  const [events, setEvents] = useState([]);  // State to store events data

  const updateContent = async (clubname, clubdescription) => {
    try {
      // Fetch events for the club
      const eventsCollectionRef = collection(db, 'events');
      const eventsQuerySnapshot = await getDocs(query(eventsCollectionRef, where('club', '==', clubname)));
      const eventsData = eventsQuerySnapshot.docs.map((doc) => doc.data());

      // Update content and events state
      setContent({
        heading: `Department of ${clubname}`,
        paragraph: clubdescription,
      });
      setEvents(eventsData);
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  return (
    <div className="additional-container" style={{ width: '95%', marginTop: '10px', marginLeft: '10px' }}>
      <div className="row">
        <div className="col-md-9">
          <SectionHeading heading={content.heading}/>
          <p>{content.paragraph}</p>
        </div>
        <MessageComponent events={events} />  {/* Pass events data to MessageComponent */}
      </div>
      <ClubsListComponent updateContent={updateContent} />
    </div>
  );
};

export default AdditionalContainer;
