import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaUser,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaMailBulk
} from "react-icons/fa";
import "./Contact.css";

const contactInfo = [
  { icon: FaMapMarkerAlt, title: "Address", text: "Casablanca, Morocco" },
  { icon: FaPhoneAlt, title: "Phone", text: "+212 600 123 456" },
  { icon: FaEnvelope, title: "Email", text: "contact@skytravel.com" },
  { icon: FaClock, title: "Hours", text: "Mon - Sat: 9AM - 7PM" }
];

const socialLinks = [
  { icon: FaInstagram, name: "Instagram", color: "#E1306C" },
  { icon: FaFacebook, name: "Facebook", color: "#1877F2" },
  { icon: FaTwitter, name: "Twitter", color: "#1DA1F2" },
  { icon: FaLinkedin, name: "LinkedIn", color: "#0A66C2" }
];

const Contact = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const isLight = theme === "light";

  return (
    <div className={`contact-page ${isLight ? "light" : "dark"}`}>
      {/* Background Effects */}
      <div className="contact-bg-effects">
        <div className="contact-orb contact-orb-1"></div>
        <div className="contact-orb contact-orb-2"></div>
        <div className="contact-orb contact-orb-3"></div>
        <div className="contact-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="contact-particle" style={{
              '--delay': `${Math.random() * 8}s`,
              '--duration': `${6 + Math.random() * 6}s`,
              '--x': `${Math.random() * 100}%`,
              '--size': `${2 + Math.random() * 4}px`
            }}></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <motion.div 
        className="contact-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="contact-title">
          <motion.span
            className="title-icon"
            whileInView={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
            viewport={{ once: false }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaMailBulk />
          </motion.span>
          <span>Contact Us</span>
        </h1>
        <p className="contact-subtitle">
          Have questions about your next adventure? We're here to help!
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="contact-content">
        {/* Auto-Flipping Cards - Gentle */}
        <div className="contact-cards">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={idx}
                className="contact-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <motion.div 
                  className="card-inner"
                  whileInView={{ rotateY: 180 }}
                  viewport={{ once: false }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 1.5 }}
                >
                  <div className={`card-front ${isLight ? "light" : "dark"}`}>
                    <motion.div
                      whileInView={{ y: [0, -8, 0] }}
                      viewport={{ once: false }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    >
                      <Icon className="contact-icon" />
                    </motion.div>
                    <h2>{info.title}</h2>
                  </div>
                  <div className="card-back">
                    <p>{info.text}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Map */}
        <motion.div 
          className="contact-map-section"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.497574724769!2d-7.636003584789073!3d33.59317098073405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3a6a1c5e3e1%3A0x4d5a4a5c5d5a4a5c!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1645564758542!5m2!1sen!2sus" 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          ></iframe>
          <div className="map-overlay">
            <span><FaMapMarkerAlt /> Find us in Casablanca, Morocco</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="social-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href="#"
                className="social-link"
                style={{ background: social.color }}
                whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <Icon />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="contact-form-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="form-title">
              <motion.span
                className="form-icon"
                whileInView={{ rotate: [0, 15, -15, 0], scale: [1, 1.05, 1] }}
                viewport={{ once: false }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaPaperPlane />
              </motion.span>
              Send Us a Message
            </h2>
            
            <div className="form-row">
              <motion.div 
                className={`input-group ${focusedField === 'name' ? 'focused' : ''}`}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              >
                <FaUser />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  required 
                />
              </motion.div>
              
              <motion.div 
                className={`input-group ${focusedField === 'email' ? 'focused' : ''}`}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              >
                <FaEnvelope />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  required 
                />
              </motion.div>
            </div>
            
            <motion.div 
              className={`input-group ${focusedField === 'subject' ? 'focused' : ''}`}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
            >
              <FaPaperPlane />
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject" 
                required 
              />
            </motion.div>
            
            <motion.div 
              className={`input-group ${focusedField === 'message' ? 'focused' : ''}`}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
            >
              <FaPaperPlane />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message" 
                rows="4"
                required 
              ></textarea>
            </motion.div>
            
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
