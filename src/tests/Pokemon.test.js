import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Test Pokemon.js', () => {
  test('Teste se é renderizado um card com informações de determinado pokémon.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
  // expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  // expect(screen.getByAllText(pokemons[0].type)).toHaveLength(2);
  const img = screen.getByAltText(`${pokemons[0].name} sprite`);
  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});
