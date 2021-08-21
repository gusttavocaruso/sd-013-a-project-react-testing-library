import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('Testando o componente da Pokedex', () => {
  it('Testando se a página tem h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const textHeader = 'Encountered pokémons';
    const findHeader = screen.getByRole('heading', { name: textHeader, level: 2 });
    expect(findHeader).toBeInTheDocument();
  });
  it('Testando se é exibido o próximo pokemon da lista ao clicar em próximo', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();

    const arrayPokemons = pokemons.map(({ name }) => name);
    arrayPokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName.textContent).toBe(pokemon);
      fireEvent.click(nextButton);
    });
  });
  it('Testando se é exibido apenas um pokemon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
  it('Testando se todos os filtros de tipos aparecem apenas uma vez', () => {
    renderWithRouter(<App />);
    const typeFound = screen.getAllByTestId('pokemon-type-button');
    const pokemonsTypes = pokemons.map(({ type }) => type);
    const uniqueTypes = [...new Set(pokemonsTypes)];
    expect(typeFound.length).toBe(uniqueTypes.length);
  });
  it('Testando se o texto do botão corresponde ao nome do tipo', () => {
    renderWithRouter(<App />);
    const pokemonsTypes = pokemons.map(({ type }) => type);
    const uniqueTypes = [...new Set(pokemonsTypes)];

    const typeFound = screen.getAllByTestId('pokemon-type-button');
    uniqueTypes.forEach((type, index) => {
      expect(typeFound[index].innerHTML).toBe(type);
    });
  });
  it('Testando se existe um botão "all" que reseta os filtros', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
  });
});
