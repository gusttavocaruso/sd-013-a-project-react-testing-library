import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testing \'Pokemon\' component', () => {
  it('should have one card with all informations of a pokemon', () => {
    renderWithRouter(<App />);

    const { innerHTML: pokeName } = screen.getByTestId('pokemon-name');
    const { innerHTML: pokeType } = screen.getByTestId('pokemon-type');
    const { innerHTML: pokeWeight } = screen.getByTestId('pokemon-weight');

    expect(pokeName).toBe('Pikachu');
    expect(pokeType).toBe('Electric');
    expect(pokeWeight).toBe('Average weight: 6.0 kg');

    const { alt: pokeSpriteAlt, src: pokeSpriteSrc } = screen
      .getByRole('img', { name: /pikachu sprite/i });
    expect(pokeSpriteAlt).toBe('Pikachu sprite');
    expect(pokeSpriteSrc).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('should have one id of pokemon in the \'more details\' link', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const [,,,, id] = moreDetails.href.split('/');

    expect(id).toBe('25');
  });

  it('should have one link to see \'more details\' of pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    const { innerHTML: moreDetailsTitle } = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });

    expect(moreDetailsTitle).toBe('Pikachu Details');
    expect(pathname).toBe('/pokemons/25');
  });

  it('should have a favorite icon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const pokeFavoriteButton = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(pokeFavoriteButton);

    const { src: favoriteImageSrc, alt: favoriteImageAlt } = screen
      .getByRole('img', { name: /is marked as favorite/i });

    const [,,, favoriteImagePath] = favoriteImageSrc.split('/');

    expect(`/${favoriteImagePath}`).toBe('/star-icon.svg');
    expect(favoriteImageAlt).toBe('Pikachu is marked as favorite');
  });
});
