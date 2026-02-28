import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaYoutube,
  FaDiscord,
  FaTiktok
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./Footer.css";

const socialIcons = [
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaDiscord,
  FaTiktok
];

const Footer = ({ theme }) => {
  const isLight = theme === "light";

  return (
    <footer className={`footer ${isLight ? "light" : "dark"}`}>
      <div className="footer-container">

        {/* LOGO & DESCRIPTION */}
        <div className="footer-column">
          <motion.div
            className="footer-logo"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            SkyTravel
          </motion.div>
          <p className="footer-desc">
            Explore the world with us. Find the best destinations, offers, and experiences.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Destinations</li>
            <li>Offers</li>
            <li>Booking</li>
            <li>Gallery</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {socialIcons.map((Icon, idx) => (
              <motion.div
                key={idx}
                className="icon-wrapper"
                animate={{
                  rotate: [0, 15, -15, 0],
                  y: [0, -5, 5, 0],
                  scale: [1, 1.3, 1, 1.2]
                }}
                transition={{ repeat: Infinity, duration: 3 + idx * 0.2, ease: "easeInOut" }}
              >
                <Icon />
              </motion.div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-column">
          <h3>Newsletter</h3>
          <div className="newsletter">
            <input type="email" placeholder="Your email" />
            <motion.button
              whileHover={{
                scale: 1.2,
                rotate: 10,
                boxShadow: isLight
                  ? "0 0 25px #22c55e, 0 0 35px #0ea5e9"
                  : "0 0 25px #facc15, 0 0 35px #f43f5e"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
            </motion.button>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <motion.div
        className="footer-bottom"
        animate={{
          textShadow: isLight
            ? ["0 0 5px #0ea5e9", "0 0 15px #22c55e", "0 0 5px #0ea5e9"]
            : ["0 0 5px #f43f5e", "0 0 15px #facc15", "0 0 5px #f43f5e"]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        &copy; {new Date().getFullYear()} SkyTravel. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
