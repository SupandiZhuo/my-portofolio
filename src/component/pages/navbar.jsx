import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    
    if (section) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const startPosition = window.pageYOffset;
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      const distance = targetPosition - startPosition;
      const duration = 600; // Reduced animation duration for better performance
      let start = null;

      // Simplified easing function for better performance
      const easeOutQuad = (t) => {
        return t * (2 - t);
      };

      const animateScroll = (currentTime) => {
        if (!start) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeOutQuad(progress);
        
        window.scrollTo(0, startPosition + (distance * easeProgress));

        if (timeElapsed < duration && Math.abs(window.pageYOffset - targetPosition) > 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const handleNavClick = (e, sectionId) => {
    scrollToSection(e, sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Suppa</h2>
      </div>
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </button>
      <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {[
          { id: 'home', label: 'Home' },
          { id: 'about', label: 'About' },
          { id: 'skills', label: 'Skills' },
          { id: 'projects', label: 'Projects' },
          { id: 'contact', label: 'Contact' }
        ].map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;