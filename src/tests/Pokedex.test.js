import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const nextPokemon = 'Próximo pokémon';

describe('Requisito 5.1 - Verificando o fluxo inicial do componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se existe um "h2" com o texto "Encountered pokémons"', () => {
    const h2 = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se é renderizado o botão com txto "Próximo pokémon"', () => {
    const proximo = screen.getByText(nextPokemon);
    expect(proximo).toBeInTheDocument();
  });
});

describe('Requisito 5.2 - Verificando o fluxo do botão "Próximo pokémon"', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se o próximo pokémon aparece ao clicar, '
     + 'e se aparece apenas pokémon um por vez', () => {
    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText(nextPokemon));

    const next1 = screen.getByText('Charmander');
    expect(next1).toBeInTheDocument();

    fireEvent.click(screen.getByText(nextPokemon));

    const next2 = screen.getByText('Caterpie');
    expect(next2).toBeInTheDocument();
  });

  it('Verifica se o primeiro Pokémon da lista aarece ao clicar no botão, '
     + 'se estiver no último Pokémon da lista', () => {
    const TOTALCLICKS = 8;

    for (let cliques = 0; cliques <= TOTALCLICKS; cliques += 1) {
      fireEvent.click(screen.getByText(nextPokemon));
      const onlyOne = screen.getAllByTestId('pokemon-name');
      expect(onlyOne.length).toBe(1);
    }
    const first = screen.getByText('Pikachu');
    expect(first).toBeInTheDocument();
  });
});

describe('Requisito 5.3 - Verificando os botões de filtro', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  // Agradeço ao Rogério P. da Silva 1990 cv por não me deixar com preguiça de fazer o map
  it('Verifica se existe um botao de filtro para cada tipo de Pokemon', () => {
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const pokeTypes = screen.getAllByTestId('pokemon-type-button');
    const typesList = pokeTypes.map((type) => type.innerHTML);
    expect(typesList).toEqual(types);
  });

  it('Verifica para cada filtro, que o botão "Próximo" roda apenas internamente', () => {
    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText('Fire'));
    const first = screen.getByText('Charmander');
    expect(first).toBeInTheDocument();
    fireEvent.click(screen.getByText(nextPokemon));
    const next2 = screen.getByText('Rapidash');
    expect(next2).toBeInTheDocument();
  });

  it('Verifica se a Pokédex contém um botão "All", para resetar o filtro, '
   + 'e se este botão está sempre visivel', () => {
    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();

    const TOTALCLICKS = 8;

    for (let cliques = 0; cliques <= TOTALCLICKS; cliques += 1) {
      fireEvent.click(screen.getByText(nextPokemon));
      expect(buttonAll).toBeInTheDocument();
    }
  });

  it('Verifica ao clicar em "All", a Pokedéx reseta a lista', () => {
    const buttonAll = screen.getByText('All');

    fireEvent.click(screen.getByText('Fire'));
    const first = screen.getByText('Charmander');
    expect(first).toBeInTheDocument();
    fireEvent.click(buttonAll);
    const reseted = screen.getByText('Pikachu');
    expect(reseted).toBeInTheDocument();
  });

  it('Verifica que ao carregar a página, o filtro selecionado deverá ser "All"', () => {
    fireEvent.click(screen.getByText('Fire'));
    const fireOne = screen.getByText('Charmander');
    expect(fireOne).toBeInTheDocument();

    fireEvent.click(screen.getByText('About'));
    fireEvent.click(screen.getByText('Home'));

    const reseted = screen.getByText('Pikachu');
    expect(reseted).toBeInTheDocument();
  });
});
