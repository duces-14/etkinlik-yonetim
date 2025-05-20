import React from 'react'; {/* React kutuphanesi projeye dahil ettik. */}	
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
{/* 
    Kok bilesen dosyasi olan App.jsx dosyasini iceri aldik.
    Bu bilesen tum uygulamanin UI agacinin baslangicidir. 
    "./" seklinde yazmamiz bu dosya ile ayni klasor icinde oldugunu belirtir.
    */}

import { EventProvider } from './context/EventContext.jsx'; // Context'i getirdik.

import './index.css';
{/*
    Tum sayfa genelinde gecerli olacak CSS dosyasini iceri aldik.
    React bilesenleri JS dosyalaridir ki CSS dosyalari da JS icinde import edilerek baglanirdi hatirla.
    */}


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <App /> */}
        <EventProvider> {/* Sarma islemini yapiyoruz */}
            <App />
        </EventProvider>
    </React.StrictMode>
); {/* React bilesenleri DOM'a yerlestirildi. */}

{/*
    Bu dosya React uygulamasinin ilk calisan noktasidir.
    Hedefi HTML'deki id="root" adli DOM elemanina baglanmaktir.
    Yapisal olarak "App" bilesenini orada render edip CSS'i uygular ve React kurallarina gore calistirir.
    */}