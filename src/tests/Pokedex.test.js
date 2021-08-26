// Feito com a ajuda das pessoas estudandes: Gessé Carlos, André, Gabriel Lenz, Leonardo, Ygor Maia e Gildo Santos.

import React from 'react';
import { screen, userEvent } from './index';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  // a cada vez que o teste rodar vai ser renderizado o componente app
  beforeEach(() => { renderWithRouter(<App />); });
  // id do pokemon para não precisar repetir
  const pokemonId = 'pokemon-name';

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const getH2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(getH2).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista', () => {
    // resgatei o botão de próximo pokemon
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    // verificando se o botão está renderizado
    expect(buttonNext).toBeInTheDocument();

    // resgatei o  nome do pokemon pelo id
    const pokemonName = screen.getByTestId(pokemonId);
    // verificando se há um pokemon sendo renderizado
    expect(pokemonName).toBeInTheDocument();

    /* fiz um map para que o nome de todo pokemon que for renderizado seja
      comparado com o nome do pokemon da lista e assim quando clicado o botão irá
      mostrar o próximo da lista. O map precisa retornar algo, sendo assim, é verificado
      que o pokemon mostrado não é o mesmo de antes.
    */
    pokemons.map((pokemon, index) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(buttonNext);
      return expect(pokemonName).not.toHaveTextContent(pokemons[index].name);
    });

    // resgatei um array(getAllBytestId) com todos os pokemons
    const allPokemons = screen.getAllByTestId(pokemonId);

    /* fiz um forEach com uma condição de que quando estiver no último
      pokemon e for pressionado o botão de prox. vá para o primeiro
      da lista.
      Quando o app é renderizado ele verifica também se de todo o
      array de pokemons está sendo mostrado apenas um.
    */
    pokemons.forEach((pokemon, index) => {
      if (index < pokemons.length - 1) {
        userEvent.click(buttonNext);
      }
      expect(allPokemons.length).toBe(1);
    });
    // último pokemon
    const lastPokemon = pokemons[pokemons.length - 1].name;
    // verifica se está no último
    expect(pokemonName).toHaveTextContent(lastPokemon);
    // pressiona  botão de prox.
    userEvent.click(buttonNext);
    // primeiro pokemon
    const firstPokemon = pokemons[0].name;
    // verifica se é o primeiro
    expect(pokemonName).toHaveTextContent(firstPokemon);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    // Constante com todos os tipos de pokemons presentes no data.js;
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    // Resgatei os botões de filtro;
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    // Verifica se a quantidade de botões é igual aos tipos.
    expect(buttonsFilter.length).toBe(types.length);

    buttonsFilter.map((button, index) => {
      expect(button).toBeInTheDocument();
      return expect(buttonsFilter[index]).toHaveTextContent(types[index]);
    });
  });

  it('Teste se o botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    const nameCategories = buttonsFilter.map((btn) => btn.textContent);
    const categories = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    expect(JSON.stringify(nameCategories)).toStrictEqual(JSON.stringify(categories));
    console.log(JSON.stringify(nameCategories));
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const pokemonName = screen.getByTestId(pokemonId);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    pokemons.forEach((pokemon, index) => {
      expect(pokemonName).toHaveTextContent(pokemons[index].name);
      userEvent.click(buttonNext);
      expect(buttonAll).toBeInTheDocument();
    });
  });
});
