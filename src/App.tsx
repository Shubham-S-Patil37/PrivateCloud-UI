import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './containers/home'
import LogIn from './containers/login';
import Dashboard from './containers/dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
