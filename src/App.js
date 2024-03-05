import './App.css';
import Login from './components/login';
import Admin from './components/admin';
import Timeline from './components/menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Viewer from './components/viewer';
import Placement from './components/Placement';
import Timeline1 from './components/Home';
import Exams from './components/exam';

function App() {
  return (
     <>
     <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/Clubs' element={<Viewer/>}/>
        <Route path='/Placements' element={<Placement/>}/>
        <Route path='/menu' element={<Timeline/>}/>
        <Route path='/Exams' element={<Exams/>}/>
      </Routes>
     </Router>
     </>
  );
}

export default App;
