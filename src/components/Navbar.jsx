import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTree, FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Explore", path: "/explore" },
  ];

  return (
    <>
      {/* ==================== INTEGRATED HERO HEADER ==================== */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full z-50 pt-6 pb-4"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* ================= LOGO (Left) ================= */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-[#3D4C38] text-[#F3F1E7] p-2.5 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
              <FaTree className="text-sm" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Oswald'] font-bold uppercase tracking-[0.2em] text-[#2B3326] text-lg leading-none group-hover:text-[#3D4C38] transition-colors">
                Wayanad
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] hidden sm:block">
                Official Guide
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP LINKS (Center) ================= */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300
                  ${location.pathname === link.path ? 'text-[#2B3326]' : 'text-[#5A6654] hover:text-[#2B3326]'}
                `}
              >
                <span className="relative z-10">{link.title}</span>
                
                {/* Underline Hover Effect */}
                {hoveredIndex === index && (
                  <motion.span 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3D4C38]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
                
                {/* Active Dot */}
                {location.pathname === link.path && hoveredIndex !== index && (
                   <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3D4C38] rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* ================= ACTION / MOBILE TOGGLE (Right) ================= */}
          <div className="flex items-center gap-4">
            
            {/* Desktop Login */}
            <Link 
              to="/login"
              className="hidden md:flex items-center gap-2 px-6 py-2.5  border border-[#3D4C38]  rounded-full font-['Oswald'] font-bold text-xs uppercase tracking-widest bg-[#3D4C38] text-[#F3F1E7] transition-all"
            >
              <FaUser className="text-[10px]" /> Login
            </Link>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 text-[#3D4C38] hover:bg-[#3D4C38]/10 rounded-lg transition-colors"
            >
              {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full z-40 md:hidden bg-[#E2E6D5] border-b border-[#DEDBD0] overflow-hidden shadow-xl"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`text-xl font-['Oswald'] font-bold uppercase tracking-widest transition-colors
                    ${location.pathname === link.path ? 'text-[#3D4C38]' : 'text-[#5A6654] hover:text-[#2B3326]'}
                  `}
                >
                  {link.title}
                </Link>
              ))}

              <div className="h-[1px] w-full bg-[#DEDBD0] my-2"></div>

              <Link 
                to="/login" 
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 text-[#3D4C38] font-bold uppercase tracking-widest text-sm"
              >
                <FaUser /> Login Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;