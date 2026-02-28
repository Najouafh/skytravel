import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaUserTie, FaPlane, FaHeart } from "react-icons/fa";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "United States",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Absolutely amazing experience! The booking process was smooth, and the trip exceeded all my expectations. The team at SkyTravel made everything so easy.",
    destination: "Japan Adventure"
  },
  {
    id: 2,
    name: "Marco Rossi",
    country: "Italy",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Best travel agency I've ever used. The personalized service and attention to detail was outstanding. Highly recommend!",
    destination: "Italy VIP Tour"
  },
  {
    id: 3,
    name: "Emma Wilson",
    country: "United Kingdom",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "From start to finish, everything was perfect. The destinations offered were stunning and the customer support was always there when needed.",
    destination: "Dubai Express"
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    country: "Egypt",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    text: "An unforgettable journey! The team arranged everything perfectly. Can't wait to book my next adventure with SkyTravel.",
    destination: "Thailand Escape"
  },
  {
    id: 5,
    name: "Lisa Chen",
    country: "Canada",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    rating: 5,
    text: "Incredible service and amazing destinations. The whole family loved our trip. Thank you SkyTravel for making our dream vacation come true!",
    destination: "Germany Special"
  },
  {
    id: 6,
    name: "Thomas Mueller",
    country: "Germany",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text: "Professional, reliable, and fantastic destinations. Every detail was carefully planned. Will definitely book again!",
    destination: "Spain Paradise"
  }
];

const stats = [
  { value: "15K+", label: "Happy Customers" },
  { value: "50+", label: "Destinations" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" }
];

const Testimonials = ({ theme }) => {
  const isLight = theme === "light";

  return (
    <div className={`testimonials-page ${isLight ? "light" : "dark"}`}>
      {/* Background Effects */}
      <div className="testimonials-bg">
        <div className="testimonial-orb orb-1"></div>
        <div className="testimonial-orb orb-2"></div>
        <div className="testimonial-orb orb-3"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="testimonials-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="testimonials-title">
          <motion.span
            whileInView={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
            viewport={{ once: false }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaStar />
          </motion.span>
          <span>What Our Clients Say</span>
        </h1>
        <p className="testimonials-subtitle">
          Real stories from real travelers who experienced the magic with SkyTravel
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="testimonials-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.3 }}
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            className="stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 + idx * 0.1 }}
          >
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials Grid */}
      <div className="testimonials-grid">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.id}
            className="testimonial-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="testimonial-quote">
              <FaQuoteLeft />
            </div>
            <div className="testimonial-rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-destination">
              <FaPlane /> {testimonial.destination}
            </div>
            <div className="testimonial-author">
              <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
              <div className="author-info">
                <h4>{testimonial.name}</h4>
                <span>{testimonial.country}</span>
              </div>
            </div>
            <motion.div 
              className="testimonial-like"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div 
        className="testimonials-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.8 }}
      >
        <h2>Ready to Create Your Own Story?</h2>
        <p>Join thousands of happy travelers and book your dream vacation today!</p>
        <motion.a 
          href="#destinations"
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlane /> Explore Destinations
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Testimonials;
