import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaPlane, FaUser, FaCalendar, FaUsers, FaGlobe, FaStar, FaPaperPlane, FaMoneyBillWave, FaHotel, FaCamera, FaCheck, FaTimes, FaClock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";
import "./Booking.css";

const Booking = ({ theme, destination, goBack, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    date: "",
    package: "standard",
    specialRequests: ""
  });
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 45, seconds: 30 });
  const [currentStep, setCurrentStep] = useState(2);

  if (!destination) return null;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.date) {
      newErrors.date = "Please select a travel date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const confirmBooking = () => {
    if (onConfirm) {
      const bookingData = {
        destination: destination.name,
        package: selectedPackage?.name,
        travelers: formData.travelers,
        date: formData.date,
        price: selectedPackage?.price,
        totalPrice: calculateTotal(),
        ...formData
      };
      onConfirm(bookingData);
    }
    setShowModal(false);
  };

  const packages = [
    { 
      id: "standard", 
      name: "Standard", 
      price: destination.price, 
      features: ["Basic Accommodation", "Airport Transfer", "City Tour"] 
    },
    { 
      id: "premium", 
      name: "Premium", 
      price: "$" + (parseInt(destination.price.replace(/\D/g, "")) * 1.5), 
      features: ["Luxury Hotel", "Private Transfer", "Guided Tours", "Breakfast Included"] 
    },
    { 
      id: "deluxe", 
      name: "Deluxe", 
      price: "$" + (parseInt(destination.price.replace(/\D/g, "")) * 2.5), 
      features: ["5-Star Hotel", "VIP Service", "All-Inclusive", "Spa Access", "Private Guide"] 
    }
  ];

  const selectedPackage = packages.find(p => p.id === formData.package);
  
  const calculateTotal = () => {
    const basePrice = parseInt(selectedPackage?.price.replace(/\D/g, "") || 0);
    return "$" + (basePrice * formData.travelers);
  };

  const steps = [
    { id: 1, label: "Destination" },
    { id: 2, label: "Package" },
    { id: 3, label: "Details" },
    { id: 4, label: "Confirm" }
  ];

  return (
    <div className={`booking-page ${theme}`}>
      <div className="booking-bg-effects">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
        <div className="bg-orb orb-4"></div>
        <div className="bg-grid"></div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${4 + Math.random() * 4}s`,
              '--x': `${Math.random() * 100}%`,
              '--size': `${2 + Math.random() * 3}px`
            }}></div>
          ))}
        </div>
      </div>

      <motion.button 
        className="back-btn"
        onClick={goBack}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft /> Back to Destinations
      </motion.button>

      {/* Step Progress Indicator */}
      <div className="step-progress">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div 
              className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="step-circle">
                {currentStep > step.id ? <FaCheck /> : step.id}
              </div>
              <span className="step-label">{step.label}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <div className="step-connector"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="booking-container">
        {/* Left Column */}
        <div className="booking-left">
          {/* Destination Card */}
          <motion.div 
            className="destination-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="card-image-wrapper">
              <img src={destination.img} alt={destination.name} className="booking-img" />
              <div className="image-overlay"></div>
              <div className="destination-badges">
                <span className="rating-badge"><FaStar /> {destination.rating}</span>
                <span className="planet-badge"><FaGlobe /> {destination.planet}</span>
              </div>
              <div className="floating-price">
                <span className="from-label">from</span>
                <span className="price-value">{destination.price}</span>
              </div>
            </div>
            
            <div className="card-body">
              <h1 className="booking-title">{destination.name}</h1>
              <p className="destination-tagline">Your dream adventure awaits</p>
              
              <div className="destination-meta">
                <div className="meta-item">
                  <FaCalendar />
                  <span>{destination.duration}</span>
                </div>
                <div className="meta-item">
                  <FaHotel />
                  <span>Premium Stay</span>
                </div>
                <div className="meta-item">
                  <FaCamera />
                  <span>Photo Tours</span>
                </div>
              </div>

              <div className="highlights">
                <h3>Trip Highlights</h3>
                <ul>
                  <li><FaStar /> Professional local guides</li>
                  <li><FaStar /> Authentic local experiences</li>
                  <li><FaStar /> 24/7 customer support</li>
                  <li><FaStar /> Flexible cancellation</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div 
            className="countdown-timer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="countdown-label">
              <FaClock /> Limited Time Offer
            </div>
            <div className="countdown-numbers">
              <div className="countdown-unit">
                <span className="countdown-value">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="countdown-unit-label">Hours</span>
              </div>
              <div className="countdown-unit">
                <span className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="countdown-unit-label">Min</span>
              </div>
              <div className="countdown-unit">
                <span className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="countdown-unit-label">Sec</span>
              </div>
            </div>
          </motion.div>

          {/* Booking Summary Card */}
          <motion.div 
            className="booking-summary-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="summary-title">
              <FaMapMarkerAlt /> Booking Summary
            </h3>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-item-label">Destination</span>
                <span className="summary-item-value">{destination.name}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">Package</span>
                <span className="summary-item-value">{selectedPackage?.name}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">Travelers</span>
                <span className="summary-item-value">{formData.travelers}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">Travel Date</span>
                <span className="summary-item-value">{formData.date || "Not selected"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">Price per Person</span>
                <span className="summary-item-value">{selectedPackage?.price}</span>
              </div>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span className="summary-total-label">Total Price</span>
              <span className="summary-total-value">{calculateTotal()}</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Form */}
        <motion.div 
          className="form-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">
              <FaPaperPlane className="title-icon" />
              <span>Complete Your Booking</span>
            </h2>
            
            <div className="package-selection">
              <label>Choose Your Package</label>
              <div className="packages-grid">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    className={`package-option ${formData.package === pkg.id ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, package: pkg.id })}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="package-name">{pkg.name}</span>
                    <span className="package-price">{pkg.price}</span>
                    {formData.package === pkg.id && (
                      <div className="package-features">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="package-feature">
                            <FaCheck /> {feature}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="form-grid">
              <motion.div 
                className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${errors.name ? 'error' : ''} ${formData.name && !errors.name ? 'valid' : ''}`}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              >
                <label><FaUser /> Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required 
                />
                {errors.name && <span className="error-message"><FaExclamationTriangle /> {errors.name}</span>}
                {formData.name && !errors.name && <span className="validation-icon"><FaCheck /></span>}
              </motion.div>
              
              <motion.div 
                className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''} ${formData.email && !errors.email ? 'valid' : ''}`}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              >
                <label><FaEnvelope /> Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required 
                />
                {errors.email && <span className="error-message"><FaExclamationTriangle /> {errors.email}</span>}
                {formData.email && !errors.email && <span className="validation-icon"><FaCheck /></span>}
              </motion.div>
              
              <motion.div 
                className={`form-group ${focusedField === 'phone' ? 'focused' : ''} ${errors.phone ? 'error' : ''} ${formData.phone && !errors.phone ? 'valid' : ''}`}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
              >
                <label><FaPhone /> Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  required 
                />
                {errors.phone && <span className="error-message"><FaExclamationTriangle /> {errors.phone}</span>}
                {formData.phone && !errors.phone && <span className="validation-icon"><FaCheck /></span>}
              </motion.div>
              
              <motion.div 
                className={`form-group ${focusedField === 'date' ? 'focused' : ''} ${errors.date ? 'error' : ''} ${formData.date && !errors.date ? 'valid' : ''}`}
                onFocus={() => setFocusedField('date')}
                onBlur={() => setFocusedField(null)}
              >
                <label><FaCalendar /> Travel Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required 
                />
                {errors.date && <span className="error-message"><FaExclamationTriangle /> {errors.date}</span>}
                {formData.date && !errors.date && <span className="validation-icon"><FaCheck /></span>}
              </motion.div>
              
              <motion.div 
                className={`form-group ${focusedField === 'travelers' ? 'focused' : ''}`}
                onFocus={() => setFocusedField('travelers')}
                onBlur={() => setFocusedField(null)}
              >
                <label><FaUsers /> Travelers</label>
                <select 
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div 
                className={`form-group total-section ${focusedField === 'total' ? 'focused' : ''}`}
                onFocus={() => setFocusedField('total')}
                onBlur={() => setFocusedField(null)}
              >
                <label><FaMoneyBillWave /> Total Price</label>
                <div className="total-price">
                  <span className="total-amount">{calculateTotal()}</span>
                  <span className="per-person">for {formData.travelers} {formData.travelers === 1 ? 'person' : 'people'}</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className={`form-group full-width ${focusedField === 'requests' ? 'focused' : ''}`}
              onFocus={() => setFocusedField('requests')}
              onBlur={() => setFocusedField(null)}
            >
              <label><FaStar /> Special Requests</label>
              <textarea 
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any special requirements, dietary restrictions, or requests..."
                rows="3"
              ></textarea>
            </motion.div>
            
            <motion.button 
              type="submit" 
              className="confirm-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane /> Proceed to Payment
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
              
              <div className="modal-icon">
                <FaCheck />
              </div>
              
              <h2 className="modal-title">Confirm Your Booking</h2>
              <p className="modal-message">
                Please review your booking details before confirming. We'll send a confirmation email to {formData.email}
              </p>
              
              <div className="modal-details">
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Destination</span>
                  <span className="modal-detail-value">{destination.name}</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Package</span>
                  <span className="modal-detail-value">{selectedPackage?.name}</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Travelers</span>
                  <span className="modal-detail-value">{formData.travelers}</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Travel Date</span>
                  <span className="modal-detail-value">{formData.date}</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Total Price</span>
                  <span className="modal-detail-value" style={{ color: '#00f5ff', fontSize: '18px' }}>{calculateTotal()}</span>
                </div>
              </div>
              
              <motion.button 
                className="modal-btn"
                onClick={confirmBooking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm & Pay Now
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Booking;
