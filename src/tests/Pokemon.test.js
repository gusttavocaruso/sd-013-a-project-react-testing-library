import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  const {
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
    id,
  } = Pokemons[0];

  it('will have the card poke with all information', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite={ false } />);

    const namePoke = screen.getByTestId('pokemon-name');
    expect(namePoke.innerHTML).toBe(name);
    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.innerHTML).toBe(type);
    const averageWeightPoke = screen.getByTestId('pokemon-weight');
    expect(averageWeightPoke.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    const imagePoke = screen.getByAltText(`${name} sprite`).src;
    expect(imagePoke).toBe(image);
  });
  it('will have to redirect to page details', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ Pokemons[0] } isFavorite={ false } />,
    );

    const linkToDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(linkToDetails).toBeInTheDocument();
    userEvent.click(linkToDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('will test if show the icon star', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite />);

    const favoritePoke = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritePoke);
    const srcFavoritePoke = favoritePoke.src;
    expect(srcFavoritePoke).toBe('http://localhost/star-icon.svg');
  });
});
