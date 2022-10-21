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
import GangInformation from './routes/GangInformation';
import Home from './routes/Home';
import PlotData from './routes/plotData/PlotData';
import Edit from './routes/plotData/Edit';
import Index from './routes/plotData/Index';
import Information from './components/plotData/Information'
import Breakdown from './components/plotData/Breakdown'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/members" element={<GangInformation />} />
            <Route path="/Plot-Data" element={<PlotData />} >
              <Route index element={<Index/>}/>
              <Route path="edit" element={<Edit/>}>
                <Route path="plot-information" element={<Information />}/>
                <Route path="lift-breakdown" element={<Breakdown />}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);

