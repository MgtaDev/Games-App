
import style from "./About.module.css"
import myPhoto from '../assets/Myphoto.jpeg'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Github from '../assets/github.png'
import Linkedin from '../assets/linkedin.png'
import Gmail from '../assets/gmail.png'



export default function About(){

    const active = {
        borderBottom: '3px solid rgb(247, 243, 14)',
        color: "#fff"
      }

    const unactive = {
        border: "none",
        color: 'rgba(177, 176, 176,90)'
      }
    
    const [navM1, setNavM1] = useState(true)
    const [navM2, setNavM2] = useState(false)
    const [navM3, setNavM3] = useState(false)
    const [navStyles, setNavStyles] = useState([active, unactive, unactive]);
    const navigate = useNavigate()

    const navigateHome = () => {
        navigate('/home')
      }

    const handleNav = () => {
        setNavM1(true)
        setNavM2(false)
        setNavM3(false)
        setNavStyles([active, unactive, unactive])
    }
    const handleNav2 = () => {
        setNavM1(false)
        setNavM2(true)
        setNavM3(false)
        setNavStyles([unactive, active, unactive])
    }
    const handleNav3 = () => {
        setNavM1(false)
        setNavM2(false)
        setNavM3(true)
        setNavStyles([unactive, unactive, active])
    }


    return(
        <div className={style.aboutMe}>
            
        <button onClick={navigateHome}>Return home</button>
        <img src={myPhoto} alt="" />


        <div className={style.right}>

        <h1>About <span>Me </span></h1>
        <h2>Full Stack Developer</h2>

        <nav className={style.nav}>
            <ul>
                <li id="about" style={navStyles[0]} onClick={handleNav} >About</li>
                <li id="about" style={navStyles[1]} onClick={handleNav2} >Portafolio</li>
                <li id="about" style={navStyles[2]} onClick={handleNav3} >Contacto</li>
            </ul>
        </nav>
        {
            navM1 ? 
            <p>Hola 👋, soy Daniel Passantino ✔️ Soy un programador Full Stack jr! <br />Me especializo en Frontend y Responsive Web Design

            📚 Actualmente estoy estudiando Ingles, Frances, React Native y Next.js </p>
            : ''
        }
          {
            navM2 ? 
            <div className={style.Portafolio}>
            <p>Todos mis proyectos estan disponibles en mi portafolio personal</p>
            <p data-label="Register" className={style.rainbowHover}>
            <p className={style.sp}><a target='_blank' href='https://mgtadev.github.io/MyPersonalPortafolio/'>Click here!</a></p>
            </p>
            </div>
            : ''
        }
          {
            navM3 ? 
            <>
            <p>Puedes contactarme por medio de las siguientes plataformas</p>
            <a href="https://github.com/MgtaDev" target="_blank"><img className={style.socials} style={{height: '80px'}} src={Github} alt=""/></a>
            <a href="https://www.linkedin.com/in/daniel-passantino-9a6975269/" target="_blank"><img className={style.socials} style={{height: '80px'}} src={Linkedin} alt=""/></a>
            <a href="mailto:passantinodev@gmail.com" target="_blank"><img className={style.socials} style={{height: '80px'}} src={Gmail} alt=""/></a>
            </>
            : ''
        }
        
        </div>
        
        </div>
    );
};
       