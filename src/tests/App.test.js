import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../render-router';

describe('App tests', () => {
  test('Exibe conjunto de links', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: 'Home',
    });
    const about = screen.getByRole('link', {
      name: 'About',
    });
    const favorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('Exibe mensagem de erro', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/test'); // clica em uma url desconhecida
    const msgErro = screen.getByText(/not found/i);
    expect(msgErro).toBeInTheDocument();
  });

  test('Ao climar na Home é direcionada para a inicial /', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByText(/home/i);
    fireEvent.click(home);
    const homeURL = history.location.pathname;

    expect(homeURL).toBe('/');
  });

  test('Ao climar na About é direcionada para a propia', () => {
    const { history } = renderWithRouter(<App />);

    const aboutPage = screen.getByText(/about/i);
    fireEvent.click(aboutPage);
    const about = history.location.pathname;

    expect(about).toBe('/about');
  });

  test('Ao climar na favotites é direcionada para a propia', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesPok = screen.getByText(/Favorite pokémons/i);
    fireEvent.click(favoritesPok);
    const favoritePag = history.location.pathname;

    expect(favoritePag).toBe('/favorites');
  });
});
