import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedPage from "./pages/feed";
import PageNotFound from "./pages/404";
import Footer from "./components/footer";
import './App.css';
import AccountPage from "./pages/account";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <FeedPage/> }/>
          <Route path="/account" element={ <AccountPage/> }/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
