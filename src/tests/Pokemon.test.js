import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const {
  id,
  name,
  type,
  averageWeight: { value, measurementUnit },
  image,
} = pokemons[0];

describe('Teste do elemento Pokemon e suas funcionalidades', () => {
  it('Teste se é renderizado um card com as informações corretas', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    const pokemonImg = screen.getByAltText(`${name} sprite`);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', image);
  });
  it('Teste se o card tem um link de navegação para mais detalhes', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('Teste se existe um icone de estelha nos Pokemons Favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
