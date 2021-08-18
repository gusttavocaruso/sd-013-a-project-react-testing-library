import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('teste do Pokedex', () => {
  test('Teste do h2 com Encountered pokémons', () => {
    renderWithRouter(<App />);
    const header2 = screen.getByRole('heading', { name: /Encountered/i });

    expect(header2).toBeInTheDocument();
  });
});
