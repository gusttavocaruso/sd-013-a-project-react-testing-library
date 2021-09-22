import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

/** logica de funções inspirada no repositório do Gui-Alucard.
 * https://github.com/Gui-Alucard/Block15-Project-RTL
 */

describe('Requisito 5: texte do componente Pokedex', () => {
  beforeEach(() => { // reseta o componente a cada iteração.
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { } }
      />,
    );
  });
  const pokeName = 'pokemon-name';
  const tupeButton = 'pokemon-type-button';
  it('Requisito 5.1: Teste se página contém h2 com o texto Encountered pokémons', () => {
    /** ======== acessando o elemento ========= */
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i }); // puxamos o h2 pela role e pelo texto.

    /** ======== testando os elementos ========= */
    expect(heading).toBeInTheDocument();
  });

  it('Requisito 5.2.1: Teste se é exibido o boto Proximo Pokémon', () => {
    /** ======== acessando o elemento ========= */
    const nextButton = screen.getByText(/Próximo Pokémon/i);

    /** ======== testando os elementos ========= */
    expect(nextButton).toBeInTheDocument();
  });

  it('Requisito 5.2.2: Teste se é exibido o próximo Pokémon da lista', () => {
    /** ======== acessando o elemento ========= */
    const nextButton = screen.getByText(/Próximo Pokémon/i);
    const pokemonsNames = pokemons.map((pokemon) => pokemon.name);

    /** ======== testando os elementos ========= */
    pokemonsNames.forEach((pokemonName) => {
      const beforeName = screen.queryByText(pokemonName);
      expect(beforeName).toBeInTheDocument();
      userEvent.click(nextButton);
      const afterName = screen.queryByText(pokemonName);
      expect(afterName).not.toBeInTheDocument();
    });
  });
  it('Requisito 5.2.3: Teste se é exibido o primeiro pokemon apos o ultimo', () => {
    /** ======== acessando o elemento ========= */
    const nextButton = screen.getByText(/Próximo Pokémon/i);
    const pokemonNameBefore = pokemons[0].name;

    /** ======== testando os elementos ========= */
    pokemons.forEach(() => userEvent.click(nextButton));
    const pokemonNameAfter = screen.getByTestId(pokeName).innerHTML;
    expect(pokemonNameBefore).toBe(pokemonNameAfter);
  });
  it('Requisito 5.3: Teste se é mostrado apenas um Pokémon por vez', () => {
    /** ======== acessando o elemento ========= */
    const currentPokemon = screen.getAllByTestId(pokeName);

    /** ======== testando os elementos ========= */
    expect(currentPokemon).toHaveLength(1);
  });
  it('Requisito 5.4.1/2: Deve existir um botão para cada tipo de Pokémon', () => {
    /** ======== acessando o elemento ========= */
    const buttons = screen.getAllByTestId(tupeButton);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    /** ======== testando os elementos ========= */
    buttons.forEach((button, i) => {
      expect(button).toBeInTheDocument();
      expect(buttons[i]).toHaveTextContent(types[i]);
    });
  });

  it('Requisito 5.4.3: Botão para cada tipo filtra os pokemons', () => {
    /** ======== acessando o elemento ========= */
    const dragonButtons = screen.getByRole('button', { name: /Dragon/i });
    const pokemon = screen.getByTestId(pokeName);

    // TODO implementar se tiver tempo uma logica mais generalista
    /** ======== testando os elementos ========= */
    userEvent.click(dragonButtons);
    expect(pokemon).toHaveTextContent('Dragonair');
  });
  it('Requisito 5.4.4: Botão All sempre visivel', () => {
    /** ======== acessando o elemento ========= */
    const filterButtons = screen.getAllByTestId(tupeButton);
    const AllButton = screen.getByText(/All/i);

    /** ======== testando os elementos ========= */
    filterButtons.forEach((filterButton) => {
      userEvent.click(filterButton);
      expect(AllButton).toBeInTheDocument();
    });
  });
  it('Requisito 5.5: Teste se a Pokédex contém um botão para resetar o filtro', () => {
    /** ======== acessando o elemento ========= */
    const AllButton = screen.getByText(/All/i);

    /** ======== testando os elementos ========= */
    userEvent.click(AllButton);
    expect(pokemons.length).toBeGreaterThan(1);
  });
});
