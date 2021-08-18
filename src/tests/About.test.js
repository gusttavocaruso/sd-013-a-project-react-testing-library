import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testing About component', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Test if there is a Heading level 2 with the text "About Pokédex" in the page',
    () => {
      const h2 = screen.getByText('About Pokédex');

      expect(h2).toBeInTheDocument();
    });

  it('Test if the "src" attribute of the document is correct', () => {
    const img = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img.src).toBe(src);
  });
});
