import { useState } from "react";
import Button from "./Button";

function HomePage() {
  const [activeForm, setActiveForm] = useState("login"); // 'login' or 'signup'

  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
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
  return (
    <form className="flex flex-col items-center">
      <input
        type="email"
        placeholder="Email"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <input
        type="password"
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
  return (
    <form className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Full Name"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <input
        type="password"
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
