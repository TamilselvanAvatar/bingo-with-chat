import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './App/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <h1 style={{ fontStyle: 'italic', fontSize: 'bold', width: '75%', margin: 'auto', textAlign: 'center', background: 'green', borderRadius: '10px' }}>Welcome To Bingo Board</h1>
        <Login />
    </React.StrictMode>
);