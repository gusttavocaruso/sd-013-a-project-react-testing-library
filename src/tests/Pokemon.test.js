import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RouterRender from './RouterRender';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokemon component', () => {
  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];

  it('Test whether a card with the information for a particular Pokémon is rendered',
    () => {
      RouterRender(<App />);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
      expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
    });

  it('Test if the Pokémon card contains a link', () => {
    const { history } = RouterRender(<App />);
    const details = screen.getByRole('link', { name: /more details/i });

    expect(details).toBeDefined();
    userEvent.click(details);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Test if exists a star icon in favorite pokémons', () => {
    RouterRender(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkBox = screen.getByRole('checkbox', 'Pokémon favoritado?');

    expect(checkBox).toBeDefined();
    userEvent.click(checkBox);

    const favorites = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(favorites).toBeDefined();
    userEvent.click(favorites);

    const favoriteImg = screen.getByRole('img',
      { name: `${name} is marked as favorite` });

    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
