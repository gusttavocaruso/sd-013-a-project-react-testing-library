import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import Pokemons from '../data';

afterEach(cleanup);

describe('Tests for Pokemon.js', () => {
  it('Check that a pokemon card is generated', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite={ false } />);

    const name = screen.getByTestId('pokemon-name');
    expect(name.innerHTML).toBe('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Electric');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    const img = screen.getByAltText('Pikachu sprite');
    const src = img.src === 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(src).toBeTruthy();
  });

  it('Check that a details link is present and working', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ Pokemons[0] }
      isFavorite={ false }
    />);

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    expect(link.href).toBe('http://localhost/pokemons/25');
    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Check for favorite star icon', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite />);

    const favPoke = screen.getByAltText('Pikachu is marked as favorite');
    expect(favPoke).toBeInTheDocument();
    expect(favPoke.src).toBe('http://localhost/star-icon.svg');
  });
});
