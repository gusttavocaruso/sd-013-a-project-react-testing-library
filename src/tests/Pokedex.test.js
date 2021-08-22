import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helper/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex.js', () => {
  test('se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading2 = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(heading2).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon ao clicar no botão "Próximo pokémon"', () => {
    renderWithRouter(<App />); // Já começa com o Pikachu na tela!!!
    pokemons.forEach(({ name }) => { // A 1º iteração é com o Pikachu, a 2º com o Charmander, and so on...
      const screenName = screen.getByTestId('pokemon-name'); // Captura o nome do Pikachu.
      expect(screenName.textContent).toEqual(name); // Se espera que Pikachu = Pikachu.
      const next = screen.getByRole('button', { name: 'Próximo pokémon' }); // Captura o botão.
      fireEvent.click(next); // Mostra o próximo pokémon. O botão segue a ordem dos pokemons no array "pokemons".
    });
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const screenPokemons = screen.getAllByTestId('pokemon-name');
    expect(screenPokemons.length).toBe(1);
  });

  test('se cada tipo de botão aparece apenas uma vez', () => {
    renderWithRouter(<App />);
    const screenButtons = screen.getAllByTestId('pokemon-type-button');
    const arrayOfPokemonTypes = pokemons.map(({ type }) => type);
    const types = [...new Set(arrayOfPokemonTypes)];
    expect(screenButtons.length).toEqual(types.length);
  });

  test('se o texto de cada botão corresponde ao tipo do botão', () => {
    renderWithRouter(<App />);
    const arrayOfPokemonTypes = pokemons.map(({ type }) => type);
    const types = [...new Set(arrayOfPokemonTypes)];
    types.forEach((type, index) => {
      const screenButtons = screen.getAllByTestId('pokemon-type-button');
      expect(screenButtons[index].innerHTML).toEqual(type);
    });
  });

  test('se a Pokédex contém um botão "All" para resetar o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    fireEvent.click(all);
    expect(all).toBeInTheDocument();
  });
});
