import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('quando clicar no botão "proximo pokemon", mostra um novo pokemon na tela', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    /* fireEvent.click(screen.getByText('Próximo pokémon'));

    expect().toBeInTheDocument(); */
  });
});
