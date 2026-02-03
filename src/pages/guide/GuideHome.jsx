import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { FaMapMarkerAlt, FaStar, FaClock, FaWallet, FaArrowUp, FaEllipsisH, FaCalendarAlt } from 'react-icons/fa';

// --- MOCK DATA ---
const earningsData = [
  { name: 'Mon', amount: 120 },
  { name: 'Tue', amount: 200 },
  { name: 'Wed', amount: 150 },
  { name: 'Thu', amount: 280 },
  { name: 'Fri', amount: 350 },
  { name: 'Sat', amount: 450 },
  { name: 'Sun', amount: 300 },
];

const recentActivity = [
  { id: 1, text: 'Accepted trip to "Edakkal Caves"', time: '2 hours ago', type: 'success' },
  { id: 2, text: 'Completed trip with John Smith', time: 'Yesterday', type: 'info' },
  { id: 3, text: 'New review received: 5 Stars', time: '2 days ago', type: 'review' },
];

const GuideHome = () => {
  
  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8 pb-20"
    >
      
      {/* ==================== 1. HEADER ==================== */}
      <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-['Oswald'] font-bold text-[#2B3326] uppercase tracking-wide">
            Guide Dashboard
          </h1>
          <p className="text-[#5A6654] text-sm mt-1">
            Welcome back, Rahul. Here's your activity overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-xs font-bold uppercase tracking-widest text-[#5A6654] bg-[#F3F1E7] px-3 py-1 rounded-lg border border-[#DEDBD0]">
             Status: Online
           </span>
        </div>
      </motion.div>


      {/* ==================== 2. STATS GRID ==================== */}
      <motion.div 
        variants={itemVars} 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard 
          title="Pending Requests" 
          value="02" 
          subtext="Requires action"
          icon={<FaClock />} 
          accentColor="text-[#D4AF37]"
        />
        <StatCard 
          title="Total Trips" 
          value="12" 
          subtext="This month"
          icon={<FaMapMarkerAlt />} 
          accentColor="text-[#3D4C38]"
        />
        <StatCard 
          title="Avg. Rating" 
          value="4.8" 
          subtext="Based on 45 reviews"
          icon={<FaStar />} 
          accentColor="text-[#D4AF37]"
        />
      </motion.div>


      {/* ==================== 3. CONTENT SECTION ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Earnings Chart */}
        <motion.div 
          variants={itemVars} 
          className="lg:col-span-2 bg-[#F3F1E7] p-6 rounded-2xl shadow-xl shadow-[#3D4C38]/5 border border-[#DEDBD0]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-['Oswald'] font-bold text-xl text-[#2B3326] uppercase">Weekly Earnings</h3>
            <button className="text-[#3D4C38] hover:bg-[#E2E6D5] p-2 rounded-full transition-colors"><FaEllipsisH /></button>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B9D77" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B9D77" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DEDBD0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5A6654', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#5A6654', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2B3326', border: 'none', borderRadius: '8px', color: '#F3F1E7' }}
                  itemStyle={{ color: '#F3F1E7' }}
                  formatter={(value) => [`$${value}`, 'Earnings']}
                />
                <Area type="monotone" dataKey="amount" stroke="#3D4C38" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div 
          variants={itemVars} 
          className="bg-[#F3F1E7] p-6 rounded-2xl shadow-xl shadow-[#3D4C38]/5 border border-[#DEDBD0]"
        >
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-['Oswald'] font-bold text-xl text-[#2B3326] uppercase">Activity Log</h3>
             <FaCalendarAlt className="text-[#3D4C38] opacity-50" />
          </div>

          <div className="space-y-6">
            {recentActivity.map((item, index) => (
               <div key={item.id} className="relative pl-6 border-l-2 border-[#DEDBD0]">
                  <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${item.type === 'success' ? 'bg-[#3D4C38]' : 'bg-[#D4AF37]'}`}></div>
                  <p className="text-sm font-bold text-[#2B3326]">{item.text}</p>
                  <p className="text-[10px] text-[#5A6654] uppercase tracking-widest mt-1">{item.time}</p>
               </div>
            ))}
          </div>

          <button className="w-full mt-8 py-3 rounded-xl border border-[#DEDBD0] text-[#5A6654] text-xs font-bold uppercase tracking-widest hover:bg-[#E2E6D5] transition-colors">
             View Full History
          </button>
        </motion.div>

      </div>

    </motion.div>
  );
};

// --- SUB-COMPONENT: Stat Card ---
const StatCard = ({ title, value, subtext, icon, accentColor }) => (
  <div className="bg-[#F3F1E7] p-6 rounded-2xl shadow-md border border-[#DEDBD0] hover:border-[#3D4C38] transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 bg-[#E2E6D5] rounded-xl text-lg group-hover:bg-[#3D4C38] group-hover:text-[#F3F1E7] transition-colors ${accentColor}`}>
        {icon}
      </div>
    </div>
    <div>
      <p className="text-[#5A6654] text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-end gap-2">
         <h4 className="text-4xl font-['Oswald'] font-bold text-[#2B3326]">{value}</h4>
         <span className="text-[10px] text-[#5A6654] mb-2">{subtext}</span>
      </div>
    </div>
  </div>
);

export default GuideHome;