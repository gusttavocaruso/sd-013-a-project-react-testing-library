import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

// questão feita com consulta ao código da Júlia
const checkNextButton = () => {
  // Passo a passo:
  // testar o botão de próximo
  const nextButton = screen.getByTestId('next-pokemon');
  expect(nextButton).toBeInTheDocument();

  // pegar o nome do pokemon renderizado na tela pelo data-testid
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();

  // fazer um map(pokemon,index) com o objeto importado do data
  // fazer if com com o index = pokemon.length - 1 para verificar se muda pro primeiro pokemon novamente
  // se não satisfazer a condição anterior: testar se renderiza o nome do pokemon, clicar no botão e testar se renderiza o nome do pokemon seguinte
  const ARRAY_LENGTH = pokemons.length - 1;
  pokemons.map((pokemon, index) => {
    if (index === ARRAY_LENGTH) {
      userEvent.click(nextButton);
      return expect(pokemonName).toHaveTextContent(pokemons[0].name);
    }
    userEvent.click(nextButton);
    return expect(pokemonName).toHaveTextContent(pokemons[index + 1].name);
  });
};

describe('Verifica componente Pokedéx', () => {
  it('Verifica texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    checkNextButton();
  });

  it('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    // pegar o nome do pokemon com testid(getAllByTestId - gera um array) e testar se array.length é 1
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    // Passo a passo:
    // Fazer um array com os tipos de pokemons presente no data (usar o reduce)
    // Pegar os botões com o getAllByTestId
    // Comparar se o tamanha desse array é o mesmo do array do data
    // Usar o array de tipo (do data) para fazer um forEach
    // Dentro do forEach iremos pegar o botão ByRole usando a variável type pra pegar os botões
    // Checar se o botão está na tela
    // Clicar no botão
    // Pegar o botão All e checar se ele está na tela
    // Filtar os pokemons com o mesmo tipo
    // Fazer um forEach(item) com a lista filtrada. Dentro do forEach: pegar o pokemon-type pelo testid e checar se está na tela, comparar o que está escrito no botão com item.type. Clicar no botão next e conferir mais uma vez se o pokemon-type ta na tela e tem o text item.type. Por último, checar o se o All ta na tela.
    const typesData = pokemons.reduce((acc, cur) => {
      if (!acc.includes(cur.type)) {
        acc.push(cur.type);
      }
      return acc;
    }, []);

    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    expect(typesData.length).toBe(buttonsType.length);

    typesData.forEach((typeData) => {
      const buttonType = screen.getByRole('button', { name: typeData });
      expect(buttonType).toBeInTheDocument();
      userEvent.click(buttonType);

      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toBeInTheDocument();

      const pokemonSameType = pokemons.filter((pokemon) => pokemon.type === typeData);

      pokemonSameType.forEach((pokemon) => {
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toBeInTheDocument();
        expect(buttonType).toHaveTextContent(pokemon.type);

        const nextButton = screen.getByTestId('next-pokemon');
        userEvent.click(nextButton);

        expect(pokemonType).toBeInTheDocument();
        expect(buttonType).toHaveTextContent(pokemon.type);

        expect(allButton).toBeInTheDocument();
      });
    });
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    checkNextButton();
  });
});
