import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Requisito 1 - App.js', () => {
  test('Verifica se renderiza o link "Home"', () => {
    render(<App />);
    expect(screen.queryByText(/home/i)).toBeDefined();
  });

  test('Verifica se renderiza o link "About"', () => {
    render(<App />);
    const linkForAbout = screen.queryByText(/about/i);
    expect(linkForAbout).toBeDefined();
  });

  test('Verifica se renderiza o link "Favorite Pokemons"', () => {
    render(<App />);
    const linkForFavPokemons = screen.queryByText(/favorite/i);
    expect(linkForFavPokemons).toBeDefined();
  });
});
