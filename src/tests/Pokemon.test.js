import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

describe('Pokemon.js tests', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const { type, name } = pokemons[0];
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);
    // const name = screen.getByTestId(/pokemon-name/i);
    // expect(name).toBeInTheDocument();
    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.innerHTML).toBe(type);
    // const typePoke2 = screen.getByTestId('pokemon-type');
    expect(typePoke).toBeInTheDocument();
    const average = screen.getByTestId('pokemon-weight');
    expect(average.innerHTML).toBe('Average weight: 6.0 kg');
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('se o card contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } />,
    );
    // render(
    //   <BrowserRouter>
    //     <App />
    //   </BrowserRouter>,
    //   const history = createMemoryHistory();
    // );
    // const history = createMemoryHistory();
    const { id } = pokemons[0];
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails.href).toBe(`http://localhost/pokemons/${id}`);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    const pathName = history.location.pathname;
    expect(pathName).toBe(`/pokemons/${id}`);
  });
  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);

    const alt = screen.getByAltText(/Charmander is marked as favorite/i);
    expect(alt).toHaveAttribute('src', '/star-icon.svg');
  });
});
