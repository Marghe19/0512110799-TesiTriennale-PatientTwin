import React, { } from 'react';
import './App.css';

import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import Welcome from "./screens/Welcome";
import LoginScreen from "./screens/LoginScreen"

function App() {
    return (
        <div className="vh-100 gradient-custom">
            <div className="container">
                <h1 className="page-header text-center">Patient Twin</h1>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/login" element={<LoginScreen />} />
                    </Routes>
                </BrowserRouter>

            </div>
        </div>
    );
}

export default App;