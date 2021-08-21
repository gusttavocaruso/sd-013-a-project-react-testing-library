import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokedex renderizando o App', () => {
  test('Testa se Pokedex tem um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    // Pegando o h2
    const getHeading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    // Verificando se ele está na página
    expect(getHeading).toBeInTheDocument();
  });

  // Teste feito com a ajuda de João Lima
  test('Testa se existe um botão Next e se ao clicar mostra o próximo pokemon ', () => {
    renderWithRouter(<App />);

    // Pegando o botão Next
    const getButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    // Verificando se ele está na página
    expect(getButton).toBeInTheDocument();

    // Aplicando a regra PARA CADA pokemon
    pokemons.forEach((pokemon) => {
      // Pega o nome do pokemon pelo testId
      const getPokemonName = screen.getByTestId('pokemon-name');
      // Verificando se o name do pokemon está correto
      expect(getPokemonName).toHaveTextContent(pokemon.name);
      // Mudando de pokemon (next pokemon)
      userEvent.click(getButton);
    });
  });

  test('Testa se é mostrado um pokemon por vez', () => {
    renderWithRouter(<App />);

    // Pega o pokemon pelo TestId
    const getPokemonByTestId = screen.getAllByTestId('pokemon-name');
    // Ao clicar no botão espero que só exista 1 pokemon
    expect(getPokemonByTestId.length).toBe(1);
  });

  // Teste se a Pokédex tem os botões de filtro:
  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    // Meu Linter não me deixou colocar diretamente o 7, e me instruiu a usar o Magic Number
    const LENGTH_ALL_TYPES = 7;
    // Pegando todos os botões e fazendo um forEach para ver se cada um deles está na página:
    // Pegando TODOS os botões
    const getButtonType = screen.getAllByTestId('pokemon-type-button');
    // Verificando se CADA UM deles está na página
    getButtonType.forEach((item) => expect(item).toBeInTheDocument());
    // Verificando se todos os tipos (que são 7) tem realmente o tamanho 7
    expect(getButtonType).toHaveLength(LENGTH_ALL_TYPES);
  });

  // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo
  test('Testa se clicando no tipo apenas aquele tipo de pokemon aparece', () => {
    renderWithRouter(<App />);
    // Pegando TODOS os botões de tipo
    const getButtonFilter = screen.getAllByTestId('pokemon-type-button');
    // Pegando um dos botões para fazer o teste
    const getFireButton = getButtonFilter.find((button) => button.innerHTML === 'Fire');
    // Clicando no botão de exemplo, que no caso é o botão de "Fire"
    userEvent.click(getFireButton);
    // Pegando o tipo único do botão (porém todos os pokemons tem o mesmo id)
    const getInnerHTML = screen.getByTestId('pokemon-type').innerHTML;
    // Verificando se o innerHTML do botão clicado é 'Fire'
    expect(getInnerHTML).toBe('Fire');

    // Pegando botão de próximo pokemon
    const getButtonNext = screen.getByTestId('next-pokemon');
    // Clicando no botão do próximo pokemon
    userEvent.click(getButtonNext);
    // Verificando se o próximo pokemon que aparece depois do Pikachu é o pokemon que tem tipo 'Fire'
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Fire');
  });

  test('Testa se a Pokédex tem o botão All', () => {
    renderWithRouter(<App />);

    // O botão All precisa estar sempre visível:
    // Pegando o botão All
    const getButtonAll = screen.getByRole('button', { name: 'All' });
    // Clicando nele
    userEvent.click(getButtonAll);

    // Pegando o pokemon que aparece quando clicamos no botão All
    const getFirstPokemon = screen.getByText('Pikachu');
    // Verificando se ele está mesmo na tela
    expect(getFirstPokemon).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // O texto do botão deve ser All:
    const getButtonAll = screen.getByRole('button', { name: 'All' });
    // Pegando o pokemon que aparece quando todos os filtros estão desativados
    const withNoFilter = screen.getByText('Pikachu');
    // Clicando no botão All
    userEvent.click(getButtonAll);
    // Verificando se o Pikachu é mesmo o pokemon que aparece na tela quando clicamos em All
    expect(withNoFilter).toBeInTheDocument();
  });
});
