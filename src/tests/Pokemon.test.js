import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';
import dataPokemons from '../data';

const iconSVG = '/star-icon.svg';

describe('1-Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    it('1.1 - O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const firstPokemon = screen.getByTestId('pokemon-name');
      const { name } = dataPokemons[0];
      expect(firstPokemon).toBeInTheDocument();
      expect(firstPokemon).toHaveTextContent(name);
    });
    it('1.2 - O tipo correto do pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(<App />);
      const pokemonsType = [...new Set(dataPokemons.map(({ type }) => type))];
      pokemonsType.forEach((type) => {
        fireEvent.click(screen.queryByRole('button', { name: type }));
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toBeInTheDocument();
        expect(pokemonType).toHaveTextContent(type);
      });
    });
    it('1.3 - Verifica se o peso médio é exibido corretamente', () => {
      renderWithRouter(<App />);
      const pokemonWeigth = screen.getByTestId('pokemon-weight');
      expect(pokemonWeigth).toBeInTheDocument();
      const pokemon = dataPokemons[0];
      const { averageWeight: { value, measurementUnit } } = pokemon;
      expect(pokemonWeigth).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
    });
    it('1.4 - A imagem do Pokémon deve ser exibida.', () => {
      renderWithRouter(<App />);
      const pokemon = dataPokemons[0];
      const { name, image } = pokemon;
      const pokemonIMG = screen.getByAltText(`${name} sprite`);
      expect(pokemonIMG).toBeInTheDocument();
      expect(pokemonIMG).toHaveAttribute('src', image);
    });
  });
describe('2 - Teste se possui um link para página de detalhes', () => {
  it('2.1 - O link tem a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    const pokemon = dataPokemons[0];
    const { id } = pokemon;
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveTextContent(/More details/i);
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('2.2 - Ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + 'da aplicação para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemon = dataPokemons[0];
    const { name,
      type,
      averageWeight: { value, measurementUnit },
      summary,
      foundAt } = pokemon;
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

  it('2.3 - Teste também se a URL exibida no navegador muda para /pokemon/<id>',
    () => {
      const { history } = renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const { pathname } = history.location;
      const pokemon = dataPokemons[0];
      const { id } = pokemon;
      expect(pathname).toBe(`/pokemons/${id}`);
    });
});

describe('3 - Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  it('3.1 - O ícone tem img com o atributo src contendo o caminho /star-icon.svg', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    fireEvent.click(screen.getByRole('checkbox'));
    const { name } = dataPokemons[0];
    let starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', iconSVG);
    fireEvent.click(screen.getByText(/Home/i));
    starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toHaveAttribute('src', iconSVG);
  });
  it('3.2 - A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,'
  + 'onde <pokemon> é o nome do Pokémon exibido', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Próximo pokémon/i));
    fireEvent.click(screen.getByText(/More Details/i));
    fireEvent.click(screen.getByRole('checkbox'));
    const { name } = dataPokemons[1];
    const pokemonIMG = screen.getByAltText(`${name} is marked as favorite`);
    expect(pokemonIMG).toBeInTheDocument();
  });
});
