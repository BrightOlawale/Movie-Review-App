import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import BrowserRouter from react-router-dom
// The BrowserRouter navigates the routes we have created in the App.js file.
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// // serviceWorker.unregister() is a function that is called to unregister a service worker.
// // A service worker is a script that your browser runs in the background, separate from a web page,
// // The serviceWorker.register() method is meant to create progressive web apps (PWA) 
// // catered more to mobile React native applications for offline work.
// // In this case, we are not using a service worker, so we unregister it.
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
