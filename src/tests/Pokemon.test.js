import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente "Pokemon"', () => {
  it('Testa se é renderizado um card com as informações de determinado Pokemon', () => {
    renderWithRouter(<App />);

    const cardName = screen.getByTestId('pokemon-name');
    const cardType = screen.getByTestId('pokemon-type');
    const cardWeight = screen.getByTestId('pokemon-weight');
    const cardImage = screen.getByRole('img');

    expect(cardName.textContent).toBe('Pikachu');
    expect(cardType.textContent).toBe('Electric');
    expect(cardWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(cardImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(cardImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Teste se card do Pokémon contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const { location } = history;
    const { pathname } = location;
    const detailsPathname = pathname;

    expect(detailsPathname).toBe('/pokemons/25');
  });

  it('Testa se ao clicar em "Details", é feito o redirecionamento da aplicação', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(details);

    const pikachuDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });

    expect(pikachuDetails).toBeInTheDocument();
  });

  it('Se existe um ícone de estrala no Pokemon favoritado', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(details);

    const checkboxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkboxFavorite);

    const starIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(starIcon).toBeDefined();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
