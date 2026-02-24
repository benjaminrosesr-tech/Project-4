import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout/layout';
import Home from './Pages/home';
import Profile from './Pages/profile';
import Assylum from './Pages/assylumlogs';
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


