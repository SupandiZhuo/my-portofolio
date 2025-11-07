import React, { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import Separator from "./separator";
import Separator2 from "./separator2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const Homepage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      const oldWidth = canvas.width || window.innerWidth; // Handle initial load
      const oldHeight = canvas.height || window.innerHeight;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Scale existing particles to new canvas size
      if (oldWidth > 0 && oldHeight > 0) {
        const scaleX = canvas.width / oldWidth;
        const scaleY = canvas.height / oldHeight;

        particles.forEach((particle) => {
          particle.x *= scaleX;
          particle.y *= scaleY;
        });
      }

      // Add more particles if canvas got larger
      const desiredParticles = Math.min(
        50, // Maximum particles
        Math.floor((canvas.width * canvas.height) / 20000) // Much larger area per particle
      );

      // Remove excess particles if needed
      if (particles.length > desiredParticles) {
        particles = particles.slice(0, desiredParticles);
      }
      // Add more particles if needed
      else {
        while (particles.length < desiredParticles) {
          particles.push(new Particle());
        }
      }
    };

    class Particle {
      constructor(x, y) {
        this.x = x !== undefined ? x : Math.random() * canvas.width;
        this.y = y !== undefined ? y : Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initializeParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initializeParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const useAnimatedSection = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Only trigger animation once
          if (entry.isIntersecting && !isVisible) {
            // Small delay to ensure smooth animation
            requestAnimationFrame(() => {
              setIsVisible(true);
              // Disconnect after animation is triggered
              observer.disconnect();
            });
          }
        },
        { 
          threshold: 0.05,
          rootMargin: '100px'
        }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
  };

  const [homeRef, homeIsVisible] = useAnimatedSection();
  const [aboutRef, aboutIsVisible] = useAnimatedSection();
  const [skillRef, skillIsVisible] = useAnimatedSection();
  const [projectRef, projectIsVisible] = useAnimatedSection();
  const [contactRef, contactIsVisible] = useAnimatedSection();

  return (
    <>
      <div className="particle-container">
        <canvas ref={canvasRef} className="particle-canvas" />
        <div className="content-layer">
          <Navbar />
          <div className="main-content">
            <section
              className={`home ${homeIsVisible ? "visible" : ""}`}
              ref={homeRef}
              id="home"
            >
              <div className="profile-container">
                <img
                  src="./profile-pic.jpg"
                  alt="supandi"
                  className="profile-pic"
                />
              </div>
              <div className="hero">
                <h1 className="hero-heading">
                  Hi, I'm <span>Supandi</span>
                </h1>
                <p className="hero-desc">
                  I'm an Computer Science student passionate about data analysis
                  and artificial intelligence. I love building beautiful,
                  interactive, and meaningful digital experiences.
                </p>
              </div>
            </section>
            <Separator2 />
            <section
              className={`about ${aboutIsVisible ? "visible" : ""}`}
              ref={aboutRef}
              id="about"
            >
              <h2>About Me</h2>
              <div className="about-content">
                <p>
                  I'm <strong>Supandi</strong>, an Informatics Engineering
                  student passionate about technology, creativity, and problem
                  solving. I enjoy turning ideas into functional applications
                  and exploring the fields of artificial intelligence, frontend
                  development, and data handling.
                </p>
                <p>
                  My current focus is on building user-friendly interfaces and
                  exploring how AI can enhance learning and healthcare
                  experiences. When I'm not coding, I like to design, learn new
                  tools, and experiment with creative projects.
                </p>
              </div>
            </section>
            <Separator />
            <section 
              className={`skills ${skillIsVisible ? "visible" : ""}`}
              ref={skillRef} 
              id="skills">
              <h2>Skills</h2>
              <div className="skill-container">
                <div className="skill">
                  <img src="./Logo/react.png" alt="React.js" />
                  <p>React.js</p>
                </div>
                <div className="skill">
                  <img src="./Logo/mysql.png" alt="MySQL" />
                  <p>MySQL</p>
                </div>
                <div className="skill">
                  <img src="./Logo/python.png" alt="Python" />
                  <p>Python</p>
                </div>
                <div className="skill">
                  <img src="./Logo/cpp.png" alt="C++" />
                  <p>C++</p>
                </div>
                <div className="skill">
                  <img src="./Logo/javascript.png" alt="JavaScript" />
                  <p>JavaScript</p>
                </div>
              </div>
            </section>
            <Separator />
            <section 
              className={`projects ${projectIsVisible ? "visible" : ""}`}
              ref={projectRef}
              id="projects">
              <h2>My Projects</h2>
              <div className="projects-container">
                <div className="project-card">
                  <img src="./Project-Pic/CodeEasier.png" alt="CodeEasier App" />
                  <div className="project-info">
                    <h3>CodeEasier</h3>
                    <p>
                      A gamified coding learning app inspired by Beelingua.
                      Users learn programming through interactive lessons, daily
                      missions, and achievements.
                    </p>
                    <div className="project-links">
                      <a
                        href="https://github.com/Shianndri-Zanniko/CodeEasier"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github"
                      >
                        <FontAwesomeIcon icon={faGithub} className="project-icon" />
                        View Code
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-card">
                  <img
                    src="./Project-Pic/ICCSCI_Certificate.png"
                    alt="Multimodal Sentiment Analysis"
                  />
                  <div className="project-info">
                    <h3>Multimodal Sentiment Analysis</h3>
                    <p>
                      Participated in the ICCSCI international conference,
                      presenting my research on Multimodal Sentiment Analysis,
                      and received a certification for scientific contribution.
                    </p>
                    <div className="project-links">
                      <a
                        href="/document/MSA_Paper_Supandi.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link paper"
                      >
                        <FontAwesomeIcon icon={faFileAlt} className="project-icon" />
                        View Paper
                      </a>
                      <a
                        href="https://github.com/EifelLN/MELD-msa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github"
                      >
                        <FontAwesomeIcon icon={faGithub} className="project-icon" />
                        View Code
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-card">
                  <img
                    src="./Project-Pic/MusicGenreClassifier.png"
                    alt="Music Genre Classifier"
                  />
                  <div className="project-info">
                    <h3>Music Genre Classifier</h3>
                    <p>
                      Research project that uses Reinforcement Learning to
                      optimize factory production scheduling efficiently.
                    </p>
                    <div className="project-links">
                      <a
                        href="https://github.com/yourusername/ProductionAI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github"
                      >
                        <FontAwesomeIcon icon={faGithub} className="project-icon" />
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-card">
                  <img
                    src="./Project-Pic/TaskManager.png"
                    alt="Production Schedule Optimization"
                  />
                  <div className="project-info">
                    <h3>Task Manager</h3>
                    <p>
                      Research project that uses Reinforcement Learning to
                      optimize factory production scheduling efficiently.
                    </p>
                    <div className="project-links">
                      <a
                        href="https://github.com/SupandiZhuo/TaskManagerProject.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github"
                      >
                        <FontAwesomeIcon icon={faGithub} className="project-icon" />
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Separator />
            <section 
              className={`contact ${contactIsVisible ? "visible" : ""}`}
              ref={contactRef}
              id="contact">
              <h2>Connect With Me</h2>
              <div className="contact-container">
                <div className="contact-content">
                  <p>
                    Let's connect! Find me on these platforms:
                  </p>
                  <div className="social-links">
                    <a
                      href="https://github.com/SupandiZhuo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link github"
                    >
                      <FontAwesomeIcon icon={faGithub} className="social-icon" />
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/supandi-zhuo-ba23762b5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link linkedin"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} className="social-icon" />
                      LinkedIn
                    </a>
                    <a
                      href="mailto:supandi@binus.ac.id"
                      className="social-link email"
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;