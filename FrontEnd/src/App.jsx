import {Toaster} from 'react-hot-toast';
import Registration from './component/Auth/Registration';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './component/Auth/Login';
import VerifyEmail from './component/Auth/VerifyEmail';
import VerificationPending from './component/Auth/VerificationPending';
import ResendVerification from './component/Auth/ResendVerification';
import ForgotPassword from './component/Auth/ForgotPassword';
import ResetPassword from './component/Auth/ResetPassword';
function App() {

  return (
    <>
     <Toaster position='top-right'/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/verification-pending" element={<VerificationPending/>} />

        <Route path="/verify-email/:emailToken" element={<VerifyEmail/>} />
        <Route path="/resend-verification" element={<ResendVerification/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:passwordToken" element={<ResetPassword/>} />
        
      


        <Route path="*" element={<div>404- Page not Found!</div>} />
     </Routes>
    </>
  )
}

export default App
