import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RouterRender from './RouterRender';
import pokemons from '../data';
import App from '../App';

describe('Testing PokemonDetails component', () => {
  const { name, foundAt, summary } = pokemons[0];
  beforeEach(() => {
    RouterRender(<App />);
  });

  it('Test if the details shown', () => {
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const headingDetails = screen.getByRole('heading', { name: `${name} Details` });
    expect(headingDetails).toBeInTheDocument();

    expect(details).not.toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { name: /summary/i });
    expect(headingSummary).toBeInTheDocument();

    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it('Test if exist a section with the pokémon location', () => {
    const locations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const headingLocation = screen.getByRole('heading',
      { name: `Game Locations of ${name}` });
    expect(headingLocation).toBeInTheDocument();

    foundAt.forEach((item, index) => {
      const imgs = screen.getAllByRole('img',
        { name: `${name} location` });

      expect(imgs[index]).toHaveAttribute('src', item.map);
    });

    locations.forEach((item, index) => {
      expect(screen.getByText(item)).toBeInTheDocument();
      const imgs = screen.getAllByRole('img',
        { name: `${name} location` });

      expect(imgs[index]).toHaveAttribute('src', foundAt[index].map);
    });
  });

  it('Test if the user can favorite pokémon in the details page', () => {
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkBox = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkBox).toBeDefined();
    userEvent.click(checkBox);

    let favorited = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(checkBox);

    favorited = screen.queryByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).not.toBeInTheDocument();

    expect(screen.getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});
