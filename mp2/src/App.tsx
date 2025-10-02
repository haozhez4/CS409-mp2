import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavLink, Routes, Route } from "react-router-dom";
import ListView from "./pages/ListView";
import GalleryView from "./pages/GalleryView";
import DetailView from "./pages/DetailView";


export default function App() {
  return (
    <>
      <nav style={{display:"flex",gap:12,padding:12,borderBottom:"1px solid #eee"}}>
        <NavLink to="/" end>List</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<ListView/>}/>
        <Route path="/gallery" element={<GalleryView/>}/>
        <Route path="/pokemon/:name" element={<DetailView/>}/>
      </Routes>
    </>
  );
}

