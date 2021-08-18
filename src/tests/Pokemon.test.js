import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);

    const img = screen.getByAltText(/pikachu sprite/i);
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém
      um link de navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    expect(detailsButton).toBeInTheDocument();
  });

  it(`Testa se ao clicar no link de navegação do Pokémon, é feito o
      redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(detailsButton);
    const detailsText = screen.getByRole('heading', { name: /Pikachu details/i });
    expect(detailsText).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteButton);
    history.push('/');
    const favoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
