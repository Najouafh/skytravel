import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaGlobe,
  FaPlane,
  FaMapMarkedAlt,
  FaPercent,
  FaWhatsapp,
  FaPaperclip,
  FaMoon,
  FaSun
} from "react-icons/fa";
import "./Chatbot.css";

// Multilingual responses
const chatbotResponses = {
  fr: {
    welcome: "Bonjour ! Je suis l'assistant SkyTravel 😊",
    welcomeMessage: "Je suis là pour vous aider à planifier votre voyage rapidement. Choisissez une option ci-dessous :",
    online: "En ligne",
    placeholder: "Tapez votre message...",
    options: {
      book: "Réserver un voyage",
      destinations: "Découvrir les destinations",
      visa: "Informations visa",
      offers: "Offres promotionnelles",
      contact: "Contacter un agent"
    },
    responses: {
      book: "Pour réserver un voyage, cliquez sur le bouton 'Destinations' en haut de la page, Choisissez votre destination préférée, puis suivez les étapes de réservation. Voulez-vous que je vous y emmène ?",
      destinations: "SkyTravel propose des destinations magnifiques à travers le monde : Allemagne, Canada, Italie, UAE, USA, Pays-Bas, Japon, Espagne et bien plus encore ! Cliquez sur 'Destinations' pour toutes les découvrir.",
      visa: "Les exigences de visa varient selon votre pays de résidence et votre destination. En général, vous aurez besoin d'un passeport valide. Pour certaines destinations, un visa peut être requis. Consultez l'ambassade de votre pays pour plus d'informations.",
      offers: "Consultez notre section 'Offres' pour découvrir nos promotions actuelles ! Nous avons des réductions spéciales toute L'année sur diverses destinations.",
      contact: "Un agent SkyTravel sera heureux de vous aider ! Vous pouvez nous contacter via WhatsApp au +212 661-234-567 ou par email à contact@skytravel.com",
      default: "Je comprends. Voulez-vous parler à un agent humain ou avez-vous une autre question ?"
    },
    prices: "Les prix varient selon la destination, la durée du voyage et le type d'hébergement. Veuillez consulter la section Destinations pour voir les prix estimatifs.",
    duration: "La durée des voyages dépend de votre destination. En général, nous proposons des séjours de 5 à 14 jours. Vous pouvez personnaliser votre voyage selon vos préférences.",
    hotels: "Nous collaborons avec des hôtels 3*, 4* et 5* dans toutes nos destinations. Le choix de L'hébergement est disponible lors de la réservation.",
    documents: "Pour voyager, vous aurez généralement besoin de :\n\n• Passeport valide (6 mois après le retour)\n• Visa (selon la destination)\n• Billet d'avion\n• Assurance voyage (recommandé)",
    thanks: "De rien ! Autre chose ?"
  },
  en: {
    welcome: "Hello! I'm SkyTravel assistant 😊",
    welcomeMessage: "I'm here to help you plan your trip quickly. Choose an option below:",
    online: "Online",
    placeholder: "Type your message...",
    options: {
      book: "Book a trip",
      destinations: "Discover destinations",
      visa: "Visa information",
      offers: "Special offers",
      contact: "Contact an agent"
    },
    responses: {
      book: "To book a trip, click on 'Destinations' at the top of the page, choose your preferred destination, then follow the booking steps. Would you like me to take you there?",
      destinations: "SkyTravel offers beautiful destinations around the world: Germany, Canada, Italy, UAE, USA, Netherlands, Japan, Spain and many more! Click on 'Destinations' to discover them all.",
      visa: "Visa requirements vary depending on your country of residence and destination. Generally, you'll need a valid passport. For some destinations, a visa may be required. Check your country's embassy for more information.",
      offers: "Check our 'Offers' section to discover our current promotions! We have special discounts throughout the year on various destinations.",
      contact: "A SkyTravel agent will be happy to help! You can contact us via WhatsApp at +1 234 567 890 or by email at contact@skytravel.com",
      default: "I understand. Would you like to speak to a human agent or do you have another question?"
    },
    prices: "Prices vary depending on destination, trip duration, and accommodation type. Check the Destinations section for estimated prices.",
    duration: "Trip duration depends on your destination. Generally, we offer trips from 5 to 14 days. You can customize your trip according to your preferences.",
    hotels: "We partner with 3*, 4*, and 5* hotels in all our destinations. Accommodation choice is available during booking.",
    documents: "For travel, you generally need:\n\n• Valid passport (6 months after return)\n• Visa (depending on destination)\n• Flight ticket\n• Travel insurance (recommended)",
    thanks: "You're welcome! Anything else?"
  },
  dar: {
    welcome: " sla! ana assistant SkyTravel 😊",
    welcomeMessage: "ana hna bash nkoun f hadak ta3 ndir lmohim ltravel bzaf. ikhtar wahd l options:",
    online: "Online",
    placeholder: "ktb message...",
    options: {
      book: "ikhri risla",
      destinations: "kshuf l destinations",
      visa: "m3lomat l visa",
      offers: "l3ayat",
      contact: "khatb agent"
    },
    responses: {
      book: "bach tkhri risla, d 点击 l Destinations f l fo9, ikhtar destination, w dir l steps d l booking. t7eb ndkhlk?",
      destinations: "SkyTravel kay propose destinations zwin f l 3alam: Germany, Canada, Italy, UAE, USA, Netherlands, Japan, Spain w ghirhom! d 点击 l Destinations bash tshuf lkol.",
      visa: "l visa i9teleb 3la hssab lblad li mnha tjik w l destination. 3mran, kaykhlik passport valide. l ba3d l destinations, visa khass. raji l سفارة d bladk.",
      offers: "shuf l section Offers bash tshuf l3ayat dyalna! 3ndna discounts khal l3am 3la bzaf dyal destinations.",
      contact: "agent SkyTravel ikoun f mdkhlik! tatcontactana via WhatsApp +212 6XX XXX XXX walla email contact@skytravel.com",
      default: "fhemt. t7eb tkhatb ma3 agent humain walla 3ndak so2al akh?"
    },
    prices: "l prices i9teleb 3la hssab destination, l duration, w l hotel. shuf Destinations.",
    duration: "l duration i9teleb 3la destination. 3mran, nproposu 5ila 14 jour. tdir custom selon t9trasak.",
    hotels: "n9esdu ma3a hotels 3*, 4*, 5* f kol l destinations. l choix dyal l hotel kaywen fl booking.",
    documents: "bach tsiyar, khassik:\n\n• passport valide (6 sh7our ba3d l return)\n• visa ( حسب destination)\n• billet d avion\n• assurance voyage (mstawil)",
    thanks: "La shafo ! shi akh?"
  }
};

