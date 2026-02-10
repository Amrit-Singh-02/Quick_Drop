import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      setFormData({ email: "", password: "" });
      navigate("/");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Login"}
        </button>
        <div>
            <p><Link to={'/forgot-password'} >Forgot Password? </Link></p>
            <p>Donot have Account? <Link to={'/register'}>Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
