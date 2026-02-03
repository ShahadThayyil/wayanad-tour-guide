import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from 'recharts';
import { 
  FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope, FaCamera, FaSave, FaStar, FaIdBadge, 
  FaBriefcase, FaLanguage, FaPen 
} from 'react-icons/fa';

// --- MOCK CHART DATA ---
const performanceData = [
  { subject: 'Knowledge', A: 90, fullMark: 100 },
  { subject: 'English', A: 85, fullMark: 100 },
  { subject: 'Safety', A: 95, fullMark: 100 },
  { subject: 'Punctuality', A: 80, fullMark: 100 },
  { subject: 'Storytelling', A: 88, fullMark: 100 },
];

const MyProfile = () => {
  
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="w-full pb-20 space-y-8"
    >
      
      {/* ==================== 1. HEADER ==================== */}
      <motion.div variants={itemVars}>
        <h1 className="text-4xl font-['Oswald'] font-bold text-[#2B3326] uppercase tracking-wide mb-2">
          Guide Profile
        </h1>
        <p className="text-[#5A6654] text-sm leading-relaxed">
          Manage your public profile, contact details, and view your performance metrics.
        </p>
      </motion.div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ==================== 2. LEFT: PROFILE CARD & STATS ==================== */}
        <motion.div variants={itemVars} className="lg:col-span-1 space-y-6">
           
           {/* ID Card */}
           <div className="bg-[#F3F1E7] p-8 rounded-2xl border border-[#DEDBD0] shadow-xl shadow-[#3D4C38]/5 flex flex-col items-center text-center relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 left-0 w-full h-24 bg-[#3D4C38]/10"></div>
              
              <div className="relative mt-4 mb-4">
                 <div className="w-28 h-28 rounded-full bg-[#E2E6D5] border-4 border-[#F3F1E7] shadow-lg flex items-center justify-center text-4xl overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=rahul" alt="Profile" className="w-full h-full object-cover" />
                 </div>
                 <button className="absolute bottom-0 right-0 p-2 bg-[#3D4C38] text-[#F3F1E7] rounded-full shadow-md hover:bg-[#2B3326] transition-colors">
                    <FaCamera size={12} />
                 </button>
              </div>

              <h2 className="text-2xl font-['Oswald'] font-bold text-[#2B3326]">Rahul K.</h2>
              <div className="flex items-center gap-2 text-[#5A6654] text-sm mt-1 mb-4">
                 <FaIdBadge /> <span>Licence #KL-9021</span>
              </div>

              <div className="flex gap-1 text-[#D4AF37] text-sm mb-6">
                 <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-[#D4AF37]/40" />
                 <span className="text-[#2B3326] font-bold ml-2">4.8</span>
              </div>

              <div className="w-full h-[200px] mt-2 relative">
                 <p className="absolute top-0 left-0 w-full text-center text-[10px] font-bold uppercase tracking-widest text-[#5A6654]">Performance Metrics</p>
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="55%" outerRadius="65%" data={performanceData}>
                       <PolarGrid stroke="#DEDBD0" />
                       <PolarAngleAxis dataKey="subject" tick={{ fill: '#5A6654', fontSize: 10, fontWeight: 'bold' }} />
                       <Radar name="Rahul" dataKey="A" stroke="#3D4C38" fill="#3D4C38" fillOpacity={0.4} />
                    </RadarChart>
                 </ResponsiveContainer>
              </div>
           </div>

        </motion.div>


        {/* ==================== 3. RIGHT: EDIT FORM ==================== */}
        <motion.div variants={itemVars} className="lg:col-span-2 bg-[#F3F1E7] p-8 rounded-2xl border border-[#DEDBD0] shadow-xl shadow-[#3D4C38]/5">
           <div className="flex items-center gap-3 mb-8 border-b border-[#DEDBD0] pb-4">
              <div className="p-2 bg-[#E2E6D5] text-[#3D4C38] rounded-lg"><FaUser /></div>
              <h3 className="font-['Oswald'] font-bold text-xl uppercase text-[#2B3326]">Edit Details</h3>
           </div>

           <form className="space-y-6">
              
              {/* --- Personal Info --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] mb-2 block group-focus-within:text-[#3D4C38]">Full Name</label>
                    <div className="relative">
                       <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6654]" />
                       <input 
                         type="text" 
                         defaultValue="Rahul K." 
                         className="w-full bg-[#E2E6D5] rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-[#2B3326] outline-none border border-transparent focus:border-[#3D4C38] transition-all"
                       />
                    </div>
                 </div>

                 <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] mb-2 block group-focus-within:text-[#3D4C38]">Email Address</label>
                    <div className="relative">
                       <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6654]" />
                       <input 
                         type="email" 
                         defaultValue="rahul.guide@wayanad.com" 
                         disabled
                         className="w-full bg-[#E2E6D5]/50 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-[#5A6654] border border-[#DEDBD0] cursor-not-allowed"
                       />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] mb-2 block group-focus-within:text-[#3D4C38]">Contact Number</label>
                    <div className="relative">
                       <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6654]" />
                       <input 
                         type="text" 
                         defaultValue="+91 9876543210" 
                         className="w-full bg-[#E2E6D5] rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-[#2B3326] outline-none border border-transparent focus:border-[#3D4C38] transition-all"
                       />
                    </div>
                 </div>

                 <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] mb-2 block group-focus-within:text-[#3D4C38]">Experience</label>
                    <div className="relative">
                       <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6654]" />
                       <input 
                         type="text" 
                         defaultValue="5 Years" 
                         className="w-full bg-[#E2E6D5] rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-[#2B3326] outline-none border border-transparent focus:border-[#3D4C38] transition-all"
                       />
                    </div>
                 </div>
              </div>

              {/* --- Professional Info --- */}
              <div className="group">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] mb-2 block group-focus-within:text-[#3D4C38]">Languages Spoken</label>
                 <div className="relative">
                    <FaLanguage className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6654]" />
                    <input 
                      type="text" 
                      defaultValue="English, Malayalam, Hindi, Tamil" 
                      className="w-full bg-[#E2E6D5] rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-[#2B3326] outline-none border border-transparent focus:border-[#3D4C38] transition-all"
                    />
                 </div>
              </div>

              <div className="group">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] mb-2 block group-focus-within:text-[#3D4C38]">Service Areas</label>
                 <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-[#5A6654]" />
                    <textarea 
                      rows="2"
                      defaultValue="Edakkal Caves, Banasura Sagar Dam, Soochipara Waterfalls, Chembra Peak"
                      className="w-full bg-[#E2E6D5] rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-[#2B3326] outline-none border border-transparent focus:border-[#3D4C38] transition-all resize-none"
                    ></textarea>
                 </div>
              </div>

              <div className="group">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A6654] mb-2 block group-focus-within:text-[#3D4C38]">About Me (Bio)</label>
                 <div className="relative">
                    <FaPen className="absolute left-4 top-4 text-[#5A6654]" />
                    <textarea 
                      rows="4"
                      defaultValue="I am a passionate local guide born and raised in Wayanad. I specialize in trekking and history tours. My goal is to show you the hidden gems of nature while ensuring a safe and memorable experience."
                      className="w-full bg-[#E2E6D5] rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-[#2B3326] outline-none border border-transparent focus:border-[#3D4C38] transition-all resize-none"
                    ></textarea>
                 </div>
              </div>

              <div className="pt-4 border-t border-[#DEDBD0]">
                 <button className="w-full md:w-auto px-8 py-3 bg-[#3D4C38] text-[#F3F1E7] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#2B3326] transition-all shadow-lg flex items-center justify-center gap-2">
                    <FaSave /> Save Changes
                 </button>
              </div>

           </form>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default MyProfile;