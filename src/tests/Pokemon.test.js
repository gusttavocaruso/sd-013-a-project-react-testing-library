import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemonsData from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Verifica se o nome correto do Pokémon deve ser mostrado na tela', () => {
    const pokemon = pokemonsData[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const pokemonName = screen.getByText(pokemon.name);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Verifica se o tipo correto do pokémon deve ser mostrado na tela', () => {
    const pokemon = pokemonsData[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const pokemonType = screen.getByText(pokemon.type);
    expect(pokemonType).toBeInTheDocument();
  });

  it('Verifica se o peso médio do pokémon deve ser exibido com um texto', () => {
    const pokemon = pokemonsData[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const { averageWeight } = pokemon;
    const { measurementUnit, value } = averageWeight;
    const txt = `Average weight: ${value} ${measurementUnit}`;
    const pokemonType = screen.getByText(txt, {
      exact: false,
    });
    expect(pokemonType).toBeInTheDocument();
  });

  it('Verifica se a imagem do Pokémon deve ser exibida na tela', () => {
    const pokemon = pokemonsData[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', pokemon.image);
    expect(img).toHaveAttribute('alt', `${pokemon.name} sprite`);
  });

  it('Verifica se contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const pokemon = pokemonsData[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });

  it('Verifica se ao clicar no link, é redirecionado para página de detalhes', () => {
    const pokemon = pokemonsData[0];
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } />);

    userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toEqual(`/pokemons/${pokemon.id}`);
  });

  describe('Quando o Pokemon é favoritado', () => {
    it('Verifica se o ícone de favorito é exibido', () => {
      const pokemon = pokemonsData[0];
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

      const icone = screen.getByAltText(`${pokemon.name} is marked as favorite`);

      expect(icone).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
