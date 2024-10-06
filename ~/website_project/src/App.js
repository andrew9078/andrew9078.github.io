import React, { useState } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import emailjs from 'emailjs-com';
import Loadingscreen from './loadingscreen';
import './App.css';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [listVisible, setListVisible] = useState(false);
  const [showClickMe, setShowClickMe] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const handleLoadingFinish = () => {
    setIsLoading(false);
    setTimeout(() => {setShowClickMe(true);
    }, 1000);
  };//HandleLoadingfinish

  const handleClickMe = () => {
    setMenuVisible(true);
  };

  const fadeProps = useSpring({
    opacity: !listVisible ? 1 : 0,
    config: { duration: 1000 },
  });

  const slideProps = useSpring({
    opacity: listVisible ? 1 : 0,
    transform: listVisible ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 1500 },
  });
  
  const menuItems = ['About Me', 'Experience', 'Contact Me'];
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClick = (section) => { 
    setSelectedSection(section);//Handling Menu click
  }

  const transitions = useTransition(menuVisible ? menuItems : [], {
    from: { opacity: 0, transform: 'translat3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translat3d(0%, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
    config: {duration: 1000 },
  });

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

  
  return (
    <div className="App">
      {isLoading ? (
        <Loadingscreen onFinish={() => setIsLoading(false)}  />
      ) : (
        <div className="black-screen">
          {/*showing animated circle after initial message*/}
          {!menuVisible && (
            <animated.div style={fadeProps} className="click-me" onClick={handleClickMe}>
              Click Me
            </animated.div>
          )}

          {/* Animated List options */}
        {menuVisible && (
          <ul className="menu-list">
            {transitions((style, item) => (
              <animated.li key={item} style={style} onClick={() => handleMenuClick(item)}>
                {item}
              </animated.li>
            ))}
           </ul>
          )}

          {selectedSection === 'about' && <div>About Me Section</div>}
          {selectedSection === 'experience' && <div>Experience Section</div>}
          {selectedSection === 'contact' && <div>Contact Me Section</div>}


          

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
