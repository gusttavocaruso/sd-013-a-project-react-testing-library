import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

function itaratePokemons() {
  // Achar o botão Próximo Pokemon
  const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(nextBtn).toBeInTheDocument();

  // Achar o nome do Pokemon rederizado pelo data-testid
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toBeInTheDocument();

  const pokemonWeight = screen.getByText(/Average weight/i);
  expect(pokemonWeight).toBeInTheDocument();

  const pokemonSrc = screen.getByRole('img', { name: /sprite/i });
  expect(pokemonSrc).toBeInTheDocument();

  pokemons.map((pokemon, index) => {
    const MAX_LENGTH = pokemons.length - 1;
    if (index === MAX_LENGTH) {
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonWeight).toHaveTextContent(pokemon.averageWeight.value);
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonSrc).toBeInTheDocument();

      userEvent.click(nextBtn);
      return expect(pokemonName).toHaveTextContent(pokemons[0].name);
    }
    expect(pokemonName).toHaveTextContent(pokemon.name);
    expect(pokemonWeight).toHaveTextContent(pokemon.averageWeight.value);
    expect(pokemonType).toHaveTextContent(pokemon.type);
    expect(pokemonSrc.src).toBe(pokemon.image);
    userEvent.click(nextBtn);
    return expect(pokemonName).toHaveTextContent(pokemons[index + 1].name);
  });
}

describe('Testa o pokemon.js', () => {
  test('Testa as informações do pokemon', () => {
    renderWithRouter(<App />);
    itaratePokemons();
  });
  test('Testa se o link de more details leva para a URL correta', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
  });
  test('a imagem de favorito do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetails).toBeInTheDocument();
    userEvent.click(pokemonDetails);

    const pokemonFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(pokemonFavorite).toBeInTheDocument();
    userEvent.click(pokemonFavorite);
    history.push('/');

    const Encountered = screen.getByText('Encountered pokémons');
    expect(Encountered).toBeInTheDocument();

    const imgOfFavorite = screen.getByRole('img', { name: /is marked as favorite/i });
    const src = 'http://localhost/star-icon.svg';
    expect(imgOfFavorite).toBeInTheDocument();
    expect(imgOfFavorite.src).toBe(src);
  });
});

// Teste se é renderizado um card com as informações de determinado pokémon.

// O nome correto do Pokémon deve ser mostrado na tela;

// O tipo correto do pokémon deve ser mostrado na tela.

// O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.

// A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
