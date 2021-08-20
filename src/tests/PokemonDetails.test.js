import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Conjunto de testes', () => {
  const auxLink = 'More details';
  test('Testa se as informações detalhadas do Pokémon aparece na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(auxLink);
    fireEvent.click(moreDetailsLink);

    const moreDetailsPokemonText = screen.getByText('Pikachu Details');
    expect(moreDetailsPokemonText).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();

    const moreDetailsHeading = screen.getByText('Summary', { level: 2 });
    expect(moreDetailsHeading).toBeInTheDocument();

    const auxText = 'This intelligent Pokémon roasts hard berries with';
    const auxText2 = 'electricity to make them tender enough to eat.';
    const moreDetailsParagraph = screen.getByText(`${auxText} ${auxText2}`);
    expect(moreDetailsParagraph).toBeInTheDocument();
  });

  test('Testa se existe uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(auxLink);
    fireEvent.click(moreDetailsLink);

    const moreDetailsPokemonDescriptionHeading = screen
      .getByText('Game Locations of Pikachu');
    expect(moreDetailsPokemonDescriptionHeading).toBeInTheDocument();

    const moreDetailsImgLocationPokemon = screen.getAllByRole('img');
    const magicNumber = 3;
    moreDetailsImgLocationPokemon.forEach((item, index) => {
      if (index === 2) {
        expect(item.src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
        expect(item.alt).toBe('Pikachu location');
      } else if (index === magicNumber) {
        expect(item.src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
        expect(item.alt).toBe('Pikachu location');
      }
    });
  });

  test('Testa se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(auxLink);
    fireEvent.click(moreDetailsLink);

    const moreDetailsStarFavoriteIcon = screen.getAllByRole('img');
    const moreDetailsCheckboxFavorite = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(moreDetailsCheckboxFavorite);
    expect(moreDetailsStarFavoriteIcon[1]).toBeInTheDocument();
  });
});
