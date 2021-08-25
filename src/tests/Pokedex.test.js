import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

describe('Teste 5 - Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon quando o botão é clicado.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const buttonPokemonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(buttonPokemonNext);
    expect(screen.getByText(pokemons[1].name)).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const buttonPokemonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(buttonPokemonNext);
    const favorites = screen.getAllByRole('link', { name: /more details/i });
    expect(favorites).toHaveLength(1);
  });
});
