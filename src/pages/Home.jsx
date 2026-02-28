import React, { useState, useRef, useEffect } from "react";
import {
  FaArrowRight,
  FaGlobeAmericas,
  FaUsers,
  FaStar,
  FaHotel,
  FaPlay,
  FaPause,
  FaPlane
} from "react-icons/fa";
import ScrollAnimation from "../components/ScrollAnimation";
import "./Home.css";

const videoPlaylist = [
  "/travel.mp4",
  "/travel 2.mp4",
  "/travel 3.mp4"
];

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoTransitioning, setIsVideoTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    setIsVideoTransitioning(true);
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === videoPlaylist.length - 1 ? 0 : prevIndex + 1
      );
      setIsVideoTransitioning(false);
    }, 1000);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.load();
      videoRef.current.play().catch(error => console.log("Auto-play prevented:", error));
    }
  }, [currentVideoIndex, isPlaying]);

  return (
    <section className="home">
      {/* VIDEO BACKGROUND */}
      <div className={`video-container ${isVideoTransitioning ? 'transitioning' : ''}`}>
        {videoPlaylist.map((video, index) => (
          <video
            key={index}
            ref={index === currentVideoIndex ? videoRef : null}
            className={`bg-video ${index === currentVideoIndex ? 'active' : ''}`}
            autoPlay
            loop={false}
            muted
            playsInline
            onEnded={handleVideoEnded}
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* VIDEO PROGRESS */}
      <div className="video-progress">
        {videoPlaylist.map((_, index) => (
          <div key={index} className={`progress-bar ${index === currentVideoIndex ? 'active' : ''}`}>
            <div className="progress-fill"></div>
          </div>
        ))}
      </div>

      {/* VIDEO CONTROLS */}
      <button className="play-pause-btn" onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      {/* OVERLAY */}
      <div className="overlay"></div>
      <div className="overlay-gradient"></div>

      {/* CONTENT */}
      <div className="home-content">
        {/* LABEL */}
        <ScrollAnimation variant="fadeInUp" delay={0.1}>
          <div className="home-label" data-aos="fade-down">
            <span className="label-glow"></span>
            <FaPlane className="label-icon" />
            <span>Premium Travel Experience</span>
            <span className="label-glow"></span>
          </div>
        </ScrollAnimation>
        
        {/* MAIN TITLE */}
        <ScrollAnimation variant="fadeInUp" delay={0.2}>
          <h1 className="title-main">
            <span className="title-line">Discover </span>
            <span className="title-line title-accent">The World</span>
          </h1>
        </ScrollAnimation>

        {/* SUBTITLE */}
        <ScrollAnimation variant="fadeInUp" delay={0.3}>
          <p className="subtitle">
            Embark on extraordinary journeys to the world's most breathtaking destinations. 
            Luxury, adventure, and unforgettable memories await.
          </p>
        </ScrollAnimation>

        {/* BUTTONS */}
        <ScrollAnimation variant="fadeInUp" delay={0.4}>
          <div className="home-actions">
            <button className="btn-primary">
              <span>Start Your Journey</span>
              <FaArrowRight className="btn-icon" />
            </button>
            <button className="btn-secondary">
              <span>Explore Destinations</span>
            </button>
          </div>
        </ScrollAnimation>

        {/* STATS */}
        <ScrollAnimation variant="fadeInUp" delay={0.5}>
          <div className="home-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <FaGlobeAmericas />
              </div>
              <div className="stat-info">
                <span className="stat-num">150+</span>
                <span className="stat-text">Destinations</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-info">
                <span className="stat-num">50K+</span>
                <span className="stat-text">Travelers</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-info">
                <span className="stat-num">4.9</span>
                <span className="stat-text">Rating</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaHotel />
              </div>
              <div className="stat-info">
                <span className="stat-num">200+</span>
                <span className="stat-text">Hotels</span>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* SCROLL */}
      <div className="scroll-hint">
        <span>Scroll to Explore</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>

      {/* VIDEO INDICATORS */}
      <div className="video-indicators">
        {videoPlaylist.map((_, index) => (
          <span 
            key={index} 
            className={`indicator ${index === currentVideoIndex ? 'active' : ''}`}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Home;
