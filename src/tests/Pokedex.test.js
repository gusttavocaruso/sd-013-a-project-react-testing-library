import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';

afterEach(cleanup);

describe('Testando o componente da Pokedex', () => {
  it('Testando se a página tem h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const textHeader = 'Encountered pokémons';
    const findHeader = screen.getByRole('heading', { name: textHeader, level: 2 });
    expect(findHeader).toBeInTheDocument();
  });
});
