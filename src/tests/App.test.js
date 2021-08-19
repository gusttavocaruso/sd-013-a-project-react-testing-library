import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Grupo de testes do requisito 1"
describe('Teste o componente <App.js/> (req1)', () => {
  it('Primeiro link deve ter o texto "Home"', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });

    // Faz o teste
    expect(linkHome).toBeInTheDocument();
  });

  it('Segundo link deve ter o texto "About"', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });

    // Faz o teste
    expect(linkAbout).toBeInTheDocument();
  });

  it('Segundo link deve ter o texto "Favorite Pokémons"', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    // Faz o teste
    expect(linkFavorite).toBeInTheDocument();
  });
});
