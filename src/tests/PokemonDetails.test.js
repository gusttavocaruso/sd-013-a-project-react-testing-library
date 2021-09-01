import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));
const primeiroPokemon = pokemons[0];

describe('Testa o componente <PokemonDetails.js />', () => {
  it('Testa se página tem um texto <name> Details', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const titulo = screen
      .getByRole('heading', { name: `${primeiroPokemon.name} Details` });

    expect(titulo).toBeInTheDocument();
  });

  it('Testa se o link de navegação para os detalhes do Pokémon selecionado não existe',
    () => {
      const detalhes = screen.getByRole('link', { name: /more details/i });

      userEvent.click(detalhes);

      expect(detalhes).not.toBeInTheDocument();
    });

  it('Testa se a seção de detalhes contém um heading h2 com o texto Summary', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const tituloDescricao = screen.getByRole('heading', { name: /summary/i });

    expect(tituloDescricao).toBeInTheDocument();
  });

  it('Testa se a seção de detalhes contém um parágrafo com o resumo do Pokémon', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const descricao = screen.getByText(primeiroPokemon.summary);

    expect(descricao).toBeInTheDocument();
  });

  it('Testa se existe o heading h2 com o texto Game Locations of', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const localizacao = screen.getByRole('heading', {
      name: `Game Locations of ${primeiroPokemon.name}`,
    });

    expect(localizacao).toBeInTheDocument();
  });

  it('Testa se a pagina exibe mapas com as localizações do pokemon', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const localizacao = screen.getByRole('heading', {
      name: `Game Locations of ${primeiroPokemon.name}`,
    });

    expect(localizacao).toBeInTheDocument();

    primeiroPokemon.foundAt.forEach(({ location, map }, local) => {
      expect(screen.getByText(location)).toBeInTheDocument();

      expect(screen.getAllByRole('img')[local + 1]).toHaveAttribute('src', map);

      const imagemAlt = `${primeiroPokemon.name} location`;

      expect(screen.getAllByAltText(imagemAlt)[local]).toBeInTheDocument();
    });
  });

  it('Testa se a página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const favoritar = screen.getByLabelText(/Pokémon favoritado?/i);

    expect(favoritar).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });

    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const iconeFavoritado = screen.getAllByRole('img')[1];

    expect(iconeFavoritado).toBeInTheDocument();

    userEvent.click(favoritar);

    expect(iconeFavoritado).not.toBeInTheDocument();
  });
});
// 7. Teste o componente <PokemonDetails.js />
// Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.
// A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
// Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
// A seção de detalhes deve conter um heading h2 com o texto Summary.
// A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
// Teste se existe na página uma seção com os mapas contendo as localizações do pokémon
// Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
// Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
// Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
// A imagem da localização deve ter um atributo src com a URL da localização;
// A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
// Teste se o usuário pode favoritar um pokémon através da página de detalhes.
// A página deve exibir um checkbox que permite favoritar o Pokémon;
// Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
// O label do checkbox deve conter o texto Pokémon favoritado?;
// O que será verificado:
// Será avaliado se o arquivo teste PokemonDetails.t
