import React from 'react';

import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from './mocks/pokemons';
import renderWithRouter from './renderWithRouter';

describe('<FavoritePokemons /> Tests Section', () => {
  it('should return `no favorite pokemon found` if doesn\'t have any', () => {
    render(
      <FavoritePokemons />,
    );
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  it('should return all favorite pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const pikachuIsOnScreen = screen.getByText(/pikachu/i);
    expect(pikachuIsOnScreen).toBeInTheDocument();
  });
});
