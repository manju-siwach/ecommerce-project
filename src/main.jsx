import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from './Pages/Home.jsx';
import Product from './Pages/Product.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';


import ProtectedRoute from './Components/ProtectedRoute.jsx';
import CartProvider from './Components/CartProvider.jsx';
import CartPage from './Components/CartPage.jsx';

import Effect from './Pages/Effect.jsx';
import Products from './Pages/Products.jsx';
import ProductDetails from "./Pages/ProductDetails.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx';
import Essentials from './Pages/Essentials.jsx';
import ProductsDetail from './Pages/ProductsDetail.jsx';
import EssentialDetail from './Pages/EssentialDetail.jsx';
import OrderHistoryPage from './Pages/OrderHistoryPage.jsx';
import PaymentPage from './Pages/PaymentPage.jsx';
import Ant from "./Pages/Ant.jsx";
import Checkout from "./Pages/Checkout.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <>



        <BrowserRouter>
          <Header />
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/product' element={<Product />} />
            <Route path='/products' element={<Products />} />
            <Route path='/effect' element={<Effect />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path='/app' element={<App />} />
            <Route path='/essentials' element={<Essentials />} />
            <Route path="/price/:id" element={<ProductsDetail />} />
            <Route path="/essential/:id" element={<EssentialDetail />} />
            <Route path='/cart' element={<CartPage />} />

            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/payment/:orderId" element={<PaymentPage />} />
            <Route path="/ant" element={<Ant />} />
            <Route path="/checkout/:id" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </>
    </CartProvider>
  </StrictMode>
);
