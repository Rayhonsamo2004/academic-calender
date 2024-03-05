import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { getDocs,addDoc,collection,updateDoc,query,where } from "firebase/firestore";
import {db,storage} from "../configuration/firebase-config";
import { useNavigate } from "react-router-dom";
import '../styles/home.css';
import '../styles/sign.css'


const Addclub=()=>{
    const [clubId, setClubId] = useState("");
    const [clubName, setClubName] = useState("");
    const [incharge, setIncharge] = useState("");
    const [description, setDescription] = useState("");
    const[addclub,setadd]=useState(true);
    const[updateclub,setupdate]=useState(false);
    const[deleteclub,setdelete]=useState(false);
    const navigate = useNavigate();
    const usercollectionref=collection(db,"clubs");
    const submit = async (e) => {
      e.preventDefault();
  
      const idQuery = query(usercollectionref, where("id", "==", clubId));
      const nameQuery = query(usercollectionref, where("name", "==", clubName));
    
      try {
        const idQuerySnapshot = await getDocs(idQuery);
        const nameQuerySnapshot = await getDocs(nameQuery);
    
        if (idQuerySnapshot.size > 0 || nameQuerySnapshot.size > 0) {
          alert(`Club with the provided Club ID or Club Name already exists`);
        } else {
      
          await addDoc(usercollectionref, {
            id: clubId,
            name: clubName,
            description: description,
            incharge: incharge,
          });
    
          alert("Club registered successfully");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    
    return(
        <>
      <form onSubmit={submit}>
      <h1>create_club</h1>
       <div className="input-container">
      <div>
        <label>Club ID:</label>
        <input type="text" placeholder="Club ID" value={clubId} onChange={(e) => setClubId(e.target.value)} className="input-field" />
      </div>
      <div>
        <label>Club Name:</label>
        <input type="text" placeholder="Club Name" value={clubName} onChange={(e) => setClubName(e.target.value)} className="input-field" />
      </div>
      <div>
        <label>Incharge:</label>
        <br/>
        <select placeholder="INcharge" id="selectOption" value={incharge} onChange={(e)=>setIncharge(e.target.value)} className="input-field">
        <option value="Karthiga">Karthiga</option>
        <option value="Nisha">Nisha</option>
        <option value="Pandeeswari">Pandeeswari</option>
        <option value="Karthikeyan">Karthikeyan</option>
        <option value="Pudumalar">Pudumalar</option>
        <option value="Uma">Uma</option>
        <option value="Manoj kumar">Manoj Kumar</option>
      </select>


      </div>
      <div>
        <label>Description:</label>
        <input type="text" placeholder="Club Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" />
      </div>
      <div>
        <input style={{marginLeft:'270px',width:'100px'}}  class="btn btn-outline-primary INFINIX" type="submit" value="submit"/>
        </div>
    </div>
    </form>
        </>
    )
}

export default Addclub;