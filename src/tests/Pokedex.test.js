import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente Pokedex', () => {
  it('este se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const msgEncounteredPokes = screen.getByText('Encountered pokémons');
    expect(msgEncounteredPokes).toBeInTheDocument();
  });
});
