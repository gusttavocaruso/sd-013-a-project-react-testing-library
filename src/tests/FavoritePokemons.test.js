import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente FavoritePokemons', () => {
  test('Se é exibido o texto "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);
    const textNoFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(textNoFavorite).toBeInTheDocument();
  });
  test('Se quando tem pokemons favoritos, mostra os cards', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorite);
    const textPikachu = screen.getByText(/pikachu/i);
    expect(textPikachu).toBeInTheDocument();
  });
});
