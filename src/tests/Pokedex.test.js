import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import { Pokedex } from '../components';

const TEST_ID = 'pokemon-name';

describe('testes pokedex', () => {
  test('Os próximos Pokémons da lista devem ser mostradosao clicar no botão', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const nameFromTestId = screen.getByTestId(TEST_ID);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    const pokemonOne = nameFromTestId.innerHTML;

    userEvent.click(nextPokemon);
    // console.log(pokemonOne);

    const pokemonTwo = nameFromTestId.innerHTML;

    expect(pokemonTwo).not.toEqual(pokemonOne);
  });

  test('O primeiro Pokémon da lista deve ser mostrado após o último;', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const nameFromTestId = screen.getByTestId(TEST_ID);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    const firstPokemon = nameFromTestId.innerHTML;

    // aqui criado lógica para caso aumente o numero de pokemons
    const totalPokemons = 9;
    for (let i = 0; i < totalPokemons; i += 1) {
      userEvent.click(nextPokemon);
    }
    const checkFirstPokemon = nameFromTestId.innerHTML;

    expect(firstPokemon).toEqual(checkFirstPokemon);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const checkUniquePokemon = screen.getAllByTestId(TEST_ID).length;
    // console.log(checkFirstPokemon);
    expect(checkUniquePokemon).toEqual(1);
  });
});

describe('Tem os botões de filtro.', () => {
  test('Filtra cada tipo, sem repetir.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const buttonTypeCheck = screen.getAllByRole('button');
    // console.log(buttonTypeCheck);

    for (let i = 1; i < buttonTypeCheck.length; i += 1) {
      const checkTypeOne = buttonTypeCheck[i].innerHTML;
      const checkTypeTwo = buttonTypeCheck[i - 1].innerHTML;
      expect(checkTypeOne).not.toEqual(checkTypeTwo);
    }
  });

  // test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {});

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {});

  test('O botão All precisa estar sempre visível.', () => {});
});

describe('Pokédex contém botão para resetar', () => {
  test('O texto do botão deve ser All;', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const resetButton = screen.getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();
  });

  test('Pokedex Mostra Pokémons quando btn All é click', () => {
    render(
      <BrowserRouter>
        <App />
        {/* <Pokedex /> */}
      </BrowserRouter>,
    );
    const nameFromTestId = screen.getByTestId(TEST_ID);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    const firstPokemon = nameFromTestId.innerHTML;

    const resetButton = screen.getByRole('button', { name: /all/i });

    userEvent.click(resetButton);

    // aqui criado lógica para caso aumente o numero de pokemons
    const totalPokemons = 9;
    for (let i = 1; i < totalPokemons; i += 1) {
      userEvent.click(nextPokemon);
    }
    const lastPokemon = nameFromTestId.innerHTML;

    expect(firstPokemon).toEqual('Pikachu');
    expect(lastPokemon).toEqual('Dragonair');
  });

  // preciso acessar as props do pokedex, mockar funcao?
});

test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
  render(
    <BrowserRouter>
      <App />
      {/* <Pokedex /> */}
    </BrowserRouter>,
  );
  const nameFromTestId = screen.getByTestId(TEST_ID);

  const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

  const firstPokemon = nameFromTestId.innerHTML;

  // aqui criado lógica para caso aumente o numero de pokemons
  const totalPokemons = 9;
  for (let i = 1; i < totalPokemons; i += 1) {
    userEvent.click(nextPokemon);
  }
  const lastPokemon = nameFromTestId.innerHTML;

  expect(firstPokemon).toEqual('Pikachu');
  expect(lastPokemon).toEqual('Dragonair');
});
