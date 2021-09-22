import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('3- Testa o componente FavoritePokemons.js', () => {
  test('É exibida na tela uma mensagem caso a pessoa não haja favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  test('São exibidos todos os cards de pokémon favoritados.', () => {
    renderWithRouter(<App />);
    const pkmnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pkmnDetails);

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheckbox);

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemon);

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
