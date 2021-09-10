import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testar o componente Pokedex', () => {
  test('Página contém o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      }),
    ).toBeInTheDocument();
  });
  test('Página contém o botão próximo pokemon', () => {
    renderWithRouter(<App />);
    expect(
      screen.getByRole('button', {
        name: /Próximo pokémon/i,
      }),
    ).toBeInTheDocument();
  });
});
describe('testar o pŕoximo pokemon quando botão clicado', () => {
  test('o click em próximo pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('Home'));
    userEvent.click(
      screen.getByRole('button', {
        name: /Próximo pokémon/i,
      }),
    );
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
describe('testar se o pokédex tem botão de filtros', () => {
  // Esse test específico teve como ajuda a aluna Elaine Moreira.
  test('Testar a existência dos botões de filtro', () => {
    renderWithRouter(<App />);
    const pegarUmPokemon = screen.getAllByTestId('pokemon-type-button');
    expect(pegarUmPokemon[0]).toBeInTheDocument();
    userEvent.click(pegarUmPokemon[0]);
    expect(pegarUmPokemon[0].innerHTML).toBe('Electric');
  });
  test('testando a existência do botão all', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
