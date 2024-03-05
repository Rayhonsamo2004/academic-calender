import '../styles/home.css';
import '../styles/sign.css';
import '../styles/message.css';
// ClubListComponent

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../serviceAccountKey';

const ClubsListComponent = ({ onClubSelect }) => {
  const usercollectionref = collection(db, 'clubs');
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(usercollectionref);
        setList(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    getData();
  }, []);

  const handleClubClick = (club) => {
    onClubSelect(club);
  };

  return (
    <div className="col-md-3" style={{ marginLeft: '20px', marginRight:'-100px' }}>
      <div className="floating-list1" id="club-list-container">
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <button
                type="button"
                id="clubs"
                className="btn btn-outline-primary IOT"
                onClick={() => handleClubClick(item)}
                style={{ width:'150px' }}
              >
                {item.clubname}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClubsListComponent;
