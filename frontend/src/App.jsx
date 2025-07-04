import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import React, { useState } from 'react';
import NavBar from './components/Navbar';
import TravelSearchForm from './components/TravelSearchForm';
import Auth from "./pages/Auth";
import FlightDeals from './components/FlightDeals';
import PlacesToStay from './components/PlacesToStay';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

const App = () => {
    const [showAuth, setShowAuth] = useState(false);
    const handleShowAuth = () => setShowAuth(true);
    const handleCloseAuth = () => setShowAuth(false);

    return (
        <>
            <NavBar onLoginClick={handleShowAuth} />
            <Auth show={showAuth} handleClose={handleCloseAuth} />
            <TravelSearchForm />
            <AppRouter />
            <FlightDeals />
            <PlacesToStay />
            <Reviews />
            <Footer />
        </>
    );
};

export default App;
