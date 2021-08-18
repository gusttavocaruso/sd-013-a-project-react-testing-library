import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';

import App from '../App';

describe('verify if the header contains navigation links', () => {
  it('should verify if the first link is the Home link', () => {
    // renderiza o componente usando o helper renderWithRouter
    renderWithRouter(<App />);

    // localiza e armazena o link numa variável
    const homeLink = screen.getByRole('link', { name: 'Home' });

    // adiciona um expect() para receber e verificar se ele esta no documento
    expect(homeLink).toBeInTheDocument();
  });

  it('should verify if the second link is the About link', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });

  it('should verify if the third link is the Favorite Poke link', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });
});

describe('verify if clicked links leads the user to the respective component', () => {
  it('should verify if, clicked in Home link, renderizes Home component', () => {
    // aqui neste caso, devo desestruturar o history do renderWithRouter
    // para ter acesso ao objeto history do link, como o pathname
    const { history } = renderWithRouter(<App />);

    // localiza e armazena o link numa variável
    const home = screen.getByRole('link', { name: 'Home' });

    // adiciona um evento de escuta, neste caso, de clique no link Home
    fireEvent.click(home);

    // adiciona um expect() sobre o componente renderizado após o clique
    // usando o pathname do history para checar o redirecionamento
    expect(history.location.pathname).toBe('/');
    // repete o procedimento nos testes abaixo, trocando os componentes
  });

  it('should verify if, clicked in About link, renderizes About component', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('should verify if, clicked in FavPoke link, renderizes FavPoke component', () => {
    const { history } = renderWithRouter(<App />);

    const favPoke = screen.getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(favPoke);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('should verify if wrong route is passed, renderizes NotFound component', () => {
    const { history } = renderWithRouter(<App />);
    // aqui neste caso, estou usando o history com o método push() para
    // fazer um redirecionamento para uma URL inexistente
    history.push('/not-found');

    // armazena a captura de texto do component NotFound
    // em uma variável

    const notFound = screen.getByText(/Page requested not found/);

    // adiciona um expect() para verificar se o texto na variavel
    // esta presente no componente NotFound
    expect(notFound).toBeInTheDocument();
  });
});
