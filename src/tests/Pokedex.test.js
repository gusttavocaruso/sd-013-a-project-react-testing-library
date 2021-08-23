import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes', () => {
  it('teste1', () => {
    renderWithRouter(<App />);
    const name = screen.getByText(/pikachu/i);
    const heading = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(heading).toBeInTheDocument();
    const button = screen.getByTestId('next-pokemon');
    userEvent.click(button);
    const nameTwo = screen.getByText(/Charmander/i);
    expect(nameTwo).not.toBe(name);
  });
});
