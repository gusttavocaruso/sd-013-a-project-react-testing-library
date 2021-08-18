import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test content from about page', () => {
  it('should have a heading pokedex', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('should have two paragraph', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const aboutParagraphOne = screen.getByText(/this application simulates a pokédex/i);
    expect(aboutParagraphOne).toBeInTheDocument();

    const aboutParagraphTwo = screen.getByText(/one can filter pokémons by type/i);
    expect(aboutParagraphTwo).toBeInTheDocument();
  });

  it('should have an image', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const aboutImg = screen.getByRole('img', { name: /pokédex/i });
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
