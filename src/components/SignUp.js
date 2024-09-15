import React, { useState,useContext  } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { FaGithub, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate, Link } from 'react-router-dom';
import '../css/singup.css';

export default function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/signup", {
                name,
                email,
                password
            });
            
            if (response.data.status === "success") {
                const userData = { 
                    email, 
                    name,
                    token: response.data.token // Store the JWT
                };
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData); // Update the global user state
                // Set the JWT in axios defaults for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                
                setTimeout(() => {
                    navigate("/");
                }, 2000); 
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    }


    return (
        <div className='signup'>
            <img className='svv' src="bg-3.svg" alt="" />
            <div className='signup-inner'>
                <div className="sig-left">
                    <div className='upperTxt'>
                        <h1>Welcome to NebulaAI</h1>
                        <p>Your Creative Vision, Powered by AI</p>
                    </div>
                    <div className="loweTxt">
                        <p>Bring your artistic dreams to life with NebulaAI. Simply describe your unique style, and let our AI generate a digital portfolio that perfectly reflects your vision. Whether you're an illustrator, painter, or digital artist—our platform makes creativity effortless!</p>
                    </div>
                </div>
                <div className="sig-right">
                    <div className='sig-form'>
                        <form className='sig-form1' onSubmit={submit}>
                            <div className='input'>
                                <div className='sig-img'>
                                    <User size={20} />
                                </div>
                                <input 
                                    placeholder='Name' 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='input'>
                                <div className='sig-img'>
                                    <Mail size={20} />
                                </div>
                                <input 
                                    placeholder='Email' 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='input'>
                                <div className='sig-img'>
                                    <Lock size={20} />
                                </div>
                                <input 
                                    placeholder='Password' 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className='sig-btn'>Sign Up</button>
                        </form>
                        <div className='g-sign'>
                            <p>Sign up to generate your responses</p>
                            <div className='icons-sign'>
                                <div className='i1 gg'>
                                    <FaGoogle/>
                                </div>
                                <div className='i1 git'>
                                    <FaGithub/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}