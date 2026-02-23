import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './pages/layout/Layout';
import Home from './pages/home';
import Profile from './pages/profile';
import Assylum from './pages/assylumlogs';
import { BrowserRouter, HashRouter, Routes, Route, Link} from "react-router-dom";





function App() {
  
  return (
    <HashRouter> 
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/assylumlogs" element={<Assylum />}/>
        </Route>  
      </Routes>
    </HashRouter> 
  );
}

export default App;

export default App;
