import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa App.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it(`Testa se o topo da aplicação contém um conjunto fixo de 
      links de navegação.`, () => {
    const Home = screen.getByText('Home');
    expect(Home).toBeInTheDocument();
    const About = screen.getByText('About');
    expect(About).toBeInTheDocument();
    const Favorite = screen.getByText(/favorite/i);
    expect(Favorite).toBeInTheDocument();
  });

  it(`Testa se a aplicação é redirecionada para a página inicial, na URL / ao clicar
      no link Home da barra de navegação`, () => {
    const Home = screen.getByText('Home');
    fireEvent.click(Home);
    const textHome = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(textHome).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página de About, na URL /about,
      ao clicar no link About da barra de navegação.`, () => {
    const About = screen.getByText('About');
    fireEvent.click(About);
    const textAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(textAbout).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página de About, na URL /about,
      ao clicar no link About da barra de navegação.`, () => {
    const Favorite = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(Favorite);
    const textFavorite = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(textFavorite).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página Not Found
      ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/askaskams');
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
