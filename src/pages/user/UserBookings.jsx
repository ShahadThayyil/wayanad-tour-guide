import { myBookingsData } from '../../data/mockData'; // Import dummy data

const UserBookings = () => {
  
  // Helper to color code status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-emerald-900 mb-8">My Trip Status</h2>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50 text-emerald-900 border-b border-emerald-100">
                  <th className="p-5 font-semibold">Destination</th>
                  <th className="p-5 font-semibold">Guide</th>
                  <th className="p-5 font-semibold">Date</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {myBookingsData.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-slate-50 transition">
                    <td className="p-5 font-medium text-slate-700">{booking.place}</td>
                    <td className="p-5 text-gray-600">{booking.guideName}</td>
                    <td className="p-5 text-gray-600">{booking.date}</td>
                    <td className="p-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase border ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-5">
                      {booking.status === 'confirmed' && (
                        <button className="text-emerald-600 hover:underline text-sm font-medium">Chat with Guide</button>
                      )}
                      {booking.status === 'pending' && (
                        <button className="text-red-500 hover:underline text-sm font-medium">Cancel Request</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookings;