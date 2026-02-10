import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResendVerification = () => {
    const [email,setEmail]=useState('');
    const {resend,loading}=useAuth();
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!email){
            toast.error('Please Enter your email');
            return;
        }
        const result=await resend(email);
        if(result.success){
          navigate('/verification-pending')
         
        }

    }

 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Resend Verification Link
          </h2>
          <p className="text-gray-600">
            Enter your email to receive a new verification link
          </p>
        </div>

        
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Sending...' : 'Send Verification Link'}
            </button>
          </form>
        

       
      </div>
    </div>
  );
};

export default ResendVerification;
