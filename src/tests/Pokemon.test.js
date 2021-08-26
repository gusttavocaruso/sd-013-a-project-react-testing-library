import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';
const POKEMON_TYPE = 'pokemon-type';
const POKEMON_WEIGHT = 'pokemon-weight';
const MORE_DETAILS = 'More details';

describe('Pokemon component:', () => {
  it('should render a card with info of a determined pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const cardName = screen.queryByTestId(POKEMON_NAME);
    const cardType = screen.queryByTestId(POKEMON_TYPE);
    const cardWeight = screen.queryByTestId(POKEMON_WEIGHT);
    const cardImg = screen.getByAltText(`${pokemons[0].name} sprite`);
    const { value, measurementUnit } = pokemons[0].averageWeight;
    expect(cardName.textContent).toBe(pokemons[0].name);
    expect(cardType.textContent).toBe(pokemons[0].type);
    expect(cardWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(cardImg.src).toBe(pokemons[0].image);
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
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const moreDetails = screen.queryByRole('link', { name: MORE_DETAILS });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('should have an favorite icon when a pokemon is favorited', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
  });
});
