import React from "react";
import { motion } from "framer-motion";
import {
  FaPlaneDeparture,
  FaHeart,
  FaStar,
  FaUsers,
  FaGlobeAmericas,
  FaAward,
  FaShieldAlt,
  FaHeadset,
  FaQuoteLeft,
  FaCheckCircle
} from "react-icons/fa";
import "./About.css";

const About = ({ theme }) => {
  const isLight = theme === "light";

  const stats = [
    { icon: FaGlobeAmericas, number: "150+", label: "Destinations" },
    { icon: FaUsers, number: "50K+", label: "Happy Travelers" },
    { icon: FaStar, number: "4.9", label: "Average Rating" },
    { icon: FaAward, number: "15+", label: "Years Experience" }
  ];

  const features = [
    { icon: FaShieldAlt, title: "Secure Booking", desc: "Your payments are 100% protected with advanced encryption" },
    { icon: FaHeadset, title: "24/7 Support", desc: "Round-the-clock assistance for all your travel needs" },
    { icon: FaHeart, title: "Personalized Service", desc: "Tailored travel experiences designed just for you" },
    { icon: FaCheckCircle, title: "Best Price Guarantee", desc: "We match any competitor's price for the same trip" }
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { name: "Michael Chen", role: "Head of Operations", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { name: "Emma Wilson", role: "Lead Travel Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
    { name: "David Rodriguez", role: "Customer Success", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" }
  ];

  const testimonials = [
    { text: "SkyTravel made my dream vacation come true! The attention to detail was incredible.", author: "Jessica M.", location: "United States" },
    { text: "Best travel experience I've ever had. Professional, caring, and truly exceptional!", author: "Robert K.", location: "Germany" },
    { text: "From planning to execution, everything was perfect. Highly recommend!", author: "Amanda L.", location: "Canada" }
  ];

  return (
    <div className={`about-page ${isLight ? "light" : "dark"}`}>
      
      {/* HERO SECTION */}
      <div className="about-hero">
        <div className="about-hero-bg"></div>
        <motion.div 
          className="about-hero-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="about-badge"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <FaPlaneDeparture className="badge-icon" />
            <span>About SkyTravel</span>
          </motion.div>
          
          <h1 className="about-title">
            Crafting <span className="gradient-text">Unforgettable</span> Journeys
          </h1>
          
          <p className="about-subtitle">
            We believe travel is more than just visiting places—it's about creating lifelong memories. 
            For over 15 years, we've been transforming dreams into extraordinary adventures.
          </p>

          <div className="about-hero-stats">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="hero-stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <stat.icon className="hero-stat-icon" />
                <span className="hero-stat-number">{stat.number}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* MISSION SECTION */}
      <div className="about-mission">
        <motion.div 
          className="mission-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2>Our <span className="gradient-text">Mission</span></h2>
          <p>
            At SkyTravel, we're dedicated to providing exceptional travel experiences that inspire 
            wanderlust and create lasting memories. We curate unique journeys that combine adventure, 
            luxury, and authentic cultural experiences.
          </p>
          <div className="mission-features">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="mission-feature"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* TEAM SECTION */}
      <div className="about-team">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          Meet Our <span className="gradient-text">Team</span>
        </motion.h2>
        <p className="team-subtitle">The passionate people behind your perfect journey</p>
        
        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="team-image">
                <img src={member.image} alt={member.name} />
                <div className="team-overlay"></div>
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="about-testimonials">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          What Our <span className="gradient-text">Travelers Say</span>
        </motion.h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
            >
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <span>{testimonial.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="about-cta">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
        >
          <h2>Ready to Start Your Adventure?</h2>
          <p>Let's create your perfect travel experience together</p>
          <motion.button 
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlaneDeparture />
            <span>Explore Destinations</span>
          </motion.button>
        </motion.div>
      </div>

    </div>
  );
};

export default About;
