import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// Projeto realizado com a ajuda do Notion da tribo 13A https://www.notion.so/Gabaritos-e-Solu-es-de-Exerc-cios-de-Programa-o-7651c81ce6624473a1d66ffb0a2bd053?p=332f9886963a4491bf58da84a11f1a6b 
serviceWorker.unregister();
