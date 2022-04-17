import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import 'macro-css';
import './index.scss';
import App from './App';
import { store } from './redux/store';


const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
<BrowserRouter>
<Provider store={store}>
<App tab="home" /> 
</Provider>       
</BrowserRouter>);
