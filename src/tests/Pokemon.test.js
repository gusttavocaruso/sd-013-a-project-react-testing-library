import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('testing pokemon component', () => {
  test('check pokemon card', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');
    // const pokemonLink = screen.getByRole('link', {
    //   name: /more details/i,
    // });

    const pokemonInfo = pokemons[0];
    const weight = pokemonInfo.averageWeight.value;
    const unit = pokemonInfo.averageWeight.measurementUnit;

    expect(pokemonName).toHaveTextContent(pokemonInfo.name); // testa se o pokemon possui o nome correto
    expect(pokemonType).toHaveTextContent(pokemonInfo.type); // testa se o pokemon possui o tipo correto
    expect(pokemonWeigth).toHaveTextContent(`${weight} ${unit}`); // testa se o pokemon possui o peso médio correto
    expect(pokemonImg).toHaveAttribute('src', pokemonInfo.img); // testa se o pokemon possui a img  correta
    expect(pokemonImg).toHaveAttribute('alt', `${pokemonInfo.name} sprite`); // testa se o pokemon possui o atributo alt  correto
    expect(pokemonImg).not.toHaveAttribute('src', ''); // testa se o pokemon possui a img  correta
  });
  test('check pokemon More details link', () => {
    const pokemonInfo = pokemons[0];
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(pokemonLink).toHaveAttribute('href', `/pokemons/${pokemonInfo.id}`); // testa se o link More details é tem o atributo href com valor /pokemons/id

    fireEvent.click(pokemonLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemonInfo.id}`);// testa se o link More details é redirecionado para o endereço /pokemons/id
  });
  test('check favorite pokemons', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const pokemonInfo = pokemons[0];
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(pokemonLink);
    const favoriteLabel = screen.getByLabelText(/pokémon favoritado?/i);
    fireEvent.click(favoriteLabel);

    const starImg = screen.getByAltText(/pikachu is marked as favorite/i);

    expect(starImg).toHaveAttribute('src', '/star-icon.svg');// testa se o link More details é redirecionado para o endereço /pokemons/id
    expect(starImg).toHaveAttribute('alt', `${pokemonInfo.name} is marked as favorite`);// testa se o link More details é redirecionado para o endereço /pokemons/id
  });
});
