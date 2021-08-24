import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica o componente PokemonDetails', () => {
  test('Verifica textos da tela de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const nameDetails = screen
      .getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(nameDetails).toBeInTheDocument();
  });

  test('verifica se contem link de navegação na pagina de detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen
      .getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);
    expect(linkMoreDetails).not.toBeInTheDocument();
  });

  test('Verifica se na seção de detalhes contem o texto Summary, e o resumo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const msgSummary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(msgSummary).toBeInTheDocument();
    expect(screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/i));
  });
});

describe('verificando localização do pokemon', () => {
  test('Verifica se renderiza os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/23');

    const msgGameLocation = screen
      .getByRole('heading', { name: 'Game Locations of Ekans', level: 2 });
    expect(msgGameLocation).toBeInTheDocument();

    const altImgLocation = screen.getByAltText('Ekans location');
    const srcImgLocation = altImgLocation.src.includes('https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');

    expect(srcImgLocation).toBeTruthy();
  });

  test('Verificando se é possivel favoritar o pokemon ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/23');

    const linkFavoritePokémons = screen.getByRole('checkbox', { checked: false });
    expect(linkFavoritePokémons).toBeInTheDocument();
    expect(linkFavoritePokémons).not.toBeChecked();
    userEvent.click(linkFavoritePokémons);
    expect(linkFavoritePokémons).toBeChecked();
    userEvent.click(linkFavoritePokémons);
    expect(linkFavoritePokémons).not.toBeChecked();
    const labelLinkName = screen.getByLabelText('Pokémon favoritado?');
    expect(labelLinkName).toBeInTheDocument();
  });
});
