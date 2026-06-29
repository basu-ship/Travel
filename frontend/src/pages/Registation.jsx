import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if( !name || !email || !phone || !password){
        toast.error("Please fill all fields");
        return;
    }
    try {
      await axios.post("https://onepass-backend.onrender.com/api/users/register", {
        name,
        email,
        phone,
        password
      });

      toast.success("Registration successful!");
      navigate("/login");

    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-[#0b1120] via-[#1f1408] to-[#020617]">

      <div className="w-[90%] max-w-[420px] p-6 md:p-10 rounded-3xl
  bg-white/5 backdrop-blur-xl border border-white/10
    shadow-2xl text-white">

        <h1 className="text-center text-3xl font-bold text-yellow-400 mb-8">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 bg-transparent border-b border-white/30 py-2 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 bg-transparent border-b border-white/30 py-2 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full mb-4 bg-transparent border-b border-white/30 py-2 outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 bg-transparent border-b border-white/30 py-2 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-yellow-500 text-black py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;