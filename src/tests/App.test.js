import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

const home = screen.getByText('Home');
const about = screen.getByText('About');
const favorite = screen.getAllByText('Favorite Pokémons');

describe('Testa Home', () => {
  it('testa o link "Home" se possui o texto "Home"', () => {
    expect(home.textContent).toBe('Home');
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toBe('About Pokédex');
  });
  it('testa o link "Home" se direciona para "/"', () => {
    expect(home.getAttribute('href')).toBe('/');
  });
});
describe('Testa About', () => {
  it('testa o link "About" se possui o texto "About"', () => {
    expect(about.textContent).toBe('About');
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toBe('About Pokédex');
  });
  it('testa o link "Home" se direciona para "/"', () => {
    expect(home.getAttribute('href')).toBe('/');
  });
});
