import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encounteredTextPokemon = screen.getByRole('heading', {
      name: /Encountered pokémons/,
      level: 2,
    }); expect(encounteredTextPokemon).toBeInTheDocument();
  });
});

describe('Teste se é exibido o próximo Pokémon da lista', () => {
  test('O botão deve conter o texto Próximo pokémon;', () => {
    renderWithRouter(<App />);
    const button = screen.getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
  });
});
