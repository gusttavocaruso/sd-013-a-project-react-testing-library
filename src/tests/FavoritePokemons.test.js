import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa FavoritePokemons.js.', () => {
  test('A mensagem No favorite pokemon found deve aparecer na tela',
    'quando não haver favoritos.',
    () => {
      render(<FavoritePokemons />);
      const noFavorite = screen.getByText('No favorite pokemon found');
      expect(noFavorite).toBeInTheDocument();
    });
});
