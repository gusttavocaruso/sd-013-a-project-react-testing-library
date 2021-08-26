import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Requisito-6 - Testa o comportamento do componente <Pokemon />', () => {
  test('Testa se um card possui infomações sobre o Pokemon', () => {
    RenderWithRouter(<App />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });

  test('Testa se o card contém um link para pagina de detalhes', () => {
    RenderWithRouter(<App />);
    const { id } = pokemons[0];
    const infoLink = screen.getByRole('link', { name: 'More details' });
    expect(infoLink.href).toBe(`http://localhost/pokemons/${id}`);
  });

  test('Testa se ao clicar no link de detalhes, é redirecionado para'
    + 'a página de detalhes', () => {
    const { id } = pokemons[0];
    const { getHistory } = RenderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );

    const infoLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(infoLink);
    const { pathname } = getHistory.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    RenderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );

    const favIcon = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toMatch(/star-icon.svg/i);
    expect(favIcon.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  }); // Esta solução foi baseada no projeto do colega Matheu Duarte.
});
