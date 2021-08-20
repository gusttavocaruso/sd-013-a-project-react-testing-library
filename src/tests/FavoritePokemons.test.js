import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa FavoritePokemons.js.', () => {
  test('A mensagem No favorite pokemon found deve aparecer na tela', () => {
    render(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  test('Deve exibir os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const checked = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(checked);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favorite);

    const favoriteName = screen.getAllByText('Pikachu');
    expect(favoriteName).toBeDefined();

    const favoriteType = screen.getAllByText('Electric');
    expect(favoriteType).toBeDefined();

    const weight = screen.getAllByText('Average weight: 6.0 kg');
    expect(weight).toBeDefined();
  });
});

/* Referências: A ideia obtida para testar os cards de Pokémons favoritados foi elaborada com
a dica do Summer de instrução João Lima Turma 11. */
