import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  test('Verifica se é renderizado o botão com txto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const proximo = screen.getByText(/Próximo pokémon/i);
    expect(proximo).toBeInTheDocument();
  });

  // Baseado no código da Caroline Boaventura
  test('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    const pokemonsList = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    pokemonsList.forEach((pokemonName) => {
      userEvent.click(buttonNext);
      const nextPokemon = screen.getByText(pokemonName);
      expect(nextPokemon).toBeInTheDocument();
    });
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const proximo = screen.getByText('Próximo pokémon');
    userEvent.click(proximo);
    // Como todo pokemon tem falando de seu peso, pegamos todos os elementos que tem o texto sobre o peso do pokemon,
    // Ao vermos que só aparece um peso, logo tem apenas um pokemon na tela
    const PesoPokemon = screen.getAllByText(/Average weight/i);
    expect(PesoPokemon.length).toBe(1);
    userEvent.click(proximo);
    expect(PesoPokemon.length).toBe(1);
    userEvent.click(proximo);
    expect(PesoPokemon.length).toBe(1);
  });

  test('este se a Pokédex tem os botões de filtro, para cada tipo de pokemon', () => {
    renderWithRouter(<App />);

    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const botaoAll = screen.getByText('All');
    expect(botaoAll).toBeInTheDocument();
    const pokeTypes = screen.getAllByTestId('pokemon-type-button');
    expect(botaoAll).toBeInTheDocument();
    const typesList = pokeTypes.map((type) => type.innerHTML);
    expect(botaoAll).toBeInTheDocument();
    expect(typesList).toEqual(types);
    expect(botaoAll).toBeInTheDocument();
  });

  it('Verifica ao clicar em "All", a Pokedéx reseta a lista', () => {
    renderWithRouter(<App />);
    const botaoAll = screen.getByText('All');
    userEvent.click(screen.getByText('Fire'));
    const pokemonFire = screen.getByText('Charmander');
    expect(pokemonFire).toBeInTheDocument();
    userEvent.click(botaoAll);
    const pokemonDefault = screen.getByText('Pikachu');
    expect(pokemonDefault).toBeInTheDocument();
  });

  it('Verifica que ao carregar a página, o filtro selecionado deverá ser "All"', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText('Normal'));
    const pokemonNormal = screen.getByText('Snorlax');
    expect(pokemonNormal).toBeInTheDocument();

    userEvent.click(screen.getByText('About'));
    userEvent.click(screen.getByText('Home'));

    const pkemonDefault = screen.getByText('Pikachu');
    expect(pkemonDefault).toBeInTheDocument();
  });
});
