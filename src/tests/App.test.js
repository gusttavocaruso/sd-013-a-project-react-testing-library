import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Testa se o topo do App contem conjunto fixo de links', () => {
  test('Testa se o primeiro link possui o texto: home', () => {
    render(<BrowserRouter><App /></BrowserRouter>);

    const txtHome = screen.getByText('Home'); // query
    expect(txtHome).toBeDefined(); // Matcher
  });

  test('Testa se o segundo link possui o texto: About', () => {
    render(<BrowserRouter><App /></BrowserRouter>);

    const txtAbout = screen.getByText('About'); // query
    expect(txtAbout).toBeDefined(); // Matcher
  });

  test('Testa se o terceiro link possui o texto: Favorite Pokémons', () => {
    render(<BrowserRouter><App /></BrowserRouter>);

    const txtPokemons = screen.getByText('Favorite Pokémons'); // query
    expect(txtPokemons).toBeDefined(); // Matcher
  });
});
