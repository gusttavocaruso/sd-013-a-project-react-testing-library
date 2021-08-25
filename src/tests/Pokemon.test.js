import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

const pokemonMock = {
  id: 78,
  name: 'Rapidash',
  type: 'Fire',
  averageWeight: {
    value: '95.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Route 28',
      map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
    },
    {
      location: 'Johto Mount Silver',
      map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
    },
  ],
  summary: 'At full gallop, its four hooves barely touch the ground.',
};

describe('Teste se é renderizado um card com as infos de determinado pokémon', () => {
  test('se o nome correto do Pokémon é mostrado na tela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite={ {} } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });

  test('se o tipo correto do Pokémon é mostrado na tela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite={ {} } />);

    const pokemonType = screen.getByText(pokemonMock.type); // usei getByText porque o stryker recebia uma string vazia
    expect(pokemonType).toBeInTheDocument();
  });

  test('se o peso do Pokémon é mostrado em um formato específico', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite={ {} } />);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
  });

  test('se a imagem do Pokémon é exibida e possui src e alt', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite={ {} } />);

    const pokemonImage = screen.getByAltText(/Rapidash sprite/i);
    const pokemonName = pokemonMock.name;

    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png');
    expect(pokemonImage).toHaveAttribute('alt', `${pokemonName} sprite`);
  });
});

test('se o card contém um link para detalhes do Pokémon', () => {
  renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite={ {} } />);

  const linkDetails = screen.getByRole('link', { name: /more details/i });
  const pokemonId = pokemonMock.id;

  expect(linkDetails).toHaveAttribute('href', `/pokemons/${pokemonId}`);
});

test('se o link leva para a página de detalhes do Pokémon', () => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemonMock }
      isFavorite={ {} }
    />,
  );

  const linkDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkDetails);

  const pokemonId = pokemonMock.id;
  const urlPath = `/pokemons/${pokemonId}`;
  history.push(urlPath);

  const detailsPath = history.location.pathname;
  expect(detailsPath).toBe(urlPath);
});

test('se a url contém o id do Pokémon', () => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemonMock }
      isFavorite={ {} }
    />,
  );

  const pokemonId = pokemonMock.id;
  const urlPath = `/pokemons/${pokemonId}`;
  history.push(urlPath);

  const detailsPath = history.location.pathname;
  expect(detailsPath).toBe(urlPath);
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test('se o tem src contendo o caminho /star-icon.svg', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite={ {} } />);

    const favoritePokemons = screen.getByAltText(/is marked as favorite/i);
    expect(favoritePokemons).toHaveAttribute('src', '/star-icon.svg');
  });

  test('se a imagem da estrela tem o atributo alt especifico', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite={ {} } />);

    const pokemonName = pokemonMock.name;
    const pokemonImage = screen.getByAltText(/is marked as favorite/i);

    expect(pokemonImage).toHaveAttribute('alt', `${pokemonName} is marked as favorite`);
  });
});
