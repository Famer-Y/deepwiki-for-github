import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import.meta.glob('./messaging/**/*.{ts,js}', { eager: true });

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <div
      className='flex flex-col items-center justify-center p-[8px] w-full h-lvh'
    >
      <App />
    </div>
  // </React.StrictMode>,
);
