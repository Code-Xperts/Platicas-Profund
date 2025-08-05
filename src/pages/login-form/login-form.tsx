"use client"

import Button from "@/components/Base/Button"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginHoverForm() {
  const [isHovered, setIsHovered] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false) // To show errors only after first submission attempt
const navigate = useNavigate() // Assuming you have a useNavigate hook from react-router-dom
  const validateForm = () => {
    let isValid = true
    setEmailError(null)
    setPasswordError(null)

    if (!email) {
      setEmailError("Email is required.")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.")
      isValid = false
    }

    if (!password) {
      setPasswordError("Password is required.")
      isValid = false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.")
      isValid = false
    }

    return isValid
  }

  const handleNavigate = () => {
      navigate ("/user-table") 
  }
/*******  66451e14-bd65-478f-b1e4-5f79b8df67cf  *******/
const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
  setFormSubmitted(true);

  if (validateForm()) {
    // ✅ Navigate only after validation passes
    navigate("/user-table");

    // Reset form
    setEmail("");
    setPassword("");
    setEmailError(null);
    setPasswordError(null);
    setIsHovered(false);
    setFormSubmitted(false);
  } else {
    console.log("Form validation failed.");
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      {/* Main container for hover effect and animated border */}
      <div
        className={`
          w-full max-w-sm flex items-center justify-center
          rounded-xl transition-all duration-300 ease-in-out cursor-pointer
          animated-border-container
          ${isHovered ? "hovered h-[420px] shadow-2xl" : "h-[100px] bg-white dark:bg-gray-800 shadow-lg"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner content area that covers the gradient to create the border effect */}
        <div className="animated-border-content w-full h-full">
          {/* Initial text when not hovered */}
          {!isHovered && <span className="text-xl w-full font-bold text-gray-700 text-center dark:text-gray-300">Login Here</span>}

          {/* Login Form - appears on hover */}
          <div
            className={`
            w-full h-full
            transform transition-all duration-500 ease-in-out
            ${isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
            flex flex-col
            bg-white dark:bg-gray-950
            rounded-xl border border-gray-200 dark:border-gray-700 text-card-foreground shadow-lg
          `}
          >
            {/* Form Header */}
            <div className="flex flex-col space-y-2 p-6 pb-4">
              <h3 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-50">
                Welcome Back!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enter your credentials to access your account.</p>
            </div>
            {/* Form Content */}
            <div className="p-6 pt-0 space-y-5 flex-grow">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-300 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                    h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:focus:ring-primary"
                    aria-invalid={formSubmitted && emailError ? "true" : "false"}
                    aria-describedby="email-error"
                  />
                  {formSubmitted && emailError && (
                    <p id="email-error" className="text-red-500 text-sm font-medium" role="alert">
                      {emailError}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-gray-700 dark:text-gray-300 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                    h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:focus:ring-primary"
                    aria-invalid={formSubmitted && passwordError ? "true" : "false"}
                    aria-describedby="password-error"
                  />
                  {formSubmitted && passwordError && (
                    <p id="password-error" className="text-red-500 text-sm font-medium" role="alert">
                      {passwordError}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-md font-bold shadow-md hover:bg-primary/90 transition-colors duration-200"
                >
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Internal CSS for the animated border effect */}
      <style>{`
        .animated-border-container {
          position: relative;
          border-radius: 0.75rem; /* Increased border-radius for a softer look */
          overflow: hidden;
          padding: 2px;
          background-color: transparent;
          transition: height 0.5s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .animated-border-container::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 20%,
            #ff0000 25% /* Red */,
            #ff0000 30%,
            transparent 35%,
            transparent 45%,
            #00ff00 50% /* Green */,
            #00ff00 55%,
            transparent 60%,
            transparent 70%,
            #0000ff 75% /* Blue */,
            #0000ff 80%,
            transparent 85%,
            transparent 100%
          );
          animation: rotate-gradient 4s linear infinite;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .animated-border-container.hovered::before {
          opacity: 1;
        }

        @keyframes rotate-gradient {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animated-border-content {
          background-color: white;
          border-radius: inherit;
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark .animated-border-content {
          background-color: #1a202c; /* A darker background for dark mode */
        }
      `}</style>
    </div>
  )
}
