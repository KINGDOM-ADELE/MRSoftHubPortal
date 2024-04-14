import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContextProvider } from './Context/App_Context';


import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Admin from "./Admin";

function App() {
  return (
    <AppContextProvider >
      <BrowserRouter>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppContextProvider >
  );
}

export default App;
