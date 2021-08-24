import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

test('se página contém um h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

  const pageText = screen.getByRole('heading', { name: /Encountered pokémons/i });
  expect(pageText).toBeInTheDocument();
});

describe('Teste se é exibido o próximo Pokémon quando clica no botão Próximo pokémon',
  () => {
    const nextPokemon = () => screen.getByRole('button', { name: /Próximo pokémon/i });
    const pokemonsName = () => screen.getByTestId('pokemon-name');

    test('se botão contém texto Próximo pokémon', () => {
      renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

      expect(nextPokemon()).toBeVisible();
    });

    test('se é exibido outro Pokémon quando o botão Próximo pokémon é clicado', () => {
      renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

      pokemons.forEach((pokemon) => {
        expect(pokemonsName()).toHaveTextContent(pokemon.name);
        userEvent.click(nextPokemon());
      });
    });

    test('se o 1o Pokémon é mostrado após o último Pokémon', () => {
      renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

      pokemons.forEach(() => {
        userEvent.click(nextPokemon());
      });

      expect(pokemonsName()).toHaveTextContent(pokemons[0].name);
    });
  });

test('se é mostrado apenas um Pokémon por vez.', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

  const getAllPokemons = screen.getAllByTestId('pokemon-name');
  expect(getAllPokemons).toHaveLength(1);
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  const allFilters = () => screen.getAllByTestId('pokemon-type-button');
  const nextPokemon = () => screen.getByRole('button', { name: /Próximo pokémon/i });
  const pokemonType = () => screen.getByTestId('pokemon-type');

  test('se existe um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const filtersLength = 7;
    expect(allFilters()).toHaveLength(filtersLength);
  });

  test('se aquele botão de tipo renderiza todos os Pokémons do mesmo tipo', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const buttonFilter = screen.getByText(/fire/i);

    userEvent.click(buttonFilter);
    expect(pokemonType().textContent).toBe(buttonFilter.textContent);
    userEvent.click(nextPokemon());
    expect(pokemonType().textContent).toBe(buttonFilter.textContent);
  });

  test('se o texto do botão corresponde ao nome do tipo', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const pokemonByType = pokemonType();

    allFilters().forEach((button) => {
      userEvent.click(button);
      expect(pokemonByType).toHaveTextContent(button.textContent);
    });
  });

  test('se o botão All está sempre visível', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const getAllButtonFilter = screen.getByText(/all/i);
    userEvent.click(screen.getByText(/bug/i));
    expect(getAllButtonFilter).toBeVisible();
  });
});

describe('Teste se a Pokédex contém um botão de resetar o filtro', () => {
  const allButton = () => screen.getByText(/all/i);

  test('se o texto do botão é All', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    expect(allButton()).toHaveTextContent(/all/i);
  });

  test('se a Pokedéx mostra todos os Pokémons quando clica no botão All', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const fireFilter = screen.getByText(/fire/i);
    const pokemonsByType = pokemons.filter((pokemon) => pokemon.type === 'Fire');

    const allPokemonsLength = 9;
    const firePokemonsLength = 2;

    userEvent.click(fireFilter);
    expect(pokemonsByType).toHaveLength(firePokemonsLength);

    userEvent.click(allButton());
    expect(pokemons).toHaveLength(allPokemonsLength);
  });

  test('se ao carregar a página o filtro selecionado deverá ser All', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const allPokemonsLength = 9;
    expect(pokemons).toHaveLength(allPokemonsLength);
  });
});
