import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'macro-css';
import './index.scss';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<BrowserRouter><App tab="home" /></BrowserRouter>);
