import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente Pokemon.js', () => {
  const POKEMON_NAME = 'pokemon-name';

  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(POKEMON_NAME);

    expect(pokemonName.textContent).toBe('Pikachu');
  });
});
