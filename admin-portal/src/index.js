import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './AdminApp';
import './AdminApp.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AdminApp />);
