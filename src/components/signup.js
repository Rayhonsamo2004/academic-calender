import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { getDocs,addDoc,collection,updateDoc,query,where } from "firebase/firestore";
import {db,storage} from "../configuration/firebase-config";
import { useNavigate } from "react-router-dom";
import '../styles/home.css';
import '../styles/sign.css'
import Footer from "./footer";
import Title from "./titlecomp";
const Register1 = () => {
    
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const usercollectionref=collection(db,"users");
  const navigate=useNavigate();
  const submit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const q = query(usercollectionref, where("mail", "==", mail));
    console.log(name+" "+mail)
    try {
      const querysnapshot = await getDocs(q);
      if (querysnapshot.size === 1) {
        alert(`${mail} already exists`);
      } else {
        await addDoc(usercollectionref, {
          name: name,
          mail: mail,
          password: password,
        });
        alert("regsitered")
        navigate("/login")
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      {/* Your HTML/JSX code here */}
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
        <button type="button" style={{backgroundColor:"#4285F4",fontFamily:"sans-serif",height:"50px",width:"100px"}} class="position-absolute top-10 end-0 m-3" onClick={() => navigate("/login")}>Login</button>
        </header>
    </div>
      <div className="background-container"></div>

      <div className="card1">
        <div className="row">
          <div className="col-md-5">
          <img src="https://imgs.search.brave.com/mYtO5AEhP5nXX08fgE8UMOiK1JaN7RzAS4OESNIDMVA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2IzL1RDRV9NYWR1/cmFpLkpQRw" alt="profile" class="rounded float-start" id="sam1"/>
          </div>
          <div className="col-md-4" style={{ marginTop: "70px", marginLeft: "30px" }}>
            <h2>Sign Up</h2>
            <form onSubmit={submit}>
              <input type="text" name="name" placeholder="Name" id="name" pattern="[A-Za-z]+" required onChange={(e) => setname(e.target.value)} />
              <input type="text" name="mail" placeholder="Mail" id="mail" required onChange={(e) => setmail(e.target.value)} />
              <input type="text" name="password" placeholder="Password" id="password" required onChange={(e) => setpassword(e.target.value)} />
              <input type="submit" value="Get Started" />
              <br /><br />
              <div class="google-signin-button" onclick="signInWithGoogle()">
                    <img src="https://imgs.search.brave.com/K2bzYTWwzs1jK-LIjzjfDSF_tBhgNnw1Xql1Q8VZL5Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEx/L05ldy1Hb29nbGUt/TG9nby00OTd4NTAw/LmpwZw" alt="Google Sign-In" width="120"/>
                    <span>Sign in with Google</span>
                </div>
            </form>
          </div>
        </div>
        <div className="foot">
        <div className="social-icons-container">
  <a href="#" style={{ marginTop: '10px', marginLeft: '200px' }}><i className="fab fa-twitter fa-2x"></i></a>
  <a href="#" style={{ marginTop: '10px', marginLeft: '100px' }}><i className="fab fa-facebook fa-2x"></i></a>
  <a href="#" style={{ marginTop: '10px', marginLeft: '100px' }}><i className="fab fa-whatsapp fa-2x"></i></a>
  <a href="#" style={{ marginTop: '10px', marginLeft: '100px' }}><i className="fab fa-instagram fa-2x"></i></a>
  <a href="#" style={{ fontSize: '30px', marginTop: '10px', marginLeft: '100px' }}><i className="fab fa-snapchat-ghost"></i></a>
</div>

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Register1;

