import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const VerificationPending = () => {
const {resend,loading}=useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

//   const [resending, setResending] = useState(false);
  const [countdown, setCountDown] = useState(0);

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountDown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend=async()=>{
    const result=await resend(email);
    console.log(result)
    if(result.success){
        setCountDown(60);
    }
  }

  if(!email){ return null};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        {/* Email Icon */}
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-10 h-10 text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Check Your Email
        </h2>
        
        <p className="text-center text-gray-600 mb-2">
          We've sent a verification link to
        </p>
        
        <p className="text-center text-lg font-semibold text-gray-800 mb-6">
          {email}
        </p>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            What's next?
          </h3>
          <ol className="text-sm text-gray-700 space-y-2 ml-7">
            <li>1. Check your inbox (and spam folder)</li>
            <li>2. Click the verification link in the email</li>
            <li>3. You'll be redirected to login</li>
          </ol>
        </div>

        {/* Resend Section */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-3">
            Didn't receive the email?
          </p>
          
          <button
            onClick={handleResend}
            disabled={loading || countdown > 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading
              ? 'Sending...' 
              : countdown > 0 
                ? `Resend in ${countdown}s` 
                : 'Resend Verification Email'
            }
          </button>
        </div>

        {/* Additional Actions */}
        <div className="border-t pt-6 space-y-3">
          <Link 
            to="/login"
            className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Already verified? Login here
          </Link>
          
          <button
            onClick={() => navigate('/register', { replace: true })}
            className="block w-full text-center text-sm text-gray-600 hover:text-gray-800"
          >
            Use a different email address
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>💡 Tips:</strong> Check your spam/junk folder. 
            Add us to your contacts to ensure delivery. 
            The verification link expires in 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;

