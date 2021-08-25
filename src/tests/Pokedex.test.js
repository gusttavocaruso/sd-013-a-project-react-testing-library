import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente "Pokedex".', () => {
  const pokemonName = 'pokemon-name';

  test('Testa se é exibido um h2 com o texto "Encountered pokémons".', () => {
    renderWithRouter(<App />);

    const encounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon ao clicar no botão.', () => {
    renderWithRouter(<App />);

    const proxPoke = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(proxPoke).toBeInTheDocument();
    userEvent.click(proxPoke);

    const pokeName = screen.getByTestId(pokemonName);
    expect(pokeName).toHaveTextContent(/charmander/i);
  });

  test('Testa se é exibido o primeiro Pokémon ao passar do final da lista.', () => {
    renderWithRouter(<App />);

    const proxPoke = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(proxPoke).toBeInTheDocument();

    // Código abaixo feito com a ajuda do código do Pedro Trasfereti
    pokemons.forEach(() => userEvent.click(proxPoke));

    const pokeName = screen.getByTestId(pokemonName);
    expect(pokeName).toHaveTextContent(pokemons[0].name);
  });

  test('Testa se é exibido apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const quantidadePorVez = screen.getAllByTestId(pokemonName);
    expect(quantidadePorVez.length).toBe(1);

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const botaoAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(botaoAll).toBeInTheDocument();

    // Código feito com a ajuda de Felipe Neves
    pokemons.forEach((pokemon) => {
      const botao = screen.getByRole('button', {
        name: pokemon.type,
      });
      return expect(botao).toBeInTheDocument();
    });
  });

  test('Testa se a seleção de um botão de tipo, circula pokémons daquele tipo.', () => {
    renderWithRouter(<App />);

    // Código feito com a ajuda de Felipe Neves
    pokemons.forEach((pokemon) => {
      const botao = screen.getByRole('button', {
        name: pokemon.type,
      });
      userEvent.click(botao);

      const pokeType = screen.getByTestId('pokemon-type');
      expect(pokeType).toHaveTextContent(pokemon.type);
    });
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);

    // Código feito com a ajuda de Felipe Neves
    const botaoAll = screen.getByTestId('');
    expect(botaoAll).toBeInTheDocument();

    userEvent.click(botaoAll);

    const botaoProximo = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(botaoProximo).toBeInTheDocument();

    userEvent.click(botaoProximo);

    const proxPoke = screen.getByTestId('pokemon-type');
    expect(proxPoke).toHaveTextContent(/fire/i);
  });
});
