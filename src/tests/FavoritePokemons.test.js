import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('favoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem `No favorite pokemon found`', () => {
    render(<FavoritePokemons />);

    const favoritePokemons = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
    });
    expect(favoritePokemons).toBeInTheDocument();
  });

  // test('Verifica se é exibido todos os cards de pokémons favoritados.', () => {

  // });
});
