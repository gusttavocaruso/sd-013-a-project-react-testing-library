import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';
import dataPokemons from '../data';

describe('1 - Teste se as informações detalhadas do Pokémon selecionado'
+ 'são mostradas na tela.', () => {
  it('1.1 - A página deve ter um texto <name> Details, onde <name> é o nome do Pokémon',
    () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const pokemon = dataPokemons[0];
      const { name } = pokemon;
      const detailsTXT = screen.getByText(`${name} Details`);
      expect(detailsTXT).toHaveTextContent(`${name} Details`);
    });
  it('1.2 - Não deve existir o link de navegação para os detalhes do Pokémon selecionado',
    () => {
      renderWithRouter(<App />);
      let detailsLink = screen.getByText(/More Details/i);
      fireEvent.click(screen.getByText(/More Details/i));
      expect(detailsLink).not.toBeInTheDocument();
      detailsLink = screen.queryByText(/More Details/i);
      expect(detailsLink).toBeNull();
    });
  it('1.3 - A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemonSummary = screen.getByText(/Summary/i);
    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonSummary).toContainHTML('</h2>');
  });
  it('1.4 - A seção de detalhes deve conter um parágrafo com o resumo'
  + 'do Pokémon específico sendo visualizado.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemon = dataPokemons[0];
    const { summary } = pokemon;
    const pokemonSummary = screen.getByText(summary);
    expect(pokemonSummary).toBeInTheDocument();
  });
});

describe('2 - Teste se existe na página uma seção com os'
+ 'mapas contendo as localizações do pokémon', () => {
  it('2.1 - Deverá existir um heading h2 com o texto Game Locations'
  + 'of <name>; onde <name> é o nome do Pokémon exibido.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemon = dataPokemons[0];
    const { name } = pokemon;
    const pokemonLocation = screen.getByText(`Game Locations of ${name}`);
    expect(pokemonLocation).toBeInTheDocument();
    expect(pokemonLocation).toContainHTML('</h2>');
  });

  it('2.2 - Todas as localizações do Pokémon devem ser mostradas na seção de detalhes',
    () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const pokemon = dataPokemons[0];
      const { name, foundAt } = pokemon;
      const mapLocations = screen.getAllByAltText(`${name} location`);
      mapLocations.forEach((location) => expect(location).toBeInTheDocument());
      expect(mapLocations.length).toEqual(foundAt.length);
    });

  it('2.3 - Devem ser exibidos, o nome da localização e uma imagem do mapa'
  + 'em cada localização', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemon = dataPokemons[0];
    const { name, foundAt } = pokemon;
    const mapLocations = screen.getAllByAltText(`${name} location`);
    foundAt.forEach(({ map, location }, index) => {
      expect(mapLocations[index]).toHaveAttribute('src', map);
      expect(mapLocations[index]).toBeInTheDocument();
      const locationTitle = screen.getByText(location);
      expect(locationTitle).toBeInTheDocument();
    });
  });
  it('2.4 - A imagem da localização deve ter um atributo src com a URL da localização',
    () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const pokemon = dataPokemons[0];
      const { name, foundAt } = pokemon;
      const mapLocations = screen.getAllByAltText(`${name} location`);
      foundAt.forEach(({ map }, index) => {
        expect(mapLocations[index]).toHaveAttribute('src', map);
        expect(mapLocations[index]).toBeInTheDocument();
      });
    });
  it('2.5 - A imagem da localização deve ter um atributo alt com o texto,'
  + ' <name> location, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemon = dataPokemons[0];
    const { name } = pokemon;
    const mapLocations = screen.getAllByAltText(`${name} location`);
    mapLocations.forEach((location) => {
      expect(location).toHaveAttribute('alt', `${name} location`);
      expect(location).toBeInTheDocument();
    });
  });
});

describe('3 - Teste se o usuário pode favoritar um pokémon através da página de detalhes',
  () => {
    it('3.1 - A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('id', 'favorite');
    });
    it('3.2 - Cliques alternados no checkbox devem adicionar e remover'
    + 'respectivamente o Pokémon da lista de favoritos', () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      fireEvent.click(screen.getByRole('checkbox'));
      expect(checkbox).toBeChecked();
    });
    it('3.3 - O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const checkboxLabel = screen.getByText(/Pokémon favoritado?/i);
      expect(checkboxLabel).toBeInTheDocument();
      expect(checkboxLabel).toHaveTextContent('Pokémon favoritado?');
      expect(checkboxLabel).toContainElement(screen.getByRole('checkbox'));
    });
  });
