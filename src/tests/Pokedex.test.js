import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router as Route } from 'react-router-dom';
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
  ...history };
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
  + 'pokémons daquele tipo;', async () => {
    const bntFire = screen.getByRole('button', {
      name: /fire/i,
    });

    userEvent.click(bntFire);
    expect(currentPokemon()).toHaveTextContent('Charmander');
    userEvent.click(bntNextPokemon());
    expect(currentPokemon()).toHaveTextContent('Rapidash');
  });

  it('O texto do botão deve corresponder ao" nome do tipo", ex. "Psychic";', () => {
    const bntPsychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    const bntBug = screen.getByRole('button', {
      name: /bug/i,
    });

    userEvent.click(bntPsychic);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Psychic');

    userEvent.click(bntBug);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Bug');
  });

  it('O botão "All" precisa estar sempre visível.', () => {
    const bntAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(bntAll).not.toBeDisabled();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All.', () => {
    expect(screen.getByRole('button', {
      name: /all/i,
    })).toHaveTextContent('All');
  });

  it('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All'
  + 'for clicado.', () => {
    const bntAll = screen.getByRole('button', {
      name: /all/i,
    });
    const bntPsychic = screen.getByRole('button', {
      name: /psychic/i,
    });

    userEvent.click(bntPsychic);
    expect(currentPokemon()).toHaveTextContent('Alakazam');
    userEvent.click(bntAll);
    expect(currentPokemon()).toHaveTextContent('Pikachu');
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All.', () => {
    const bntBug = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bntBug);
    expect(currentPokemon()).toHaveTextContent('Caterpie');
    userEvent.click(screen.getByText(/all/i));
    expect(currentPokemon()).toHaveTextContent('Pikachu');
  });
});
