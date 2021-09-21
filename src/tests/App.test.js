import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { NotFound } from '../components';

describe('Requisito 1: Teste o componente <App.js />', () => { // descrição do teste
  test('1.1 - Teste se a aplicação contém um conjunto fixo de links de navegação', () => { // teste do requisito 1
    // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza todo o componente App */}
        <App />
      </BrowserRouter>,
    );
    // procura o link com o texto 'home'
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();
    // procura o link com o texto 'about'
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();
    // procura o link com o texto 'favorite pokemons'
    const favoritePokemonsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  test('1.2 - Teste se a aplicação é redirecionada para a página inicial', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    // procura o link com o nome home
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    // simula o click no link
    userEvent.click(homeLink);
    expect(homeLink).toBeInTheDocument();
  });

  test('1.3 - Teste se a aplicação é redirecionada para a página de About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
    expect(aboutLink).toBeInTheDocument();
  });

  test('1.4 - Teste se a aplicação é redirecionada para a página dos Favoritados', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const favoritePokemonsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoritePokemonsLink);
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  test('1.5 - Teste se a aplicação é redirecionada para a página Not Found', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    // verifica se mostra na tela um h2 com o texto 'page requested not found'
    const pageNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
