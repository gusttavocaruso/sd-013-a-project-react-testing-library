import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

describe('Testing PokemonDetails.js', () => {
  test('testing the text with pokemons names', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const details = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(details);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });
});
