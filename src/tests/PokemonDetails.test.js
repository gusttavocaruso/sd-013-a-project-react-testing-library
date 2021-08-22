import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import apiPokemons from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const { name, summary, foundAt } = apiPokemons[1];

  test('Se informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(buttonNext);
    userEvent.click(moreDetails);

    const pokeDetailsHead = screen.getByRole('heading', {
      name: `${name} Details`,
      level: 2,
    });
    expect(pokeDetailsHead).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryHeading).toBeInTheDocument();

    const pDetails = screen.getByText(summary);
    expect(pDetails).toBeInTheDocument();
  });

  test('Se existe na página uma seção com mapas com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(buttonNext);
    userEvent.click(moreDetails);

    const pokeLocationHeading = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });

    expect(pokeLocationHeading).toBeInTheDocument();

    const mapLength = screen.getAllByAltText(`${name} location`);
    expect(mapLength).toHaveLength(foundAt.length);
    // https://stackoverflow.com/a/52783201/16722994

    foundAt.forEach((array, index) => {
      expect(mapLength[index]).toHaveAttribute('src', array.map);
      const location = screen.getByText(array.location);
      expect(location).toBeInTheDocument();
    });
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(buttonNext);
    userEvent.click(moreDetails);

    const checkBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);
    const altIconText = screen.getByAltText(`${name} is marked as favorite`);
    expect(altIconText).toBeInTheDocument();

    userEvent.click(checkBox);
    expect(altIconText).not.toBeInTheDocument();
  });
});
