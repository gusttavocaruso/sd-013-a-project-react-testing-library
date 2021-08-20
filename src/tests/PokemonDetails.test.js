import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

describe('testing pokemon location maps session', () => {
  afterEach(cleanup);
  test('check pokemon checkbox', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(pokemonLink).toBeInTheDocument(); // verifica se o link more detais está renderizado
    fireEvent.click(pokemonLink);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument(); // verifica se há um checkbox

    const checkboxLabel = screen.getByLabelText(/pokémon favoritado?/i);
    expect(checkboxLabel).toBeInTheDocument(); // verifica se existe um checkbox com a opção de favoritar o pokemon

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy(); // verifica se o pokemon foi favoritado

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
  });
  test('check pokemon card', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const home = screen.getByText('Home');
    fireEvent.click(home);

    const pokemonInfo = pokemons[0];
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(pokemonLink);

    const pokemonName = screen.getByText(`${pokemonInfo.name} Details`);
    expect(pokemonName).toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /game locations/i, level: 2 });
    expect(heading).toHaveTextContent(`Game Locations of ${pokemonInfo.name}`); // verifica se existe um elemento h2 com o titulo `Game Locations of ${pokemonInfo.name}`

    const summaryPhrase = screen.getByText(pokemonInfo.summary); // verifica se a seção de detalhes contém um parágrafo com o resum do pokémon
    expect(summaryPhrase).toBeInTheDocument();

    const summary = screen.getByText('Summary'); // verifica se a seção de detalhes contém um título com o nome Summary
    expect(summary).toBeInTheDocument();

    const locations = screen.getAllByAltText('Pikachu location');
    expect(locations).toHaveLength(pokemonInfo.foundAt.length); // verifica se todas as localizações do pokemon são mostradas na tela

    const location1 = pokemonInfo.foundAt[0].location;
    const img1 = pokemonInfo.foundAt[0].map;
    expect(screen.getByText(location1)).toBeInTheDocument();
    expect(screen.getAllByAltText(`${pokemonInfo.name} location`)[0])
      .toHaveAttribute('src', img1);

    const location2 = pokemonInfo.foundAt[1].location;
    const img2 = pokemonInfo.foundAt[1].map;
    expect(screen.getByText(location2)).toBeInTheDocument();
    expect(screen.getAllByAltText(`${pokemonInfo.name} location`)[1])
      .toHaveAttribute('src', img2);
  });
});
// getByText((content, element) => content.startsWith('Hello'))
