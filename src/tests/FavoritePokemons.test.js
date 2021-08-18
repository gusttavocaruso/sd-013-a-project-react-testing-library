import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('requisito 3', () => {
  it('Verifica se a pagina renderiza o texto correto', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFoundText = screen.getByText('No favorite pokemon found');
    expect(noFoundText).toBeInTheDocument();
  });

  it('Adicionar o pokemon e renderizar na pagina de fav', () => {
    const { history } = renderWithRouter(<App />);
    // Verificar se o pikachu esta na tela, para entao interagir com ele
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
    // Clicar em more details
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    // Adicionar o pikachu aos favoritos
    const adcFav = screen.getByRole('checkbox', {
      checked: false,
    });
    // Conferir que existe
    expect(adcFav).toBeInTheDocument();
    // Clicar para adiciona-lo
    userEvent.click(adcFav);
    // conferir que foi favoritado
    const fav = screen.getByRole('checkbox', {
      checked: true,
    });
    // Conferir que foi favoritado
    expect(fav).toBeInTheDocument();
    // Ir para a pagina de favoritos
    history.push('/favorites');
    // Verificar que tem um pikachu na tela
    const pikapika = screen.getByText('Pikachu');
    expect(pikapika).toBeInTheDocument();
  });
});
