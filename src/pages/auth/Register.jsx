import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('user'); // Default to Tourist
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // --- MOCK REGISTER LOGIC ---
    // Simulates a successful signup
    
    alert(`Account created successfully as a ${role === 'guide' ? 'Guide' : 'Tourist'}!`);
    
    if (role === 'guide') {
      navigate('/guide');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-96 border border-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">Create Account</h2>
        
        <input 
          type="text" placeholder="Full Name" required 
          className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input 
          type="email" placeholder="Email" required 
          className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input 
          type="password" placeholder="Password" required 
          className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">I am a:</label>
          <select 
            className="w-full p-3 border rounded focus:ring-2 focus:ring-emerald-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Tourist</option>
            <option value="guide">Local Guide</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition">
          Register
        </button>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-emerald-600 font-bold">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;