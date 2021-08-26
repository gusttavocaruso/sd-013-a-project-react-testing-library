import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';
const POKEMON_TYPE = 'pokemon-type';
const POKEMON_WEIGHT = 'pokemon-weight';
const MORE_DETAILS = 'More details';

describe('Pokemon component:', () => {
  it('should render a card with info of a determined pokemon', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const cardName = screen.queryByTestId(POKEMON_NAME);
      const cardType = screen.queryByTestId(POKEMON_TYPE);
      const cardWeight = screen.queryByTestId(POKEMON_WEIGHT);
      const cardImg = screen.getByAltText(`${pokemon.name} sprite`);
      const nextBtn = screen.queryByRole('button', { name: 'Próximo pokémon' });
      const { value, measurementUnit } = pokemon.averageWeight;
      expect(cardName.textContent).toBe(pokemon.name);
      expect(cardType.textContent).toBe(pokemon.type);
      expect(cardWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
      expect(cardImg).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
  });

  it('should have a link to get more details, \'/pokemon/<id>\'', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const moreDetails = screen.queryByRole('link', { name: MORE_DETAILS });
      const nextBtn = screen.queryByRole('button', { name: 'Próximo pokémon' });
      expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
      userEvent.click(nextBtn);
    });
  });

  it('should redirect to the details when btn more details is clicked', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: MORE_DETAILS });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('should have an favorite icon when a pokemon is favorited', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: MORE_DETAILS });
    userEvent.click(moreDetails);
    const favoriteCheck = screen.queryByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteCheck);
    const homeLink = screen.queryByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const favorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toMatch(/star-icon\.svg/i);
  });
});
