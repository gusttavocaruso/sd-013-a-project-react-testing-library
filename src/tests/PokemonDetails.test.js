import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More Details/i })); // testa evento que acessar pagina de detlahes pelo link
    const detailsPokemon = screen.getByRole('heading', { name: /Pikachu Detail/i }); // buscando o nome correto do pokemon
    expect(detailsPokemon).toBeInTheDocument();
  });
  test('Teste se existe uma seção com os mapas das localizações do pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More Details/i })); // testando o evento
    const pokemonMap = screen.getAllByAltText('Pikachu location')[0]; // buscando o elemento que contem no mapa
    expect(pokemonMap.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    // testando a propriedade src
    expect(pokemonMap.alt).toBe('Pikachu location'); // testando a propriedade alt
  });
  test('Teste se existe um h2 com o Texto Game Locations e Summary', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More Details/i }));
    const headingSumary = screen.getByRole('heading', { name: /Summary/i });
    expect(headingSumary).toHaveTextContent('Summary');
    const paragraphSummary = screen.getByText(/This intelligent Pokémon/i);
    expect(paragraphSummary).toBeInTheDocument();
    const headingLocation = screen.getByRole('heading', { name: /Game Locations/i });
    expect(headingLocation).toHaveTextContent('Game Locations of Pikachu');
  });
  test('Teste se existe label checkbox contendo o texto Pokémon favoritado?', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More Details/i }));
    const favoritePokemon = screen
      .getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favoritePokemon).toBeInTheDocument();
  });
});
