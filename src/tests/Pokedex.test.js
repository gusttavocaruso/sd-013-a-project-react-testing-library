import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js /> (req5)', () => {
  const pokemonName = 'pokemon-name';
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);
    const h2Heading = screen.getByRole('heading',
      { name: /Encountered pokémons/i,
        level: 2 });

    // Faz o teste
    expect(h2Heading).toBeInTheDocument();
  });

  it('Se exibe próximo Pokémon da lista clicando em "Próximo Pokemon"', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);
    const currentPokemon = screen.getByTestId(pokemonName);
    expect(currentPokemon.innerHTML).toBe('Pikachu');

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(buttonNext);

    const nextPokemon = screen.getByTestId(pokemonName);
    expect(nextPokemon.innerHTML).toBe('Charmander');
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(buttonNext);
    const OnePokemon = screen.getAllByTestId(pokemonName);
    expect(OnePokemon.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);

    // Testando se a Pokedéx tem os botões de filtro
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const allBtnFilter = screen.getAllByTestId('pokemon-type-button');
    const filterText = allBtnFilter.map((type) => type.innerHTML);
    expect(filterText).toStrictEqual(types);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll.innerHTML).toBe('All');
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    // Testando se a Pokedéx tem os botões de filtro
    fireEvent.click(btnAll);
    const typeEletric = (screen.getByTestId('pokemon-type')).innerHTML;

    fireEvent.click(buttonNext);
    const typeFire = (screen.getByTestId('pokemon-type')).innerHTML;

    expect(typeFire).not.toBe(typeEletric);
  });
});
