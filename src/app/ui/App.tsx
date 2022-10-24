import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppContent } from "./AppContent";

export const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);
