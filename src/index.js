import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'

import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Navbar from './components/navbar/Navbar';
import Auth from './components/auth/Auth';

import { theme } from './theme/Theme';
import { ThemeProvider } from '@mui/material';
import GangInformation from './components/gangInformation/GangInformation';
import Home from './components/home/Home';

  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="/gang-information" element={<GangInformation />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);

