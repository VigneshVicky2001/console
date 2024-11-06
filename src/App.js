import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Datastore from './components/datastore/Datastore';

const theme = createTheme();

function App() {
  const [logoUrl, setLogoUrl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // const isLoginPage = location.pathname === '/';
  return (
    <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#222222' }}>
        <Header toggleSidebar={toggleSidebar}  logoUrl={logoUrl} />
        <div style={{ flex: 1, display: 'flex', overflowY: 'auto' }}>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} isMinimized={sidebarOpen} />
          <div style={{ flexGrow: 1, marginTop: '70px' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/datastore" element={<Datastore />}/>
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
