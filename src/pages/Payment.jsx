import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCreditCard, FaLock, FaCheck, FaArrowLeft, FaUniversity, FaWallet, FaMobileAlt, FaShieldAlt, FaChevronRight } from "react-icons/fa";
import "./Payment.css";

const Payment = ({ theme, bookingData, goBack, onComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Format card number
    if (e.target.name === "cardNumber") {
      value = value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
      value = value.substring(0, 19);
    }
    
    // Format expiry
    if (e.target.name === "expiry") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
    }
    
    // Format CVV
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 4);
    }
    
    setCardData({ ...cardData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        onComplete && onComplete();
      }, 3000);
    }, 2500);
  };

  const formatCardNumber = (num) => {
    return num.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
  };

  const getCardType = () => {
    const num = cardData.cardNumber.replace(/\s/g, "");
    if (num.startsWith("4")) return "visa";
    if (num.startsWith("5")) return "mastercard";
    if (num.startsWith("3")) return "amex";
    return "card";
  };

  if (isComplete) {
    return (
      <div className={`payment-page ${theme}`}>
        <div className="payment-bg-effects">
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
        </div>
        
        <motion.div 
          className="success-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="success-circle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FaCheck />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Payment Successful!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Thank you for your payment
          </motion.p>
          
          <motion.div 
            className="success-amount"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="amount-label">Amount Paid</span>
            <span className="amount-value">{bookingData?.price || "$0.00"}</span>
          </motion.div>
          
          <motion.div 
            className="confetti"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="confetti-piece" style={{
                '--delay': `${Math.random() * 0.5}s`,
                '--x': `${Math.random() * 100}%`,
                '--rotation': `${Math.random() * 360}deg`,
                '--color': ['#00f5ff', '#7c3aed', '#ec4899', '#fbbf24', '#10b981'][Math.floor(Math.random() * 5)]
              }}></div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`payment-page ${theme}`}>
      {/* BACKGROUND EFFECTS */}
      <div className="payment-bg-effects">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      {/* BACK BUTTON */}
      <motion.button 
        className="back-btn"
        onClick={goBack}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaArrowLeft /> Back
      </motion.button>

      {/* MAIN CONTENT */}
      <div className="payment-container">
        {/* CARD PREVIEW */}
        <motion.div 
          className="card-preview-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Payment Details</h2>
          
          {/* CREDIT CARD */}
          <div className={`credit-card ${getCardType()}`}>
            <div className="card-chip">
              <div className="chip-lines">
                <span></span><span></span><span></span>
              </div>
            </div>
            
            <div className="card-number-display">
              {cardData.cardNumber ? formatCardNumber(cardData.cardNumber) : "•••• •••• •••• ••••"}
            </div>
            
            <div className="card-details-row">
              <div className="card-holder-display">
                <span className="label">Card Holder</span>
                <span className="value">{cardData.cardName || "YOUR NAME"}</span>
              </div>
              <div className="card-expiry-display">
                <span className="label">Expires</span>
                <span className="value">{cardData.expiry || "MM/YY"}</span>
              </div>
            </div>
            
            <div className="card-logo">
              {getCardType() === "visa" && <span className="visa">VISA</span>}
              {getCardType() === "mastercard" && <span className="mastercard">MC</span>}
              {getCardType() === "amex" && <span className="amex">AMEX</span>}
              {getCardType() === "card" && <FaCreditCard />}
            </div>
            
            <div className="card-shine"></div>
          </div>
          
          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Destination</span>
              <span>{bookingData?.destination || "N/A"}</span>
            </div>
            <div className="summary-item">
              <span>Package</span>
              <span>{bookingData?.package || "Standard"}</span>
            </div>
            <div className="summary-item">
              <span>Travelers</span>
              <span>{bookingData?.travelers || 1}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-item total">
              <span>Total</span>
              <span className="total-amount">{bookingData?.price || "$0.00"}</span>
            </div>
          </div>
        </motion.div>

        {/* PAYMENT FORM */}
        <motion.div 
          className="payment-form-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="section-title">
            <FaLock /> Secure Payment
          </h2>
          
          {/* PAYMENT METHODS */}
          <div className="payment-methods">
            <button 
              className={`method-btn ${paymentMethod === "card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("card")}
            >
              <FaCreditCard />
              <span>Card</span>
            </button>
            <button 
              className={`method-btn ${paymentMethod === "bank" ? "active" : ""}`}
              onClick={() => setPaymentMethod("bank")}
            >
              <FaUniversity />
              <span>Bank</span>
            </button>
            <button 
              className={`method-btn ${paymentMethod === "wallet" ? "active" : ""}`}
              onClick={() => setPaymentMethod("wallet")}
            >
              <FaWallet />
              <span>Wallet</span>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {paymentMethod === "card" && (
              <motion.div 
                className="card-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="form-group">
                  <label>Card Number</label>
                  <div className="input-with-icon">
                    <FaCreditCard className="input-icon" />
                    <input 
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Card Holder Name</label>
                  <div className="input-with-icon">
                    <span className="input-icon">Aa</span>
                    <input 
                      type="text"
                      name="cardName"
                      value={cardData.cardName}
                      onChange={handleChange}
                      placeholder="JOHN DOE"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input 
                      type="text"
                      name="expiry"
                      value={cardData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <div className="cvv-input">
                      <input 
                        type="password"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleChange}
                        placeholder="•••"
                        required
                      />
                      <FaShieldAlt className="cvv-icon" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {paymentMethod === "bank" && (
              <motion.div 
                className="bank-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <div className="bank-info">
                  <p>Bank Transfer Details</p>
                  <div className="bank-details">
                    <div className="bank-item">
                      <span className="label">Bank Name</span>
                      <span className="value">SkyTravel International Bank</span>
                    </div>
                    <div className="bank-item">
                      <span className="label">Account Number</span>
                      <span className="value">1234 5678 9012 3456</span>
                    </div>
                    <div className="bank-item">
                      <span className="label">SWIFT Code</span>
                      <span className="value">SKYTRAV123</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {paymentMethod === "wallet" && (
              <motion.div 
                className="wallet-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <div className="wallet-options">
                  <button type="button" className="wallet-btn">
                    <FaMobileAlt />
                    <span>Apple Pay</span>
                  </button>
                  <button type="button" className="wallet-btn">
                    <span>G</span>
                    <span>Google Pay</span>
                  </button>
                  <button type="button" className="wallet-btn">
                    <span>P</span>
                    <span>PayPal</span>
                  </button>
                </div>
              </motion.div>
            )}
            
            <motion.button 
              type="submit" 
              className={`pay-btn ${isProcessing ? "processing" : ""}`}
              disabled={isProcessing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  <FaLock /> Pay {bookingData?.price || "$0.00"}
                </>
              )}
            </motion.button>
            
            <p className="security-note">
              <FaShieldAlt /> Your payment is secured with 256-bit SSL encryption
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
