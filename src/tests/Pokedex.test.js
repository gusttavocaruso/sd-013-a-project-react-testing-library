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
    expect(screen.getByRole('button', { name: /próximo pokémon/i })).toBeInTheDocument();
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

  test('Deve existir um botão para cada tipo de Pokémon, sem repetição.', () => {
    // const typesPokemons = [];
    // pokemons.forEach((pokemon, index) => {
    //   if (typesPokemons.includes(pokemon.type) === false) {
    //     typesPokemons.push(pokemons.type);
    //     if (typesPokemons.includes(pokemon.type) === true) {
    //       const regex = new RegExp(`/${typesPokemons[index]}/`, 'i');
    //       expect(screen.getByRole('button', {
    //         name: regex,
    //       })).toBeInTheDocument();
    //     }
    //   }
    // });
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    // expect(screen.getByRole('button', { name: new RegExp(/all/, 'i') }))
    //   .toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(/electric/, 'i') }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(/fire/, 'i') }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(/bug/, 'i') }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(/poison/, 'i') }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(/psychic/, 'i') }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(/normal/, 'i') }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(/dragon/, 'i') }))
      .toBeInTheDocument();
  });

  test('A partir de um tipo, a Pokédex deve mostrar pokémons daquele tipo;', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const buttonFilter = screen.getByRole('button', { name: /fire/i });
    fireEvent.click(buttonFilter);
    expect(screen.getAllByText(/fire/i)).toHaveLength(2);
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(buttonNext);
    expect(screen.getAllByText(/fire/i)).toHaveLength(2);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
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
