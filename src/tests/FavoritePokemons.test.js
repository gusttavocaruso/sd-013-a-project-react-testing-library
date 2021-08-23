import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa a pagina de pokemonsfavoritos', () => {
  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const getFavorite = screen.getByText(/No Favorite pokemon found/i);
    expect(getFavorite).toBeInTheDocument();
  });
});
