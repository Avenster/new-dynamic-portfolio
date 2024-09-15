import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Solar from './components/Solar';
import Footer from './components/Footer';
import Art from './components/Art';
import Response from './components/Response';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { UserProvider, UserContext } from './UserContext';
import axios from 'axios';
import './css/theme.css';
import './App.css';
import './css/button.css';
import './css/footer.css';

function Layout() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <div className="foot1">
        <p>Avenster © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

function HomePage() {
  const [selectedArt, setSelectedArt] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  return (
    <>
      <Solar selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
      <Art selectedArt={selectedArt} setSelectedArt={setSelectedArt} />
      <div id="response-component">
        <Response selectedArt={selectedArt} selectedTheme={selectedTheme} />
      </div>
      <Footer />
    </>
  );
}

function AppContent() {
  const { setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    }
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;