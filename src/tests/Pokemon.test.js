import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

const idName = 'pokemon-name';
const idType = 'pokemon-type';
const idWeight = 'pokemon-weight';
describe('Componente <Pokemon />', () => {
  test('é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
        showDetailsLink={ false }
      />,
    );

    const name = screen.getByTestId(idName);
    const nameStr = name.textContent;
    const type = screen.getByTestId(idType);
    const weight = screen.getByTestId(idWeight);
    const img = screen.getByAltText(`${nameStr} sprite`);
    const { averageWeight } = pokemons[0];

    expect(name).toBeInTheDocument();
    expect(name.textContent).toBeDefined();
    expect(type).toBeInTheDocument();
    expect(type.textContent).toBeDefined();
    expect(type.textContent).toBe(pokemons[0].type);
    expect(weight).toBeInTheDocument();
    expect(weight.textContent).toBeDefined();
    expect(weight.textContent)
      .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(pokemons[0].image);
  });

  test('card do Pokémon na Pokédex contém um link para exibir detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });
    expect(detailsLink).toBeInTheDocument();
  });

  test('clicar no link de detalhes redireciona para a página correspondente', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(idName);
    const nameStr = pokemonName.textContent;

    // clica no link
    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });
    userEvent.click(detailsLink);

    // checando primeiro heading
    const firstHeading = screen.getByRole('heading', {
      name: `${nameStr} Details`,
      level: 2,
    });
    expect(firstHeading).toBeInTheDocument();
  });

  test('a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(idName);
    const nameStr = pokemonName.textContent;

    // pega id do pokemon exibido no card
    let idPokemon = 0;
    pokemons.forEach((pokemon) => {
      if (nameStr === pokemon.name) {
        idPokemon = pokemon.id;
      }
    });

    // clica no link
    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });
    userEvent.click(detailsLink);

    const url = history.location.pathname;
    expect(url).toBe(`/pokemons/${idPokemon}`);
  });

  test('existe um ícone de estrela nos Pokémons favoritados', () => {
    // renderiza Home
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
        showDetailsLink
      />,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    const nameStr = pokemonName.textContent;

    const starImg = screen.getByAltText(`${nameStr} is marked as favorite`);
    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
  });
});
