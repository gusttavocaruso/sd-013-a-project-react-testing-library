import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('tests App component', () => {
  it('checks if the first link is rendered and if it has the name Home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const homeLink = screen.getByText(/home/i);

    expect(homeLink).toBeInTheDocument();
  });

  it('checks if the second link is rendered and if it has the name About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const aboutLink = screen.getByText(/about/i);

    expect(aboutLink).toBeInTheDocument();
  });
  it('checks if the third link is rendered and if it has the correct name', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const favoritePokemonLink = screen.getByText(/favorite pokémons/i);

    expect(favoritePokemonLink).toBeInTheDocument();
  });
});
describe('testing the Routers', () => {
  it('checks if it is redirected to path "/" when clicked on home link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/home/i);
    fireEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });
  it('checks if it is redirected to path "/about" when clicked on about link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/about/i);
    fireEvent.click(homeLink);

    expect(history.location.pathname).toBe('/about');
  });
  it('checks if it is redirected to path "/favorites" when clicked on right link', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByText(/favorite pokémons/i);
    fireEvent.click(favoritePokemonLink);

    expect(history.location.pathname).toBe('/favorites');
  });
  it('checks if it is redirected to path not found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/teste');

    const notFoundMsg = screen.getByRole('heading', {
      level: 2,
    });
    expect(history.location.pathname).toBe('/teste');
    expect(notFoundMsg).toBeInTheDocument();
  });
});
