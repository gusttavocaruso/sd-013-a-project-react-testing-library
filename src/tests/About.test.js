import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('About.js tests', () => {
  test('if header renders', () => {
    const aboutHeader = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutHeader).toBeInTheDocument();
  });
  test('if paragraphs renders', () => {
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });
  test('if images renders', () => {
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeInTheDocument();
    expect(img.src).toStrictEqual(src);
  });
});
