import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente "Pokedex"', () => {
  it('Teste se página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const headingText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(headingText).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const arrayPokemons = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    arrayPokemons.forEach((pokemonName) => {
      userEvent.click(buttonNext);
      const nextPokemon = screen.getByText(pokemonName);
      expect(nextPokemon).toBeInTheDocument();
    });
  });

  it('Teste se é mostrado um pokemon por vez', () => {
    renderWithRouter(<App />);

    const imagePikachu = screen.getAllByText(/Average weight/i);

    expect(imagePikachu.length).toBe(1);
  });
});

describe('Testa filtros do componente', () => {
  it('Teste os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(buttonAll).toBeInTheDocument();

    const buttons = screen.getAllByTestId('pokemon-type-button');

    const fireFilterButton = buttons[1];

    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(fireFilterButton);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();

    expect(fireFilterButton.textContent).toBe('Fire');
    expect(buttonAll).toBeInTheDocument();
    // const charmander = screen.getByTestId('pokemon-type');
    // expect(charmander.textContent).toBe('Fire');

    // userEvent.click(nextPokemon);
    // const rapidash = screen.getByTestId('pokemon-type');
    // expect(rapidash.textContent).toBe('Fire');

    // expect(fireFilterButton.textContent).toBe('Fire');
    // expect(buttonAll).toBeInTheDocument();
  });

  it('Testa se ao carregar a página o filtro é "All"', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(buttonNext);
    let nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(buttonNext);
    nextPokemon = screen.getByText(/Caterpie/i);
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(buttonNext);
    nextPokemon = screen.getByText(/Ekans/i);
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(buttonNext);
    nextPokemon = screen.getByText(/Alakazam/i);
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(buttonNext);
    nextPokemon = screen.getByText(/mew/i);
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(buttonNext);
    nextPokemon = screen.getByText(/rapidash/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Teste se existe um botão que reseta o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    const buttonFire = screen.getByRole('button', {
      name: /fire/i,
    });

    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonFire);
    const pokemon = screen.getByText('Charmander');
    expect(pokemon).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
