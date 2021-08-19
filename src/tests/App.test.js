import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa app.js, se há links de navegação', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    // rederizar a page
    renderWithRouter(<App />);
    // Acessar os elementos da tela
    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    // Fazer o teste
    expect(linkHome).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    // rederizar a page
    renderWithRouter(<App />);
    // Acessar os elementos da tela
    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    // Fazer o teste
    expect(linkAbout).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    // rederizar a page
    renderWithRouter(<App />);
    // Acessar os elementos da tela
    const linkFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    // Fazer o teste
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});
