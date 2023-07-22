import './App.css';
import { Routes, Route } from "react-router-dom";
import style from './App.css'
import {Landing, Home, CreateForm, Detail, About} from './Views/index'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3001"


function App() {

  return (
    <div className={style.App}>
    <Routes>
   
    <Route  path="/" element={<Landing/>} />

    <Route  path="/home" element={<Home/>} />

    <Route  path="/form" element={<CreateForm onsubmit={onsubmit} />} />

    <Route  path="/details/:id" element={<Detail/>} />

    <Route  path="/about" element={<About/>} />

    </Routes>
    </div>
   
  );
}

export default App;
