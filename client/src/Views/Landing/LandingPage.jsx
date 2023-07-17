import style from './LandingPage.module.css'
import { NavLink } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { useEffect, useState } from 'react'


const Landing = () => {
    const [text, setText] = useState("");
    const [isForwardTyping, setIsForwardTyping] = useState(true);
    const landingText = "Welcome to 110% Gaming App";
    const typingSpeed = 150; // milisegundos
  
    useEffect(() => {
      let currentIndex = 0;
      let reverseIndex = landingText.length - 1;
      let intervalId;
  
      intervalId = setInterval(() => {
        if (isForwardTyping) {
          setText(landingText.substring(0, currentIndex) + landingText[currentIndex]);
          currentIndex++;
  
          if (currentIndex >= landingText.length) {
            setIsForwardTyping(false);
          }
        } else {
          setText(landingText.substring(0, reverseIndex) + landingText[reverseIndex]);
          reverseIndex--;
  
          if (reverseIndex < 0) {
            setIsForwardTyping(true);
          }
        }
      }, typingSpeed);
  
      return () => clearInterval(intervalId);
    }, [isForwardTyping]);
  
    return(
        <div className={style.Landing}>
            <div className={style.img}>
            <img src={logo} alt="" />
            </div>

            <h3 className={style.title}>{text}</h3>

            <NavLink to='/home'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
               Entrar
           </NavLink>         
        </div>
    )
}
export default Landing;