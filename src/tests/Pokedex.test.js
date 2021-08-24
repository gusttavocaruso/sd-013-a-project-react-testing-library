import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
// import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

describe('Pokedex.js tests', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });

  test('Primeiro Bloco - 6 testes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const buttonNext = screen.getByTestId('next-pokemon');
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(screen.getByText(/Próximo pokémon/i));
    const next = screen.getByText('Charmander');
    expect(next).toBeInTheDocument();

    userEvent.click(screen.getByText(/Próximo pokémon/i));
    const next2 = screen.getByText('Caterpie');
    expect(next2).toBeInTheDocument();
  });

  test('primeiro Pokémon da lista deve ser mostrado quando na última posição;', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const buttonNext = screen.getByTestId('next-pokemon');
    const LENGHT = 9;
    pokemons.forEach((pokemon, index) => {
      if (index <= LENGHT) userEvent.click(buttonNext);
    });
    const first = screen.getByText(/Pikachu/i);
    expect(first).toBeInTheDocument();
  });

  test('se a Pokédex tem os botões de filtro', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const NUMBER_OF_BUTTONS = 7;
    const allButtonType = screen.getAllByTestId('pokemon-type-button');
    allButtonType.forEach((item) => expect(item).toBeInTheDocument());
    expect(allButtonType).toHaveLength(NUMBER_OF_BUTTONS);
  });
  test('se  apartir da seleção de um botão de tipo, a Pokédex circula limitada', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const allButtonType = screen.getAllByTestId('pokemon-type-button');
    const psychicButton = allButtonType.find((button) => button.innerHTML === 'Psychic');
    userEvent.click(psychicButton);
    const teste = screen.getByTestId('pokemon-type').innerHTML;
    expect(teste).toBe('Psychic');
  });

  test('se a Pokédex tem o botão All', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const firstPoke = screen.getByText('Pikachu');
    expect(firstPoke).toBeInTheDocument();
  });
});
