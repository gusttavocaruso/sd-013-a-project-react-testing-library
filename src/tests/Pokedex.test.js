import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const nextPokemon = 'Próximo pokémon';

describe('Requisito 5.1 - Verificando o fluxo inicial do componente <Pokedex />', () => {
  // renderizo o App antes de cada teste deste describe
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se existe um "h2" com o texto "Encountered pokémons"', () => {
    // Verifico que é encontrado o h2 com o texto requisitado
    const h2 = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se é renderizado o botão com txto "Próximo pokémon"', () => {
    // Verifico a existência do texto contido no botão, e que ela é única
    const proximo = screen.getByText(nextPokemon);
    expect(proximo).toBeInTheDocument();
  });
});

describe('Requisito 5.2 - Verificando o fluxo do botão "Próximo pokémon"', () => {
  // Renderizo o App antes de cada teste deste describe
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se o próximo pokémon aparece ao clicar, '
     + 'e se aparece apenas pokémon um por vez', () => {
    // Clico em 'home' e depois no botão 'próximo'
    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText(nextPokemon));

    // Verifico que o próximo é o 'Charmander'
    const next1 = screen.getByText('Charmander');
    expect(next1).toBeInTheDocument();

    // Clico em 'próximo' novamente
    fireEvent.click(screen.getByText(nextPokemon));

    // Verifico que o próximo é o Caterpie
    const next2 = screen.getByText('Caterpie');
    expect(next2).toBeInTheDocument();
  });

  it('Verifica se o primeiro Pokémon da lista aparece ao clicar no botão, '
     + 'se estiver no último Pokémon da lista', () => {
    // Pego o comprimento total do array de pokemons
    const TOTALCLICKS = pokemons.length;

    // Realizo um 'for' clicando no botão próximo o mesmo número de vezes do comprimento do array de pokemons, para ver se ao final volta para o próximo pokemon, e verifico que é o pikachu o primeiro novamente.
    for (let cliques = 0; cliques < TOTALCLICKS; cliques += 1) {
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
    // array de tipos de pokemons
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    // Verifica que existe para cada elemento com o data-testid fornecido, um botão com o nome de uma categoria específica do array definido acima
    const pokeTypes = screen.getAllByTestId('pokemon-type-button');
    const typesList = pokeTypes.map((type) => type.innerHTML);
    expect(typesList).toEqual(types);
  });

  it('Verifica para cada filtro, que o botão "Próximo" roda apenas internamente', () => {
    // Vou para Home, filtro pelos pokemons do tipo 'fire'
    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText('Fire'));

    // Vejo que o primeiro é o 'charmander'
    const first = screen.getByText('Charmander');
    expect(first).toBeInTheDocument();

    // Clico em 'próximo'
    fireEvent.click(screen.getByText(nextPokemon));

    // Vejo que o próximo é o 'Rapidash'
    const next2 = screen.getByText('Rapidash');
    expect(next2).toBeInTheDocument();
  });

  it('Verifica se a Pokédex contém um botão "All", para resetar o filtro, '
   + 'e se este botão está sempre visivel', () => {
    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();

    const TOTALCLICKS = pokemons.length;

    // Percorro a lista de filtros completa verificando que o botão 'All' não some da tela.
    for (let cliques = 0; cliques <= TOTALCLICKS; cliques += 1) {
      fireEvent.click(screen.getByText(nextPokemon));
      expect(buttonAll).toBeInTheDocument();
    }
  });

  it('Verifica ao clicar em "All", a Pokedéx reseta a lista', () => {
    const buttonAll = screen.getByText('All');

    // Seleciono os pokemons de fogo
    fireEvent.click(screen.getByText('Fire'));

    // Vejo que o Charmander é o primeiro da tela
    const first = screen.getByText('Charmander');
    expect(first).toBeInTheDocument();

    // Aperto 'All'
    fireEvent.click(buttonAll);

    // Vejo que o Pikachu é quem aparece agora, resetando a lista;
    const reseted = screen.getByText('Pikachu');
    expect(reseted).toBeInTheDocument();
  });

  it('Verifica que ao carregar a página, o filtro selecionado deverá ser "All"', () => {
    // Seleciono pokemons de fogo
    fireEvent.click(screen.getByText('Fire'));

    // Vejo que 'Charmander' aparece na tela
    const fireOne = screen.getByText('Charmander');
    expect(fireOne).toBeInTheDocument();

    // Vou para About, e depois para Home, recarregando assim a tela;
    fireEvent.click(screen.getByText('About'));
    fireEvent.click(screen.getByText('Home'));

    // Vejo que 'Charmander' não aparece na tela, e agora é 'Pikachu', ou seja, o filtro selecionado voltou a ser 'All'
    const reseted = screen.getByText('Pikachu');
    expect(reseted).toBeInTheDocument();
  });
});
