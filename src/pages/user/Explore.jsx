import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaMapMarkerAlt, FaTree, FaArrowRight, FaTimes, FaCalendarAlt, FaUserTie, FaCheck, FaStar } from 'react-icons/fa';
import { placesData, guidesData } from '../../data/mockData';

const Explore = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    // Background: Sage & Earth Palette
    <div className="min-h-screen bg-[#E2E6D5] text-[#2B3326] font-['Poppins'] overflow-x-hidden selection:bg-[#3D4C38] selection:text-[#F3F1E7]">
      
      {/* --- BACKGROUND TEXTURE --- */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

      {/* ==================== 1. COMPACT NAVBAR SPACER ==================== */}
      <div className="h-24 w-full"></div>


      {/* ==================== 2. MINIMAL TITLE ==================== */}
      <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3D4C38]/20 bg-[#F3F1E7]/50 backdrop-blur-sm mb-6">
               <FaTree className="text-[#3D4C38]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654]">Curated Locations</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-['Oswald'] font-bold text-[#1F261C] uppercase leading-[0.9]">
              Wayanad <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D4C38] to-[#5A6654]">Chronicles</span>
            </h1>
         </motion.div>
      </div>


      {/* ==================== 3. EDITORIAL ZIG-ZAG LAYOUT ==================== */}
      <div className="container mx-auto px-4 md:px-12 pb-40 flex flex-col gap-24 md:gap-40">
         
         {placesData.map((place, index) => {
            const isEven = index % 2 === 0;

            return (
               <motion.div 
                 key={place.id}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-0`}
               >
                  
                  {/* --- A. IMAGE SECTION (Major Visual) --- */}
                  <div className="w-full lg:w-[60%] relative z-0 group cursor-pointer" onClick={() => setSelectedPlace(place)}>
                     <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-[#3D4C38]/10 aspect-[4/3] lg:aspect-[16/10]">
                        <img 
                          src={place.image} 
                          alt={place.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-[#3D4C38]/10 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                        
                        {/* Mobile Overlay Text (Hidden on Desktop) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F261C]/80 via-transparent to-transparent lg:hidden"></div>
                        <div className="absolute bottom-6 left-6 lg:hidden text-[#F3F1E7]">
                           <h2 className="text-3xl font-['Oswald'] font-bold uppercase">{place.name}</h2>
                        </div>
                     </div>
                  </div>


                  {/* --- B. CONTENT CARD (Overlapping) --- */}
                  <div className={`w-full lg:w-[45%] relative z-10 lg:-mt-0 ${isEven ? 'lg:-ml-24' : 'lg:-mr-24'}`}>
                     <div className="bg-[#F3F1E7] p-8 md:p-12 rounded-[2rem] shadow-xl shadow-[#2B3326]/5 border border-[#DEDBD0] backdrop-blur-xl">
                        
                        <div className="flex justify-between items-start mb-6">
                           <span className="text-sm font-mono font-bold text-[#3D4C38]/40">0{index + 1}</span>
                           <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                           </div>
                        </div>

                        <h2 className="hidden lg:block text-4xl xl:text-5xl font-['Oswald'] font-bold text-[#1F261C] uppercase leading-none mb-6">
                           {place.name}
                        </h2>

                        <p className="text-[#5A6654] text-sm md:text-base leading-relaxed mb-8 font-medium">
                           {place.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#DEDBD0]">
                           <div className="flex items-center gap-3 text-[#3D4C38] text-xs font-bold uppercase tracking-widest">
                              <div className="w-8 h-[1px] bg-[#3D4C38]"></div>
                              Kerala, India
                           </div>
                           
                           <button 
                             onClick={() => setSelectedPlace(place)}
                             className="ml-auto px-8 py-3 bg-[#3D4C38] text-[#F3F1E7] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#2B3326] transition-all shadow-lg flex items-center gap-2 group"
                           >
                             Explore <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>

                     </div>
                  </div>

               </motion.div>
            );
         })}

      </div>


      {/* ==================== 4. BOOKING MODAL ==================== */}
      <AnimatePresence>
        {selectedPlace && (
          <BookingModal 
            place={selectedPlace} 
            onClose={() => setSelectedPlace(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};


// --- BOOKING MODAL (Sage Theme) ---
const BookingModal = ({ place, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = () => {
    if (!selectedGuide || !date) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#2B3326]/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F3F1E7] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative border border-[#DEDBD0]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-[#E2E6D5] hover:bg-[#3D4C38] hover:text-[#F3F1E7] flex items-center justify-center text-[#5A6654] transition-colors"><FaTimes /></button>

        {step === 1 && (
          <div className="flex flex-col h-full">
             <div className="h-48 relative shrink-0">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover grayscale-[20%]" />
                <div className="absolute inset-0 bg-[#3D4C38]/20 mix-blend-multiply"></div>
                <div className="absolute bottom-6 left-8 text-[#F3F1E7]">
                   <h2 className="text-4xl font-['Oswald'] font-bold uppercase leading-none">{place.name}</h2>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mt-1"><FaMapMarkerAlt /> Kerala</div>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-xs font-bold uppercase text-[#5A6654] tracking-wider block">1. Date</label>
                      <div className="relative group">
                         <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D4C38]" />
                         <input type="date" className="w-full bg-[#E2E6D5] border border-transparent focus:border-[#3D4C38] rounded-xl py-4 pl-12 pr-4 text-sm font-medium text-[#2B3326] outline-none" onChange={(e) => setDate(e.target.value)} />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-xs font-bold uppercase text-[#5A6654] tracking-wider block">2. Guide</label>
                      <div className="space-y-3">
                         {guidesData.map(guide => (
                            <div key={guide.id} onClick={() => setSelectedGuide(guide)} className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${selectedGuide?.id === guide.id ? 'bg-[#3D4C38] text-[#F3F1E7]' : 'bg-white border-[#DEDBD0]'}`}>
                               <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${selectedGuide?.id === guide.id ? 'bg-[#F3F1E7] text-[#3D4C38]' : 'bg-[#E2E6D5] text-[#5A6654]'}`}><FaUserTie /></div>
                               <div className="flex-1"><h5 className="text-sm font-bold">{guide.name}</h5><p className="text-[10px] opacity-80">{guide.experience} Exp</p></div>
                               {selectedGuide?.id === guide.id && <FaCheck />}
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-6 border-t border-[#DEDBD0] bg-[#E2E6D5]/30 flex justify-end gap-3">
                <button onClick={onClose} className="px-6 py-3 rounded-xl border border-[#DEDBD0] text-xs font-bold uppercase text-[#5A6654]">Cancel</button>
                <button onClick={handleBooking} disabled={!date || !selectedGuide || isLoading} className={`px-8 py-3 rounded-xl text-xs font-bold uppercase text-[#F3F1E7] flex items-center gap-2 ${(!date || !selectedGuide) ? 'bg-[#BFC7B0] cursor-not-allowed' : 'bg-[#3D4C38]'}`}>{isLoading ? '...' : 'Confirm'}</button>
             </div>
          </div>
        )}

        {step === 2 && (
           <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#F3F1E7]">
              <div className="w-20 h-20 bg-[#E2E6D5] text-[#3D4C38] rounded-full flex items-center justify-center text-3xl mb-6"><FaCheck /></div>
              <h3 className="text-2xl font-bold text-[#1F261C] font-['Oswald'] uppercase mb-2">Confirmed!</h3>
              <p className="text-[#5A6654] text-sm mb-8">See you in Wayanad.</p>
              <button onClick={onClose} className="px-8 py-3 bg-[#3D4C38] text-[#F3F1E7] font-bold text-xs uppercase rounded-xl">Close</button>
           </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Explore;