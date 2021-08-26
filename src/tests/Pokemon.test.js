import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando componente Pokemon.js', () => {
  const POKEMON_NAME = 'pokemon-name';
  const POKEMON_TYPE = 'pokemon-type';
  const POKEMON_AVERAGE_WEIGHT = 'pokemon-weight';

  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(POKEMON_NAME);

    expect(pokemonName.textContent).toBe(pokemons[0].name);
  });

  it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId(POKEMON_TYPE);

    expect(pokemonType.textContent).toBe(pokemons[0].type);
  });

  it('O peso do pokémon deve ser exibido no formato correto', () => {
    renderWithRouter(<App />);

    const pokemonAverageWeight = screen.getByTestId(POKEMON_AVERAGE_WEIGHT);
    const { averageWeight: { value, measurementUnit } } = pokemons[0];

    expect(pokemonAverageWeight.textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
  });

  it('Imagem do pokemon deve ser exibida', () => {
    renderWithRouter(<App />);

    const imgPokemonSprite = screen.getByRole('img', {
      name: `${pokemons[0].name} sprite`,
    });
    expect(imgPokemonSprite.src).toBe(pokemons[0].image);
    expect(imgPokemonSprite.alt).toBe(`${pokemons[0].name} sprite`);
  });

  it('O card do pokémon deve conter um link de navegação com a url correta'
  + 'e deve ir para a url correta ao ser clicado', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Deve existir um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const chkBoxFavoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });
    expect(chkBoxFavoritePokemon).toBeInTheDocument();

    userEvent.click(chkBoxFavoritePokemon);
    expect(chkBoxFavoritePokemon.checked).toBe(true);

    const imgFavoriteIcon = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });
    expect(imgFavoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
