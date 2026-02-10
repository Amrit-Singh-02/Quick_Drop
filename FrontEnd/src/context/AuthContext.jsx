import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.current();
      setUser(response.payload);
      setIsAuthenticated(true);
    } catch (error) {
      const errMsg = error.response?.data?.message;
      setUser(null);
      setIsAuthenticated(false);
      setError(errMsg);
      console.log("user not authenticated");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userdata) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userdata);
      // setUser(response.payload.email)
      toast.success(response.message || "user Registered successfully.");
      console.log(response);
      return { success: true };
    } catch (error) {
      const errMsg = error.response?.data?.message || "Registeration Failed";
      console.log(error.response);
      setError(errMsg);
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const verifyMail = async (emailToken) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.verifyEmail(emailToken);
      toast.success(response.message || "Email Verified Successfully.");
      return { success: true ,message:response.message};
    } catch (error) {
      const errMsg = error.response?.data?.message || "Email not verified";
      setError(errMsg);
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const resend = async (email) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.resendVerification(email);
      toast.success(response.message || "Verification link resend");
      console.log(response);
      return { success: true };
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Verification link resend failed";
      console.log(error.response);
      setError(errMsg);
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credential) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credential);
      setUser(response.payload);
      setIsAuthenticated(true);
      console.log(response);
      toast.success(response.message || "Login Successfully");
      return { success: true, data: response };
    } catch (error) {
      const errMsg = error.response?.data?.message || "Login Failed";
      setError(errMsg);
      toast.error(errMsg);
      console.log(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword=async(email)=>{
    try {
        setLoading(true);
        setError(null);
        const response=await authService.forgotPass(email);
        console.log(response)
        toast.success(response.message ||'Verification link send');
        return{success:true};
    } catch (error) {
        const errMsg=error.response?.data?.message || 'Failed to send verification link';
        setError(errMsg);
        toast.error(errMsg);
        return{success:false,error:errMsg}
    }finally{
        setLoading(false);
    }
  }

  const resetPassword=async(passwordToken,password)=>{
    try {
        setLoading(true);
        setError(null);
        const response= await authService.resetPassword(passwordToken,password);
        toast.success(response.message || 'Password reset successfully!');
        return {success:true,message: response.message}
    } catch (error) {
        const errMsg=error.response?.data?.message || 'Failed to reset Password';
        setError(errMsg);
        toast.error(errMsg);
        return {success:false,error:errMsg}
    }finally{
        setLoading(false);
    }

  }

  const value = {
    register,
    login,
    verifyMail,
    resend,
    forgotPassword,
    resetPassword,
    loading,
    user,
    error,
    isAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
