import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Footer from "./pages/Footer";
import { FaHeart } from "react-icons/fa";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [bookingDestination, setBookingDestination] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const effectRan = useRef(false);

  // Likes centralisés
  const [likedDestinations, setLikedDestinations] = useState(() => {
    const saved = localStorage.getItem('likedDestinations');
    return saved ? JSON.parse(saved) : [];
  });

  const [likedCities, setLikedCities] = useState(() => {
    const saved = localStorage.getItem('likedCities');
    return saved ? JSON.parse(saved) : [];
  });

  // Calculer le total des likes
  const totalLikes = likedDestinations.length + likedCities.length;

  // Sauvegarder les likes destinations
  useEffect(() => {
    localStorage.setItem('likedDestinations', JSON.stringify(likedDestinations));
  }, [likedDestinations]);

  // Sauvegarder les likes villes
  useEffect(() => {
    localStorage.setItem('likedCities', JSON.stringify(likedCities));
  }, [likedCities]);

  // Compteur de visiteurs réel avec localStorage
  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;
    
    const currentCount = parseInt(localStorage.getItem('visitCount') || '0');
    const newCount = currentCount + 1;
    localStorage.setItem('visitCount', newCount.toString());
    setVisitorCount(newCount);
  }, []);

  // Handle booking confirmation - navigate to payment
  const handleBookingConfirm = (bookingData) => {
    setPaymentData(bookingData);
  };

  // Handle payment completion - go back to destinations
  const handlePaymentComplete = () => {
    setPaymentData(null);
    setBookingDestination(null);
  };

  return (
    <div className={`container ${theme}`}>
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        visitorCount={visitorCount}
        totalLikes={totalLikes}
        onFavoritesClick={() => setShowFavorites(true)}
      />

      {paymentData ? (
        <Payment 
          theme={theme} 
          bookingData={paymentData}
          goBack={() => setPaymentData(null)}
          onComplete={handlePaymentComplete}
        />
      ) : bookingDestination ? (
        <Booking 
          theme={theme} 
          destination={bookingDestination} 
          goBack={() => setBookingDestination(null)}
          onConfirm={handleBookingConfirm}
        />
      ) : (
        <>
          <section id="home">
            <Home theme={theme} />
          </section>
          
          <section id="destinations">
            <Destinations 
              theme={theme} 
              setBookingDestination={setBookingDestination} 
              searchQuery={searchQuery}
              likedDestinations={likedDestinations}
              setLikedDestinations={setLikedDestinations}
            />
          </section>
          
          <section id="offers">
            <Offers theme={theme}/>
          </section>
          
          <section id="gallery">
            <Gallery 
              theme={theme}
              likedCities={likedCities}
              setLikedCities={setLikedCities}
            />
          </section>
          
          <section id="about">
            <About theme={theme}/>
          </section>
          
          <section id="contact">
            <Contact theme={theme}/>
          </section>
          
          <Footer theme={theme}/>
        </>
      )}

{/* Favorites Modal */}
      {showFavorites && (
        <div className="favorites-modal-overlay" onClick={() => setShowFavorites(false)}>
          <div className="favorites-modal" onClick={(e) => e.stopPropagation()}>
            <button className="favorites-modal-close" onClick={() => setShowFavorites(false)}>
              ×
            </button>
            <Favorites 
              theme={theme}
              likedDestinations={likedDestinations}
              likedCities={likedCities}
              setLikedDestinations={setLikedDestinations}
              setLikedCities={setLikedCities}
            />
          </div>
        </div>
      )}

      {/* Chatbot - visible on all pages */}
      <Chatbot theme={theme} />
    </div>
  );
};

export default App;
