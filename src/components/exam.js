import { useState, useEffect } from 'react';
import { Header, MyComponent } from './Body';
import Footer from './footer';
import { Helmet } from 'react-helmet';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../serviceAccountKey';
import ExamsTable from './ExamTable';
import '../styles/home.css';
import '../styles/sign.css';

const Exams = () => {
  const [selectedYear, setSelectedYear] = useState('year4');
  const [subCollections, setSubCollections] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      if (selectedYear) {
        try {
          const subCollectionsCollection = collection(db, 'exams');
          const subCollectionsQuery = query(
            subCollectionsCollection,
            where('year', '==', selectedYear)
          );

          const subCollectionsSnapshot = await getDocs(subCollectionsQuery);

          // Extract names of subcollections from the documents
          const subCollectionNames = subCollectionsSnapshot.docs.map((doc) => doc.id);

          setSubCollections(subCollectionNames);
          console.log('Subcollections:', subCollectionNames);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchExams();
  }, [selectedYear]);


  return (
    <>
          <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="Assets\Images\favicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
        <link rel="stylesheet" type="text/css" href="CSS\styles.css" />
        <meta
          name="google-signin-client_id"
          content="226848461747-l9jgti0tka5cd955fsfprlcs3683jv3g.apps.googleusercontent.com"
        />
        <title>IT Academic-Calendar</title>
      </Helmet>

      <MyComponent />
      <Header />
      <div style={{ display: 'flex'}}>
        <div style={{ marginLeft: '20%', width: '80%', marginTop: '2%' }}>
          <ExamsTable year={selectedYear} />
        </div>
          <div style={{ marginRight: '5%',marginTop:'70px'}}>
            <table style={{ fontSize: '20px' }}>
              <tr>
                <button style={{width:'90%'}} type='button' onClick={() => setSelectedYear('year1')} className='btn btn-primary'>Year1</button>
              </tr>
              <tr>
                <button style={{width:'80px'}} type='button' onClick={() => setSelectedYear('year2')} className='btn btn-primary'>Year2</button>
              </tr>
              <tr>
                <button  style={{width:'80px'}} type='button' onClick={() => setSelectedYear('year3')} className='btn btn-primary'>Year3</button>
              </tr>
              <tr>
                <button style={{width:'80px'}} type='button' onClick={() => setSelectedYear('year4')} className='btn btn-primary'>Year4</button>
              </tr>
            </table>
          </div>
        </div>
        <div style={{marginBottom:'30px'}}>
          <Footer />
      </div>
    </>
  );
};

export default Exams;
