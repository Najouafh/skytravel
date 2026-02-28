import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaMapMarkerAlt, FaGlobe, FaStar, FaTrash, FaPlane, FaClock } from "react-icons/fa";
import "./Favorites.css";

const destinationsData = [
  { id: 1, name: "Germany", planet: "Earth", price: "$1200", img: "https://tse3.mm.bing.net/th/id/OIP.9Uhi28Epqxgeh6udxUztAgHaEG?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.9, duration: "7 days" },
  { id: 2, name: "Canada", planet: "Earth", price: "$5400", img: "https://tse4.mm.bing.net/th/id/OIP.wLmV_Njb1RWXw5WGXxUONwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.8, duration: "12 days" },
  { id: 3, name: "Italy", planet: "Earth", price: "$8300", img: "https://th.bing.com/th/id/R.3484cbf7c3b805f2a884b453cad10f62?rik=l1lfB9Ni8oI8FQ&pid=ImgRaw&r=0", rating: 4.9, duration: "10 days" },
  { id: 4, name: "UAE", planet: "Earth", price: "$2100", img: "https://tse1.mm.bing.net/th/id/OIP.p7bL1OqE8kv_8pJCheX5fgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.7, duration: "5 days" },
  { id: 5, name: "USA", planet: "Earth", price: "$1800", img: "https://tse3.mm.bing.net/th/id/OIP.PubqEmtxW2QzIAc1jWeaUgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.8, duration: "8 days" },
  { id: 6, name: "Netherlands", planet: "Earth", price: "$2500", img: "https://tse4.mm.bing.net/th/id/OIP.BdjKOkNt4CB9qF94wWPGcwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.6, duration: "6 days" },
  { id: 7, name: "Japan", planet: "Earth", price: "$2300", img: "https://tse1.mm.bing.net/th/id/OIP.jdgqJstM2H7MEHg5cM510gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.9, duration: "9 days" },
  { id: 8, name: "Spain", planet: "Earth", price: "$9200", img: "https://tse4.mm.bing.net/th/id/OIP.fuocjYaP4tdv61bE4D9UFgHaLH?pid=ImgDet&w=191&h=286&c=7&o=7&rm=3", rating: 4.8, duration: "11 days" }
];

const citiesData = [
  { id: 1, name: "Berlin", countryId: 1, img: "https://th.bing.com/th/id/R.b7789bbceb4be69cdc8203aec5339567?rik=O%2fNmIwkrlhxvDA&riu=http%3a%2f%2fwww.getsready.com%2fwp-content%2fuploads%2f2016%2f10%2fmost-famous-bridge-at-berlin.jpg&ehk=LXfBN8989KQyklp0qldaUHN8kPaYQEC%2bXtzT0MvwNRs%3d&risl=&pid=ImgRaw&r=0" },
  { id: 2, name: "München", countryId: 1, img: "https://tse4.mm.bing.net/th/id/OIP.TdfZLcsZAJ-BYwMtOG9FCwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 3, name: "Hamburg", countryId: 1, img: "https://th.bing.com/th/id/OIP.JyIQs1wtJd-YmVrqG_Es2wHaE5?o=7rm=3rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 4, name: "Köln", countryId: 1, img: "https://tse4.mm.bing.net/th/id/OIP.5qR9XdTUj0MGNst4eau94AHaEo?w=1476&h=922rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 5, name: "Toronto", countryId: 2, img: "https://www.singletravel.com/wp-content/uploads/solotraveltoronto.jpg" },
  { id: 6, name: "Vancouver", countryId: 2, img: "https://tse2.mm.bing.net/th/id/OIP.YtLJsoi9BYVqbiFy_wjZvgHaDt?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 7, name: "Montreal", countryId: 2, img: "https://www.touristsecrets.com/wp-content/uploads/2019/05/Montreal.jpg" },
  { id: 8, name: "Quebec City", countryId: 2, img: "https://tse1.mm.bing.net/th/id/OIP.4ou97HMryfUWlfHGX-blsQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 9, name: "Venice", countryId: 3, img: "https://tse2.mm.bing.net/th/id/OIP.WV_1bBKh_BoUmyqU1TyVoAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 10, name: "Rome", countryId: 3, img: "https://tse1.mm.bing.net/th/id/OIP.bMPB0ViTD1toQM0WPxc-OwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 11, name: "Florence", countryId: 3, img: "https://tse4.mm.bing.net/th/id/OIP.Af_9g9PT7XSta4bl1trEmgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 12, name: "Milan", countryId: 3, img: "https://th.bing.com/th/id/R.2858291ce871171c8f56af18817b40fa?rik=LG7TuOMhYTNaN" }
];

const Favorites = ({ theme, likedDestinations, likedCities, setLikedDestinations, setLikedCities }) => {
  const isLight = theme === "light";
  
  const likedDestinationData = destinationsData.filter(d => likedDestinations.includes(d.id));
  const likedCityData = citiesData.filter(c => likedCities.includes(c.id));
  const totalLikes = likedDestinations.length + likedCities.length;

  const removeDestination = (id) => {
    setLikedDestinations(prev => prev.filter(destId => destId !== id));
  };

  const removeCity = (id) => {
    setLikedCities(prev => prev.filter(cityId => cityId !== id));
  };

  return (
    <div className={`favorites-page ${isLight ? "light" : "dark"}`}>
      <div className="favorites-bg">
        <div className="fav-orb orb-1"></div>
        <div className="fav-orb orb-2"></div>
        <div className="fav-orb orb-3"></div>
        <div className="fav-orb orb-4"></div>
        <div className="fav-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="fav-particle" style={{
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${4 + Math.random() * 4}s`,
              '--x': `${Math.random() * 100}%`,
              '--size': `${2 + Math.random() * 3}px`
            }}></div>
          ))}
        </div>
      </div>

      <motion.div 
        className="favorites-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="favorites-title">
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <FaHeart />
          </motion.span>
          <span>Your Favorites</span>
        </h1>
        <p className="favorites-subtitle">All your liked destinations and cities in one place</p>
      </motion.div>

      <motion.div className="favorites-stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <motion.div className="fav-stat" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <span className="fav-stat-value">{likedDestinations.length}</span>
          <span className="fav-stat-label">Destinations</span>
        </motion.div>
        <motion.div className="fav-stat" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
          <span className="fav-stat-value">{likedCities.length}</span>
          <span className="fav-stat-label">Cities</span>
        </motion.div>
        <motion.div className="fav-stat" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <span className="fav-stat-value">{totalLikes}</span>
          <span className="fav-stat-label">Total Likes</span>
        </motion.div>
      </motion.div>

      <div className="favorites-content">
        {likedDestinationData.length > 0 && (
          <motion.div className="favorites-section" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="section-title"><FaMapMarkerAlt /> Liked Destinations</h2>
            <div className="favorites-grid">
              {likedDestinationData.map((dest, idx) => (
                <motion.div key={dest.id} className="fav-card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }} whileHover={{ scale: 1.03, y: -8 }}>
                  <div className="fav-card-image">
                    <img src={dest.img} alt={dest.name} />
                    <div className="fav-card-overlay"></div>
                    <div className="fav-card-badge"><FaStar /> {dest.rating}</div>
                    <motion.button className="fav-remove-btn" whileHover={{ scale: 1.15, rotate: 10 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); removeDestination(dest.id); }}>
                      <FaTrash />
                    </motion.button>
                  </div>
                  <div className="fav-card-content">
                    <h3>{dest.name}</h3>
                    <div className="fav-card-meta">
                      <span><FaGlobe /> {dest.planet}</span>
                      <span><FaClock /> {dest.duration}</span>
                    </div>
                    <div className="fav-card-price">
                      <span className="price-label">from</span>
                      <span className="price-value">{dest.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {likedCityData.length > 0 && (
          <motion.div className="favorites-section" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="section-title"><FaPlane /> Liked Cities</h2>
            <div className="favorites-grid">
              {likedCityData.map((city, idx) => (
                <motion.div key={city.id} className="fav-card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }} whileHover={{ scale: 1.03, y: -8 }}>
                  <div className="fav-card-image">
                    <img src={city.img} alt={city.name} />
                    <div className="fav-card-overlay"></div>
                    <motion.button className="fav-remove-btn" whileHover={{ scale: 1.15, rotate: 10 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); removeCity(city.id); }}>
                      <FaTrash />
                    </motion.button>
                  </div>
                  <div className="fav-card-content">
                    <h3>{city.name}</h3>
                    <div className="fav-card-meta">
                      <span><FaHeart /> Liked City</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {totalLikes === 0 && (
          <motion.div className="empty-state" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
            <div className="empty-icon"><FaHeart /></div>
            <h2>No Favorites Yet</h2>
            <p>Start exploring and click the heart icon on destinations and cities you love!</p>
            <motion.a href="#destinations" className="explore-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaPlane /> Explore Destinations
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
