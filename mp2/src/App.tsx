import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { NavLink, Routes, Route } from "react-router-dom";
import ListView from "./pages/ListView";
import GalleryView from "./pages/GalleryView";
import DetailView from "./pages/DetailView";


export default function App() {
  return (
    <>
      <header className="site-header">
        <h1 className="site-title">Pokémon Directory</h1>
        <p className="site-subtitle">Search • Sort • Explore your Pokédex</p>
      </header>

      <nav>
        <div className="nav">
          <NavLink to="/" end>List</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </div>
      </nav>


      <main className="app">
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/pokemon/:name" element={<DetailView />} />
        </Routes>
      </main>
    </>
  );
}

