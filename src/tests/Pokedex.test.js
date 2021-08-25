import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes da aplicação.', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen.getAllByRole('heading', {
      Name: /Encauntered pokémons/i,
    });
    expect(heading[1]).toHaveTextContent('Encountered pokémons');
  });

  test('Teste se é exibido o próximo Pokémon da lista.', () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(buttonNextPokemon);
    expect(buttonNextPokemon).toHaveTextContent('Próximo pokémon');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const buttonForType = screen.getAllByTestId('pokemon-type-button');
    userEvent.type(buttonForType);
    expect(buttonForType[1]).toHaveTextContent('Fire');
  });
});
