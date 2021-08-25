import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('First test - App.js', () => {
  test('Testing the navegation links on the application', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const lHome = screen.getByRole('link', { name: /home/i });
    const lAbout = screen.getByRole('link', { name: /about/i });
    const lFavoritePokemon = screen.getByRole('link', { name: /favorite/i });
    expect(lHome).toBeInTheDocument();
    expect(lAbout).toBeInTheDocument();
    expect(lFavoritePokemon).toBeInTheDocument();
  });
});
