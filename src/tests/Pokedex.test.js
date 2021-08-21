import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

function listPokemons() {
  const buttonNextPoke = screen.getByTestId('next-pokemon');
  const pokemonName = screen.getByTestId('pokemon-name');
  // expect(buttonNextPoke).toBeInTheDocument();
  // expect(pokemonName).toBetoBeInTheDocument();

  pokemons.map((pokemon, index) => {
    const MAX_LENGTH = pokemons.length - 1;
    if (index === MAX_LENGTH) {
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(buttonNextPoke);
      return expect(pokemonName).toHaveTextContent(pokemons[0].name);
    }
    expect(pokemonName).toHaveTextContent(pokemon.name);
    userEvent.click(buttonNextPoke);
    return expect(pokemonName).toHaveTextContent(pokemons[index + 1].name);
  });
}

describe('Teste o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const heading = screen.getByRole('heading', {
      level: 2, name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });
});

describe('Exibindo o Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonNextPoke = screen.getByTestId('next-pokemon');
    expect(buttonNextPoke).toBeInTheDocument();
  });

  it('Pokémons da lista devem ser mostrados, ao clicar no botão', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonNextPoke = screen.getByText('Próximo pokémon');
    userEvent.click(buttonNextPoke);
    const newNamePoke = screen.getByTestId('pokemon-type');
    expect(newNamePoke).toBeInTheDocument();
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    listPokemons();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('Se existe um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    allButtons.map((button, index) => {
      expect(button).toBeInTheDocument();
      return expect(allButtons[index]).toHaveTextContent(types[index]);
    });
  });

  it('O botão All precisa estar sempre visível', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toHaveTextContent('All');
  });

  it('A Pokedéx mostra os Pokémons sem filtros quando o botão All for clicado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokemonType = screen.getByTestId('pokemon-type');
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const buttonNextPoke = screen.getByText('Próximo pokémon');

    userEvent.click(buttonAll);

    pokemons.forEach((pokemon) => {
      expect(pokemonType).toHaveTextContent(pokemon.type);
      userEvent.click(buttonNextPoke);
      expect(buttonAll).toBeInTheDocument();
    });
  });
});
