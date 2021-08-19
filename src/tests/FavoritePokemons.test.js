import React from 'react';
import { screen } from './index';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    renderWithRouter(<FavoritePokemons />);

    const textNotFound = screen.getByText('No favorite pokemon found');

    expect(textNotFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons />);

    const getFavorites = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });

    expect(getFavorites).toBeInTheDocument();
  });
});
