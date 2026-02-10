// import { useState } from "react"
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email,setEmail]=useState('');
//   const {forgotPassword,loading}=useAuth();
//   const navigate=useNavigate();
//   const handleSubmit=async(e)=>{
//     e.preventDefault();
//     const result=await forgotPassword(email);
//     if(result.success){
//       navigate('/reset-password-pending');
//     }

//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Forgot Password
//           </h2>
//           <p className="text-gray-600">
//             Enter your email to receive a verification link
//           </p>
//         </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
//             >
//               {loading ? 'Sending...' : 'Send Verification Link'}
//             </button>
//           </form>

//       </div>
//     </div>
//   );
// }

// export default ForgotPassword

// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);

//   const [resending, setResending] = useState(false);
//   const [countdown, setCountdown] = useState(0);

//   // Countdown timer
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const { forgotPassword, loading } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await forgotPassword(email);

//     if (result.success) {
//       setSent(true);
//     }
//   };

//   const handleResend = async () => {
//     try {
//       setResending(true);
//       const result = await forgotPassword(email);
//       if (result.success) {
//         setCountdown(60);
//       }
//     } finally {
//       setResending(false);
//     }
//   };

//   if (!email) return null;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
//         {sent && (
//           // <>
//           //   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           //     <svg
//           //       className="w-8 h-8 text-blue-600"
//           //       fill="none"
//           //       stroke="currentColor"
//           //       viewBox="0 0 24 24"
//           //     >
//           //       <path
//           //         strokeLinecap="round"
//           //         strokeLinejoin="round"
//           //         strokeWidth="2"
//           //         d="M16 12H8m8 0l-4-4m4 4l-4 4"
//           //       />
//           //     </svg>
//           //   </div>

//           //   <h2 className="text-2xl font-bold text-gray-800 mb-2">
//           //     Check your email
//           //   </h2>
//           //   <p className="text-gray-600 mb-4">
//           //     We’ve sent a password reset link to:
//           //   </p>
//           //   <p className="font-medium text-gray-800 mb-6">{email}</p>

//           //   <p className="text-sm text-gray-500">
//           //     Didn’t receive it? Check your spam folder.
//           //   </p>
//           // </>

//           <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//             <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
//               {/* Email Icon */}
//               <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <svg
//                   className="w-10 h-10 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>

//               <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
//                 Check Your Email
//               </h2>

//               <p className="text-center text-gray-600 mb-2">
//                 We've sent a password reset link to
//               </p>

//               <p className="text-center text-lg font-semibold text-gray-800 mb-6">
//                 {email}
//               </p>

//               {/* Instructions */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                 <h3 className="font-semibold text-gray-800 mb-2">
//                   What's next?
//                 </h3>
//                 <ol className="text-sm text-gray-700 space-y-2">
//                   <li>1. Check your inbox (and spam folder)</li>
//                   <li>2. Click the reset link in the email</li>
//                   <li>3. Enter your new password</li>
//                 </ol>
//               </div>

//               {/* Resend */}
//               <div className="text-center mb-6">
//                 <p className="text-sm text-gray-600 mb-3">
//                   Didn't receive the email?
//                 </p>

//                 <button
//                   onClick={handleResend}
//                   disabled={resending || countdown > 0}
//                   className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//                 >
//                   {resending
//                     ? "Sending..."
//                     : countdown > 0
//                       ? `Resend in ${countdown}s`
//                       : "Resend Reset Link"}
//                 </button>
//               </div>

//               <div className="border-t pt-6 text-center">
//                 <Link
//                   to="/login"
//                   className="text-sm text-blue-600 hover:text-blue-700"
//                 >
//                   Back to Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}

//         {!sent && (
//           <>
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                 Forgot Password
//               </h2>
//               <p className="text-gray-600">
//                 Enter your email to receive a verification link
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
//               >
//                 {loading ? "Sending..." : "Send Verification Link"}
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { forgotPassword, loading } = useAuth();

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await forgotPassword(email);
    if (result.success) {
      setSent(true);
      setCountdown(60);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      const result = await forgotPassword(email);
      if (result.success) {
        setCountdown(60);
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">

        {/* ✅ EMAIL SENT */}
        {sent && (
          <>
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

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Check Your Email
            </h2>

            <p className="text-gray-600 mb-2">
              We've sent a password reset link to
            </p>

            <p className="text-lg font-semibold text-gray-800 mb-6">
              {email}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">
                What’s next?
              </h3>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. Check your inbox (and spam)</li>
                <li>2. Click the reset link</li>
                <li>3. Set a new password</li>
              </ol>
            </div>

            <button
              onClick={handleResend}
              disabled={resending || countdown > 0}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition mb-4"
            >
              {resending
                ? "Sending..."
                : countdown > 0
                ? `Resend in ${countdown}s`
                : "Resend Reset Link"}
            </button>

            <div className="border-t pt-4">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}

        {/* 📧 FORM */}
        {!sent && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your email to receive a verification link
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? "Sending..." : "Send Verification Link"}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
