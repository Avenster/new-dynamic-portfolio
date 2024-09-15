import "../css/singup.css";
import { Mail, Lock } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext"; 

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext);

  async function submit(e) {
    e.preventDefault(); 
    setLoading(true);
    try {
      const response = await axios.post("https://51.20.55.249:8000/login", {
        email,
        password,
      });

      if (response.data.status === "success") {
        setSuccessMessage("Login Successfully!");
        setErrorMessage("");
        const userData = { 
          email, 
          name: response.data.name,
          token: response.data.token
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (response.data.status === "error") {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
      }
    } catch (e) {
      console.log(e);
      setErrorMessage("Enter the correct password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup">
      <img className="svv" src="bg-3.svg" alt="" />
      <div className="signup-inner">
        <div className="sig-left">
          <div className="upperTxt">
            <h1>Welcome to NebulaAI</h1>
            <p>Your Creative Vision, Powered by AI</p>
          </div>
          <div className="loweTxt">
            <p>
              Bring your artistic dreams to life with NebulaAI. Simply describe
              your unique style, and let our AI generate a digital portfolio
              that perfectly reflects your vision. Whether you’re an
              illustrator, painter, or digital artist—our platform makes
              creativity effortless!
            </p>
          </div>
        </div>
        <div className="sig-right">
          <div className="sig-form">
            <form className="sig-form1" onSubmit={submit}>
              <div className="input">
                <div className="sig-img">
                  <Mail size={20} />
                </div>
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <div className="sig-img">
                  <Lock size={20} />
                </div>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="sig-btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"} {/* Show loading text if loading */}
              </button>
              {successMessage && (
              <div style={{ color: "green", display:"flex", height:"4vh", width:"100%",fontFamily:"Source Code pro,monospace", justifyContent:"center",alignItems:"center" }}>
                {successMessage}
              </div>
              )}
              {errorMessage && (
              <div style={{ color: "red", display:"flex", height:"6vh", width:"100%",fontFamily:"Source Code pro,monospace", justifyContent:"center",alignItems:"center"}}>
                {errorMessage}
              </div>
            )}
            </form>
            <div className="g-sign">
              <p>Sign up to generate your responses</p>
              <div className="icons-sign">
                <div className="i1 gg">
                  <FaGoogle />
                </div>
                <div className="i1 git">
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}