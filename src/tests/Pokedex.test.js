import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica o componente Pokedex', () => {
  test('verifica se contem um h2 com texto Encontered pokemons', () => {
    renderWithRouter(<App />);
    const msgPokedex = screen
      .getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(msgPokedex).toBeInTheDocument();
  });
});
