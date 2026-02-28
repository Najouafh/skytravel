import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlaneDeparture,
  FaStar,
  FaGift,
  FaSuitcase,
  FaCheck,
  FaTag,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaArrowRight
} from "react-icons/fa";
import "./Offers.css";

const offersData = [
  { 
    id: 1, 
    name: "Germany Special", 
    discount: "20%", 
    originalPrice: "$2,500",
    description: "Discover Germany with exclusive travel deals and premium experiences.",
    icon: <FaPlaneDeparture />,
    badge: "Best Seller",
    features: ["5-Star Hotels", "Private Tours", "Airport Transfer", "Breakfast Included"],
    days: 7,
    cities: 4,
    travelers: "2-6"
  },
  { 
    id: 2, 
    name: "Japan Adventure", 
    discount: "15%", 
    originalPrice: "$3,200",
    description: "Explore Tokyo, Kyoto, and Osaka with expert local guides.",
    icon: <FaStar />,
    badge: "Popular",
    features: ["Bullet Train Pass", "Cultural Experiences", "Local Guide", "All Meals"],
    days: 10,
    cities: 3,
    travelers: "2-8"
  },
  { 
    id: 3, 
    name: "Italy VIP", 
    discount: "25%", 
    originalPrice: "$4,000",
    description: "Luxury experiences across Italy's finest cities with private tours.",
    icon: <FaGift />,
    badge: "Luxury",
    features: ["5-Star Hotels", "Private Driver", "Wine Tasting", "Skip-the-Line"],
    days: 8,
    cities: 4,
    travelers: "2-4"
  },
  { 
    id: 4, 
    name: "Dubai Express", 
    discount: "30%", 
    originalPrice: "$2,800",
    description: "Fast-track your Dubai luxury journey with premium inclusions.",
    icon: <FaSuitcase />,
    badge: "Limited",
    features: ["Desert Safari", "Burj Khalifa Access", "Luxury Yacht", "Spa Treatment"],
    days: 5,
    cities: 2,
    travelers: "2-6"
  },
  { 
    id: 5, 
    name: "Spain Paradise", 
    discount: "18%", 
    originalPrice: "$2,200",
    description: "Experience the vibrant culture and stunning architecture of Spain.",
    icon: <FaPlaneDeparture />,
    badge: "New",
    features: ["Flamenco Show", "Gaudi Tour", "Tapas Experience", "Beach Access"],
    days: 9,
    cities: 3,
    travelers: "2-8"
  },
  { 
    id: 6, 
    name: "Thailand Escape", 
    discount: "22%", 
    originalPrice: "$1,800",
    description: "Tropical paradise with pristine beaches and rich culture.",
    icon: <FaSuitcase />,
    badge: "Best Value",
    features: ["Beach Resort", "Island Hopping", "Thai Cooking Class", "Snorkeling"],
    days: 8,
    cities: 3,
    travelers: "2-10"
  }
];

const categories = ["All", "Popular", "Luxury", "Budget", "Adventure"];

