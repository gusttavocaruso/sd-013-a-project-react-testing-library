import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

describe('Testa um card de Pokémon.', () => {
  test('Testa o nome do Pokemon;', () => {
    renderWithRouter(<Pokemon />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toContain('Pikachu');
  });
});
