import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente app', () => {
  test('Testa link Home', () => {
    renderWithRouter(<App />);
    const elementText = screen.getByRole('link', {
      name: /home/i,
    });
    expect(elementText).toBeInTheDocument();
  });

  test('Testa link About', () => {
    renderWithRouter(<App />);
    const elementText = screen.getByRole('link', {
      name: /about/i,
    });
    expect(elementText).toBeInTheDocument();
  });

  test('Testa link favoritePokemon', () => {
    renderWithRouter(<App />);
    const elementText = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(elementText).toBeInTheDocument();
  });
});
