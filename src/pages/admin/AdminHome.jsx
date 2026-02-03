import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer 
} from 'recharts';
import { FaUsers, FaMapMarkedAlt, FaCalendarCheck, FaArrowUp, FaArrowDown, FaEllipsisH } from 'react-icons/fa';

// --- MOCK DATA (Revenue Removed) ---
const userTypeData = [
  { name: 'Tourists', value: 1240 },
  { name: 'Guides', value: 45 },
  { name: 'Admins', value: 5 },
];

const COLORS = ['#3D4C38', '#8B9D77', '#D4AF37']; // Olive, Sage, Gold

const AdminHome = () => {
  
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
      // Added pb-20 to ensure content isn't cut off at the bottom
      className="w-full space-y-8 pb-20"
    >
      
      {/* ==================== 1. HEADER ==================== */}
      <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-['Oswald'] font-bold text-[#2B3326] uppercase tracking-wide">
            Dashboard
          </h1>
          <p className="text-[#5A6654] text-sm mt-1">
            Overview of platform performance and activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-xs font-bold uppercase tracking-widest text-[#5A6654] bg-[#F3F1E7] px-3 py-1 rounded-lg border border-[#DEDBD0]">
             Last 7 Days
           </span>
           <button className="bg-[#3D4C38] text-[#F3F1E7] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#2B3326] transition-colors">
             Export Report
           </button>
        </div>
      </motion.div>


      {/* ==================== 2. STATS GRID (3 Columns) ==================== */}
      <motion.div 
        variants={itemVars} 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard 
          title="Active Users" 
          value="1,240" 
          change="+5%" 
          isPositive={true} 
          icon={<FaUsers />} 
        />
        <StatCard 
          title="Total Bookings" 
          value="89" 
          change="-2%" 
          isPositive={false} 
          icon={<FaCalendarCheck />} 
        />
        <StatCard 
          title="Active Guides" 
          value="45" 
          change="+1" 
          isPositive={true} 
          icon={<FaMapMarkedAlt />} 
        />
      </motion.div>


      {/* ==================== 3. CONTENT SECTION ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* User Distribution Chart */}
        <motion.div 
          variants={itemVars} 
          className="lg:col-span-1 bg-[#F3F1E7] p-6 rounded-2xl shadow-xl shadow-[#3D4C38]/5 border border-[#DEDBD0]"
        >
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-['Oswald'] font-bold text-xl text-[#2B3326] uppercase">User Base</h3>
             <button className="text-[#3D4C38] hover:bg-[#E2E6D5] p-2 rounded-full transition-colors"><FaEllipsisH /></button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#2B3326', border: 'none', borderRadius: '8px', color: '#F3F1E7' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity Table (Expanded to take remaining space) */}
        <motion.div 
          variants={itemVars} 
          className="lg:col-span-2 bg-[#F3F1E7] rounded-2xl shadow-xl shadow-[#3D4C38]/5 border border-[#DEDBD0] overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-[#DEDBD0] flex justify-between items-center">
             <h3 className="font-['Oswald'] font-bold text-xl text-[#2B3326] uppercase">Recent Bookings</h3>
             <button className="text-xs font-bold text-[#3D4C38] uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead className="bg-[#E2E6D5]/50">
                <tr>
                  {['User', 'Destination', 'Date', 'Status'].map((head) => (
                    <th key={head} className="px-6 py-4 text-[10px] font-bold text-[#5A6654] uppercase tracking-widest">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDBD0]">
                {[1, 2, 3, 4, 5, 6].map((i) => ( // Added more rows to test scrolling
                  <tr key={i} className="hover:bg-[#E2E6D5]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#DEDBD0]"></div>
                        <span className="font-bold text-[#2B3326] text-sm">Alex Johnson</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#5A6654]">Chembra Peak</td>
                    <td className="px-6 py-4 text-sm text-[#5A6654]">Oct 24, 2024</td>
                    <td className="px-6 py-4">
                      <span className="bg-[#3D4C38]/10 text-[#3D4C38] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>

    </motion.div>
  );
};

// --- SUB-COMPONENT: Stat Card ---
const StatCard = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-[#F3F1E7] p-6 rounded-2xl shadow-md border border-[#DEDBD0] hover:border-[#3D4C38] transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-[#E2E6D5] rounded-xl text-[#3D4C38] text-lg group-hover:bg-[#3D4C38] group-hover:text-[#F3F1E7] transition-colors">
        {icon}
      </div>
      <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {isPositive ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
        {change}
      </span>
    </div>
    <div>
      <p className="text-[#5A6654] text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <h4 className="text-3xl font-['Oswald'] font-bold text-[#2B3326]">{value}</h4>
    </div>
  </div>
);

export default AdminHome;