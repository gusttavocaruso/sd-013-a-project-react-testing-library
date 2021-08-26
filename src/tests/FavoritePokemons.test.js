import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Favoritepomenos from '../components/FavoritePokemons';

describe('Testa favoritePokemons', () => {
  test('No favorite pokemon found', () => {
    const { history } = renderWithRouter(<Favoritepomenos />);
    history.push('/favorites');
    const renderText = screen.getByText('No favorite pokemon found');
    expect(renderText).toBeInTheDocument();
  });

});
