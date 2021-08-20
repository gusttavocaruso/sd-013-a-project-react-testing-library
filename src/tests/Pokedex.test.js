import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componete "Pokedex"', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingElement = screen.getByRole('heading', {
      name: /Encountered pokémons/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon quando o botão Próximo é clicado.', () => {
    renderWithRouter(<App />);
    const buttonElement = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonElement).toBeInTheDocument(); // passando o valor esperado a ser testado no click do botão.
    userEvent.click(buttonElement); // testando o click do botão.
  });

  test('Testa se é mostrado um pokemon a cada vez', () => {
    renderWithRouter(<App />);
    const buttonFilterAll = screen.getByText('All'); // recuperando o elemento button onde que recebe a função que filtra todos os pokemons no component Pokedex.
    expect(buttonFilterAll).toBeInTheDocument();
    userEvent.click(buttonFilterAll); // testando o clique do botao
  });
});

describe('Testando os filtros do componente', () => {
  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button'); // Recuperando o elemento pelo data testid
    expect(filterButtons[0]).toBeInTheDocument();
    userEvent.click(filterButtons[0]); // testando os botoes
    expect(filterButtons[0].innerHTML).toBe('Electric');
  });
});
