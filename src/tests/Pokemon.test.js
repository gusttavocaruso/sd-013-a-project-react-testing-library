import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

// pegando um pokemon para simular
const { id, name, type, averageWeight: { value, measurementUnit }, image } = pokemons[1];

describe('Pokemon.js Tests', () => {
  test('tests if a card with the info of each pokemon is rendered', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } />);

    const namePok = screen.getByTestId('pokemon-name');
    expect(namePok).toHaveTextContent(name);

    const typePok = screen.getByTestId('pokemon-type');
    expect(typePok).toHaveTextContent(type);

    const weight = `Average weight: ${value} ${measurementUnit}`;
    const weightPok = screen.getByTestId('pokemon-weight');
    expect(weightPok).toHaveTextContent(weight);

    const altNamePok = screen.getByAltText(`${name} sprite`);
    expect(altNamePok).toHaveAttribute('src', image);
  });
  test('tests if the pokemon card has a navigation link', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[1] }
      isFavorite={ false }
    />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('test if there is a star icon on favorite Pokemons', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);
    const favPok = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favPok).toBeInTheDocument();
    expect(favPok.src).toBe('http://localhost/star-icon.svg');
  });
});
