import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkedAlt, FaPlus, FaTrash, FaImage, FaPen, FaSearch } from 'react-icons/fa';
import { placesData } from '../../data/mockData';

const ManagePlaces = () => {
  const [places, setPlaces] = useState(placesData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPlace = (e) => {
    e.preventDefault();
    alert("This demo successfully simulates adding a place!");
  };

  const deletePlace = (id) => {
    if(window.confirm("Delete this destination?")) {
      setPlaces(places.filter(p => p.id !== id));
    }
  };

  const filteredPlaces = places.filter(place => 
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full pb-20 space-y-8">
      
      {/* ==================== 1. HEADER ==================== */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-[#3D4C38]/10 pb-6">
        <div>
          <h1 className="text-4xl font-['Oswald'] font-bold text-[#2B3326] uppercase tracking-wide mb-2">
            Destinations
          </h1>
          <p className="text-[#5A6654] text-sm max-w-md leading-relaxed">
            Curate the list of Wayanad's hidden gems. Add new locations or update existing ones.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
           <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6654]" />
           <input 
             type="text" 
             placeholder="Search places..." 
             className="w-full pl-10 pr-4 py-3 bg-[#F3F1E7] border border-[#DEDBD0] rounded-xl text-sm text-[#2B3326] focus:ring-1 focus:ring-[#3D4C38] outline-none transition-all placeholder-[#5A6654]/50"
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>


      {/* ==================== 2. MAIN CONTENT GRID ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* --- LEFT: ADD PLACE FORM (Sticky) --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-[#F3F1E7] p-6 md:p-8 rounded-2xl shadow-xl shadow-[#3D4C38]/5 border border-[#DEDBD0] sticky top-6"
        >
           <div className="flex items-center gap-3 mb-6 text-[#3D4C38]">
              <div className="p-2 bg-[#E2E6D5] rounded-lg"><FaPlus /></div>
              <h3 className="font-['Oswald'] font-bold text-xl uppercase">Add New Location</h3>
           </div>

           <form onSubmit={handleAddPlace} className="space-y-5">
              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] block mb-1">Place Name</label>
                 <input type="text" className="w-full bg-white border border-[#DEDBD0] rounded-lg p-3 text-sm text-[#2B3326] focus:border-[#3D4C38] outline-none transition-colors" placeholder="e.g. 900 Kandi" />
              </div>

              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] block mb-1">Description</label>
                 <textarea rows="4" className="w-full bg-white border border-[#DEDBD0] rounded-lg p-3 text-sm text-[#2B3326] focus:border-[#3D4C38] outline-none transition-colors resize-none" placeholder="Tell the story of this place..."></textarea>
              </div>

              <div>
                 <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] block mb-1">Cover Image</label>
                 <div className="flex items-center gap-2">
                    <input type="text" className="flex-1 bg-white border border-[#DEDBD0] rounded-lg p-3 text-sm text-[#2B3326] focus:border-[#3D4C38] outline-none" placeholder="https://..." />
                    <button type="button" className="p-3 bg-[#E2E6D5] text-[#5A6654] rounded-lg hover:text-[#3D4C38] transition-colors"><FaImage /></button>
                 </div>
              </div>

              <button className="w-full py-4 bg-[#3D4C38] text-[#F3F1E7] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#2B3326] transition-all shadow-lg flex items-center justify-center gap-2 mt-4">
                 <FaMapMarkedAlt /> Publish Location
              </button>
           </form>
        </motion.div>


        {/* --- RIGHT: EXISTING PLACES LIST --- */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#5A6654]">
                 Library ({filteredPlaces.length})
              </h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                 {filteredPlaces.map((place) => (
                    <motion.div 
                      key={place.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group relative bg-[#F3F1E7] rounded-xl overflow-hidden border border-[#DEDBD0] hover:border-[#3D4C38] transition-all shadow-sm hover:shadow-md"
                    >
                       {/* Image Header */}
                       <div className="h-32 w-full relative overflow-hidden">
                          <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-[#2B3326]/20 group-hover:bg-[#2B3326]/10 transition-colors"></div>
                          
                          {/* Actions Overlay */}
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-10px] group-hover:translate-y-0 duration-300">
                             <button className="p-2 bg-[#F3F1E7] text-[#3D4C38] rounded-lg shadow-sm hover:bg-[#3D4C38] hover:text-[#F3F1E7] transition-colors" title="Edit">
                                <FaPen size={12} />
                             </button>
                             <button 
                               onClick={() => deletePlace(place.id)}
                               className="p-2 bg-[#F3F1E7] text-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-[#F3F1E7] transition-colors" 
                               title="Delete"
                             >
                                <FaTrash size={12} />
                             </button>
                          </div>
                       </div>

                       {/* Content */}
                       <div className="p-4">
                          <h4 className="font-['Oswald'] font-bold text-[#2B3326] text-lg uppercase truncate">{place.name}</h4>
                          <p className="text-[#5A6654] text-xs leading-relaxed line-clamp-2 mt-1">
                             {place.description}
                          </p>
                       </div>
                    </motion.div>
                 ))}
              </AnimatePresence>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ManagePlaces;