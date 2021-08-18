import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('Testa FavoritePokemons.js', () => {
  render(<FavoritePokemons />);

  const text = screen.getByText('No favorite pokemon found');

  expect(text).toBeInTheDocument();
});
