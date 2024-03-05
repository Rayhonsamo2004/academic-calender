import '../styles/home.css';
import '../styles/sign.css';
const Header = () => (
    <div className="top">
      <header style={{marginTop:'0px',fontSize:'17px'}}>
      <div>
                <img src="https://imgs.search.brave.com/f9mPpGlab0gwsLBKmIJlruPNEvehuxD9FSd1Nboq3eo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vMy8zMi9U/aGlhZ2FyYWphcl9D/b2xsZWdlX29mX0Vu/Z2luZWVyaW5nX2xv/Z28ucG5n" alt="logo" class="logo"/>
            </div>
            <div>
                <h2 style={{marginLeft:'0px'}}>Thiagarajar College of Engineering</h2>
                <h4 style={{marginLeft:'0px'}}>Department of Information Technology</h4>
            </div>
      </header>
    </div>
  );

  const MyComponent = () => (
    <div className="background-container">
    </div>
  );

  const Footer = () => (
    <div className="bottom" style={{marginBottom:'0px'}}>
      <ul className="social-floating-list">
        <li>
          <a href="https://www.facebook.com/TheOfficialTCEPage" className="social-icon" target="_blank" rel="noopener noreferrer">
            <img src="https://imgs.search.brave.com/b1qzWLZiN4Dm3HPkkcOxdae80mpuTE1g_1Yd1WivZrI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzMyLzIwLzAz/LzM2MF9GXzUzMjIw/MDM1NV9vZEtOOU91/M1dCNmlIV0pURklF/bEZ0SmJUdXpKc3BZ/Ni5qcGc" alt="Facebook" />
          </a>
        </li>
        <li>
          <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
            <img src="https://imgs.search.brave.com/sNGA3dYIVIerZe2IJVwDo7NMlCup7RCChZNJrpHoAOk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzAy/L2luc3RhLWxvZ28t/NTAweDUwMC5wbmc" alt="Instagram" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/tcemadurai/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <img src="https://imgs.search.brave.com/AMNOWNlys6t-LdYxrRSfVYYcAHVqt8duRtLNuSfZ334/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4w/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvc2hpZnQtbG9n/b3R5cGVzLzMyL0xp/bmtlZGluLTEyOC5w/bmc" alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Ftceofficialpage" className="social-icon" target="_blank" rel="noopener noreferrer">
            <img src="https://imgs.search.brave.com/x5H69tKWipX6AXMo3Zg3wIn3FsKsBAVfABCFzSqEDTA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1NzA0NjE0/MXR3aXR0ZXItbG9n/by1ibGFjay5wbmc" alt="Twitter" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/ThiagarajarCollegeofEngineeringTCE" className="social-icon" target="_blank" rel="noopener noreferrer">
            <img src="https://imgs.search.brave.com/b8oZWU7nCGADW4DfhuHhTAy8jdrRn3C0-TbTJQLQpZ0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1Lzk2LzMxLzA2/LzM2MF9GXzU5NjMx/MDYyNl9oTmZvWG5u/eUdRVVAwc0J0VGQ4/V2lLeUtWN1hDVXMx/SS5qcGc" alt="YouTube" />
          </a>
        </li>
      </ul>
      <footer>
        <p>&copy; 2023 Thiagarajar College of Engineering</p>
      </footer>
    </div>
  );
  export { Header, MyComponent, Footer };