const Offers = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeOffer, setActiveOffer] = useState(null);
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const initialCountdowns = {};
    offersData.forEach(offer => {
      initialCountdowns[offer.id] = {
        hours: Math.floor(Math.random() * 24),
        minutes: Math.floor(Math.random() * 60),
        seconds: Math.floor(Math.random() * 60)
      };
    });
    setCountdowns(initialCountdowns);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(prev => {
        const newCountdowns = { ...prev };
        Object.keys(newCountdowns).forEach(key => {
          const c = newCountdowns[key];
          if (c.seconds > 0) {
            c.seconds--;
          } else if (c.minutes > 0) {
            c.minutes--;
            c.seconds = 59;
          } else if (c.hours > 0) {
            c.hours--;
            c.minutes = 59;
            c.seconds = 59;
          }
        });
        return newCountdowns;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredOffers = activeCategory === "All" 
    ? offersData 
    : offersData.filter(offer => {
        if (activeCategory === "Popular") return ["Best Seller", "Popular"].includes(offer.badge);
        if (activeCategory === "Luxury") return ["Luxury", "VIP"].includes(offer.badge);
        if (activeCategory === "Budget") return parseInt(offer.discount) >= 20;
        if (activeCategory === "Adventure") return ["Adventure", "Escape"].some(b => offer.name.includes(b));
        return true;
      });

  const isLight = theme === "light";

  return (
    <div className={`offers-page ${isLight ? "light" : "dark"}`}>
      <div className="elegant-bg">
        <div className="elegant-orb elegant-orb-1"></div>
        <div className="elegant-orb elegant-orb-2"></div>
        <div className="elegant-orb elegant-orb-3"></div>
        <div className="elegant-orb elegant-orb-4"></div>
        <div className="elegant-particles">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="elegant-particle" style={{
              '--delay': `${Math.random() * 10}s`,
              '--duration': `${8 + Math.random() * 8}s`,
              '--x': `${Math.random() * 100}%`,
              '--size': `${2 + Math.random() * 5}px`
            }}></div>
          ))}
        </div>
      </div>

      <motion.div 
        className="elegant-header"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        <div className="elegant-title-wrapper">
          <h1 className="elegant-title">
            <motion.span
              className="title-icon"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaTag />
            </motion.span>
            <span>Exclusive Offers</span>
          </h1>
        </div>
        <p className="elegant-subtitle">
          Discover extraordinary destinations with exclusive deals and unforgettable experiences
        </p>
        <div className="elegant-divider"></div>
      </motion.div>

      <motion.div 
        className="elegant-filters"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`elegant-filter ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <div className="elegant-cards">
        <AnimatePresence>
          {filteredOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="elegant-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              layout
              whileHover={{ y: -16, scale: 1.02 }}
              onHoverStart={() => setActiveOffer(offer.id)}
              onHoverEnd={() => setActiveOffer(null)}
            >
              <div className="elegant-card-bg"></div>
              <div className="elegant-badge">{offer.badge}</div>
              
              <div className="elegant-card-header">
                <motion.div 
                  className="elegant-icon-wrapper"
                  animate={{
                    rotate: activeOffer === offer.id ? 360 : 0,
                    scale: activeOffer === offer.id ? 1.15 : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: activeOffer === offer.id ? Infinity : 0,
                    ease: "linear"
                  }}
                >
                  <motion.div 
                    className="elegant-icon"
                    animate={{ 
                      y: activeOffer === offer.id ? [0, -8, 0] : [0, -3, 0]
                    }}
                    transition={{
                      duration: activeOffer === offer.id ? 1.5 : 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {offer.icon}
                  </motion.div>
                </motion.div>
              </div>
              
              <div className="elegant-card-body">
                <h2>{offer.name}</h2>
                <p>{offer.description}</p>
                
                <div className="elegant-price">
                  <span className="elegant-original">{offer.originalPrice}</span>
                  <span className="elegant-discount">{offer.discount} OFF</span>
                </div>

                <div className="elegant-countdown">
                  <div className="elegant-countdown-item">
                    <span className="elegant-countdown-value">{String(countdowns[offer.id]?.hours || 0).padStart(2, '0')}</span>
                    <span className="elegant-countdown-label">Hours</span>
                  </div>
                  <div className="elegant-countdown-item">
                    <span className="elegant-countdown-value">{String(countdowns[offer.id]?.minutes || 0).padStart(2, '0')}</span>
                    <span className="elegant-countdown-label">Min</span>
                  </div>
                  <div className="elegant-countdown-item">
                    <span className="elegant-countdown-value">{String(countdowns[offer.id]?.seconds || 0).padStart(2, '0')}</span>
                    <span className="elegant-countdown-label">Sec</span>
                  </div>
                </div>

                <ul className="elegant-features">
                  {offer.features.map((feature, i) => (
                    <li key={i}><FaCheck /> {feature}</li>
                  ))}
                </ul>

                <div className="elegant-trip-info">
                  <span><FaCalendarAlt /> {offer.days} Days</span>
                  <span><FaMapMarkerAlt /> {offer.cities} Cities</span>
                  <span><FaUserFriends /> {offer.travelers}</span>
                </div>

                <motion.button
                  className="elegant-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Now <FaArrowRight />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Offers;
