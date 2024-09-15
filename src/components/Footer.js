import React from 'react'
import { FaBeer, FaFacebook, FaGithub , FaTwitter, FaLinkedin ,FaInstagram} from 'react-icons/fa';
export default function Footer() {
  return (
    <div className="foot">
      <div className="foot-1">
        <div className="logo"><img  className ='logo1' src="logo1.svg" alt="" />NebulaAi</div>
        <div className="text">
        <div className="text-1">
        <a className='tex' href="">Home</a>
        <a className='tex' href="">Owner</a>
        <a className='tex' href="">New Account</a>
        </div>
        <div className="soi">
        <a href="https://github.com/Avenster" target="_blank" rel="noopener noreferrer">
          <FaGithub style={{ color: 'white' }} />
        </a>
        <a href="https://x.com/AnkurKaush53614" target="_blank" rel="noopener noreferrer">
          <FaTwitter style={{ color: '#1da1f2' }} />
        </a>
        <a href="https://linkedin.com/in/ankur-kaushal-11035b259" target="_blank" rel="noopener noreferrer">
          <FaLinkedin style={{ color: '#0077B5' }} />
        </a>
        <a href="https://instagram.com/ig_ankurkaushal" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <FaInstagram style={{ color: '#C13584' }} />
          
        </a>
        </div>
        </div>
      </div>
    </div>
  )
}
