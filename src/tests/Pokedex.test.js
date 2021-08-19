import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const findPokemons = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons' });
    expect(findPokemons).toBeInTheDocument();
  });
  test('', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByText(/próximo pokémon/i);
    fireEvent.click(btnNext);
    expect().toBe('');
  });
});
