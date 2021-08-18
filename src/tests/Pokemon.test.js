import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import Pokemons from '../data';

afterEach(cleanup);

const { id, name, type, averageWeight: { value, measurementUnit }, image } = Pokemons[0];

describe('Tests for Pokemon.js', () => {
  it('Check that a pokemon card is generated', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite={ false } />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe(name);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe(type);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    const img = screen.getByAltText(`${name} sprite`);
    const src = img.src === image;
    expect(src).toBeTruthy();
  });

  it('Check that a details link is present and working', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ Pokemons[0] }
      isFavorite={ false }
    />);

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`http://localhost/pokemons/${id}`);
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Check for favorite star icon', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite />);

    const favPoke = screen.getByAltText(`${name} is marked as favorite`);
    expect(favPoke).toBeInTheDocument();
    expect(favPoke.src).toBe('http://localhost/star-icon.svg');
  });
});
