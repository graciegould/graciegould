import React from 'react';
import ReactDOM from 'react-dom/client';
function App() {
    return (
        <div className='app-container'>
            <h1>Hello, World!</h1>
        </div>
    );
}
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);