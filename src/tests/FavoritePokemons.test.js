import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

afterEach(cleanup);

describe('favorite pokemon`s tests', () => {
  it('tests if "No favorite pokemon found" is on the screen', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
  it('test if appers on favorite the pokemon cards',
    () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText('More details'));
      userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    });
});
