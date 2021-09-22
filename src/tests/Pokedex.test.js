import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import historyComponent from '../components/historyComponent';

const MagicNumber = 7;

describe('Teste o componente <Pokedex.js />', () => {
  test('Verifica se a página contem um "h2" com o texto "Encountered pokémons"', () => {
    historyComponent(<App />);
    const testHeading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(testHeading).toBeInTheDocument();
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    historyComponent(<App />);
    const onlyPokemon = screen.getAllByText(/Average weight/i);
    expect(onlyPokemon).toHaveLength(1);
  });

  test('Verifica a funcionalidade do botão "Próximo pokémon"', () => {
    historyComponent(<App />);
    const testButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(testButton).toBeInTheDocument();
    userEvent.click(testButton);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Verifica se a Pokédex tem os botões de filtro.', () => {
    historyComponent(<App />);
    const testTypeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(testTypeBtn).toHaveLength(MagicNumber);
    const testNameBtn = screen.getAllByText(/Psychic/i);
    expect(testNameBtn).toHaveLength(1);
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    historyComponent(<App />);
    const testAllButton = screen.getByRole('button', { name: 'All' });
    expect(testAllButton).toBeInTheDocument();
    userEvent.click(testAllButton);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
