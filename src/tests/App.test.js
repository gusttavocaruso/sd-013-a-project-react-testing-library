import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import historyComponent from '../components/historyComponent';

// textos tirados direto do repositório: shorturl.at/pyQZ0.

describe('Teste o componente <App.js />', () => {
  it('Verifica o texto e o link de navegação "Home"', () => {
    const { history } = historyComponent(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeDefined();

    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica o texto e o link de navegação "About"', () => {
    const { history } = historyComponent(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeDefined();

    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica o texto e o link de navegação "Favorite Pokemons"', () => {
    const { history } = historyComponent(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeDefined();

    userEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se a aplicação é redirecionada para a página "Not Found"', () => {
    const { history } = historyComponent(<App />);
    history.push('/notFound');
    const notfound = screen.queryByText(/not found/i);

    expect(notfound).toBeInTheDocument();
  });
});
