import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import emailjs from 'emailjs-com';
import Loadingscreen from './loadingscreen';
import './App.css';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [showClickMe, setShowClickMe] = useState(false);
  const [circleClicked, setCircleClicked] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [circleVisible, setCircleVisible] = useState(false);
  const handleLoadingFinish = () => {
    setIsLoading(false);
    setTimeout(() => {setShowClickMe(true);
    }, 1000);
  };//HandleLoadingfinish


  const fadeProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: {opacity: showClickMe ? 1 : 0, transform: 'translateY(0)' },
    config: { tension: 220, friction: 10 },
  });

  const handleMenuClick = (section) => setSelectedSection(section);//Handling Menu click

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });//FormData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };//handleChange


  const handleSubmit = (e) => {
      e.preventDefault();

      emailjs.send('service_plh9j5c', 'template_inst8qb', formData, 'Jk4mRy94CEB87g1fu')
        .then((result) => {
          alert('Message Sent!');
        }, (error) =>{
          alert('Failed, try again');
        });

      setFormData({ name: '', email: '', message: ''});
  };//handlesubmit

  const circleProps = useSpring({
    from: { scale: 0 },
    to: { scale: circleClicked ? (circleVisible ? 1 : 0) : 0 },
    config: {tension: 220, friction: 10 },
  });
  
  return (
    <div className="App">
      {isLoading ? (
        <Loadingscreen onFinish={handleLoadingFinish} />
      ) : (
        <div className="black-screen">
          {/*showing animated circle after initial message*/}
          <animated.div style={fadeProps} className="click-me" onClick={() => console.log('Clicked!')}>
            Click me
          </animated.div>

          {/*}
          <nav>
            <h1>Andrew Jung</h1>
            <u1>
              <li><button onClick={() => handleMenuClick('about')} >About Me</button></li>
              <li><button onClick={() => handleMenuClick('experience')} >Experience</button></li>
              <li><button onClick={() => handleMenuClick('contact')} >Contact me</button></li>
            </u1>
          </nav>

          {/* Conditional Rendering based on selecting a section */}
          {/*}
          {selectedSection === 'about' && (
            <section id="about">
              <h2>About Me</h2>
              <p>This is the About me section</p>
            </section>
          )}

          {selectedSection === 'experience' && (
            <section id="experience">
              <h2>Experience</h2>
              <p>This is the Experience section</p>
            </section>
          )}


          {/* Contact Form Section */}

          {/*}
          {selectedSection === 'contact' && (
            <section id="Contact">
              <h2>Contact Me</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="Message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit">Send</button>
              </form>
            </section>

          )}
          */}
        </div>
      )}
    </div>
  );
}

export default App;
