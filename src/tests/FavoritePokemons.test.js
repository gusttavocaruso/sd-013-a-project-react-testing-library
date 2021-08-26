import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testing Favorite Pokemons', () => {
  test('Testing if shows the following message: No favorite pokemon found', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons />
      </BrowserRouter>,
    );
    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });

  test('Testing if shows all the favorite pokemons', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </BrowserRouter>,
    );
    expect(screen.getAllByRole('link', {
      name: /more details/i })).toHaveLength(pokemons.length);
  });
});
