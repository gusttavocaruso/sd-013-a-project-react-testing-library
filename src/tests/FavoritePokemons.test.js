import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Favorite Pokemon', () => {
  test('Testa se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
  test('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const MORE_DETAILS = 'More details';
    const FAVORITE = 'Pokémon favoritado?';
    const PAGE_FAVORITES = 'Favorite Pokémons';
    const PAGE_HOME = 'Home';

    fireEvent.click(screen.getByText('Psychic'));
    fireEvent.click(screen.getByText(MORE_DETAILS));
    fireEvent.click(screen.getByText(FAVORITE));
    fireEvent.click(screen.getByText(PAGE_HOME));

    fireEvent.click(screen.getByText('Normal'));
    fireEvent.click(screen.getByText(MORE_DETAILS));
    fireEvent.click(screen.getByText(FAVORITE));
    fireEvent.click(screen.getByText(PAGE_HOME));

    fireEvent.click(screen.getByText(PAGE_FAVORITES));

    const pokemonsFavorites = screen.getAllByText(/More details/i);
    expect(pokemonsFavorites).toHaveLength(2);
  });
});
