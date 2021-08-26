import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

describe('Testing the Pokedex Component', () => {
  test('testing if the page have a h2 with specif text', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });

  test('testing if the page shows specific content on click', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(buttonNext);
    expect(screen.getByText(pokemons[1].name)).toBeInTheDocument();
  });

  test('testing if shows only one pokemon at a time', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(buttonNext);
    expect(screen.getAllByRole('link', { name: /more details/i })).toHaveLength(1);
  });

  test('testing if the Pokedex application have specific buttons', () => {
    // const uniqueTypes = [];
    // pokemons.forEach((pokemon, index) => {
    //   if (uniqueTypes.includes(pokemon.type) === false) {
    //     uniqueTypes.push(pokemons.type);
    //     if (uniqueTypes.includes(pokemon.type) === true) {
    //       const regexObject = new RegExp(`/${uniqueTypes[index]}/`, 'i');
    //       expect(screen.getByRole('button', { name: regexObject })).toBeInTheDocument();
    //     }
    //   }
    // });
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fire' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bug' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Poison' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Psychic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Normal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dragon' })).toBeInTheDocument();
  });

  test('testing filter capacity', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const filterButton = screen.getByRole('button', { name: 'All' });
    expect(filterButton).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  test('testing data test id', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getAllByTestId('pokemon-type-button')).toBeDefined();
  });
});
