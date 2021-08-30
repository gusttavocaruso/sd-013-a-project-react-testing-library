import { screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

afterEach(cleanup);

describe('testa componente pokemonDetails', () => {
  const { summary, foundAt } = pokemons[0];
  test('informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/more details/i);
    fireEvent.click(moreDetails);

    const pokeDetailTitle = screen.getByRole('heading', {
      name: /pikachu details/i,
    });

    const summaryPikachu = screen.getByText(summary);
    const sumaryH2 = screen.getByRole('heading', {
      name: /summary/i,
    });

    expect(pokeDetailTitle).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(summaryPikachu).toBeInTheDocument();
    expect(sumaryH2).toBeInTheDocument();
  });

  test('existe na tela uma seção com mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText(/more details/i);
    fireEvent.click(moreDetails);

    const titleLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });

    const locationOne = screen.getByText(/kanto viridian forest/i);
    const locationTwo = screen.getByText(/kanto power plant/i);
    const pokeImgOne = screen.getAllByAltText('Pikachu location')[0];
    const pokeImgTwo = screen.getAllByAltText('Pikachu location')[1];

    expect(titleLocation).toBeInTheDocument();
    expect(locationOne).toBeInTheDocument();
    expect(locationTwo).toBeInTheDocument();
    expect(pokeImgOne).toHaveAttribute('src', foundAt[0].map);
    expect(pokeImgTwo).toHaveAttribute('src', foundAt[1].map);
  });
  test('o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(moreDetails);

    const favPokeCheckbox = screen.getByRole('checkbox');
    expect(favPokeCheckbox).toBeInTheDocument();

    fireEvent.click(favPokeCheckbox);
    expect(favPokeCheckbox).toBeChecked();

    fireEvent.click(favPokeCheckbox);
    expect(favPokeCheckbox).not.toBeChecked();

    expect(screen.getByText(/pokémon favoritado\?/i)).toBeInTheDocument();
    /* console.log(pathname); */
  });
});
