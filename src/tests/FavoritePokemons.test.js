// Requisito 3

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();

    const h2 = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });
});
