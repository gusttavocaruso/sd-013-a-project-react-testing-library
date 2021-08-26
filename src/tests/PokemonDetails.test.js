import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('<PokemonsDetails /> Section Tests', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const { name, foundAt, summary } = pokemons[0];
  it('should contain right info', () => {
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetails);
    // Nao deve existir
    expect(moreDetails).not.toBeInTheDocument();
    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const summaryh2 = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summaryh2).toBeInTheDocument();
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const title = screen.getByText(`${name} Details`);
    expect(title).toBeInTheDocument();
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const locationh2 = screen.getByRole('heading',
      { name: `Game Locations of ${name}`, level: 2 });
    expect(locationh2).toBeInTheDocument();
    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const pokeSummary = screen.getByText(summary);
    expect(pokeSummary).toBeInTheDocument();
    foundAt.forEach((item, index) => {
      const imgs = screen.getAllByRole('img', { name: `${name} location` });
      expect(imgs[index]).toHaveAttribute('src', item.map);
      expect(imgs[index]).toHaveAttribute('alt', `${name} location`);
    // Teste se existe na página uma seção com os mapas contendo as localizações do pokémon
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    // A imagem da localização deve ter um atributo src com a URL da localização;
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    });

    // Teste se o usuário pode favoritar um pokémon através da página de detalhes.
    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    // O label do checkbox deve conter o texto Pokémon favoritado?;
    const favCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(favCheckbox);
    const starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
