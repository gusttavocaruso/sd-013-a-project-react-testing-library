import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router as Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

// Função aulixiar para os test, Agradecimento ao Josue pela Dica.
const withRenderJosueAproves = (component) => {
  const history = createMemoryHistory();
  return { ...render(
    <Route history={ history }>
      {component}
    </Route>,
  ),
  history };
};

// Props para o component de funcionar corretamente.
const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

// Inicia o component antes de cada teste.
beforeEach(() => {
  withRenderJosueAproves(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
  );
});

// Elementos que sempre seram usados nos testes.
const bntNextPokemon = () => screen.getByTestId('next-pokemon');
const currentPokemon = () => screen.getByTestId('pokemon-name');

describe('Teste o componente "<Pokedex.js />"', () => {
  it('Teste se página contém um heading "h2" com o texto "Encountered pokémons".', () => {
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});

describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon'
+ ' é clicado.', () => {
  it('O botão deve conter o texto "Próximo pokémon".', () => {
    expect(bntNextPokemon()).toHaveTextContent('Próximo pokémon');
  });

  it('Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar'
  + 'sucessivamente no botão.', () => {
    let inicial = 1;
    const stop = 3;

    pokemons.forEach((pokemon) => {
      expect(currentPokemon()).toHaveTextContent(pokemon.name);
      userEvent.click(bntNextPokemon());
      if (inicial !== stop) { inicial += 1; }
    });
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no'
  + ' último Pokémon da Lista', () => {
    expect(currentPokemon()).toHaveTextContent('Pikachu');

    pokemons.forEach(() => {
      userEvent.click(bntNextPokemon());
    });

    expect(currentPokemon()).toHaveTextContent('Pikachu');
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  it('Testa se mostra um pokémon.', () => {
    const pokemonName = currentPokemon();
    const pokemonWeights = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonWeights).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem'
  + 'repetição.', () => {
    const expected = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypeList = pokemonTypeButton.map((type) => type.textContent);
    expect(pokemonTypeList).toEqual(expected);
  });

  it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos'
  + 'pokémons daquele tipo;', () => {
  });

  it('O texto do botão deve corresponder ao" nome do tipo", ex. "Psychic";', () => {
  });

  it('O botão "All" precisa estar sempre visível.', () => {
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All.', () => {
  });

  it('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All'
  + 'for clicado.', () => {
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All.', () => {
  });
});
