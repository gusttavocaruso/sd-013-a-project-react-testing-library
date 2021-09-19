import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../App';

const next = 'Próximo pokémon';

describe('Verifica se a página Pokedex renderiza corretamente', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Verifica se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const h2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon da lista'
  + 'quando o botão Próximo pokémon é clicado.', () => {
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(screen.getByText(next));
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    fireEvent.click(screen.getByText(next));
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });

  it('Verifica O primeiro Pokémon da lista é mostrado ao clicar no botão,'
  + 'se estiver no último Pokémon da lista', () => {
    const NOVE = 9;
    for (let index = 0; index < NOVE; index += 1) {
      fireEvent.click(screen.getByText(next));
    }
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});

describe('Verifica se a Pokédex tem os botões de filtro corretos', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Verifica se existe um botão de filtragem para cada tipo de Pokémon,'
  + 'sem repetição.', () => {
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const pokeButtons = screen.getAllByTestId('pokemon-type-button');
    const pokeTypes = pokeButtons.map((button) => button.innerHTML);
    expect(pokeTypes).toEqual(types);
  });

  it('Verifica se A partir da seleção de um botão de tipo,'
  + 'a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    fireEvent.click(screen.getByText('Psychic'));
    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    fireEvent.click(screen.getByText(next));
    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro '
  + 'e se selecionado, reseta o filtro'
  + 'Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(screen.getByText('Fire'));
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    const btnAll = screen.getByText('All');
    expect(btnAll).toBeInTheDocument();
    fireEvent.click(screen.getByText('All'));
    expect(pikachu).toBeInTheDocument();
  });
});
