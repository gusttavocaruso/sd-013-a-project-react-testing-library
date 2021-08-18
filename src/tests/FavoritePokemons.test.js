import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('will test if the page when dont have a favorite pokemon', () => {
    render(<FavoritePokemons />);

    const titleFav = screen.getByText('No favorite pokemon found');
    expect(titleFav).toBeInTheDocument();
  });

  it('will test if the page have a image from a pokedex', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', {
      name: 'More details',
    }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const namePokemon = screen.getByTestId('pokemon-name');

    expect(namePokemon).toBeInTheDocument();
  });
});
