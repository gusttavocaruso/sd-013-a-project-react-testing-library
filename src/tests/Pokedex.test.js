import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';

// 5.3 feito com a ajuda do código da Julia Batista
function listPokemons() {
  const button = screen.getByText(/Próximo poké/i);
  const pokemonName = screen.getByTestId('pokemon-name');

  pokemons.forEach((pokemon, i) => {
    const max = pokemons.length - 1;
    if (i === max) {
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(button);
      return expect(pokemonName).toHaveTextContent(pokemons[0].name);
    }

    expect(pokemonName).toHaveTextContent(pokemon.name);
    userEvent.click(button);
    return expect(pokemonName).toHaveTextContent(pokemons[i + 1].name);
  });
}

describe('Teste o componente <Pokedex.js />', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const h2Text = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(h2Text).toBeInTheDocument();
  });

  describe('Teste se é exibido o próximo Pokémon da lista quando o botão', () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const buttonName = screen.getByText('Próximo pokémon');
      expect(buttonName.textContent).toBe('Próximo pokémon');
    });

    test('Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar', () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const button = screen.getByTestId('next-pokemon');

      userEvent.click(button);
      const nameText = screen.getByText('Charmander');

      expect(nameText).toBeInTheDocument();
    });

    test('O primeiro Pokémon da lista deve ser mostrado, se for o último Pokémon', () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      listPokemons();
    });

    test('Teste se é mostrado apenas um Pokémon por vez', () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const button = screen.getByTestId('next-pokemon');
      const pokemonName = screen.getAllByTestId('pokemon-name');
      userEvent.click(button);

      expect(pokemonName.length).toBe(1);
    });
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('se existi um botão de filtragem para cada tipo de Pokémom', () => {
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

  test('O botão All precisa estar sempre visível', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const buttoAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(buttoAll).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const buttoAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttoAll).toHaveTextContent(/all/i);
  });

  test('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros)', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    const allButon = screen.getByRole('button', { name: 'All' });
    const proximoButton = screen.getByText('Próximo pokémon');

    userEvent.click(allButon);

    pokemons.forEach((pokemon) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);

      userEvent.click(proximoButton);

      expect(allButon).toBeInTheDocument();
    });
  });
});
