// import { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';


// const VerifyEmail = () => {
//   const { verifyMail } = useAuth();
//   const { emailToken } = useParams();
//   const navigate = useNavigate();
  
//   const [status, setStatus] = useState('verifying');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         setLoading(true);
//         const result = await verifyMail(emailToken);
        
//         if (result.success) {
//           setStatus('success');
//           setMessage('Email verified successfully!');
          
//           setTimeout(() => {
//             navigate('/login');
//           }, 3000);
//         } else {
//           setStatus('error');
//           setMessage(result.error || 'Verification failed');
//         }
//       } catch (error) {
//         setStatus('error');
//         setMessage('An unexpected error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (emailToken) {
//       verify();
//     }
//   }, [emailToken, navigate]); // ✅ Removed verifyMail from dependencies

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
//         {loading && status === 'verifying' && (
//           <>
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Verifying Your Email
//             </h2>
//             <p className="text-gray-600">Please wait...</p>
//           </>
//         )}

//         {status === 'success' && (
//           <>
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Email Verified!
//             </h2>
//             <p className="text-gray-600 mb-4">{message}</p>
//             <p className="text-sm text-gray-500">
//               Redirecting to login in 3 seconds...
//             </p>
//           </>
//         )}

//         {status === 'error' && (
//           <>
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Verification Failed
//             </h2>
//             <p className="text-gray-600 mb-6">{message}</p>
            
//             <div className="space-y-3">
//               <Link 
//                 to="/resend-verification"
//                 className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//               >
//                 Request New Link
//               </Link>
//               <Link 
//                 to="/login"
//                 className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
//               >
//                 Back to Login
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const VerifyEmail = () => {
  const { verifyMail, loading, error,resend } = useAuth();
  const { emailToken } = useParams();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      const result = await verifyMail(emailToken);

      if (result?.success) {
        setSuccessMessage(result.message);

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    if (emailToken) {
      verify();
    }
  }, [emailToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">

        {/* LOADING */}
        {loading && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verifying Your Email
            </h2>
            <p className="text-gray-600">Please wait...</p>
          </>
        )}

        {/* SUCCESS */}
        {!loading && successMessage && !error && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-4">{successMessage}</p>
            <p className="text-sm text-gray-500">
              Redirecting to login in 3 seconds...
            </p>
          </>
        )}

        {/* ERROR */}
        {!loading && error && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>

            <div className="space-y-3">
              <Link
                to="/resend-verification"
                className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Request New Link
              </Link>

              <Link
                to="/login"
                className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;
