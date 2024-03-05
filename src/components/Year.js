import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../serviceAccountKey';

const YearList = ({ onYearSelect }) => {
  const [list, setDocumentIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'placement'));
      const ids = querySnapshot.docs.map((doc) => doc.id);
      setDocumentIds(ids);
    };

    fetchData();

    // Note: Since we are not using onSnapshot, we don't need to unsubscribe here.
  }, []);
  const handleYearClick = (year) => {
    onYearSelect(year);
  };

  return (
    <div className="col-md-3" style={{ marginLeft: '20px', marginRight: '-100px' }}>
      <div className="floating-list1" id="club-list-container">
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <button
                type="button"
                id="clubs"
                className="btn btn-outline-primary IOT"
                style={{ width: '150px' }}
                onClick={()=>handleYearClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YearList;
