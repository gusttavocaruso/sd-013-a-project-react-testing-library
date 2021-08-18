import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);

    // entra em More Details
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const pokemonName = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(pokemonName).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    const moreDetails = screen.queryByText(/more details/i);
    expect(moreDetails).toBeNull();

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const pokemonSummary = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);

    // entra em More Details
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const gameLocationHeading = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(gameLocationHeading).toBeInTheDocument();

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const locationsPikachu = screen.getAllByText(/kanto/i);
    expect(locationsPikachu).toHaveLength(2);

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const image = screen.getAllByAltText(/pikachu location/i);
    expect(image).toHaveLength(2);

    expect(image[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(image[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(image[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);

    // entra em More Details
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite.checked).toBe(true);
    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite.checked).toBe(false);
    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite.checked).toBe(true);

    // O label do checkbox deve conter o texto Pokémon favoritado?
    const labelCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(labelCheckbox).toBeInTheDocument();
  });
});
