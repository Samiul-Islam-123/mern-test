import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Pages/Public/LandingPage';
import Posts from './Pages/Private/Posts';
import Signup from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route 
          exact path="/posts" 
          element={<ProtectedRoute element={<Posts />} />} // Wrap Posts with ProtectedRoute
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
