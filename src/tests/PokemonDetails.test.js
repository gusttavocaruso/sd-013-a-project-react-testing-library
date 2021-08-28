import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('se informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    // entra em More Details
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const h2Details = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(h2Details).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(linkDetails).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const h2Summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(h2Summary).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const textSummary = screen.getByText(`${pokemons[0].summary}`);
    expect(textSummary).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo'
  + 'as localizações do pokémon', () => {
    renderWithRouter(<App />);

    // entra em More Details
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const gameLocationH2 = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(gameLocationH2).toBeInTheDocument();

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const maps = screen.getAllByAltText(/Pikachu location/i);
    expect(maps.length).toBe(pokemons[0].foundAt.length);

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const image = screen.getAllByAltText(/pikachu location/i);
    expect(image).toHaveLength(2);

    expect(image[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(image[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(image[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    // clicando no link detalhes
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // O label do checkbox deve conter o texto Pokémon favoritado?
    const labelCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(labelCheckbox).toBeInTheDocument();
  });
});
