import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente POkedex', () => {
  const POKEMON_NAME = 'pokemon-name';

  it('Testa h2', () => {
    const tituloPokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(tituloPokedex).toBeInTheDocument();
  });

  it('Testa se existe botão que mostra próximo pokemon', () => {
    const botaoProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(botaoProximo).toBeInTheDocument();
  });

  it('Testa se ao clicar botão mostra próximo pokemon', () => {
    const botaoProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const nomePokemon = screen.getByTestId(POKEMON_NAME);

    userEvent.click(botaoProximo);
    expect(nomePokemon).toHaveTextContent(pokemons[1].name);
  });

  it('Testa se o primeiro pokemon ao clicar no botão enquanto estiver no ultimo', () => {
    const botaoProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const nomePokemon = screen.getByTestId(POKEMON_NAME);

    pokemons.forEach(() => userEvent.click(botaoProximo));

    expect(nomePokemon).toHaveTextContent(pokemons[0].name);
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    const numero = screen.getAllByTestId(POKEMON_NAME).length;

    expect(numero).toBe(1);
  });

  it('Testa se existe um botão de filtragem para cada tipo sem repetição', () => {
    const tipos = pokemons.map(({ type }) => type);

    const tiposNovo = [...new Set(tipos)];

    const botaoFiltro = screen.getAllByTestId('pokemon-type-button');

    tiposNovo.forEach((tipo, botao) => {
      expect(botaoFiltro[botao].textContent).toBe(tipo);
    });
  });

  it('Testa se ao clicar um botão de tipo, é mostrado somente ele', () => {
    const tipoPsychic = screen.getAllByTestId('pokemon-type-button')[4];
    const nomePokemon = screen.getByTestId(POKEMON_NAME);
    const botaoProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(tipoPsychic);

    expect(nomePokemon).toHaveTextContent('Alakazam');

    userEvent.click(botaoProximo);

    expect(nomePokemon).toHaveTextContent('Mew');
  });

  it('Testa se botão All precisa estar sempre visível', () => {
    const botaoReset = screen.getByRole('button', {
      name: /All/i,
    });

    expect(botaoReset).toBeVisible();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const botaoReset = screen.getByRole('button', {
      name: /All/i,
    });

    const botaoProximo = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const pokemonName = screen.getByTestId(POKEMON_NAME);

    userEvent.click(botaoReset);

    pokemons.forEach(() => userEvent.click(botaoProximo));

    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });
});

// 5. Teste o componente <Pokedex.js />
// Teste se página contém um heading h2 com o texto Encountered pokémons.
// Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.
// O botão deve conter o texto Próximo pokémon;
// Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
// O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
// Teste se é mostrado apenas um Pokémon por vez.
// Teste se a Pokédex tem os botões de filtro.
// Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
// A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
// O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
// O botão All precisa estar sempre visível.
// Teste se a Pokédex contém um botão para resetar o filtro
// O texto do botão deve ser All;
// A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
// Ao carregar a página, o filtro selecionado deverá ser All;
// O que será verificado:
// Será avaliado se o arquivo teste Pokedex.test.js contemplam 100% dos casos de uso criados pelo Stryker.
