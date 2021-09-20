import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 6: Teste o componente <Pokemon.js />', () => { // descrição do teste
  test('6.1 - Teste se é renderizado um card com as informações do pokémon', () => { // teste do requisito 1
    // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza o componente App */}
        <App />
      </BrowserRouter>,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const imgPokemon = screen.getByRole('img');
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon.alt).toBe('Pikachu sprite');
  });

  test('6.3 - Teste se é feito o redirecionamento para a página de detalhes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const summary = screen.getByText(/summary/i);
    expect(summary).toBeInTheDocument();

    const checkFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(checkFavorite);

    const favoriteIcon = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    // test 6.5 - Teste se existe um ícone de estrela nos Pokémons favoritados
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
