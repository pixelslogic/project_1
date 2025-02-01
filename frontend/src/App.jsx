import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking';
import Auth from './pages/Auth';
import AppRouter from './components/AppRouter';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Booking />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>
    );
}

export default App;
