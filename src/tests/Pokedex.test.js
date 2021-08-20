import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import { favoritePokemons, pokemons, pokemonsType } from './mocks/dataFavorite';
import renderWithRouter from './util/renderWithRouter';

const pokemonName = 'pokemon-name';
const verifyPokemonList = (pokeList = pokemons) => {
  pokeList.forEach(({ name }) => {
    const pokemon = screen.queryByTestId(pokemonName);
    expect(pokemon).toHaveTextContent(name);
    fireEvent.click(screen.queryByRole('button', { name: /Próximo pokémon/i }));
  });
};

describe('1 - Teste o componente <Pokedex.js />.', () => {
  it('A página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const h2 = screen.queryByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
    expect(h2).toContainHTML('</h2>');
  });
});
describe('2 - Teste se é exibido o próximo Pokémon da'
+ ' lista quando o botão Próximo pokémon é clicado', () => {
  it('2.1 - O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const nextPokemonBtn = screen.queryByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonBtn).toHaveAttribute('type', 'button');
    expect(nextPokemonBtn).toHaveAttribute('class', 'button-text pokedex-button');
  });
  it('2.2 - Os próximos Pokémons da lista devem ser mostrados, um a um, ao '
  + 'clicar sucessivamente no botão', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    verifyPokemonList();
  });
  it('2.3 - O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,'
  + 'se estiver no último Pokémon da lista', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    pokemons.forEach(() => fireEvent
      .click(screen.queryByRole('button', { name: /Próximo pokémon/i })));
    const { name } = pokemons[0];
    const pokemon = screen.queryByTestId(pokemonName);
    expect(pokemon).toHaveTextContent(name);
  });
  it('2.4 - Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const onlyOnePokemon = (screen.queryAllByTestId(pokemonName)).length;
    expect(onlyOnePokemon).toBe(1);
  });
});

describe('3 - Teste se a Pokédex tem os botões de filtro', () => {
  it('3.1 - Deve existir um botão de filtragem para cada tipo de Pokémon,'
  + ' sem repetição.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    pokemonsType.forEach((type) => {
      const pokemonTypeBtn = screen.queryByRole('button', { name: type });
      expect(pokemonTypeBtn).toBeInTheDocument();
      expect(pokemonTypeBtn).toHaveTextContent(type);
      expect(pokemonTypeBtn).toHaveAttribute('data-testid', 'pokemon-type-button');
    });
  });
  it('3.2 - A partir da seleção de um botão de tipo, a Pokédex deve'
  + 'circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const pokemonType = pokemonsType[pokemonsType.length - 1];
    fireEvent.click(screen.queryByRole('button', { name: pokemonType }));
    const pokemonsFilteredByType = pokemons.filter(({ type }) => type === pokemonType);
    verifyPokemonList(pokemonsFilteredByType);
    // se passou por toda lista deve voltar pro primeiro pokemon filtrado
    const { name } = pokemonsFilteredByType[0];
    const firstPokemonFiltered = screen.queryByTestId(pokemonName);
    expect(firstPokemonFiltered).toHaveTextContent(name);
  });
  it('3.3 - O botão ALL deve estar semre visível', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    pokemonsType.forEach((type) => {
      const allBtn = screen.queryByRole('button', { name: /ALL/i });
      expect(allBtn).toBeInTheDocument();
      expect(allBtn).toBeEnabled();
      fireEvent.click(screen.queryByRole('button', { name: type }));
    });
  });
});
describe('4 - Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('4-1 - O texto do botão deve ser All', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const allBtn = screen.queryByRole('button', { name: /ALL/i });
    expect(allBtn).toBeInTheDocument();
    expect(allBtn).toBeEnabled();
    expect(allBtn).toHaveTextContent(/ALL/i);
  });

  it('4.2 - ao clicar em <ALL> deverá mostrar todos os Pokemons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const selectedPokemonType = pokemonsType[0];
    fireEvent.click(screen.queryByRole('button', { name: selectedPokemonType }));
    const filteredPokemonsCounter = pokemons.reduce(((counter, { type }) => {
      if (type === selectedPokemonType) counter += 1;
      return counter;
    }), 0);
    fireEvent.click(screen.queryByRole('button', { name: /ALL/i }));
    expect(pokemons.length).toBeGreaterThan(filteredPokemonsCounter);
  });

  it('4.3 - Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    fireEvent.load(screen.queryByRole('button', { name: /ALL/i }));
    const allBtn = screen.queryByRole('button', { name: /ALL/i });
    expect(allBtn).toBeInTheDocument();
    verifyPokemonList();
  });
});
