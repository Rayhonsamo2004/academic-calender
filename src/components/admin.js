import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { getDocs, addDoc, collection, updateDoc, query, where, deleteDoc, doc } from "firebase/firestore";
import '../styles/home.css';
import '../styles/sign.css';
import '../styles/club.css';
import '../styles/event.css';
import '../styles/admin.css';
import Title from "./titlecomp";
import Footer from "./footer";
import SectionHeading from "./SectionHeading";
import UpdateClub from "./updateclub";
import CreateClub from "./CreateClub";
import Deleteclub from "./deleteclub";
import AddEvent from "./AddEvents";
import UpdateEvent from "./UpdateEvent";
import DeleteEvent from "./DeleteEvent";
import AddAdmin from "./AddAdmin";
import UpdateAdmin from "./UpdateAdmin";
import RemoveAdmin from "./RemoveAdmin";
import AddCompany from "./addcompany";
import DeleteCompany from "./DeleteCompany";
import AddExam from "./AddExam";
import DeleteExam from "./DeleteExam";

import {db,storage} from "../configuration/firebase-config";

const Admin = () => {
  const [activeSection, setActiveSection] = useState('events');
  const [addclub, setadd] = useState(true);
  const [updateclub, setupdate] = useState(false);
  const [deleteclub, setdelete] = useState(false);
  const [addevent, setaddevent] = useState(true);
  const [updateevent, setupdateevent] = useState(false);
  const [deleteevent, setdeleteevent] = useState(false);
  const [addCompany, setAddCompany] = useState(true);
  const [deleteCompany, setDeleteCompany] = useState(false);
  const [addexam,setAddExam] = useState(true);
  const [delexam,setDelExam]  = useState(false);
  const [addAdmin, setAddAdmin] = useState(true);
  const [updateAdmin, setupdateAdmin] = useState(false);
  const [removeAdmin, setRemoveAdmin] = useState(false);
  const[events,setEvents]=useState([])
  const eventsCollectionRef = collection(db, 'events');

  const createClub = () => {
    setadd(true);
    setupdate(false);
    setdelete(false);
  };

  const updateClub = () => {
    setupdate(true);
    setadd(false);
    setdelete(false);
  };

  const deleteClub = () => {
    setdelete(true);
    setadd(false);
    setupdate(false);
  };

  const createEvent = () => {
    setaddevent(true);
    setupdateevent(false);
    setdeleteevent(false);
  };

  const updateEvent = () => {
    setupdateevent(true);
    setaddevent(false);
    setdeleteevent(false);
  };

  const deleteEvent = () => {
    setdeleteevent(true);
    setaddevent(false);
    setupdateevent(false);
  };

  const handleAddAdmin = () => {
    setAddAdmin(true);
    setupdateAdmin(false);
    setRemoveAdmin(false);
  };

  const handleUpdateAdmin = () => {
    setAddAdmin(false);
    setupdateAdmin(true);
    setRemoveAdmin(false);
  };

  const handleRemoveAdmin = () => {
    setAddAdmin(false);
    setupdateAdmin(false);
    setRemoveAdmin(true);
  };

  const createCompany = () => {
    setAddCompany(true);
    setDeleteCompany(false);
  };


  const deletecompany = () => {
    setAddCompany(false);
    setDeleteCompany(true);
  };

  const CreateExam = ()=>{
    setAddExam(true);
    setDelExam(false);
  };

  const RemoveExam = () =>{
    setAddExam(false);
    setDelExam(true);
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(eventsCollectionRef);
        const allEventsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Get the current date and time
        const currentDate = new Date();

        // Filter events whose datetime has not passed
        const validEventsData = allEventsData.filter((event) => {
          const eventDateTime = new Date(event.eventDateTime);
          return eventDateTime > currentDate;
        });

        // Update the state with valid events
        setEvents(validEventsData);
        console.log(events);
        // Delete events whose datetime has passed
        const eventsToDelete = allEventsData.filter((event) => {
          const eventDateTime = new Date(event.eventDateTime);
          return eventDateTime <= currentDate;
        });

        eventsToDelete.forEach(async (event) => {
          await deleteDoc(doc(eventsCollectionRef, event.id));
          console.log(`Event "${event.eventName}" deleted.`);
        });
      } catch (error) {
        console.error('Error fetching or deleting events:', error);
      }
    };

    fetchEvents();
  }, []);
    return(
        <>
         <div>
      <div className="top">
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

      </div>
      <div class="top">
        <header>
          <Title/>
        </header>
    </div>
    
    <div className="row card2" style={{ marginLeft: '10px', marginTop: '10px', width: '98%', height: 'fit-content' ,border:'3px solid '}}>
          <div className="" style={{ size: '10px' }}>
            <button type="button" onClick={() => setActiveSection('events')} class={`btn ${activeSection === 'events' ? 'btn-primary' : 'btn-outline-primary'}`} style={{ font: '18px' }}>Event Manager</button>
            <button type="button" onClick={() => setActiveSection('clubs')} class={`btn ${activeSection === 'clubs' ? 'btn-primary' : 'btn-outline-primary'}`} style={{ font: '18px' }}>Club Manager</button>
            <button type="button" onClick={() => setActiveSection('placement')} class={`btn ${activeSection === 'placement' ? 'btn-primary' : 'btn-outline-primary'}`} style={{ font: '18px' }}>Placement Manager</button>
            <button type="button" onClick={() => setActiveSection('exam')} class={`btn ${activeSection === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`} style={{ font: '18px' }}>Exam Manager</button>
            <button type="button" onClick={() => setActiveSection('admin')} class={`btn ${activeSection === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`} style={{ font: '18px' }}>Admin Manager</button>
          </div>
        </div>


        <div className="row card2" style={{ marginLeft: '10px', marginTop: '10px', width: '98%', height: 'fit-content',border:'3px solid ' }}>
          {activeSection === 'events' && (
            <div className="" style={{ size: '10px' }}>
              <SectionHeading heading={"Event Administrator"} />
              <button type="button" id="create_event" onClick={createEvent} class="btn btn-success" style={{ font: '18px' }}>Create</button>
              <button type="button" id="update_event" onClick={updateEvent} class="btn btn-warning" style={{ font: '18px' }}>Update</button>
              <button type="button" id="delete_event" onClick={deleteEvent} class="btn btn-danger" style={{ font: '18px' }}>Delete</button>
            </div>
          )}
          {addevent && activeSection === 'events' && <AddEvent />}
          {updateevent && activeSection === 'events' && <UpdateEvent />}
          {deleteevent && activeSection === 'events' && <DeleteEvent />}


          {activeSection === 'clubs' && (
            <div className="" style={{ size: '10px' }}>
              <SectionHeading heading={"Club Administrator"} />
              <button type="button" id="create_club" onClick={createClub} class="btn btn-success" style={{ font: '18px' }}>Create</button>
              <button type="button" id="update_club" onClick={updateClub} class="btn btn-warning" style={{ font: '18px' }}>Update</button>
              <button type="button" id="delete_club" onClick={deleteClub} class="btn btn-danger" style={{ font: '18px' }}>Delete</button>
            </div>
          )}
          {addclub && activeSection === 'clubs' && <CreateClub />}
          {updateclub && activeSection === 'clubs' && <UpdateClub />}
          {deleteclub && activeSection === 'clubs' && <Deleteclub />}

          {activeSection === 'placement' && (
            <div className="" style={{ size: '10px' }}>
              <SectionHeading heading={"Placement Administrator"} />
              <button type="button" id="create_club" onClick={createCompany} class="btn btn-success" style={{ font: '18px' }}>Add</button> 
              <button type="button" id="delete_club" onClick={deletecompany} class="btn btn-danger" style={{ font: '18px' }}>Delete</button>
            </div>
          )}
          {addCompany && activeSection === 'placement' && <AddCompany />}
          {deleteCompany && activeSection === 'placement' && <DeleteCompany />}

          {activeSection === 'exam' && (
            <div className="" style={{ size: '10px' }}>
              <SectionHeading heading={"Exam Administrator"} />
              <button type="button" id="create_club" onClick={CreateExam} class="btn btn-success" style={{ font: '18px' }}>Add</button> 
              <button type="button" id="delete_club" onClick={RemoveExam} class="btn btn-danger" style={{ font: '18px' }}>Delete</button>
            </div>
          )}
          {addexam && activeSection === 'exam' && <AddExam />}
          {delexam && activeSection === 'exam' && <DeleteExam />}

          {activeSection === 'admin' && (
            <div className="" style={{ size: '10px' }}>
              <SectionHeading heading={"Admin Manager"} />
              <button type="button" id="create_club" onClick={handleAddAdmin} class="btn btn-success" style={{ font: '18px' }}>Add</button>
              <button type="button" id="update_event" onClick={handleUpdateAdmin} class="btn btn-warning" style={{ font: '18px' }}>Update</button>
              <button type="button" id="delete_club" onClick={handleRemoveAdmin} class="btn btn-danger" style={{ font: '18px' }}>Remove</button>
            </div>
          )}
          {addAdmin && activeSection === 'admin' && <AddAdmin />}
          {updateAdmin && activeSection === 'admin' && <UpdateAdmin />}
          {removeAdmin && activeSection === 'admin' && <RemoveAdmin />}
        </div>


      <div className="background-container"></div> 
    
   <Footer/>
    </div>
        </>
    )
}

export default Admin;