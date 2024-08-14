import './css/main.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import page from 'page';
const loadPage = async (pageName) => {
    return await import(`./${pageName}`).default;
};
// const pages = {
//     main: {
//         entry: 'pages/main/main',
//         url: '/',
//     }
// };

// Object.keys(pages).forEach(pageName => {
//     page(pages[pageName].url, async () => {
//          await loadPage(pages[pageName].entry);
//     });
// });

// page();
// if (module.hot) {
//     module.hot.accept();
// }
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);