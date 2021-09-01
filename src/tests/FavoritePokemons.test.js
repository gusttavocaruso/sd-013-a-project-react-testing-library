import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('testar a aba favoritos pokemon', () => {
  test(' Se tem a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(
      screen.getByText(/No favorite pokemon found/i),
    ).toBeInTheDocument();
  });
});