// Language labels for the menu
const languageLabels = {
  fr: { flag: "🇫🇷", name: "Français" },
  en: { flag: "🇬🇧", name: "English" },
  dar: { flag: "🇲🇦", name: "Darija" }
};

const Chatbot = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState("fr");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Drag position state - load from localStorage or use defaults
  const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatbotPosition');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return { x: 0, y: 0 };
        }
      }
    }
    return { x: 0, y: 0 };
  });

  const t = chatbotResponses[language];

  // Get current language label
  const currentLang = languageLabels[language];

  // Initialize with welcome message when chat opens or language changes
  useEffect(() => {
    if (isOpen) {
      setMessages([
        { type: "bot", text: t.welcome },
        { type: "bot", text: t.welcomeMessage }
      ]);
    }
  }, [isOpen, language]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleOptionClick = (optionKey) => {
    const optionText = t.options[optionKey];
    
    // Add user message
    setMessages(prev => [...prev, { type: "user", text: optionText }]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: t.responses[optionKey] || t.responses.default 
      }]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);
    setInputValue("");

    // Show typing
    setIsTyping(true);

    // Simple keyword matching for responses
    setTimeout(() => {
      setIsTyping(false);
      let response = t.responses.default;
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes("prix") || lowerMessage.includes("price") || lowerMessage.includes(" cheaply")) {
        response = t.prices;
      } else if (lowerMessage.includes("durée") || lowerMessage.includes("duration") || lowerMessage.includes("mudd") || lowerMessage.includes("zaman")) {
        response = t.duration;
      } else if (lowerMessage.includes("hôtel") || lowerMessage.includes("hotel") || lowerMessage.includes("otel") || lowerMessage.includes("hotel")) {
        response = t.hotels;
      } else if (lowerMessage.includes("document") || lowerMessage.includes("visa") || lowerMessage.includes("wasij") || lowerMessage.includes("viza")) {
        response = t.documents;
      } else if (lowerMessage.includes("merci") || lowerMessage.includes("thank") || lowerMessage.includes("shukran") || lowerMessage.includes("mmerci")) {
        response = t.thanks;
      }
      
      setMessages(prev => [...prev, { type: "bot", text: response }]);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  // Handle drag end to save position
  const handleDragEnd = useCallback((event, info) => {
    const newPosition = {
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    };
    setPosition(newPosition);
    localStorage.setItem('chatbotPosition', JSON.stringify(newPosition));
  }, [position]);

  return (
    <>
      {/* Floating Button - Draggable */}
      <motion.button
        className={`chatbot-floating-btn ${theme}`}
        onClick={toggleChat}
        drag
        dragMomentum={true}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: position.x,
          y: position.y
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.5 }}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
        {!isOpen && <span className="chatbot-badge">1</span>}
      </motion.button>

      {/* Language Menu - Outside chat window, appears above */}
      <AnimatePresence>
        {isOpen && showLanguageMenu && (
          <motion.div
            className="language-menu language-menu-floating"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button onClick={() => changeLanguage("fr")}>
              <span>🇫🇷</span> Français
            </button>
            <button onClick={() => changeLanguage("en")}>
              <span>🇬🇧</span> English
            </button>
            <button onClick={() => changeLanguage("dar")}>
              <span>🇲🇦</span> Darija
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-window ${theme}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-left">
                <div className="chatbot-avatar">
                  <FaRobot />
                </div>
                <div className="chatbot-header-info">
                  <h3>SkyTravel Assistant</h3>
                  <span>
                    <span className="online-dot"></span>
                    {t.online}
                  </span>
                </div>
              </div>
              <div className="chatbot-header-right">
                {/* Language Selector Button */}
                <button 
                  className="language-btn"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  title="Changer la langue"
                >
                  <span className="lang-flag">{currentLang.flag}</span>
                </button>
                <button className="close-btn" onClick={toggleChat} title="Fermer">
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="message-content">
                    {message.text}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="message bot"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-content typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              
              {/* Quick Options */}
              {messages.length <= 2 && (
                <div className="quick-options">
                  <button onClick={() => handleOptionClick("book")}>
                    <FaPlane /> {t.options.book}
                  </button>
                  <button onClick={() => handleOptionClick("destinations")}>
                    <FaMapMarkedAlt /> {t.options.destinations}
                  </button>
                  <button onClick={() => handleOptionClick("visa")}>
                    <FaPaperclip /> {t.options.visa}
                  </button>
                  <button onClick={() => handleOptionClick("offers")}>
                    <FaPercent /> {t.options.offers}
                  </button>
                  <button onClick={() => handleOptionClick("contact")}>
                    <FaWhatsapp /> {t.options.contact}
                  </button>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chatbot-input">
              <input
                ref={inputRef}
                type="text"
                placeholder={t.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
