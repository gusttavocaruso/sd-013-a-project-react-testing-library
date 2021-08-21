import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import App from '../App';

const pokemonMock = {
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: {
    value: '2.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 30',
      map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
    },
    {
      location: 'Johto Route 31',
      map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
    },
    {
      location: 'Ilex Forest',
      map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
    },
    {
      location: 'Johto National Park',
      map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
    },
  ],
  summary: 'For protection, it releases a horrible stench '
  + 'from the antennae on its head to drive away enemies.',
};

const isPokemonFavoriteById = {
  10: true,
};

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const view = render(
    <Router history={ historyMock }>
      {component}
    </Router>,
  );

  return {
    ...view,
    history: historyMock,
  };
}

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Pokemon
          pokemon={ pokemonMock }
          isFavorite={ isPokemonFavoriteById[10] }
        />
      </Router>,
    );
    const name = screen.queryByText(/caterpie/i);
    expect(name.textContent).toBe(pokemonMock.name);
    const type = screen.queryByText(/Bug/i);
    expect(type.textContent).toBe(pokemonMock.type);
    const value = screen.queryByText(/2.9/i);
    const teste = 'Average weight: 2.9 kg';
    expect(value.textContent).toBe(teste);
    const image = screen.getByRole('img', { name: /caterpie sprite/i });
    expect(image.getAttribute('src')).toBe(pokemonMock.image);
  });
  it('Testa link details', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Pokemon
          pokemon={ pokemonMock }
          isFavorite={ isPokemonFavoriteById[10] }
        />
      </Router>,
    );
    const details = screen.getByText(/more details/i);
    expect(details.getAttribute('href')).toBe(/pokemons/ + pokemonMock.id);
  });
  it('Testa se o link redireciona para details', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    const pokeDet = screen.getByRole('heading', { name: /caterpie details/i });
    expect(pokeDet.textContent).toBe(`${pokemonMock.name} Details`);
  });
  it('Testa se recebe icone de estrela nos favoritados', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Pokemon
          pokemon={ pokemonMock }
          isFavorite={ isPokemonFavoriteById[10] }
        />
      </Router>,
    );
    const estrela = screen.getByRole('img', { name: /caterpie is marked as favorite/i });
    expect(estrela).toBeInTheDocument();
    expect(estrela.getAttribute('src')).toBe('/star-icon.svg');
    expect(estrela.getAttribute('alt')).toBe(`${pokemonMock.name} is marked as favorite`);
  });
});
