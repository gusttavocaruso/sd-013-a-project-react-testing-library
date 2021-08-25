import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste se as infos detalhadas do Pokémon são mostradas na tela', () => {
  const { name, summary } = pokemons[0];
  const linkDetails = () => screen.getByRole('link', { name: /more details/i });

  test('se a página tem um texto <pokemon> Details', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const pageTitle = screen.getByText(`${name} Details`);
    expect(pageTitle).toBeInTheDocument();
  });
  test('se não existe o link para detalhes do pokemon na pagina de detalhes', () => {
    renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkToDetails);

    expect(linkToDetails).not.toBeInTheDocument();
  });

  test('se a pagina de detalhes tem um h2 escrito Summary', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const summaryTitle = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summaryTitle).toBeInTheDocument();
  });

  test('se a pagina de detalhes tem um resumo do pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const pokemonResume = screen.getByText(summary);
    expect(pokemonResume).toBeInTheDocument();
  });
});

describe('Teste se existe os mapas contendo as localizações do pokémon', () => {
  const { name, foundAt } = pokemons[0];
  const linkDetails = () => screen.getByRole('link', { name: /more details/i });

  test('se na seção de detalhes existe o texto Game Locations of <name>', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const locationsPokemon = screen.getByText(`Game Locations of ${name}`);
    expect(locationsPokemon).toBeInTheDocument();
  });

  test('se todas as localizações do Pokémon são mostradas na seção de detalhes', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const locations = screen.getAllByAltText(`${name} location`);
    expect(locations).toHaveLength(2);
  });

  test('se o nome das localizações e as imagens do mapa são exibidos', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const firstLocation = screen.getByText(foundAt[0].location);
    expect(firstLocation).toBeInTheDocument();

    const secondLocation = screen.getByText(foundAt[1].location);
    expect(secondLocation).toBeInTheDocument();

    const locationsImage = screen.getAllByAltText(`${name} location`);
    expect(locationsImage).toHaveLength(2);
  });

  test('se a imagem da localização possui um src com a URL da localização', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const locationsImage = screen.getAllByAltText(`${name} location`);
    expect(locationsImage[0]).toHaveAttribute('src', foundAt[0].map);
    expect(locationsImage[1]).toHaveAttribute('src', foundAt[1].map);
  });

  test('se a imagem da localização possui um alt com o texto <name> location', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const locationsImage = screen.getAllByAltText(`${name} location`);
    expect(locationsImage[0]).toHaveAttribute('alt', `${name} location`);
    expect(locationsImage[1]).toHaveAttribute('alt', `${name} location`);
  });
});

describe('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
  const linkDetails = () => screen.getByRole('link', { name: /more details/i });
  const checkbox = () => screen.getByRole('checkbox', { name: /pokémon favoritado?/i });

  test('se a página exibe um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    expect(checkbox()).toBeInTheDocument();
  });

  test('se cliques no checkbox adicionam e removem o Pokémon dos favoritos', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    userEvent.click(checkbox());
    const star = screen.getByAltText(/is marked as favorite/i);
    expect(star).toBeInTheDocument();

    userEvent.click(checkbox());
    expect(star).not.toBeInTheDocument();
  });

  test('se o label do checkbox contem o texto Pokémon favoritado?', () => {
    renderWithRouter(<App />);
    userEvent.click(linkDetails());

    const checkboxLabel = screen.getByText(/pokémon favoritado?/i);
    expect(checkboxLabel.textContent).toBe('Pokémon favoritado?');
  });
});
