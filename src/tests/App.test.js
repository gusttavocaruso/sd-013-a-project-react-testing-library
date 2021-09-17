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
    const homeLink = screen.getByRole('link', { // procura o link com o nome 'home'
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument(); // espera estar no documento

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

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
    const homeLink = screen.getByRole('link', { // procura o link com o nome home
      name: /home/i,
    });
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
    const pageNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
