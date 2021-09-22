import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

/**
  * Consultei o repositório do Rafael de Andrade. foi dai q veio a ideia de utilizar os metodos queryByRole e pathname.
  * https://github.com/tryber/sd-013-a-project-react-testing-library/tree/rafhaeldeandrade-react-testing-library
 */

// comando para rodar teste: npx stryker run ./stryker/App.conf.json

describe('Requisito 1: texte do componente App', () => {
  // tive um problema de lint ao tentar usar o beforeEach
  it('Requisito 1.1: testa se os links existem', () => {
    renderWithRouter(<App />);
    /** ======== acessando os elementos ========= */
    const home = screen.queryByRole('link', { name: 'Home' });
    const about = screen.queryByRole('link', { name: 'About' });
    const favorites = screen.queryByRole('link', { name: 'Favorite Pokémons' });

    /** ======== testando os elementos ========= */
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });
  it('Requisito 1.2: testa redirecionamento para /', () => {
    renderWithRouter(<App />);
    /** ======== acessando os elementos ========= */
    const home = screen.queryByRole('link', { name: 'Home' });

    /** ======== interagindo com os elementos ========= */
    userEvent.click(home);
    const { pathname } = renderWithRouter(<App />).history.location;

    /** ======== testando os elementos ========= */
    expect(pathname).toBe('/');
  });

  it('Requisito 1.3: redirecionamento para /about', () => {
    renderWithRouter(<App />);
    /** ======== acessando os elementos ========= */
    const about = screen.queryByRole('link', { name: 'About' });
    /** ======== interagindo com os elementos ========= */
    userEvent.click(about);
    const { pathname } = renderWithRouter(<App />).history.location;

    /** ======== testando os elementos ========= */
    expect(pathname).toBe('/');
  });

  it('Requisito 1.4: redirecionamento para /favorites', () => {
    renderWithRouter(<App />);
    /** ======== acessando os elementos ========= */
    const favorite = screen.queryByRole('link', { name: 'Favorite Pokémons' });

    /** ======== interagindo com os elementos ========= */
    userEvent.click(favorite);
    const { pathname } = renderWithRouter(<App />).history.location;

    /** ======== testando os elementos ========= */
    expect(pathname).toBe('/');
  });

  it('Requisito 1.4: redirecionamento para Not Found', () => {
    /** ======== interagindo com os elementos: mudando a rota ========= */
    renderWithRouter(<App />).history.push('aaa');

    /** ======== acessando os elementos ========= */
    const error = screen.queryByText('Page requested not found');

    /** ======== testando os elementos ========= */
    expect(error).toBeInTheDocument();
  });
});
