import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons, renderWithRouter } from '../components';
import App from '../App';

describe('3- Testa o componente FavoritePokemons.js', () => {
  test('É exibida na tela uma mensagem caso a pessoa não haja favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  test('São exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const pkmnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pkmnDetails);

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheckbox);

    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemons);

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
