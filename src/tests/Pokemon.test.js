import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRoute from './renderWithRoute';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações do pokemon', () => {
    renderWithRoute(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    const imagem = screen.getByRole('img');
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagem.alt).toBe('Pikachu sprite');
  });

  test('Testa se é direcionado para página de detalhes', () => {
    const { id } = pokemons[0];
    const { history } = renderWithRoute(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );
    const details = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se existe o icone da estrela na tela', () => {
    renderWithRoute(<Pokemon isFavorite pokemon={ pokemons[0] } />);
    const imgStar = screen.getByRole('img', { name: /marked as favorite/i });
    expect(imgStar).toBeInTheDocument();
    expect(imgStar.src).toMatch(/star-icon.svg/i);
    expect(imgStar.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
// Feito com a ajuda do Notion da turma
