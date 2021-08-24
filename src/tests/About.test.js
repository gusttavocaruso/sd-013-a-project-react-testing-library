import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Tests if component "about" has heading, paragraph and image elements.', () => {
  test('if heading is in the document', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });

  test('if two paragraph are in the document and are right ones', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText('This application', { exact: false });
    const p2 = screen.getByText('One can filter', { exact: false });
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('if image is in the document and if it is the right one', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
