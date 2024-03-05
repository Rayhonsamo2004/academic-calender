import { useState, useEffect } from 'react';
import {  Header, MyComponent } from './Body';
import Footer from "./footer";
import Message from './Message';
import ClubsListComponent from './ClubListComponent';
import TableComponent from './TableComponent';
import { Helmet } from 'react-helmet';
import '../styles/home.css';
import '../styles/sign.css'

const Viewer = () => {
  const [selectedClub, setSelectedClub] = useState({});
  const [clubname, setClubname] = useState('');

  const handleClubSelect = async (club) => {
    try {
      setSelectedClub(club);
      setClubname(club.clubname);
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
      <div style={{width:"500%"}}><Message selectedClub={selectedClub} /></div>
      <div style={{
          marginLeft: '40%'
        }}>
          <ClubsListComponent onClubSelect={handleClubSelect} />
        </div>
      </div>
      <div style={{ display: 'flex', marginLeft: '100px' }}>
        <div style={{ marginTop: '10px', width: '300%' }}>
        <TableComponent clubname={clubname} />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Viewer;
