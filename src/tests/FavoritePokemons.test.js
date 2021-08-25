import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import RenderWithRouter from './RenderWithRouter';

describe('Requisito-3 - Testa o componente <FavoritePokemons.js />', () => {
  RenderWithRouter(<FavoritePokemons />);

  test('Testa se é exibido na tela a mensagem No favorite pokemon.', () => {
    const textFavorite = screen.getByText('No favorite pokemon found');
    expect(textFavorite).toBeInTheDocument();
  });
});
