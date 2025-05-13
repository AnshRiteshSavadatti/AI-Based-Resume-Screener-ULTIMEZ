import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [activeForm, setActiveForm] = useState("login"); // 'login' or 'signup'

  return (
    <div className="p-8 max-w-4xl mx-auto text-center bg-white h-lvh mt-10 mb-10">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the AI-Based Resume Screener
      </h1>
      <p className="text-lg mb-8">
        Revolutionize your hiring process with cutting-edge AI technology. Our
        system automatically evaluates resumes, identifying top candidates
        faster and more accurately than ever before.
      </p>

      <div className="flex justify-center gap-4 mb-6">
        <span
          className={`text-lg font-semibold cursor-pointer ${
            activeForm === "login" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveForm("login")}
        >
          Login
        </span>
        <span
          className={`text-lg font-semibold cursor-pointer ${
            activeForm === "signup" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveForm("signup")}
        >
          Signup
        </span>
      </div>

      {activeForm === "login" && <LoginForm />}
      {activeForm === "signup" && <SignupForm />}
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ai-based-resume-screener-ultimez.onrender.com/api/auth/sign-in",
        // "http://localhost:5000/api/auth/sign-in",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/form");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
        Login
      </Button>
    </form>
  );
}

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ai-based-resume-screener-ultimez.onrender.com/api/auth/sign-up",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/form");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col items-center">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create Password"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <Button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
        Signup
      </Button>
    </form>
  );
}

export default HomePage;
