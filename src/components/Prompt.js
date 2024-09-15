import React,{ useContext } from 'react'
import DynamicText from './DynamicText.js'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
export default function Prompt() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
  
    const handleGetStarted = () => {
      if (user) {
        const responseElement = document.querySelector('#response-component');
        if (responseElement) {
          responseElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else { 
        navigate('/login');
      }
    };
  return (
    <div className='prompt-box'>
        <div className="upper">
            <h1>Explore the Possibilities of AI Chatting with NebulaAI</h1>
            <p>Unleash the power of AI within NebulaAI. Upgrade your productivity with Nebula Ai, the open AI chat app.</p>
            <span >
            <button className='btn-n-n' onClick={handleGetStarted}>Get Started</button>
            </span>
            
        </div>
        <div className="lower">
            <div className='mac'>
                <div className='dot'>
                    <span className='red'></span>
                    <span className='ye'></span>
                    <span className='gr'></span>
                </div>
                <div className='prompt-head'>
                    <p>PORTFOLIO GENERATOR</p>
                </div>

            </div>
            <div className='prompt'>
            <div className='img-theme'>
                    <img src="th.png" alt="" />
                </div>
            {/* <span>></span> */}
            <div className="wrapper">
            <div className="typing-demo">
                    Genetate your Respose....
                </div>
            </div>

            <div className='box-1'>
            <DynamicText />
                
            </div>
            
            </div>

        </div>
        
    </div>
  )
}
