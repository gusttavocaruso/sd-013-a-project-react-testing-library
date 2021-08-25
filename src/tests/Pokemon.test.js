import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

describe('Teste Pokemon.js', () => {
  test('Teste se renderiza um card com as informações de determinado pokémon.', () => {});
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  expect(screen.getAllByText(/Electric/i)).toHaveLength(2);
  // const { averageWeight: { value, measurementUnit } } = pokemons[0];
  // const regex = new RegExp(`/Average weight: ${value} ${measurementUnit}/`, 'i');
  // expect(screen.getByText(regex)).toBeInTheDocument();
});
