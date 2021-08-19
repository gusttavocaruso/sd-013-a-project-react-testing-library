import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Render pokemon component', () => {
  it('Should not have a "more details" link', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    // Tip get from Murilo Rainho
    const moreDetailsLinkStill = screen.queryByRole('link', { name: /more details/i });
    expect(moreDetailsLinkStill).toBeFalsy();
  });

  it('Should render pokemon Title', () => {
    renderWithRouter(<App />);
    const { innerHTML: pokemonTitle } = screen.getByTestId('pokemon-name');
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetailsLink);

    const { innerHTML: pokemonName } = screen
      .getByRole('heading', { name: /details/i, level: 2 });
    const { innerHTML: summary } = screen
      .getByRole('heading', { name: /summary/i, level: 2 });
    const pokemonResume = screen.getByText(/hard berries with electricity/i);

    expect(pokemonName).toBe(`${pokemonTitle} Details`);
    expect(summary).toBe('Summary');
    expect(pokemonResume).toBeInTheDocument();
  });

  it('Should render a map section', () => {
    renderWithRouter(<App />);
    const { innerHTML: pokemonTitle } = screen.getByTestId('pokemon-name');
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const { innerHTML: sectionTitle } = screen
      .getByRole('heading', { name: /game locations/i });
    const mapsImg = screen.getAllByRole('img', { name: `${pokemonTitle} location` });

    expect(mapsImg.length >= 1).toBeTruthy();
    expect(mapsImg[0].alt).toBe(`${pokemonTitle} location`);
    expect(mapsImg[0].src).toBeTruthy();
    expect(sectionTitle).toBe(`Game Locations of ${pokemonTitle}`);
  });

  it('Should have an input checkbox', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favoriteCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox.type).toBe('checkbox');
  });

  it('Should be possible to add favorite pokemons', () => {
    renderWithRouter(<App />);
    const { innerHTML: pokemonTitle } = screen.getByTestId('pokemon-name');
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    const favoriteCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoriteCheckbox);
    userEvent.click(favoritePokemonsLink);

    const starIcon = screen
      .getByRole('img', { name: `${pokemonTitle} is marked as favorite` });
    expect(starIcon).toBeInTheDocument();

    const moreDetailsLinkOther = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLinkOther);
    const favoriteCheckboxOther = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoriteCheckboxOther);
    const favoritePokemonsLinkOther = screen
      .getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsLinkOther);

    const noFavPokemons = screen.getByText(/no favorite pokemon found/i);
    expect(noFavPokemons).toBeInTheDocument();
  });
});
