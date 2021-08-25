import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('PokemonDetails.js tests', () => {
  const {
    name,
    foundAt,
  } = pokemons[0];
  it('Teste se as informações detalhadas do Pokémon selecionado renderizam', () => {
    renderWithRouter(<App />);

    const getLinkDetails = screen.getByRole('link', {
      name: /details/i,
    });
    userEvent.click(getLinkDetails);

    const getText = screen.getByText(`${name} Details`);
    expect(getText).toBeInTheDocument();
    expect(getLinkDetails).not.toBeInTheDocument();

    const getTextH2 = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(getTextH2).toBeInTheDocument();

    const paragraph = screen.getByText(
      (content) => content.startsWith('This intelligent'),
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);

    const getLinkDetails = screen.getByRole('link', {
      name: /details/i,
    });
    userEvent.click(getLinkDetails);

    const getNewH2 = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(getNewH2).toBeInTheDocument();

    const location1 = screen.getByText(/kanto viridian forest/i);
    expect(location1).toBeInTheDocument();

    const location2 = screen.getByText(/kanto power plant/i);
    expect(location2).toBeInTheDocument();

    const getMap = screen.getAllByAltText(`${name} location`);
    expect(getMap).toBeDefined();
    expect(getMap.length).toEqual(foundAt.length);
  });

  it('Verifica pokemon favoritado', () => {
    renderWithRouter(<App />);

    const getLinkDetails = screen.getByRole('link', {
      name: /details/i,
    });
    userEvent.click(getLinkDetails);

    const getCheckbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(getCheckbox).toBeInTheDocument();

    userEvent.click(getCheckbox);
    expect(getCheckbox).toBeTruthy();
  });

  it('pegar mapa pokemom ekans', () => {
    renderWithRouter(<App />);
    const { type, foundAt } = pokemons[3];

    const getPoisonButton = screen.getByRole('button', {
      name: type,
    });
    userEvent.click(getPoisonButton);

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    const getEkansMap = screen.getByAltText('Ekans location').src;
    expect(getEkansMap).toBe('https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png')
  });
});
