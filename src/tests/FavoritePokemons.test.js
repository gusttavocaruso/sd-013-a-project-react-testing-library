import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FavoritePokemons } from '../components';

// Agradecimentos aos meus amigos Josue e Rogério que me salvaram do loop da lógica ilógica.

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

const mockMyFavoritePokemon = [{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
}];

describe('Teste FavoritePokemons', () => {
  it('Testa se "No favorite pokemon found" caso não tenha pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const texto = screen.getByText(/No favorite pokemon found/i);
    expect(texto).toBeInTheDocument();
  });
  it('Testa se são exibidos todos os cards de pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockMyFavoritePokemon } />);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander.textContent);
  });
});
