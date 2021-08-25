import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('PokemonDetails.js tests', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado renderizam', () => {
    renderWithRouter(<App />);

    const getLinkDetails = screen.getByRole('link', {
      name: /details/i,
    });
    userEvent.click(getLinkDetails);

    const getText = screen.getByText(/pikachu details/i);
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
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(getNewH2).toBeInTheDocument();

    const location1 = screen.getByText(/kanto viridian forest/i);
    expect(location1).toBeInTheDocument();

    const location2 = screen.getByText(/kanto power plant/i);
    expect(location2).toBeInTheDocument();

    const getMap1 = screen.getByAltText(/Pikachu location/i);
    expect(getMap1).toBeInTheDocument();
  });
});
