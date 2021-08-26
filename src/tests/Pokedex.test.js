import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('<Pokedex /> Tests Section', () => {
  beforeEach(() => renderWithRouter(<App />));

  // O botão deve conter o texto Próximo pokémon;
  it('should contain correctly text in heading', () => {
    const h2 = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  // O botão deve conter o texto Próximo pokémon;
  it('should contain correctly text in button', () => {
    const buttonNext = screen.getByTestId('next-pokemon');
    expect(buttonNext).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonNameLength = screen.getAllByTestId('pokemon-name');
    pokemons.forEach((pokemon, index) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
      userEvent.click(buttonNext);
      expect(pokemonName).not.toHaveTextContent(pokemons[index].name);
    });
    const lastPokemon = pokemons[pokemons.length - 1].name;
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    pokemons.forEach((_pokemon, index) => {
      if (index < pokemons.length - 1) userEvent.click(buttonNext);
      // Teste se é mostrado apenas um Pokémon por vez.
      expect(pokemonNameLength.length).toStrictEqual(1);
    });

    expect(pokemonName).toHaveTextContent(lastPokemon);
    userEvent.click(buttonNext);
    const firstPokemon = pokemons[0].name;
    expect(pokemonName).toHaveTextContent(firstPokemon);
  });

  // Teste se a Pokédex tem os botões de filtro.
  it('should contain buttons filter correctly', async () => {
    const quantityFilterButtons = 7;
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(quantityFilterButtons);

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const categories = ['Electric',
      'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const names = filterButtons.map((btn) => btn.textContent);
    expect(JSON.stringify(categories)).toStrictEqual(JSON.stringify(names));

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const buttonNext = screen.getByTestId('next-pokemon');
    userEvent.click(buttonNext);
    const poke = screen.getByText('Charmander');
    expect(poke).toBeInTheDocument();
  });

  // it('should return the corretcly type')
  /*

A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;

O texto do botão deve corresponder ao nome do tipo, ex. Psychic;

O botão All precisa estar sempre visível.

Teste se a Pokédex contém um botão para resetar o filtro

O texto do botão deve ser All;

A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;

Ao carregar a página, o filtro selecionado deverá ser All; */
});
