import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const idPikachu = '/pokemons/25';

describe('Teste o componente PokemonDetails', () => {
  test('Se as informações do pokémon são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(idPikachu);

    const name = screen.getByText(/pikachu details/i);
    expect(name).toBeInTheDocument();

    const h2Summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(h2Summary).toBeInTheDocument();

    const summary = screen.getByText(/this intelligent pokémon/i);
    expect(summary).toBeInTheDocument();
  });

  test('Se existe na página uma seção contendo as localizações', () => {
    const { history } = renderWithRouter(<App />);
    history.push(idPikachu);

    const sectionLocation = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    expect(sectionLocation).toBeInTheDocument();

    const imgMap = screen.getAllByAltText('Pikachu location');
    expect(imgMap[0]).toBeInTheDocument();
    expect(imgMap[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgMap[1]).toBeInTheDocument();
    expect(imgMap[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(idPikachu);

    const checkbox = screen.getByLabelText(/pokémon favoritado/i);
    expect(checkbox).toBeInTheDocument();
  });
});
