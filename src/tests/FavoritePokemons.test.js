import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testing Favorite Pokemons component', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });

  it('Test when there is no favorite pokémon', () => {
    const message = screen.getByText('No favorite pokemon found');
    // toBeDefined foi inspirado neste exemplo https://testing-library.com/docs/preact-testing-library/example/
    expect(message).toBeDefined();
  });
});
