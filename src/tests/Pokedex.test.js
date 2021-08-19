import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente Pokedex.js', () => {
  it('Deve conter um h2 com o texto "Encoutered pokémons"', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /encountered pokémons/i });

    expect(h2).toBeInTheDocument();
  });
});
