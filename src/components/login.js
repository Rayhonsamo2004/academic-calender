import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { getDocs,addDoc,collection,updateDoc,query,where } from "firebase/firestore";
import {db,storage,auth} from "../configuration/firebase-config";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import '../styles/home.css';
import '../styles/sign.css'
import Footer from "./footer";
import Title from "./titlecomp";
const Login = () => {
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const userCollectionRef = collection(db, "users");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const q = query(
      userCollectionRef,
      where("mail", "==", mail),
      where("password", "==", password),
      where("admin", "==", true) 
    );
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.size === 1) {
        const user = querySnapshot.docs[0].data();
        if (user.admin) {
          console.log(`Admin logged in successfully as ${mail}`);
          navigate("/admin");
        } else {
          console.log(`Viewer logged in successfully as ${mail}`);
          navigate("/menu");
        }
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };
  
  const signInAsViewer = () => {
    navigate("/menu");
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(`Google sign-in successful for ${user.displayName || user.email}`);
      navigate("/menu");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
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
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'/>
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
      <div className="background-container"></div>

      <div className="card1">
        <div className="row">
          <div className="col-md-5">
          <img src="https://imgs.search.brave.com/1PptRpB8kBlQtHiAzMClTA1LXBymtkxurNbdl89KBfk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vMy8zMi9U/aGlhZ2FyYWphcl9D/b2xsZWdlX29mX0Vu/Z2luZWVyaW5nX2xv/Z28ucG5n" alt="profile" class="rounded float-start" id="sam1"/>
          </div>
          <div className="col-md-4" style={{ marginTop: "70px", marginLeft: "30px" }}>
            <h2>Login</h2>
            <form onSubmit={submit}>
              <input type="text" name="UserName" placeholder="UserName" id="mail" required onChange={(e) => setmail(e.target.value)} />
              <input type="password" name="password" placeholder="Password" id="password" required onChange={(e) => setpassword(e.target.value)} />
              <input type="submit" value="Login as Admin" />
              <br /><br />
              <button type="button" className="google-signin-button" onClick={() => signInAsViewer()}>
          Login as Viewer
        </button>
        <br/>
            </form>
          <button type="button" class="login-with-google-btn" style={{marginLeft:'40px'}} onClick={()=>signInWithGoogle()}>
    Sign in with Google
  </button>
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

export default Login;

