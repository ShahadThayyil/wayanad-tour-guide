import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  FaCalendarCheck, FaCheckCircle, FaTimesCircle, FaClock, FaMapMarkerAlt, FaUser 
} from 'react-icons/fa';
import { guideRequestsData } from '../../data/mockData';

// --- MOCK CHART DATA ---
const COLORS = ['#3D4C38', '#D4AF37', '#e74c3c']; // Confirmed, Pending, Rejected

const Requests = () => {
  const [requests, setRequests] = useState(guideRequestsData);

  // --- ACTIONS ---
  const handleAction = (id, newStatus) => {
    const updatedRequests = requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
  };

  // --- CHART DATA PREP ---
  const getChartData = () => {
    const counts = { confirmed: 0, pending: 0, rejected: 0 };
    requests.forEach(r => counts[r.status]++);
    return [
      { name: 'Confirmed', value: counts.confirmed },
      { name: 'Pending', value: counts.pending },
      { name: 'Rejected', value: counts.rejected }
    ];
  };

  // --- ANIMATION VARIANTS ---
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-[#3D4C38]/10 text-[#3D4C38] border-[#3D4C38]/20';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20';
    }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8 pb-20"
    >
      
      {/* ==================== 1. HEADER & SUMMARY ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Header Text */}
        <motion.div variants={itemVars} className="lg:col-span-2 flex flex-col justify-center">
           <h1 className="text-4xl font-['Oswald'] font-bold text-[#2B3326] uppercase tracking-wide mb-2">
             Booking Requests
           </h1>
           <p className="text-[#5A6654] text-sm leading-relaxed mb-6 max-w-xl">
             Manage your incoming trip requests. Confirm availablity or decline requests to keep your schedule updated.
           </p>
           
           <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-[#F3F1E7] rounded-xl border border-[#DEDBD0] text-center">
                 <p className="text-xs font-bold text-[#5A6654] uppercase mb-1">Pending</p>
                 <p className="text-2xl font-bold text-[#D4AF37]">{requests.filter(r => r.status === 'pending').length}</p>
              </div>
              <div className="p-4 bg-[#F3F1E7] rounded-xl border border-[#DEDBD0] text-center">
                 <p className="text-xs font-bold text-[#5A6654] uppercase mb-1">Confirmed</p>
                 <p className="text-2xl font-bold text-[#3D4C38]">{requests.filter(r => r.status === 'confirmed').length}</p>
              </div>
           </div>
        </motion.div>

        {/* Status Chart */}
        <motion.div variants={itemVars} className="lg:col-span-1 bg-[#F3F1E7] p-6 rounded-2xl shadow-xl shadow-[#3D4C38]/5 border border-[#DEDBD0]">
           <h3 className="font-['Oswald'] font-bold text-lg text-[#2B3326] uppercase mb-4 text-center">Overview</h3>
           <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={getChartData()}
                       cx="50%"
                       cy="50%"
                       innerRadius={50}
                       outerRadius={70}
                       paddingAngle={5}
                       dataKey="value"
                    >
                       {getChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                       ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#2B3326', border: 'none', borderRadius: '8px', color: '#F3F1E7' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                 </PieChart>
              </ResponsiveContainer>
           </div>
        </motion.div>

      </div>


      {/* ==================== 2. REQUESTS LIST ==================== */}
      <motion.div variants={itemVars} className="bg-[#F3F1E7] rounded-2xl border border-[#DEDBD0] shadow-lg shadow-[#3D4C38]/5 overflow-hidden">
         
         {/* --- DESKTOP TABLE --- */}
         <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-[#E2E6D5]/50 border-b border-[#DEDBD0]">
                  <tr>
                     {['Tourist', 'Destination', 'Scheduled Date', 'Status', 'Actions'].map((head) => (
                        <th key={head} className="px-6 py-5 text-[10px] font-bold text-[#5A6654] uppercase tracking-widest">
                           {head}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#DEDBD0]">
                  <AnimatePresence>
                     {requests.length > 0 ? (
                       requests.map((req) => (
                        <motion.tr 
                          key={req.id} 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                          className="hover:bg-[#E2E6D5]/30 transition-colors group"
                        >
                           <td className="px-6 py-4 font-bold text-[#2B3326] text-sm flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[#DEDBD0] flex items-center justify-center text-[#5A6654]"><FaUser size={12} /></div>
                              {req.touristName}
                           </td>
                           <td className="px-6 py-4 text-sm text-[#5A6654]">
                              <span className="flex items-center gap-1"><FaMapMarkerAlt size={12} /> {req.place}</span>
                           </td>
                           <td className="px-6 py-4 text-sm text-[#5A6654] font-mono">{req.date}</td>
                           <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border w-fit block text-center ${getStatusBadge(req.status)}`}>
                                 {req.status}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              {req.status === 'pending' ? (
                                <div className="flex gap-2">
                                   <button 
                                     onClick={() => handleAction(req.id, 'confirmed')}
                                     className="p-2 bg-[#3D4C38] text-[#F3F1E7] rounded-lg hover:bg-[#2B3326] transition-colors shadow-sm"
                                     title="Accept"
                                   >
                                      <FaCheckCircle />
                                   </button>
                                   <button 
                                     onClick={() => handleAction(req.id, 'rejected')}
                                     className="p-2 bg-white border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                                     title="Reject"
                                   >
                                      <FaTimesCircle />
                                   </button>
                                </div>
                              ) : (
                                <span className="text-xs text-[#5A6654] italic">
                                   {req.status === 'confirmed' ? 'Scheduled' : 'Closed'}
                                </span>
                              )}
                           </td>
                        </motion.tr>
                       ))
                     ) : (
                       <tr><td colSpan="5" className="p-8 text-center text-[#5A6654]">No requests found.</td></tr>
                     )}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>

         {/* --- MOBILE CARDS --- */}
         <div className="md:hidden flex flex-col divide-y divide-[#DEDBD0]">
            <AnimatePresence>
               {requests.map((req) => (
                  <motion.div 
                    key={req.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 flex flex-col gap-4 bg-[#F3F1E7]"
                  >
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-[#E2E6D5] flex items-center justify-center text-[#3D4C38]"><FaUser /></div>
                           <div>
                              <h4 className="font-bold text-[#2B3326] text-lg">{req.touristName}</h4>
                              <p className="text-xs text-[#5A6654] flex items-center gap-1"><FaMapMarkerAlt size={10} /> {req.place}</p>
                           </div>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${getStatusBadge(req.status)}`}>
                           {req.status}
                        </span>
                     </div>

                     <div className="flex items-center gap-2 text-xs text-[#5A6654] border-t border-b border-[#DEDBD0]/50 py-3">
                        <FaClock /> Requested Date: <span className="font-bold text-[#2B3326]">{req.date}</span>
                     </div>

                     {req.status === 'pending' && (
                        <div className="grid grid-cols-2 gap-3">
                           <button 
                             onClick={() => handleAction(req.id, 'confirmed')}
                             className="py-3 bg-[#3D4C38] text-[#F3F1E7] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#2B3326] transition-colors flex items-center justify-center gap-2"
                           >
                              <FaCheckCircle /> Accept
                           </button>
                           <button 
                             onClick={() => handleAction(req.id, 'rejected')}
                             className="py-3 bg-white border border-red-200 text-red-500 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                           >
                              <FaTimesCircle /> Reject
                           </button>
                        </div>
                     )}
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>

      </motion.div>

    </motion.div>
  );
};

export default Requests;