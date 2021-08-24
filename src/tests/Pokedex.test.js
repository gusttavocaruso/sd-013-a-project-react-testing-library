import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const texth2 = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(texth2).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando é clicado', () => {
    renderWithRouter(<App />);
    const botaoNext = screen.getByText('Próximo pokémon');
    expect(botaoNext).toBeInTheDocument();
    userEvent.click(botaoNext);
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokes = screen.getAllByTestId('pokemon-name');
    expect(pokes.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const butoesFilter = screen.getAllByTestId('pokemon-type-button');
    butoesFilter.forEach((botao) => {
      userEvent.click(botao);
      const tipo = screen.getByTestId('pokemon-type');
      expect(botao.textContent).toBe(tipo.textContent);
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const botaoAll = screen.getByText('All');
    expect(botaoAll).toBeVisible();
    userEvent.click(botaoAll);
    expect(screen.getByText('Pikachu'));
  });
});
