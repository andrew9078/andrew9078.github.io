import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Loadingscreen from './loadingscreen';
import './App.css';

function App() {

  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
        <Loadingscreen onFinish={handleLoadingFinish} />
      ) : (
        <div>
        <header>
          <nav>
            <h1>Andrew Jung</h1>
            <u1>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>

            </u1>
          </nav>
        </header>

        <section id="her" classname="hero-section">
          <h2>Hi I'm Andrew Jung</h2>
          <p>Aspiring Software Engineer | Creative Thinker</p>
          <a href="projects" classname="cta-button">View Projects</a>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="project-list">
            <div className="project">
              <h3>Project Title</h3>
              <p>This is a project</p>
            </div>
          </div>
        </section>


        <section id="Contact">
          <h2>Contact Me</h2>
          <form onSubmit={handleSubmit}>
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

        <footer>
          <p>@ 2024 Andrew Jung</p>
        </footer>
        </div>
      )}
    </div>
  );
}

export default App;
