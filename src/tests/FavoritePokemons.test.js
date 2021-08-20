import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testes para Favorite Pokemons', () => {
  it('Verifica se rederiza o texto "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  it('Verifica se renderiza o card dos pokemons favoritados', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const favPoke = screen.getByText('Pikachu');
    expect(favPoke).toBeInTheDocument();
  });
});
