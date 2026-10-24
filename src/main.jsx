import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import MenuPage from './pages/MenuPage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import './styles.css';
function App() { return <BrowserRouter><CartProvider><Header /><Routes><Route path="/" element={<MenuPage />} /><Route path="/item/:id" element={<ItemPage />} /><Route path="/cart" element={<CartPage />} /><Route path="*" element={<main className="page-container"><h1>Page not found</h1><a href="/">Return to menu</a></main>} /></Routes></CartProvider></BrowserRouter>; }
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
