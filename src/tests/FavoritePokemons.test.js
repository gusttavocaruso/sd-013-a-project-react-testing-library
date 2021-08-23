import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa a página FavoritesPokemons', () => {
  it('Testa se renderiza "No favorite pokemon found" se não existir pokemons', () => {
    renderWithRouter(<FavoritePokemons />);

    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();

    cleanup();
  });

  it('Testa se existem pokémons favoritos', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
