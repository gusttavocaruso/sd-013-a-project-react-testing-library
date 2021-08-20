import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

describe('testing pokedex component', () => {
  test('check if component renders a h2 element', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const h2 = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });

    expect(h2).toBeInTheDocument(); // verifica se o elemento h2 está na tela
  });
});
describe('testing pokedex component', () => {
  test('check if each next pokemon is displayed when next button is clicked', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    fireEvent.click(allButton);

    expect(nextButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();

    const pokemonsArray = pokemons.map(({ name }) => name);
    pokemonsArray.forEach((pokemon, index) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument(); // verifica se o pokemon é renderizado ao clicar no botão próximo pokemon
      expect(screen.getAllByText(pokemon).length).toBe(1); // verifica se apenas um pokemon é renderizado

      fireEvent.click(nextButton);

      if (index === pokemons.length - 1) {
        expect(screen.getByText(pokemonsArray[0])).toBeInTheDocument(); // verifica se o primeiro pokemon da lista é rendezirado aṕos o ultimo
      }
    });
  });
  test('testing filter buttons...', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const pokemonsType = [...new Set(pokemons.map(({ type }) => type))];
    const typeButtons = screen.getAllByTestId(/pokemon-type-button/i);

    expect(typeButtons).toHaveLength(pokemonsType.length); // verifica se existe apenas um botão para cada tipo de pokemon

    pokemonsType.forEach((type) => {
      fireEvent.click(screen.getByRole('button', {
        name: type,
      }));

      expect(screen.getByTestId('pokemon-type')).toBeInTheDocument(); // testando se pokemon corresponde ao mesmo tipo do botão
      expect(screen.getByText('All')).toBeInTheDocument(); // testando se o botão All está sempre visível
    });
  });
});
