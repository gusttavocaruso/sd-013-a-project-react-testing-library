import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

describe('Testa se contém um heading h2 c/ texto Encountered pokémons', () => {
  test('Verifica se contem um h2', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const textEncountered = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(textEncountered).toBeInTheDocument();
  });
});

describe('Testa se é exibido o próximo Pokemon da lista', () => {
  beforeEach(() => {
    render(<BrowserRouter><App /></BrowserRouter>);
  });
  test('Verifica o proximo pokemon quando clicado no botao', () => {
    const btnNextPokemon = screen.getByText(/Próximo pokémon/i);
    expect(btnNextPokemon).toBeInTheDocument();
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    userEvent.click(screen.getByText(/Próximo pokémon/i));

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    userEvent.click(screen.getByText(/Próximo pokémon/i));

    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });

  test('Verifica se aparace o primeiro pokemon se estiver no último da lista', () => {
    const clicks = pokemons.length;
    for (let click = 0; click < clicks; click += 1) {
      userEvent.click(screen.getByText(/Próximo pokémon/i));
    }
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});

describe('', () => {
  beforeEach(() => {
    render(<BrowserRouter><App /></BrowserRouter>);
  });

  test('Testa se a Pokedex tem os botões de filtro', () => {
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const buttonList = buttons.map((button) => button.innerHTML);
    expect(buttonList).toEqual(types);
  });

  test('A partir da seleção de um botão de tipo, retorna o pokemon do tipo', () => {
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    const type = screen.getByTestId('pokemon-type');
    const btnAll = screen.getByText('All');
    expect('Fire').toEqual(type.innerHTML);
    expect(btnAll).toBeInTheDocument();
  });

  test('Verifica que ao carregar a pagina o filtro é All', () => {
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
