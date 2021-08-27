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
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fire' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bug' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Poison' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Psychic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Normal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dragon' })).toBeInTheDocument();
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
});
