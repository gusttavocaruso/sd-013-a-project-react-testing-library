import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test "FavoritePokemons" page', () => {
  it('Renders a text if there is no pokemon favorited', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavPokeText = screen.getByText('No favorite pokemon found');
    expect(noFavPokeText).toBeInTheDocument();
  });

  it('Renders favorited pokemons', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favCheck = screen.getByRole('checkbox');
    userEvent.click(favCheck);

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favLink);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
  });
});
