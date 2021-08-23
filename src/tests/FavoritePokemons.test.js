import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Favoritepomenos from '../components/FavoritePokemons';

describe('Testa favoritePokemons', () => {
  test('No favorite pokemon found', () => {
    const { history } = renderWithRouter(<Favoritepomenos />);
    history.push('/favorites');
    const renderText = screen.getByText('No favorite pokemon found');
    expect(renderText).toBeInTheDocument();
  });

  /* test('todos os pokemons', () => {
    const { history } = renderWithRouter(<Favoritepomenos />);
    history.push('/favorites');
    const renderFavorites = screen.getAllByTestId('pokemon-name');
    userEvent.click()
    expect(renderFavorites.length).toBeGreaterThanOrEqual(0);
  }); */
});
