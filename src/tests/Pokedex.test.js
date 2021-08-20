import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  test('Testa se Pokedex tem um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const getHeading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(getHeading).toBeInTheDocument();
  });

  // Teste feito com a ajuda de Pedro Delicolli e Débora Teodorico
  test('Testa se existe um botão Next e se ao clicar mostra o próximo pokemon ', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const getButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(getButton).toBeInTheDocument();

    pokemons.map((pokemon, index) => {
      const getPokemon = pokemon;
      //       ternário -> [condição que pega o último pokemon] ? false : true (next pokemon)
      // Usando esse ternário pra que não dê erro na troca do último para o primeiro pokemon
      const nextPokemonIndex = index === (pokemons.length - 1) ? 0 : index + 1;
      const nextPokemon = pokemons[nextPokemonIndex];

      // Pegando o nome do pokemon
      const getPokemonName = screen.getByText(getPokemon.name);

      // Verificando se tem um pokemon na página
      expect(getPokemonName).toBeInTheDocument();

      // Clicando no botão Next
      userEvent.click(getButton);

      // Pegando o nome do próximo pokemon
      const getNextPokemonName = screen.getByText(nextPokemon.name);

      // Verificando se ao clicar no botão Next aparece realmente o próximo pokemon
      return expect(getNextPokemonName).toBeInTheDocument();
    });
  });

  test('Testa se é mostrado um pokemon por vez', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const getPokemonByTestId = screen.getAllByTestId('pokemon-name');
    expect(getPokemonByTestId.length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    // const pokemonsData = pokemons;
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const LENGTH_ALL_TYPES = 7;
    // Pegando todos os botões e fazendo um map para ver se cada um deles está na página
    const getButtonType = screen.getAllByTestId('pokemon-type-button');
    getButtonType.map((item) => expect(item).toBeInTheDocument());
    expect(getButtonType).toHaveLength(LENGTH_ALL_TYPES);
  });

  test('Testa se a Pokédex tem o botão All', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const getButtonAll = screen.getByText('All');
    userEvent.click(getButtonAll);
    expect(getButtonAll).toBeInTheDocument();
  });
});
