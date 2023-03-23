import logo from './logo.svg';
import './App.css';
import {Routes , Route} from 'react-router-dom'
import { Home } from './components/Home';
import { Login } from './components/Login';
import {Signup} from './components/Signup';
import { Navbar } from './components/Navbar';
import {PrivateRoute} from './Private/PrivateRoute';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>
      <Route path={'/'} element={<Home/>} ></Route>
      <Route path={'/login'} element={<Login/>} ></Route>
      <Route path={'/signup'} element={<Signup/>} ></Route>
     </Routes>
    </div>
  );
}

export default App;
