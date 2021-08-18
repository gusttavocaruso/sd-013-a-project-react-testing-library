import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  it(`Testa se as informações detalhadas do Pokémon selecionado
      são mostradas na tela`, () => {
    const detailsText = screen.getByRole('heading', {
      name: /Pikachu details/i,
      level: 2,
    });
    expect(detailsText).toBeInTheDocument();
    const summaryText = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryText).toBeInTheDocument();
    const aboutPokemon = screen.getByText(
      /This intelligent Pokémon roasts hard berries/i,
    );
    expect(aboutPokemon).toBeInTheDocument();
  });

  it(`Testa se existe na página uma seção com os mapas
      contendo as localizações do pokémon`, () => {
    const locations = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(locations).toBeInTheDocument();

    const img = screen.getAllByAltText(/pikachu location/i);
    expect(img[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteButton);
    const favoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
  });
});
