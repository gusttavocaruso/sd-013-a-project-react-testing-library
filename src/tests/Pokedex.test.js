import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Conjunto de testes', () => {
  test('Testa se tem um heading h2 com um texto', () => {
    renderWithRouter(<App />);
    const pokedexHeading = screen.getByText('Encountered pokémons');
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Testa se é exibido o proximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const pokedexFirstPokemon = screen.getByText('Pikachu');
    expect(pokedexFirstPokemon).toBeInTheDocument();

    const pokedexButton = screen.getByText('Próximo pokémon');
    expect(pokedexButton).toBeInTheDocument();
    fireEvent.click(pokedexButton);

    const pokedexNamePokemon = screen.getByText('Charmander');
    expect(pokedexNamePokemon).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokedexFirstPokemon = screen.getByText('Pikachu');
    expect(pokedexFirstPokemon).toBeInTheDocument();

    const pokedexNextPokemonLink = screen.getByText('Próximo pokémon');
    fireEvent.click(pokedexNextPokemonLink);

    const pokedexSecondPokemon = screen.getByText('Charmander');
    expect(pokedexSecondPokemon).toBeInTheDocument();
  });

  test('Testa se a Pokédex tem botôes de filtro', () => {
    renderWithRouter(<App />);
    const pokedexTypePokemonButton = screen.getByText('Fire');
    fireEvent.click(pokedexTypePokemonButton);

    const pokedexTypePokemon = screen.getByText('Charmander');
    expect(pokedexTypePokemon).toBeInTheDocument();

    const pokedexAllPokemonButton = screen.getByText('All');
    expect(pokedexAllPokemonButton).toBeInTheDocument();
    fireEvent.click(pokedexAllPokemonButton);

    const pokedexFirstPokemonAllType = screen.getByText('Pikachu');
    expect(pokedexFirstPokemonAllType).toBeInTheDocument();
  });

  test('Testa se a Pokedéx contém um botão de resetar o filtro', () => {
    renderWithRouter(<App />);
    const pokedexFilterFirstPokemon = screen.getByText('Pikachu');
    expect(pokedexFilterFirstPokemon).toBeInTheDocument();

    const pokedexFilterByType = screen.getAllByTestId('pokemon-type-button');
    pokedexFilterByType.forEach((item, index) => {
      if (index === 1) {
        fireEvent.click(item);
      }
    });

    const pokedexFilterSecondPokemon = screen.getByText('Charmander');
    expect(pokedexFilterSecondPokemon).toBeInTheDocument();

    const pokedexFilterAllType = screen.getByText('All');
    fireEvent.click(pokedexFilterAllType);
    expect(pokedexFilterFirstPokemon).toBeInTheDocument();
  });
});
