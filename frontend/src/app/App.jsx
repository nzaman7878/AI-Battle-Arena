import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '../pages/LoginPage';
import HistoryPage from '../pages/HistoryPage';
import ChatInterface from '../components/ChatInterface';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route 
        path="/arena" 
        element={
          <ProtectedRoute>
            <ChatInterface />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;