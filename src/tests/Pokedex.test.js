import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o elemento Pokedex e suas funcionalidades', () => {
  const type = 'pokemon-type';
  it('Deve renderizar o titulo "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const Header = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(Header).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(buttonNext);
    });
  });

  it('Testa se é mostrado apenas um pokemon', () => {
    renderWithRouter(<App />);
    const getPokemon = screen.getAllByTestId('pokemon-name');
    expect(getPokemon).toHaveLength(1);
  });

  it('Testa se tem todos os botões de filtro', () => {
    renderWithRouter(<App />);
    const allTypes = 7;
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    allButtons.forEach((button) => expect(button).toBeInTheDocument());
    expect(allButtons).toHaveLength(allTypes);
  });

  it('Testa os botões de tipo, se selecionam corretamente', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    allButtons.forEach((button, index) => {
      userEvent.click(allButtons[index]);
      const getTypeName = button.innerHTML;
      const getTypePokemon = screen.getByTestId(type);
      const nameType = getTypePokemon.innerHTML;
      expect(nameType).toBe(getTypeName);
      const buttonAll = screen.getByRole('button', { name: 'All' });
      expect(buttonAll).toBeInTheDocument();
    });
  });

  it('Testa o botão ALL, se ao clicar todos os pokemons ficam selecionados', () => {
    renderWithRouter(<App />);
    const pokemon1Type = screen.getByTestId(type);
    const name1Type = pokemon1Type.innerHTML;
    expect(name1Type).toBe('Electric');
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNext);
    const pokemon2Type = screen.getByTestId(type);
    const name2Type = pokemon2Type.innerHTML;
    expect(name2Type).toBe('Fire');
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const pokemonOneType = screen.getByTestId(type);
    const nameOneType = pokemonOneType.innerHTML;
    expect(nameOneType).toBe('Electric');
  });
});

// Exercicio feito com ajuda de Lanai Conceição
