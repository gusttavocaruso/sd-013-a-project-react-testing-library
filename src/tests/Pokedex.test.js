import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests component "Pokedex"', () => {
  test('if page contains h2 with specific text', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  test('if next pokémon is shown when button is clicked', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/Pikachu/i);
    const button = screen.getByText(/Próximo pokémon/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(button);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
  });
});
