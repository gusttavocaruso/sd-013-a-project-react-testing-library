import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const getH2 = (text) => screen.getByRole('heading', {
  name: text,
  level: 2,
});

const getLink = (text) => screen.getByRole('link', { name: text });

describe('Test FavoritePokemons.js', () => {
  it('should start with no pokémons', () => {
    renderWithRouter(<App />);
    fireEvent.click(getLink('Favorite Pokémons'));

    const heading = getH2('Favorite pokémons');
    expect(heading).toBeInTheDocument();

    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  });

  it('should have pokémons added as fovorite', async () => {
    renderWithRouter(<App />);

    fireEvent.click(getLink('More details'));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(getLink('Home'));

    fireEvent.click(screen.getByTestId('next-pokemon'));
    fireEvent.click(getLink('More details'));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(getLink('Favorite Pokémons'));

    const NUMBER_OF_FAVORITE_POKEMONS = 2;
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(NUMBER_OF_FAVORITE_POKEMONS);

    const heading = getH2('Favorite pokémons');
    expect(heading).toBeInTheDocument();
  });
});
