import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaGlobe, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Gallery.css";

// ===== ALL COUNTRIES + CITIES =====
const countries = [
  {
    id: 1,
    name: "Germany",
    img: "https://tse3.mm.bing.net/th/id/OIP.9Uhi28Epqxgeh6udxUztAgHaEG",
    cities: [
      { id: 1, name: "Berlin", img: "https://th.bing.com/th/id/R.b7789bbceb4be69cdc8203aec5339567?rik=O%2fNmIwkrlhxvDA&riu=http%3a%2f%2fwww.getsready.com%2fwp-content%2fuploads%2f2016%2f10%2fmost-famous-bridge-at-berlin.jpg&ehk=LXfBN8989KQyklp0qldaUHN8kPaYQEC%2bXtzT0MvwNRs%3d&risl=&pid=ImgRaw&r=0" },
      { id: 2, name: "München", img: "https://tse4.mm.bing.net/th/id/OIP.TdfZLcsZAJ-BYwMtOG9FCwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 3, name: "Hamburg", img: "https://th.bing.com/th/id/OIP.JyIQs1wtJd-YmVrqG_Es2wHaE5?o=7rm=3rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 4, name: "Köln", img: "https://tse4.mm.bing.net/th/id/OIP.5qR9XdTUj0MGNst4eau94AHaEo?w=1476&h=922rs=1&pid=ImgDetMain&o=7&rm=3" },
    ],
  },
  {
    id: 2,
    name: "Canada",
    img: "https://tse4.mm.bing.net/th/id/OIP.wLmV_Njb1RWXw5WGXxUONwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    cities: [
      { id: 1, name: "Toronto", img: "https://www.singletravel.com/wp-content/uploads/solotraveltoronto.jpg" },
      { id: 2, name: "Vancouver", img: "https://tse2.mm.bing.net/th/id/OIP.YtLJsoi9BYVqbiFy_wjZvgHaDt?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 3, name: "Montreal", img: "https://www.touristsecrets.com/wp-content/uploads/2019/05/Montreal.jpg" },
      { id: 4, name: "Quebec City", img: "https://tse1.mm.bing.net/th/id/OIP.4ou97HMryfUWlfHGX-blsQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
    ],
  },
  {
    id: 3,
    name: "Italy",
    img: "https://th.bing.com/th/id/R.3484cbf7c3b805f2a884b453cad10f62?rik=l1lfB9Ni8oI8FQ&pid=ImgRaw&r=0",
    cities: [
      { id: 1, name: "Venice", img: "https://tse2.mm.bing.net/th/id/OIP.WV_1bBKh_BoUmyqU1TyVoAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 2, name: "Rome", img: "https://tse1.mm.bing.net/th/id/OIP.bMPB0ViTD1toQM0WPxc-OwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 3, name: "Florence", img: "https://tse4.mm.bing.net/th/id/OIP.Af_9g9PT7XSta4bl1trEmgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 4, name: "Milan", img: "https://th.bing.com/th/id/R.2858291ce871171c8f56af18817b40fa?rik=LG7TuOMhYTGreA&pid=ImgRaw&r=0" },
    ],
  },
  {
    id: 4,
    name: "UAE",
    img: "https://tse1.mm.bing.net/th/id/OIP.p7bL1OqE8kv_8pJCheX5fgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    cities: [
      { id: 1, name: "Dubai", img: "https://wallpaperaccess.com/full/222783.jpg" },
      { id: 2, name: "Abu Dhabi", img: "https://th.bing.com/th/id/R.78bbe6cfb97e21bd3d97d6814f44ed38?rik=HZSExCJKwbWg0g&pid=ImgRaw&r=0" },
      { id: 3, name: "Sharjah", img: "https://tse2.mm.bing.net/th/id/OIP.EmAFDncWlhJFTz-7ol4qvgHaE1?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 4, name: "Ajman", img: "https://besidestheobvious.net/wp-content/uploads/2022/10/20220805_130322.jpg" },
    ],
  },
  {
    id: 5,
    name: "USA",
    img: "https://tse3.mm.bing.net/th/id/OIP.PubqEmtxW2QzIAc1jWeaUgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    cities: [
      { id: 1, name: "New York", img: "https://th.bing.com/th/id/OIP.GsIbj2s5N2QpLDGeOP27NgHaEo?o=7rm=3rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 2, name: "Los Angeles", img: "https://www.fodors.com/wp-content/uploads/2019/10/ThingsToKnowBeforeYouGoLosAngeles__HERO_iStock-468040530.jpg" },
      { id: 3, name: "Las Vegas", img: "https://tse3.mm.bing.net/th/id/OIP.0O75srWlMLvRwf7pidL64AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 4, name: "San Francisco", img: "https://tse4.mm.bing.net/th/id/OIP.2jKZABIhuLGCtD2mKWJtBwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
    ],
  },
  {
    id: 6,
    name: "Netherlands",
    img: "https://tse4.mm.bing.net/th/id/OIP.BdjKOkNt4CB9qF94wWPGcwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    cities: [
      { id: 1, name: "Amsterdam", img: "https://tse3.mm.bing.net/th/id/OIP.UL7Y7CJ3Sj3Y7dFzbm6FrAHaFS?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 2, name: "Rotterdam", img: "https://tse4.mm.bing.net/th/id/OIP.cyroQhvcCdkbcge89BsPqQHaEa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 3, name: "Den Haag", img: "https://tse4.mm.bing.net/th/id/OIP.T6pJdNsgnkQx2Zp8STBHMgHaD_?w=840&h=452rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 4, name: "Utrecht", img: "https://tse2.mm.bing.net/th/id/OIP.TPO8ix2Y193EOOl2JTYjvQHaER?rs=1&pid=ImgDetMain&o=7&rm=3" },
    ],
  },
  {
    id: 7,
    name: "Japan",
    img: "https://tse1.mm.bing.net/th/id/OIP.jdgqJstM2H7MEHg5cM510gHaE8",
    cities: [
      { id: 1, name: "Tokyo", img: "https://th.bing.com/th/id/OIP.PLdwZOb1uGDInvnspdr8PAHaEo?o=7rm=3rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 2, name: "Kyoto", img: "https://th.bing.com/th/id/R.1d3e5b9138f59223ba77a0f5499bc4fd?rik=AWBlmTSTBjz9aA&pid=ImgRaw&r=0" },
      { id: 3, name: "Osaka", img: "https://tse3.mm.bing.net/th/id/OIP.N8ewZpro3ge3GrxfZkCQsQHaDp?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 4, name: "Hiroshima", img: "https://t3.ftcdn.net/jpg/02/50/53/52/360_F_250535204_m2uI1bTxHHk6q5DOOosvJuESHp4tbkND.jpg" },
    ],
  },
  {
    id: 8,
    name: "Spain",
    img: "https://tse4.mm.bing.net/th/id/OIP.fuocjYaP4tdv61bE4D9UFgHaLH?pid=ImgDet&w=191&h=286&c=7&o=7&rm=3",
    cities: [
      { id: 1, name: "Madrid", img: "https://tse3.mm.bing.net/th/id/OIP.6OkOkk1V9Hn4gTqDGdWBGwHaE7?w=2048&h=1365rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 2, name: "Barcelona", img: "https://tse4.mm.bing.net/th/id/OIP.NgjygRKVoI6L0iZSWzf0YQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 3, name: "Seville", img: "https://tse3.mm.bing.net/th/id/OIP.dAwzhzqtbaSExZuea05SlQHaFS?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { id: 4, name: "Granada", img: "https://tse4.mm.bing.net/th/id/OIP.wC7VV2Klt5W7Qd0sOa5GQgHaEH?rs=1&pid=ImgDetMain&o=7&rm=3" },
    ],
  },
];

// ===== COMPONENT =====
const Gallery = ({ theme, likedCities, setLikedCities }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const carouselRef = useRef(null);

  const itemsPerView = typeof window !== 'undefined' ? (window.innerWidth > 1024 ? 3 : window.innerWidth > 640 ? 2 : 1) : 3;
  const totalSlides = Math.ceil(countries.length - itemsPerView + 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);

  const toggleCityLike = (countryId, cityId) => {
    const cityKey = `${countryId}-${cityId}`;
    setLikedCities(prev => {
      if (prev.includes(cityKey)) {
        return prev.filter(key => key !== cityKey);
      } else {
        return [...prev, cityKey];
      }
    });
  };

  const isCityLiked = (countryId, cityId) => {
    return likedCities.includes(`${countryId}-${cityId}`);
  };

  return (
    <div className={`gallery-page ${theme}`}>
      {/* TITLE */}
      <motion.h1 
        className="gallery-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <FaGlobe className="title-icon" />
        Gallery
      </motion.h1>

      {/* CAROUSEL CONTAINER */}
      <div className="carousel-container">
        {/* PREV BUTTON */}
        <motion.button 
          className="carousel-nav prev"
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft />
        </motion.button>

        {/* CAROUSEL TRACK */}
        <div className="carousel-track-container" ref={carouselRef}>
          <motion.div 
            className="carousel-track"
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {countries.map((country, index) => (
              <motion.div
                key={country.id}
                className="carousel-slide"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="gallery-card"
                  onClick={() => setSelectedCountry(country)}
                >
                  <img src={country.img} alt={country.name} />
                  <div className="overlay">
                    <h2>{country.name}</h2>
                    <p><FaGlobe /> {country.cities.length} Cities</p>
                  </div>
                  <div className="card-shine"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* NEXT BUTTON */}
        <motion.button 
          className="carousel-nav next"
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight />
        </motion.button>
      </div>

      {/* DOTS INDICATORS */}
      <div className="carousel-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* COUNTRY MODAL */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h2>{selectedCountry.name}</h2>
              <motion.div className="city-grid">
                {selectedCountry.cities.map((city) => (
                  <motion.div
                    key={city.id}
                    className="city-card"
                    whileHover={{ scale: 1.08 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCity(city);
                    }}
                  >
                    <img src={city.img} alt={city.name} />
                    <div className="overlay">
                      <h3>{city.name}</h3>
                    </div>
                    <FaHeart 
                      className={`like ${isCityLiked(selectedCountry.id, city.id) ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCityLike(selectedCountry.id, city.id);
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.button 
              className="close" 
              onClick={() => setSelectedCountry(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CITY MODAL */}
      <AnimatePresence>
        {selectedCity && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCity(null)}
          >
            <motion.img
              src={selectedCity.img}
              alt={selectedCity.name}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            <motion.button 
              className="close"
              onClick={() => setSelectedCity(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
