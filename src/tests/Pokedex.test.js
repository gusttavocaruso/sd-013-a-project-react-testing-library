import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokedex.test', () => {
  test('Testa se a um heading `h2` com o texto `Encountered pokémons`.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const headingH2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const testButton = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(testButton);
    expect(screen.getByText(pokemons[1].name)).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const testButton = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(testButton);
    expect(screen.getAllByRole('link', { name: /more details/i })).toHaveLength(1);
  });

  test('Deve existir um botão de filtragem para cada tipo, sem repetição.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    // const typePokemons = [];
    // pokemons.forEach((pokemon, index) => {
    //   if (typePokemons.includes(pokemon.type) === false) {
    //     typePokemons.push(pokemons.type);
    //     if (typePokemons.includes(pokemon.type) === true) {
    //       const regexObject = new RegExp(`/${typePokemons[index]}/`, 'i');
    //       expect(screen.getByRole('button', { name: regexObject })).toBeInTheDocument();
    //     }
    //   }
    // });
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fire' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bug' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Poison' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Psychic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Normal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dragon' })).toBeInTheDocument();
  });

  test(' Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  test('test dataTextId', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const textId = screen.getAllByTestId('pokemon-type-button');
    expect(textId).toBeDefined();
  });
});
