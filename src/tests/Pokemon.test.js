import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import App from '../App';
// import { Pokemon } from '../components';

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

  //   test('6.2 - Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
  //     const { history } = render(<App />);
  //     const detailsLink = screen.getByRole('link', { name: /details/i });
  //     expect(detailsLink).toBeInTheDocument();

  //     userEvent.click(detailsLink);
  //     expect(history.location.pathname).toBe('/pokemons/25');

  //     const favoritePokemon = screen.getByText('pokémon favorito?', { exact: false });
  //     userEvent.click(favoritePokemon);

  //     const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i });
  //     expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  //     expect(favoriteIcon.alt).toBe('Pikachu is marked as favorite');
  //   });
});
