import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaMoon,
  FaSun,
  FaPlaneDeparture,
  FaHome,
  FaMapMarkedAlt,
  FaTags,
  FaSuitcase,
  FaImages,
  FaEnvelope,
  FaMicrophone,
  FaLocationArrow,
  FaHeart,
  FaEye,
  FaInfoCircle
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ theme, setTheme, searchQuery, setSearchQuery, visitorCount, totalLikes, onFavoritesClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Voice recognition function
  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
      window.location.href = '#destinations';
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <nav className={`navbar ${theme}`}>
      {/* LOGO */}
      <div className="logo">
        <img src="/logo travel.jpeg" alt="SkyTravel Logo" className="logo-image floating" />
        <span className="logo-text">SkyTravel</span>
      </div>

      {/* BURGER */}
      <div className="burger-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* NAV LINKS */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#home"><FaHome className="nav-icon" /> Home</a></li>
          <li><a href="#destinations"><FaMapMarkedAlt className="nav-icon" /> Destinations</a></li>
          <li><a href="#offers"><FaTags className="nav-icon" /> Offers</a></li>
          <li><a href="#gallery"><FaImages className="nav-icon" /> Gallery</a></li>
          <li><a href="#about"><FaInfoCircle className="nav-icon" /> About</a></li>
          <li><a href="#contact"><FaEnvelope className="nav-icon" /> Contact</a></li>
        </ul>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <FaLocationArrow className="search-icon" />
        <input 
          type="text" 
          placeholder="Search destinations..." 
          value={searchQuery}
          onChange={handleSearch}
        />
        <FaMicrophone 
          className={`search-icon mic ${isListening ? 'listening' : ''}`}
          onClick={startVoiceRecognition}
          title="Voice search - Click and speak a country name"
        />
        <FaSearch className="search-icon main-search" />
      </div>

      {/* FAVORITES ICON & THEME TOGGLE */}
      <div className="nav-actions">
        <button 
          className="favorites-icon-btn" 
          onClick={onFavoritesClick}
          title="View your favorites"
        >
          <FaHeart className="fav-icon" />
          {totalLikes > 0 && <span className="fav-count">{totalLikes}</span>}
        </button>
        
        <div className="toggle-icon" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
