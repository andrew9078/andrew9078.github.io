import React, { useState, useEffect } from 'react';
import './loadingscreen.css';


const Loadingscreen = ({ onFinish }) => {
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = ["Welcome to My Portfolio", "Let me show you my work"];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => {
                if (prevIndex < messages.length - 1) {
                    return prevIndex + 1;
                }//if
                else{
                    clearInterval(interval);
                    onFinish();//call finish when the animation is done
                    return prevIndex;
                }//else
            });//setMessageIndex
        }, 3000);//const interval

        return () => clearInterval(interval);
    }, [messages.length, onFinish])//useEffect

    return (
        <div className="loading-screen">
            <div className="fade-in-out">
                <p>{messages[messageIndex]}</p>
            </div>
        </div>
    );
};//const loadingscreen

export default Loadingscreen;