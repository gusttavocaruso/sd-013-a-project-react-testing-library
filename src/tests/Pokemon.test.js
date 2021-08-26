// PROJETO FEITO COM AJUDA DO MATHEUS DUARTE , ROGERIO , JOSUÉ, RAFAEL PELO DISCORD.
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RouterNHistory from './RouterNHistory';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Requisito 6 - Verificando o funcionamento do componente <Pokemon />', () => {
  it('Verirfica se renderiza um card com as seguintes informações de um Pokémon:'
    + ' nome, tipo, peso médio com unidade de medida e sua imagem.', () => {
    RouterNHistory(<App />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  it('Verifica se o card do Pokémon contém um link para sua página de detalhes', () => {
    RouterNHistory(<App />);

    const { id } = pokemons[0];

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails.href).toBe(`http://localhost/pokemons/${id}`);
  });

  it('Verifica se ao clicar no link para a página de detalhes de um Pokémon, '
    + 'é feito o redirecionamento para esta página', () => {
    const { id } = pokemons[0];

    const { history } = RouterNHistory(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados, '
    + 'é feito o redirecionamento para esta página', () => {
    RouterNHistory(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );

    const favIcon = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favIcon).toBeInTheDocument();

    expect(favIcon.src).toMatch(/star-icon.svg/i);

    expect(favIcon.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
