import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import data from '../data';

describe('testar o componente pokémon', () => {
  it('teste se é renderizdo um card com as iformações de um determinado Pokémon', () => {
    renderWithRouter(<App />);
    // const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    const namePokemon = screen.getByTestId(/pokemon-name/i);
    expect(namePokemon).toBeInTheDocument();
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(namePokemon.innerHTML).toBe('Pikachu');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();
    // const type = screen.getAllByText(/Electric/i);
    // expect(type).toBeInTheDocument();
    expect(typePokemon.innerHTML).toBe('Electric');
    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight).toBeInTheDocument();
    const average = screen.getByText(/Average Weight: 6.0 kg/i);
    expect(average).toBeInTheDocument();
    expect(averageWeight.innerHTML).toBe('Average weight: 6.0 kg');
    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('se o card contém lik de navegação para exibir detalhes "link=Id"', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' } );
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    const linkEidIguais = history.location.pathname;
    expect(linkEidIguais).toBe('/pokemons/25');
    const pagDetails = screen.getByText(/Pikachu Details/i);
    expect(pagDetails).toBeInTheDocument();
  })
  it('icone de estrela nos pokemons favoritados', () => {
   renderWithRouter(<App />);
   const more = screen.getByRole('link', { name: 'More details' } );
   userEvent.click(more);
   const favorite = screen.getByLabelText('Pokémon favoritado?');
   userEvent.click(favorite);
   const linkFavorite = screen.getByRole('link', { name:/Favorite pokémons/i });
   expect(linkFavorite).toBeInTheDocument();
   userEvent.click(linkFavorite);
   const imgIconeStar = screen.getByAltText(/Pikachu is marked as favorite/i);
   expect(imgIconeStar).toBeInTheDocument;
  //  const imgStar = screen.getByAltText(/Pikachu sprite/i)
  //  expect(imgStar).toBeInTheDocument();
    expect(imgIconeStar).toHaveAttribute('src', '/star-icon.svg', 'alt', 'Pikachu is marked as favorite');
  //  expect(imgStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
