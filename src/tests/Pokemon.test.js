import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

export const getLink = (text) => screen.getByRole('link', { name: text });

export const LINK_TO_DETAILS_TEXT_CONTENT = 'More details';

describe('Test Pokemon.js', () => {
  it('should exibit a card with Pokemon\'s info', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name').textContent;
    const pokemonType = screen.getByTestId('pokemon-type').textContent;
    const pokemonWeight = screen.getByTestId('pokemon-weight').textContent;
    const pokemonImg = screen.getByRole('img');

    expect(pokemonName).toBe('Pikachu');
    expect(pokemonType).toBe('Electric');
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
  });

  it('should have a link to see the Pokemon\'s details', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = getLink(LINK_TO_DETAILS_TEXT_CONTENT);
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toMatch(/pokemons\/25/);

    fireEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('should have a start icon in favorites Pokémon', () => {
    renderWithRouter(<App />);

    fireEvent.click(getLink(LINK_TO_DETAILS_TEXT_CONTENT));
    fireEvent.click(screen.getByRole('checkbox'));
    let start = screen.getByAltText('Pikachu is marked as favorite');
    expect(start).toBeInTheDocument();
    expect(start.src).toMatch(/\/star-icon.svg/);

    fireEvent.click(getLink('Home'));
    fireEvent.click(screen.getByTestId('next-pokemon'));
    fireEvent.click(getLink(LINK_TO_DETAILS_TEXT_CONTENT));
    fireEvent.click(screen.getByRole('checkbox'));
    start = screen.getByAltText('Charmander is marked as favorite');
    expect(start).toBeInTheDocument();
    expect(start.src).toMatch(/\/star-icon.svg/);
  });
});
