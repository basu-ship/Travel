import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email || !password){
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/search"); 
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0b1120] via-[#1f1408] to-[#020617]">

      <div className="w-400px p-10 rounded-3xl 
      bg-white/5 backdrop-blur-xl border border-white/10 
      shadow-2xl text-white">

        <h1 className="text-center text-xl font-semibold text-yellow-300">
          OnePass
        </h1>
        <div className="mb-6">
          {/* email */}
          <input
            type="email"
            placeholder="enter your email"
            className="w-full bg-transparent border-b border-white/30 
            py-2 outline-none focus:border-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-2">
          {/* password */}
          <input
            type="password"
            placeholder="enter your password"
            className="w-full bg-transparent border-b border-white/30 
            py-2 outline-none focus:border-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-right text-sm text-gray-400 mb-6 cursor-pointer hover:text-yellow-400">
          Forgot password?
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 
          text-black py-3 rounded-full font-semibold 
          hover:scale-105 transition duration-300"
        >
          Log in
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <span 
          onClick={()=> navigate("/register")}
          className="text-yellow-400 cursor-pointer hover:underline">
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;