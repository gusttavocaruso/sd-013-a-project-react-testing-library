import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Componente Pokedex', () => {
  const POKEMON_NAME = 'pokemon-name';

  test('página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btn).toBeInTheDocument();
  });

  // Reference: Gabriel Gaspar's code: https://github.com/tryber/sd-013-a-project-react-testing-library/pull/2/files
  test('próximos Pokémons da lista devem ser mostrados, ao clicar no botão', () => {
    renderWithRouter(<App />);

    const btn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btn).toBeInTheDocument();

    const pokemonsNames = pokemons.map((pokemon) => pokemon.name);
    pokemonsNames.forEach((pokemon, index) => {
      userEvent.click(btn);
      const name = screen.getByTestId(POKEMON_NAME);
      if (index === pokemonsNames.length - 1) {
        expect(name.innerHTML).toBe(pokemonsNames[0]);
      } else {
        expect(name.innerHTML).toBe(pokemonsNames[index + 1]);
      }
    });
  });

  test('é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonCard = screen.getAllByTestId(POKEMON_NAME);
    expect(pokemonCard).toHaveLength(1);
  });

  // Reference: Pedro Alles's code: https://github.com/tryber/sd-013-a-project-react-testing-library/pull/1/files
  describe('Botões de filtro', () => {
    test('existe UM botão de filtragem para cada tipo de Pokémon', () => {
      renderWithRouter(<App />);

      const typeButtons = screen.getAllByTestId('pokemon-type-button');
      const allButton = screen.getByRole('button', { name: 'All' });
      const screenButtons = [allButton, ...typeButtons];
      expect(screenButtons).toBeDefined();

      const types = new Set(pokemons.map(({ type }) => type));
      const allTypes = ['All', ...types];
      expect(allTypes.length).toStrictEqual(screenButtons.length);
    });

    test('Pokedex deve circular somente pelos pokémons do tipo selecionado', () => {
      renderWithRouter(<App />);

      const screenButtons = screen.getAllByTestId('pokemon-type-button');
      const types = new Set(pokemons.map(({ type }) => type));
      const pokemonsType = [...types];

      screenButtons.forEach((btn, i) => {
        expect(btn.textContent).toStrictEqual(pokemonsType[i]);
        userEvent.click(btn);

        const filteredPokemons = pokemons
          .filter(({ type }) => (type === btn.textContent));

        filteredPokemons.forEach((pokemon) => {
          expect(pokemon.type).toBe(btn.textContent);
          const allButton = screen.getByRole('button', { name: 'All' });
          expect(allButton).toBeDefined();
        });
      });
    });
  });

  test('Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeDefined();
    userEvent.click(allButton);
    const pokemon = screen.getByTestId(POKEMON_NAME);
    expect(pokemon.textContent).toBe('Pikachu');
  });
});
