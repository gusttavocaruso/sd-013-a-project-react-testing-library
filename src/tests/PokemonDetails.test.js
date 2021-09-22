import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import historyComponent from '../components/historyComponent';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Verifica se as informações do Pokémon selecionado são mostradas na tela', () => {
    historyComponent(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const name = screen.getByRole('heading', { name: /Summary/i });
    expect(name).toBeInTheDocument();
    const pokeName = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(pokeName).toBeInTheDocument();
    const locationsName = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
    });
    expect(locationsName).toBeInTheDocument();
    const paragraph = screen.getByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('Verifica se existe uma seção com os mapas e as localizações do pokémon', () => {
    historyComponent(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const maps = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(maps).toHaveLength(2);
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Verifica se o usuário pode favoritar um pokémon na página de detalhes', () => {
    historyComponent(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const favorites = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorites).toBeInTheDocument();
  });
});
