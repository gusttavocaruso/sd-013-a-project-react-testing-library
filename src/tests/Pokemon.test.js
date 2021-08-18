import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test pokemon card', () => {
  it('should have a pikachu card', () => {
    renderWithRouter(<App />);
    const { innerHTML: pikachuName } = screen.getByTestId('pokemon-name');
    expect(pikachuName).toBe('Pikachu');

    const { innerHTML: pikachuType } = screen.getByTestId('pokemon-type');
    expect(pikachuType).toBe('Electric');

    const { innerHTML: pikachuWeight } = screen.getByTestId('pokemon-weight');
    expect(pikachuWeight).toBe('Average weight: 6.0 kg');

    const { src: pikachuSprite, alt: pikachuAlt } = screen
      .getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuSprite).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuAlt).toBe('Pikachu sprite');
  });

  it('should have an pokemon id on "pokemon detais" link', () => {
    renderWithRouter(<App />);
    const { href: pokeDetailsUrl } = screen.getByRole('link', { name: /more details/i });
    // Tip get from Murilo Rainho
    const [,,,, pokeId] = pokeDetailsUrl.split('/');
    expect(pokeId).toBe('25');
  });

  it('should have a working "pokemon detais" link', () => {
    const { history } = renderWithRouter(<App />);

    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetailsLink);
    const { pathname } = history.location;
    const detailsTitle = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });

    expect(pathname).toBe('/pokemons/25');
    expect(detailsTitle).toBeInTheDocument();
  });

  it('should have a favorite icon', () => {
    renderWithRouter(<App />);

    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetailsLink);
    const favoriteLabel = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favoriteLabel);
    const { src: favoriteImg, alt: favoriteAlt } = screen
      .getByRole('img', { name: /is marked as favorite/i });
    const [,,, favoriteImgPath] = favoriteImg.split('/');
    expect(`/${favoriteImgPath}`).toBe('/star-icon.svg');
    expect(favoriteAlt).toBe('Pikachu is marked as favorite');
  });
});
