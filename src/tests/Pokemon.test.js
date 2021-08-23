import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Test to verify the Pokémon component', () => {
  const {
    name,
    type,
    averageWeight: {
      value,
      measurementUnit,
    },
    image,
  } = pokemons[0];

  it('should test if pokémon card is rendered correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(`${name}`);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(`${type}`);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokeImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', `${image}`);
  });
});

describe('should test the MoreDetails route', () => {
  const {
    name,
    id,
  } = pokemons[0];

  it('should verify the URL when click in "More Details"', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const link = screen.getByText(/More details/);

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
    expect(link).toBeDefined();
  });

  it('should verify if have a star image (favorite image)', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const link = screen.getByText(/more details/i);
    userEvent.click(link);

    const favBox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favBox);

    const favoriteStarSVG = 'star-icon.svg';

    const favorite = screen.getByRole('img', {
      name: `${name} is marked as favorite` });

    expect(favorite).toHaveAttribute('src', `/${favoriteStarSVG}`);
  });
});
