import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

console.log('Starting application initialization...');

// Ensure the root element exists
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Failed to find the root element');
  throw new Error('Failed to find the root element');
}

// Create root and render app
const root = createRoot(rootElement);
console.log('Root created successfully');

// Add error boundary for the root
try {
  console.log('Attempting to render App component...');
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
  console.log('App component rendered successfully');
} catch (error) {
  console.error('Failed to render the application:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; background: white; color: black;">
      <h1 style="color: red;">Application Error</h1>
      <p>Failed to load the application. Please check the console for errors.</p>
      <pre style="text-align: left; background: #f5f5f5; padding: 10px; margin: 10px 0;">
        ${error instanceof Error ? error.message : 'Unknown error'}
      </pre>
      <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
}
