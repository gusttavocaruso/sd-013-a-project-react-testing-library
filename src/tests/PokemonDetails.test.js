import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { LINK_TO_DETAILS_TEXT_CONTENT } from './Pokemon.test';
import pokemons from '../data';

const NUMBER_OF_IMGS_ON_SCREEN = 4;
const getH2 = (text) => screen.getByRole('heading', {
  name: text,
  level: 2,
});

describe('Test <PokemonDetails />', () => {
  it('should have all info about a Pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const pokemonName = screen.getByTestId('pokemon-name').textContent;
    const pokemonType = screen.getByTestId('pokemon-type').textContent;
    const pokemonWeight = screen.getByTestId('pokemon-weight').textContent;
    const allImgs = screen.getAllByRole('img');
    const moreDetailsLink = screen.queryByRole(
      'link', { name: LINK_TO_DETAILS_TEXT_CONTENT },
    );
    const summaryText = screen.getByText(pokemons[0].summary);

    expect(moreDetailsLink).toBeNull();
    expect(getH2('Pikachu Details')).toBeInTheDocument();
    expect(getH2('Summary')).toBeInTheDocument();
    expect(pokemonName).toBe('Pikachu');
    expect(pokemonType).toBe('Electric');
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');
    expect(allImgs[0]).toBeInTheDocument();
    expect(allImgs[0].src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(allImgs[0].alt).toBe('Pikachu sprite');
    expect(allImgs.length).toBe(NUMBER_OF_IMGS_ON_SCREEN);
    expect(summaryText).toBeInTheDocument();
  });

  it('should have a map section containing the Pokémon location', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    expect(getH2('Game Locations of Pikachu')).toBeInTheDocument();
  });
});
