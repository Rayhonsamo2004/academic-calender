import React from 'react';
import '../styles/menu.css'
import { useNavigate } from 'react-router-dom';
import { Header,Footer } from './Body';
import { MyComponent } from './Body';
import { Helmet } from 'react-helmet';

const ImageGallery = () => {
    const navigate=useNavigate();
  return (
    <>
    <MyComponent/>
    <div style={{marginTop:'0px'}}>
                <img style={{width:'130px'}} src="https://imgs.search.brave.com/f9mPpGlab0gwsLBKmIJlruPNEvehuxD9FSd1Nboq3eo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vMy8zMi9U/aGlhZ2FyYWphcl9D/b2xsZWdlX29mX0Vu/Z2luZWVyaW5nX2xv/Z28ucG5n" alt="logo" class="logo"/>
            </div>
            <div>
                <h2>Thiagarajar College of Engineering</h2>
                <h3>Department of Information Technology</h3>
            </div>
   <div id="wrapper">
	<h1>DashBoard</h1>
	<ul class="nav">
		<li class="hm" style={{height:'80%'}}>
			<img class="icon" src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/home-24.png" alt=""/>
			<span style={{fontSize:'30px',color:'black'}} onClick={()=>navigate("/announcements")}>Announcements</span>
      <h4 style={{color:'white'}}>
      Explore the transformative potential of app development
Provide hands-on learning through workshops and collaborative projects
Encourage creativity and real-world application development
Empower members with knowledge from hardware to communication protocols
      </h4>
		</li>
		<li class="fb" style={{height:'80%'}}>
			<img class="icon" src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/social-facebook-24.png" alt=""/>
			<span style={{fontSize:'30px',color:'black'}} onClick={()=>navigate("/Clubs")}>Clubs</span>
      <h4 style={{color:'white'}}>
      Explore the transformative potential of app development
Provide hands-on learning through workshops and collaborative projects
Encourage creativity and real-world application development
Empower members with knowledge from hardware to communication protocols
      </h4>
		</li>
		<li class="gp" style={{height:'80%'}}>
			<img class="icon" src="https://cdn3.iconfinder.com/data/icons/picons-social/57/40-google-plus-24.png" alt=""/>
			<span style={{fontSize:'30px',color:'black'}} onClick={()=>navigate("/Exams")}>Exams</span>
      <h4 style={{color:'white'}}>
      Explore the transformative potential of app development
Provide hands-on learning through workshops and collaborative projects
Encourage creativity and real-world application development
Empower members with knowledge from hardware to communication protocols
      </h4>
		</li>
		<li class="tw" style={{height:'80%'}}>
			<img class="icon" src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/social-twitter-24.png" alt=""/>
			<span style={{fontSize:'30px',color:'black'}} onClick={()=>navigate("/Placements")}>Placement</span>
      <h4 style={{color:'white'}}>
      Explore the transformative potential of app development
Provide hands-on learning through workshops and collaborative projects
Encourage creativity and real-world application development
Empower members with knowledge from hardware to communication protocols
      </h4>
		</li>
	</ul>
</div>
<Footer/>
    </>
  );
};

export default ImageGallery;
