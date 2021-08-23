import React from 'react';
import { screen } from '@testing-library/react';
// Aqui importamos o componente que iremos testar
import App from '../App';
// Aqui importamos a helper
import renderWithRouter from './renderWithRouter';

describe('Requisito 1 - Verificando Existência de Links em <App.js />', () => {
  test('testando o component App', () => {
    renderWithRouter(<App />);

    const linkToHome = screen.getByText('Home');
    expect(linkToHome).toBeInTheDocument();

    const linkToAbout = screen.getByText('About');
    expect(linkToAbout).toBeInTheDocument();

    const linkToFavorite = screen.getByText('Favorite Pokémons');
    expect(linkToFavorite).toBeInTheDocument();
  });
});
