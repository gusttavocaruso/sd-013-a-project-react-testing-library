import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('requisito 6,Pokemon', () => {
  it('card com informaçõe do pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toBe('Electric');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    const image = screen
      .getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('link com id- pokemons details', () => {
    const { history } = renderWithRouter(<App />);
    const textDetails = screen.getByText(/more details/i);
    userEvent.click(textDetails);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
  });
  it('ícone de estrela no poḱemon favoritado', () => {
    renderWithRouter(<App />);
    const textDetails = screen.getByText(/more details/i);
    userEvent.click(textDetails);
    const pokeFavorite = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(pokeFavorite);
    const favorite = screen.getByRole('link',
      { name: /Favorite Pokémons/ });
    userEvent.click(favorite);
    const pikachu = screen.getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
    const favoritePikachuStar = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(favoritePikachuStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(favoritePikachuStar).toHaveAttribute('src', '/star-icon.svg');
  });
});

// no 2 teste cliquei no botao mais detalhes e vi se depois de clicar o link seria pokemons/25( que é o id do pikachu);
// no teste 3 que é o incone de estrela, primeiro cliquei em mais detalhes, depois clicou na checkbox para favoritar o pokemon,
// depois fui na url favorite pokemon clicando nela, vi se o pikachu aparece lá, do lado do pikachu terá uma estrela
// chamei essa estrela através do alt dela, fiz o teste se o atributo alt da estrela é pikachu is marked as favorite
// depois o teste se o atributo src da estrela é /star-icon.svg.
