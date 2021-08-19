import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 6', () => {
  it('Testa se no car tem o nome e o peso do pokemon', () => {
    renderWithRouter(<App />);
    // Pegar o nome, peso, tipo e Imagem
    const imgPokemon = screen.getByAltText('Pikachu sprite');
    const namePokemon = screen.getByTestId('pokemon-name');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    const typePokemon = screen.getByTestId('pokemon-type');
    // Testar se estao na tela
    expect(imgPokemon).toBeInTheDocument();
    expect(namePokemon).toBeInTheDocument();
    expect(weightPokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    // Testar seus conteudos
    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(imgPokemon).not.toHaveAttribute('src', '');
  });
  it('Verifica se o more detail leva a pagina correta', () => {
    const { history } = renderWithRouter(<App />);
    // Acessar o link
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    expect(moreDetails).toBeInTheDocument();
    // Clicar nele e ver se o pathName condiz com o esperado
    userEvent.click(moreDetails);
    const URL_ESPERADA = '/pokemons/25';
    const URL_ATUAL = history.location.pathname;
    expect(URL_ESPERADA).toBe(URL_ATUAL);
  });
  it('Verifica que pokemons favoritados tem uma estrela', () => {
    renderWithRouter(<App />);
    // Realizar os eventos para favoritar um pokemon
    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
