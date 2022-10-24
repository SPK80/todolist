import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {AppContent} from "./AppContent";

export const App = () => (
  <BrowserRouter>
    <AppContent/>
  </BrowserRouter>
)
