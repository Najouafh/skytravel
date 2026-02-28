import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlane, FaHeart, FaGlobe, FaStar, FaClock, FaFilter, FaMapMarkerAlt, FaCompass, FaMountain, FaUmbrellaBeach, FaWater, FaCity, FaTree, FaPassport, FaSuitcase, FaMap, FaRoute } from "react-icons/fa";
import "./Destinations.css";

const destinations = [
  { id: 1, name: "Germany", planet: "Earth", price: "$1200", img: "https://tse3.mm.bing.net/th/id/OIP.9Uhi28Epqxgeh6udxUztAgHaEG?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.9, duration: "7 days", category: "popular" },
  { id: 2, name: "Canada", planet: "Earth", price: "$5400", img: "https://tse4.mm.bing.net/th/id/OIP.wLmV_Njb1RWXw5WGXxUONwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.8, duration: "12 days", category: "luxury" },
  { id: 3, name: "Italy", planet: "Earth", price: "$8300", img: "https://th.bing.com/th/id/R.3484cbf7c3b805f2a884b453cad10f62?rik=l1lfB9Ni8oI8FQ&pid=ImgRaw&r=0", rating: 4.9, duration: "10 days", category: "luxury" },
  { id: 4, name: "UAE", planet: "Earth", price: "$2100", img: "https://tse1.mm.bing.net/th/id/OIP.p7bL1OqE8kv_8pJCheX5fgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.7, duration: "5 days", category: "budget" },
  { id: 5, name: "USA", planet: "Earth", price: "$1800", img: "https://tse3.mm.bing.net/th/id/OIP.PubqEmtxW2QzIAc1jWeaUgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.8, duration: "8 days", category: "popular" },
  { id: 6, name: "Netherlands", planet: "Earth", price: "$2500", img: "https://tse4.mm.bing.net/th/id/OIP.BdjKOkNt4CB9qF94wWPGcwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.6, duration: "6 days", category: "budget" },
  { id: 7, name: "Japan", planet: "Earth", price: "$2300", img: "https://tse1.mm.bing.net/th/id/OIP.jdgqJstM2H7MEHg5cM510gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.9, duration: "9 days", category: "popular" },
  { id: 8, name: "Spain", planet: "Earth", price: "$9200", img: "https://tse4.mm.bing.net/th/id/OIP.fuocjYaP4tdv61bE4D9UFgHaLH?pid=ImgDet&w=191&h=286&c=7&o=7&rm=3", rating: 4.8, duration: "11 days", category: "luxury" }
];

const filters = [
  { id: "all", label: "All" },
  { id: "popular", label: "Popular" },
  { id: "budget", label: "Budget" },
  { id: "luxury", label: "Luxury" }
];

// Floating icons data
const floatingIcons = [
  { icon: FaGlobe, delay: 0, x: '5%', y: '10%', size: 40, color: '#00f5ff' },
  { icon: FaPlane, delay: 0.5, x: '90%', y: '15%', size: 35, color: '#7c3aed' },
  { icon: FaMountain, delay: 1, x: '8%', y: '60%', size: 45, color: '#ec4899' },
  { icon: FaUmbrellaBeach, delay: 1.5, x: '92%', y: '55%', size: 38, color: '#f59e0b' },
  { icon: FaCompass, delay: 2, x: '3%', y: '85%', size: 42, color: '#10b981' },
  { icon: FaWater, delay: 2.5, x: '88%', y: '80%', size: 36, color: '#3b82f6' },
  { icon: FaCity, delay: 3, x: '15%', y: '25%', size: 44, color: '#8b5cf6' },
  { icon: FaTree, delay: 3.5, x: '80%', y: '30%', size: 40, color: '#22c55e' },
  { icon: FaMap, delay: 4, x: '70%', y: '70%', size: 37, color: '#ef4444' },
  { icon: FaRoute, delay: 4.5, x: '25%', y: '75%', size: 39, color: '#06b6d4' },
  { icon: FaPassport, delay: 5, x: '60%', y: '40%', size: 41, color: '#f97316' },
  { icon: FaSuitcase, delay: 5.5, x: '45%', y: '90%', size: 35, color: '#84cc16' },
];

const Destinations = ({ theme, setBookingDestination, searchQuery, likedDestinations, setLikedDestinations }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const toggleLike = (id) => {
    setLikedDestinations(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      }
      return [...prev, id];
    });
  };

  const filteredDestinations = destinations.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || d.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`dest-page ${theme}`}>
      {/* Floating Icons Background */}
      <div className="dest-floating-icons">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="dest-floating-icon"
            style={{
              left: item.x,
              top: item.y,
              fontSize: `${item.size}px`,
              color: item.color,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              opacity: { duration: 3, repeat: Infinity, delay: item.delay },
              scale: { duration: 2, repeat: Infinity, delay: item.delay },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: item.delay },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: item.delay },
            }}
          >
            <item.icon />
          </motion.div>
        ))}
      </div>

      <div className="dest-hero">
        {/* Hero Icons Row */}
        <div className="dest-icons-row">
          <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <FaCompass className="dest-title-icon" />
          </motion.div>
          <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
            <FaGlobe className="dest-title-icon" />
          </motion.div>
          <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            <FaMountain className="dest-title-icon" />
          </motion.div>
          <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
            <FaPlane className="dest-title-icon" />
          </motion.div>
        </div>
        
        <motion.div className="dest-label-modern" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5 }}>
          <motion.span className="dest-label-dot" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}></motion.span>
          <FaGlobe className="dest-label-icon" />
          <span>Premium Travel</span>
          <motion.span className="dest-label-dot" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}></motion.span>
        </motion.div>
        
        <motion.h1 className="dest-title-modern" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
          <span className="dest-title-accent">Explore</span> The World
        </motion.h1>
        
        <motion.p className="dest-subtitle-modern" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
          Discover extraordinary destinations and create unforgettable memories
        </motion.p>

        <motion.div className="dest-filters-modern" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
          {filters.map((filter) => (
            <motion.button key={filter.id} className={`dest-filter-modern ${activeFilter === filter.id ? 'active' : ''}`} onClick={() => setActiveFilter(filter.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaFilter /> {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="dest-stats-modern" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
          <motion.div className="dest-stat-modern" whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="dest-stat-icon-modern"><FaGlobe /></div>
            <span className="dest-stat-num-modern">150+</span>
            <span className="dest-stat-text-modern">Destinations</span>
          </motion.div>
          <motion.div className="dest-stat-modern" whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="dest-stat-icon-modern"><FaStar /></div>
            <span className="dest-stat-num-modern">4.9</span>
            <span className="dest-stat-text-modern">Rating</span>
          </motion.div>
          <motion.div className="dest-stat-modern" whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="dest-stat-icon-modern"><FaPlane /></div>
            <span className="dest-stat-num-modern">50K+</span>
            <span className="dest-stat-text-modern">Travelers</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="dest-cards-modern">
        <AnimatePresence>
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((d, index) => (
              <motion.div key={d.id} className="dest-card-modern" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -12, scale: 1.02 }}>
                <div className="dest-card-image-modern">
                  <img src={d.img} alt={d.name} />
                  <div className="dest-card-overlay-modern"></div>
                  <div className="dest-card-badges-modern">
                    <span className="dest-rating-modern"><FaStar /> {d.rating}</span>
                    <span className="dest-category-modern">{d.category}</span>
                  </div>
                  <motion.button className={`dest-like-modern ${likedDestinations.includes(d.id) ? 'liked' : ''}`} onClick={(e) => { e.stopPropagation(); toggleLike(d.id); }} whileTap={{ scale: 0.9 }}>
                    <FaHeart />
                  </motion.button>
                </div>
                
                <div className="dest-card-content-modern">
                  <div className="dest-card-header-modern">
                    <h2>{d.name}</h2>
                    <span className="dest-planet-modern"><FaGlobe /> {d.planet}</span>
                  </div>
                  <div className="dest-card-meta-modern">
                    <span className="dest-duration-modern"><FaClock /> {d.duration}</span>
                  </div>
                  <div className="dest-card-footer-modern">
                    <div className="dest-price-modern">
                      <span className="dest-price-label-modern">from</span>
                      <span className="dest-price-value-modern">{d.price}</span>
                    </div>
                    <motion.button className="dest-book-modern" onClick={() => setBookingDestination(d)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                      <FaPlane /> Book Now
                    </motion.button>
                  </div>
                </div>
                <div className="dest-card-border-modern"></div>
              </motion.div>
            ))
          ) : (
            <motion.div className="dest-no-results-modern" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FaMapMarkerAlt />
              <h3>No destinations found</h3>
              <p>Try adjusting your filters</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Destinations;
