import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

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
import Information from './components/plotData/Information';
import Breakdown from './components/plotData/Breakdown';
import Deductions from './components/plotData/Deductions';
import Financials from './components/plotData/Financials';
import Toast from './components/notifications/Toast';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Toast />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/members" element={<GangInformation />} />
            <Route path="/plot-data" element={<PlotData />} >
              <Route index element={<Index/>}/>
              <Route path="edit" element={<Edit/>}>
                <Route path="information" element={<Information />}>
                  <Route path=':plotId' element={<Information />}/>
                </Route>
                <Route path="lift-breakdown">
                  <Route path=":plotId" element={<Breakdown />}/>
                </Route>
                <Route path="deductions">
                  <Route path=":plotId" element={<Deductions />}/>
                </Route>
                <Route path="financials">
                  <Route path=":plotId" element={<Financials />}/>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);

