import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon',
    () => {
      // renderiza a pagina "app"
      renderWithRouter(<App />);
      // testa evento de ir para pagina de detlahes pelo link
      userEvent.click(screen.getByRole('link', { name: /More Details/i }));
      // buscando o nome correto do pokemon mostrado na tela
      const detailsPokemon = screen.getByRole('heading', { name: /Pikachu Detail/i });
      // testando o elemento acima
      expect(detailsPokemon).toBeInTheDocument();
    });

  test(
    'Teste se existe na página uma seção com os mapas das localizações do pokémon',
    () => {
      // renderizar a pagina "app"
      renderWithRouter(<App />);
      // testando o evento
      userEvent.click(screen.getByRole('link', { name: /More Details/i }));
      // buscando o elemento que contem mapa
      // consulta ao https://testing-library.com/docs/queries/byalttext/
      // retornará o elemento normalmente um <img>
      const pokemonMap = screen.getAllByAltText('Pikachu location')[0];
      // testando a propriedade src
      expect(pokemonMap.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      // testando a propriedade alt
      expect(pokemonMap.alt).toBe('Pikachu location');
    },
  );

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
