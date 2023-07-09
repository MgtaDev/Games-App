import React, { useEffect, useState } from 'react'
import style from './Loading2.module.css'
import loading from '../assets/Logo.png'

const Loading2 = ()=>  {
  const [text, setText] = useState("");
    const [isForwardTyping, setIsForwardTyping] = useState(true);
    const landingText = "Loading...";
    const typingSpeed = 230; // milisegundos
  
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
  
  return (
    <div className={style.Loading2}>
    <div className={style.loadingCard2}>
      <img src={loading} alt="" />
    </div>

    <h3 className={style.title2}>{text}</h3>
    </div>
  )
}
export default Loading2
