import { useState, useEffect } from 'react';
import {  Header, MyComponent } from './Body';
import Footer from "./footer";
import Message from './Message';
import ClubsListComponent from './ClubListComponent';
import TableComponent from './TableComponent';
import { Helmet } from 'react-helmet';
import { collection } from 'firebase/firestore';
import { db } from '../serviceAccountKey';
import YearList from './Year';
import PlacementTableComponent from './PlacementTable';
import '../styles/table.css';
import '../styles/club.css';
import '../styles/home.css';
const Placement = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [clubname, setClubname] = useState('');
  const handleYearSelect = async (year) => {
    try {
      setSelectedYear(year);
      console.log(selectedYear);
    } catch (error) {
      console.error('Error fetching club events:', error);
    }
  };
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
      <div style={{display:'flex'}}>
      <div style={{marginLeft:'10%',width:'60%',marginTop:'4%'}}>
        <PlacementTableComponent year={selectedYear}/></div>
        <YearList onYearSelect={handleYearSelect} style={{marginRight:'30%',marginTop:'30%'}}/>
      </div>
      <div style={{marginTop:'250px'}}>
      <Footer/>
      </div>
    </>
  );
};

export default Placement;
