import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';

describe('FavoritePokemons.js testes', () => {
  test('este se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons />
      </BrowserRouter>,
    );
    const noFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {});
});
