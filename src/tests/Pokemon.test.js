import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
// import { favoritePokemons, pokemons, pokemonsType } from './mocks/dataFavorite';
import renderWithRouter from './util/renderWithRouter';
import dataPokemons from '../data';

describe('1-Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    it('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const firstPokemon = screen.getByTestId('pokemon-name');
      const { name } = dataPokemons[0];
      expect(firstPokemon).toBeInTheDocument();
      expect(firstPokemon).toHaveTextContent(name);
    });
    it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(<App />);
      const pokemonsType = [...new Set(dataPokemons.map(({ type }) => type))];
      pokemonsType.forEach((type) => {
        fireEvent.click(screen.queryByRole('button', { name: type }));
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toBeInTheDocument();
        expect(pokemonType).toHaveTextContent(type);
      });
    });
    it('Verifica se o peso médio é exibido corretamente', () => {
      renderWithRouter(<App />);
      const pokemonWeigth = screen.getByTestId('pokemon-weight');
      expect(pokemonWeigth).toBeInTheDocument();
      const pokemon = dataPokemons[0];
      const { averageWeight: { value, measurementUnit } } = pokemon;
      expect(pokemonWeigth).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
    });
    it('A imagem do Pokémon deve ser exibida.', () => {
      renderWithRouter(<App />);
      const pokemon = dataPokemons[0];
      const { name, image } = pokemon;
      const pokemonIMG = screen.getByAltText(`${name} sprite`);
      expect(pokemonIMG).toBeInTheDocument();
      expect(pokemonIMG).toHaveAttribute('src', image);
    });
  });
describe('2 - Teste se possui um link para página de detalhes', () => {
  it('O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    const pokemon = dataPokemons[0];
    const { id } = pokemon;
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveTextContent(/More details/i);
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + 'da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemon = dataPokemons[0];
    const { name, type, averageWeight: { value, measurementUnit }, summary, foundAt } = pokemon;
    const pokemonTitle = screen.getByText(/Details/i);
    expect(pokemonTitle).toHaveTextContent(`${name} Details`);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    const pokemonSummary = screen.getByText(summary);
    expect(pokemonSummary).toBeInTheDocument();
    const locations = screen.getByText(`Game Locations of ${name}`);
    expect(locations).toBeInTheDocument();
    const mapLocations = screen.getAllByAltText(`${name} location`);
    foundAt.forEach(({ map }, index) => {
      expect(mapLocations[index]).toHaveAttribute('src', map);
    });
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>',
    () => {
      const { history } = renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const { pathname } = history.location;
      const pokemon = dataPokemons[0];
      const { id } = pokemon;
      expect(pathname).toBe(`/pokemons/${id}`);
    });
});


