import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa pokedex', () => {
  test('Heading Encountered pokémons', () => {
    renderWithRouter(<App />);
    const element = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(element).toBeInTheDocument();
  });

  test('Testa botao Próximo pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();
  });

  test('Testa proximo se proximo pokemon aparece', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText('Psychic'));
    const pokemons1 = screen.getByText('Alakazam');
    expect(pokemons1).toBeInTheDocument();

    fireEvent.click(screen.getByText('Próximo pokémon'));
    const pokemons2 = screen.getByText('Mew');
    expect(pokemons2).toBeInTheDocument();

    fireEvent.click(screen.getByText('Dragon'));
    const pokemonDragon = screen.getByText('Dragonair');
    expect(pokemonDragon).toBeInTheDocument();
  });

  test('Testa os filtros', () => {
    renderWithRouter(<App />);
    const optionsLength = 7;
    const types = screen.getAllByTestId('pokemon-type-button');
    expect(types.length).toBe(optionsLength);
  });

  test('Testa se reseta os filtros', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', {
      name: /all/i,
    });
    expect(all).toBeInTheDocument();
    fireEvent.click(all);
    fireEvent.click(screen.getByText('Próximo pokémon'));
    const poke = screen.getByText('Charmander');
    expect(poke).toBeInTheDocument();
  });
});
