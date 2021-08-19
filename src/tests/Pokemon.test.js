import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('teste do pokemon', () => {
  test('teste do card', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const { name, type, averageWeight, image } = pokemons[0];
    const { measurementUnit, value } = averageWeight;
    const avgWeight = `${value} ${measurementUnit}`;
    const nameP = screen.getByTestId('pokemon-name');
    const typeP = screen.getByTestId('pokemon-type');
    const avgW = screen.getByTestId('pokemon-weight');
    const imgP = screen.getByAltText(`${name} sprite`);

    expect(nameP).toHaveTextContent(name);
    expect(typeP).toHaveTextContent(type);
    expect(avgW).toHaveTextContent((`Average weight: ${avgWeight}`));
    expect(imgP).toBeInTheDocument();
    expect(imgP.src).toBe(`${image}`);
  });

  test('teste do link details', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const link = screen.getByRole('link', { name: 'More details' });

    fireEvent.click(link);

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('teste do favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const { name } = pokemons[0];
    const favImg = screen.getByAltText(`${name} is marked as favorite`);

    expect(favImg).toBeInTheDocument();
    expect(favImg.src).toBe('http://localhost/star-icon.svg');
  });
});
